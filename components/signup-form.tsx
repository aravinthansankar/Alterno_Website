"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useSignUpMutation } from "@/lib/store/services/authApi"
import { useAppDispatch } from "@/lib/store/hooks"
import { setUser } from "@/lib/store/slices/authSlice"
import { sendEmailVerification } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [signUp, { isLoading }] = useSignUpMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const terms = formData.get("terms")

    if (!terms) {
      toast.error("Please accept the terms and conditions")
      return
    }

    try {
      const result = await signUp({ email, password, firstName, lastName }).unwrap()
      dispatch(setUser(result.user))
      
      // Send verification email
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser)
      }
      toast.success("Account created! Please check your email for verification.")
      router.push("/verify-email")
    } catch (error: any) {
      toast.error(error.error || "Failed to create account")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            required
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            required
            className="h-11"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            required
            minLength={8}
            className="h-11 pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        </div>
        <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" name="terms" required />
        <Label htmlFor="terms" className="text-sm leading-tight text-muted-foreground">
          I agree to the{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </Label>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-11 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
      >
        {isLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  )
}
