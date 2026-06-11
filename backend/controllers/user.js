import User from "../models/user.js"
import Details from "../models/userdetails.js";
import Cources from "../models/userCources.js";
import { courseMasterList } from "../constants/data.js";

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            ok: false,
            message: "Email already exists",
        });
    }
    try {
        const user = await User.create({
            name,
            email,
            password,
        });
        await Details.create({
            user: user._id,
        });
        return res.status(201).json({
            ok: true,
            message: "Account created successfully",
        });
    } catch (error) {
        console.log(error);

        if (error.code === 11000) {
            return res.status(409).json({
                ok: false,
                message: "Email already exists",
            });
        }

        return res.status(500).json({
            ok: false,
            message: "Something went wrong",
        });
    }
}

async function handleLogIn(req, res) {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndTokenGenerator(email, password);
        if (!token) {
            return res.status(401).json({
                ok: false,
                message: "Invalid email or password",
            });
        }
        return res
            .cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                secure: false,
            })
            .json({
                ok: true,
                message: "Login successful",
            });

    } catch (error) {
        return res.json({
            ok: false
        });
    }
}
async function handelMe(req, res) {

    const user = await User.findById(req.user._id);
    const details = await Details.findOne({
        user: req.user._id,
    });
    return res.json({
        user: {
            ...user.toObject(),
            details,
        },
    });
}
async function clearUser(req, res) {
    res.clearCookie("token");
    return res.json({
        success: true,
        message: "Logged out",
    });
}

const updateProfile = async (req, res) => {
    try {
        const {
            name,
            branch,
            currentSemester,
            cpi,
            creditsCompleted,
            bio,
            linkedin,
            github,
            codeforcesHandle,
            codechefHandle,
        } = req.body;

        const userId = req.user._id;

        await User.findByIdAndUpdate(userId, {
            name,
        });

        const details =
            await Details.findOneAndUpdate(
                { user: userId },
                {
                    branch,
                    currentSemester,
                    cpi,
                    creditsCompleted,
                    bio,
                    linkedin,
                    github,
                    codeforcesHandle,
                    codechefHandle,
                },
                {
                    returnDocument: 'after',
                    upsert: true,
                }
            );

        const user = await User.findById(userId);

        return res.status(200).json({
            success: true,
            user: {
                ...user.toObject(),
                details,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update profile",
        });
    }
};

async function handleCources(req, res) {

    try {
        const userCourses = await Cources.findOne({
            user: req.user._id,
        });

        return res.json({
            codes: userCourses?.courses || [],
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to fetch courses",
        });
    }
}

async function handleUpdateCources(req, res) {
    try {
        const { codes } = req.body;

        const validCodes = codes.filter(
            (code) => courseMasterList[code]
        );

        const totalCredits = validCodes.reduce(
            (sum, code) => sum + courseMasterList[code].credits,
            0
        );

        const userCourses = await Cources.findOneAndUpdate(
            {
                user: req.user._id,
            },
            {
                courses: validCodes,
            },
            {
                upsert: true,
                returnDocument: "after",
            }
        );

        await Details.findOneAndUpdate(
            {
                user: req.user._id,
            },
            {
                creditsCompleted: totalCredits,
            },
            {
                upsert: true,
                returnDocument: "after",
            }
        );

        return res.json({
            success: true,
            courses: userCourses.courses,
            totalCredits,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to save courses",
        });
    }
}
export {
    handleLogIn, handleSignUp, clearUser, handelMe, updateProfile, handleCources, handleUpdateCources
}