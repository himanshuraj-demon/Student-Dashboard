import mongoose from "mongoose";
import { createHmac, randomBytes } from "crypto";
import { createToken } from "../services/auth.js";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength:30,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength:40,
    },
    salt: {
        type: String,
        select: false
    },
    password: {
        type: String,
        select: false,
        maxlength:50,
    },
    profileImageUrl: {
        type: String,
        default: "./images/default.jpg"
    },
    role: {
        type: String,
        enum: ["NORMAL", "ADMIN","ADVISER"],
        default: "NORMAL",
    }
}, { timestamps: true });


userSchema.pre("save", function () {
    const user = this;

  if (!user.isModified("password")|| !this.password ) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

});

userSchema.statics.matchPasswordAndTokenGenerator = async function (email, password) {
  const user = await this.findOne({ email }).select("+password +salt");
  if (!user) return false;
  if(!user.password) return false

  const providedHash = createHmac("sha256", user.salt)
    .update(password)
    .digest("hex");
    if(user.password!==providedHash) throw new Error("Incorrect Password!")
    const token=createToken(user);
    return token;
};


userSchema.virtual("details", {
  ref: "details",
  localField: "_id",
  foreignField: "user",
  justOne: true,
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

const User = new mongoose.model("user", userSchema);

export default User;