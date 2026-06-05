import User from "../models/user.js"

async function handleSignUp(req, res) {
    const { name, email, password } = req.body;
    try {

        await User.create({
            name,
            email,
            password
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

async function clearUser(req,res) {
    res.clearCookie("token");

  return res.json({
    ok: true,
  });
}

export {
    handleLogIn, handleSignUp,clearUser
}