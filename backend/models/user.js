import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImageUrl: {
        type: String,
        default: "/images/defualimage.jpg"
    },
    role: {
        type: String,
        enum: ["NORMAL", "ADMIN"],
        default: "NORMAL",
    }
}, { timestamps: true });


userSchema.pre("save", function (next) {
    const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;
  next();

});

userSchema.statics.matchPasswordAndTokenGenerator = async function (email, password) {
  const user = await this.findOne({ email }).select("+password +salt");
  if (!user) return false;

  const providedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");
    if(user.password!==providedHash) throw new Error("Incorrect Password!")
    const token=createToken(user);
    return token;
};


const User = new mongoose.model("user", userSchema);

export default User;