"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { auth } from "@/lib/firebase";
import { sendEmailVerification, reload } from "firebase/auth";
import { setEmailVerified } from "@/lib/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function VerifyEmail() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isEmailVerified } = useAppSelector((state) => state.auth);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (isEmailVerified) {
      router.push("/dashboard");
      return;
    }

    const checkVerification = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await reload(currentUser);
        if (currentUser.emailVerified) {
          dispatch(setEmailVerified(true));
          toast.success("Email verified successfully!");
          router.push("/dashboard");
        }
      }
    };

    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [user, isEmailVerified, router, dispatch]);

  const handleResendVerification = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser || resendDisabled) return;

    try {
      await sendEmailVerification(currentUser);
      setResendDisabled(true);
      toast.success("Verification email sent!");

      // Start countdown
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification email");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full space-y-8 p-8 bg-slate-800 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
          <p className="text-slate-400 mb-4">
            We sent a verification email to:
            <br />
            <span className="font-medium text-purple-400">{user.email}</span>
          </p>
          <p className="text-sm text-slate-400 mb-6">
            Please check your email and click the verification link to continue.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleResendVerification}
            disabled={resendDisabled}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
          >
            {resendDisabled
              ? `Resend email in ${countdown}s`
              : "Resend verification email"}
          </Button>

          <p className="text-sm text-slate-400 text-center">
            Didn&apos;t receive the email? Check your spam folder or try resending.
          </p>
        </div>
      </div>
    </div>
  );
} 