import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import api from "../services/api";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth";
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export default function Signup() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showCPassword, setShowCPassword] = useState<boolean>(false);
  const { checkAuth } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onChange" });

  const delay = (s: number) =>
    new Promise((resolve) => setTimeout(resolve, s * 1000));

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "Weak Password";
    if (score <= 4) return "Medium Password";
    return "Strong Password";
  };

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post("/user/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      await delay(4);
      reset();
      toast.success(res.data.message);
      navigate("/login", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        setError("root", {
          message: "Something went wrong",
        });
      }
    }
  };
  const googleAuth = async (auth: CodeResponse) => {
    try {
      if (auth.code) {
        const result = await api.get(
          `/user/auth/google?code=${encodeURIComponent(auth.code)}`,
          { withCredentials: true },
        );

        console.log(result.data);

        if (result.data.ok) {
          await checkAuth();
          reset();
          toast.success("Sign Up Succesfull");
          toast.error("Please Update Profile first");
          navigate("/profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignup = useGoogleLogin({
    onSuccess: googleAuth,
    onError: (err) => console.log(err),
    flow: "auth-code",
  });

  const password = watch("password", "");
  return (
    <div className="signup-root">
      <div className="signup-left">
        <div className="signup-brand">
          <span className="signup-brand-dot" />
          StudyTracker
        </div>

        <div className="signup-form-wrap">
          <div className="signup-heading">
            <h1>
              Hi,{" "}
              <span className="signup-heading-accent">{"{{user.name}}"}</span>
            </h1>
            <p className="signup-subheading">Create your account</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="signup-form"
            noValidate>
            <div className="signup-field">
              <label className="signup-label">What's your username?</label>
              <input
                placeholder="e.g. grace_hopper"
                {...register("name", {
                  required: { value: true, message: "Username Required" },
                })}
                type="text"
                className="signup-input"
              />
              {errors.name && (
                <span className="signup-error">
                  {String(errors.name.message)}
                </span>
              )}
            </div>

            <div className="signup-field">
              <label className="signup-label">What's your email?</label>
              <input
                placeholder="you@iitgn.ac.in"
                {...register("email", {
                  required: { value: true, message: "Email Required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@iitgn\.ac\.in$/,
                    message: "Only @iitgn.ac.in email allowed",
                  },
                })}
                type="email"
                className="signup-input"
              />
              {errors.email && (
                <span className="signup-error">
                  {String(errors.email.message)}
                </span>
              )}
            </div>

            <div className="signup-field">
              <label className="signup-label">Create a password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: { value: true, message: "Password Required" },
                    minLength: { value: 8, message: "Min length is 8" },
                  })}
                  placeholder="Min. 8 characters"
                  type={showPassword ? "text" : "password"}
                  className="signup-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                  {showPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <IoEyeOutline size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="signup-error">
                  {String(errors.password.message)}
                </span>
              )}
              {password && (
                <div className="signup-strength-wrap">
                  <span
                    className={`signup-strength-badge ${
                      getPasswordStrength(password) === "Weak Password"
                        ? "signup-strength-weak"
                        : getPasswordStrength(password) === "Medium Password"
                          ? "signup-strength-medium"
                          : "signup-strength-strong"
                    }`}>
                    {getPasswordStrength(password)}
                  </span>
                </div>
              )}
            </div>

            <div className="signup-field">
              <label className="signup-label">Confirm your password</label>
              <div className="relative">
                <input
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                    validate: (value: string) =>
                      value === password || "Passwords do not match",
                  })}
                  placeholder="Re-enter password"
                  type={showCPassword ? "text" : "password"}
                  className="signup-input"
                />
                <button
                  type="button"
                  onClick={() => setShowCPassword(!showCPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                  {showCPassword ? (
                    <IoEyeOffOutline size={18} />
                  ) : (
                    <IoEyeOutline size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="signup-error">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {errors.root && (
              <span className="signup-error signup-root-error">
                {errors.root.message}
              </span>
            )}

            <button
              disabled={isSubmitting}
              type="submit"
              className="signup-submit">
              {isSubmitting ? "Creating account…" : "Continue"}
            </button>

            <p className="signup-login-link">
              Already have an account?{" "}
              <Link to="/login" className="signup-link">
                Log in
              </Link>
            </p>
          </form>
          <div className="signup-divider">
            <span className="signup-divider-line" />
            <span className="signup-divider-text">or</span>
            <span className="signup-divider-line" />
          </div>

          <button
            type="button"
            className="google-login-btn"
            onClick={handleGoogleSignup}>
            <FcGoogle size={20} />
            <span>Sign up with Google</span>
          </button>
        </div>
      </div>
      <div className="signup-right">
        <img
          src="./images/signupbg.avif"
          alt="Abstract study visual"
          className="signup-hero-img"
        />
        <div className="signup-right-overlay">
          <p className="signup-trusted-label">Made by</p>
          <div className="signup-trusted-logos">
            <span>Himanshu Raj</span>
            <span>IIT Gandhinagar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
