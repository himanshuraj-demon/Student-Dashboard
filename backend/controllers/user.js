import User from "../models/user.js"
import Details from "../models/userdetails.js";

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password
        });
        await Details.create({
            user: user._id,
        });
        return res.json({
            ok: true
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false
        })
    }

}

async function handleLogIn(req, res) {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndTokenGenerator(email, password);
        if (!token) return res.json({
            ok: false
        });
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

async function clearUser(req, res) {
    res.clearCookie("token");
    return res.json({
        ok: true,
    });
}

export {
    handleLogIn, handleSignUp, clearUser
}