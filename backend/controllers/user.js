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
        ok: true,
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
          new: true,
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


export {
    handleLogIn, handleSignUp, clearUser,handelMe,updateProfile
}