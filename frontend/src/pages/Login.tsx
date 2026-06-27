import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin, type CodeResponse } from "@react-oauth/google";

interface FormData {
  email: string;
  password: string;
}
interface LoginResponse {
  ok: boolean;
  message: string;
  user: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { checkAuth} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ mode: "onChange" });

  const googleAuth = async (auth: CodeResponse) => {
    try {
      if (auth.code) {
        const result = await api.get(
          `/user/auth/google?code=${encodeURIComponent(auth.code)}`,
          { withCredentials: true },
        );

        if (result.data.ok) {
          await checkAuth()
          toast.success("Login Succesfull");
          toast.error("Please Update Profile first (new User Only)");
          navigate("/profile", { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: googleAuth,
    onError: (err) => console.log(err),
    flow: "auth-code",
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await api.post<LoginResponse>(
        "/user/login",
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      );
      await checkAuth();
      reset();
      toast.success(res.data.message);
      toast.error("Please Update Profile first (new User Only)");
      navigate("/profile", { replace: true });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError("root", {
          message: error.response?.data?.message || error.message,
        });
        console.log("error");
      } else {
        setError("root", {
          message: "Something went wrong",
        });
      }
    }
  };

  return (
    <div className="signup-root">
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
      <div className="signup-left">
        <div className="signup-brand">
          <span className="signup-brand-dot" />
          StudyTracker
        </div>

        <div className="signup-form-wrap">
          <div className="signup-heading">
            <h1>
              Welcome,{" "}
              <span className="signup-heading-accent">{"{{user.name}}"}</span>
            </h1>
            <p className="signup-subheading">LogIn to explore</p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="signup-form"
            noValidate>
            <div className="signup-field">
              <label className="signup-label">Enter your Email</label>
              <input
                placeholder="you@iitgn.ac.in"
                {...register("email", {
                  required: { value: true, message: "Email Required" },
                  maxLength: { value: 40, message: "Max length is 40" },
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
              <label className="signup-label">Enter your password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: { value: true, message: "Password Required" },
                    minLength: { value: 8, message: "Min length is 8" },
                    maxLength: { value: 50, message: "Max length is 50" },
                  })}
                  placeholder="Min. 8 characters"
                  type={showPassword ? "text" : "password"}
                  className="signup-input"
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
              {isSubmitting ? "Login..." : "Continue"}
            </button>

            <p className="signup-login-link">
              Do not have Account?{" "}
              <Link to="/signup" className="signup-link">
                Sign Up
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
            onClick={handleGoogleLogin}>
            <FcGoogle size={20} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
