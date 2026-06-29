import User from "../models/user.js"
import Details from "../models/userdetails.js";
import Cources from "../models/userCources.js";
import SemesterDetail from "../models/semsterdetails.js";
import { courseMasterList } from "../constants/data.js";
import { createToken } from "../services/auth.js";
import { oauth2client } from "../config/googleConfig.js"
import axios from "axios";




async function getUsers(req, res) {
    const users = await User.find(
        {},
        "name email role"
    );
    res.json(users);
}

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json({
            ok: false,
            message: "Email already exists",
        });
    }
    if (!name || !email || !password) {
        return res.status(400).json({
            ok: false,
            message: "Please fill required fields",
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
        if(!email || !password) return res.json({ok:false,message:"Invalid email or password"})
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
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                secure: process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .json({
                ok: true,
                message: "Login successful",
                "isNewUser": true
            });

    } catch (error) {
        return res.json({
            ok: false,
            message: error.message || "Invalid email or password"
        });
    }
}
async function handelMe(req, res) {

    const user = await User.findById(req.user._id).select("-password -salt");
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
async function handleGoogleAuth(req, res) {
    const code = req.query.code;
    try {
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);
        const userRes = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
        );
        const { email, name, picture } = userRes.data;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                name, email, profileImageUrl: picture
            });
            await Details.create({
                user: user._id,
            });
        }
        const token = createToken(user);
        return res.status(200).cookie("token", token, {
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).json({
            ok: true,
            message: "Login successful",
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "error occured",
            error: "Internal Server Error"
        })
    }
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

        if (!Array.isArray(codes)) {
            return res.status(400).json({
                success: false,
                message: "Codes must be an array",
            });
        }

        const userCourses = await Cources.findOneAndUpdate(
            {
                user: req.user._id,
            },
            {
                $addToSet: {
                    courses: {
                        $each: codes,
                    },
                },
            },
            {
                upsert: true,
                new: true,
            }
        );

        const totalCredits = userCourses.courses.reduce((sum, code) => {
            return sum + (courseMasterList[code]?.credits || 0);
        }, 0);

        await Details.findOneAndUpdate(
            {
                user: req.user._id,
            },
            {
                creditsCompleted: totalCredits,
            },
            {
                upsert: true,
                new: true,
            }
        );

        return res.status(200).json({
            success: true,
            courses: userCourses.courses,
            totalCredits,
        });
    } catch (err) {
        console.error("Error updating courses:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to save courses",
        });
    }
}
async function handleSaveSemester(req, res) {
    try {
        const userId = req.user._id;

        const { semester, courses } = req.body;

        if (!semester || !Array.isArray(courses)) {
            return res.status(400).json({
                ok: false,
                message: "Invalid payload",
            });
        }

        const data =
            await SemesterDetail.findOneAndUpdate(
                {
                    userId,
                    semester,
                },
                {
                    userId,
                    semester,
                    courses,
                },
                {
                    upsert: true,
                    returnDocument: 'after',
                }
            );

        return res.status(200).json({
            ok: true,
            semester: data,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
        });
    }
}
async function handleGetSemester(req, res) {
    try {
        const userId = req.user._id;
        const semester = Number(req.params.semester);

        const data = await SemesterDetail.findOne({
            userId,
            semester,
        });

        return res.json({
            ok: true,
            semester: data,
        });
    } catch (err) {
        console.error(err);

        return res.status(500).json({
            ok: false,
        });
    }
}

async function updateUserRole(req, res) {
  const { role } = req.body;

  if (
    !["STUDENT", "ADVISER", "ADMIN"].includes(role)
  ) {
    return res.status(400).json({
      message: "Invalid role",
    });
  }

  if (req.params.id === req.user._id.toString()) {
    return res.status(400).json({
      message: "You cannot change your own role",
    });
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    {
      new: true,
      runValidators: true,
    }
  ).select("name email role");

  if (!updatedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(updatedUser);
};

export {
    handleLogIn, handleSignUp, clearUser, handelMe, updateProfile, handleCources, handleUpdateCources, handleGoogleAuth, handleSaveSemester, handleGetSemester,getUsers,updateUserRole
}