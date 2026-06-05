import JWT from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const key = process.env.JWT_SECRET;

function createToken(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        userImg: user.profileImageUrl,
    };
    const TOKEN = JWT.sign(payload, key, {
        expiresIn: "7d",
    });
    return TOKEN;
}

function validateToken(token) {
    try {
        return JWT.verify(token, key);
    } catch (err) {
        return null;
    }
}

export {
    createToken,
    validateToken,
}