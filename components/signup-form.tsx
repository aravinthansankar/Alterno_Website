"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            placeholder="John"
            required
            className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Doe"
            required
            className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          required
          className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            required
            className="bg-slate-800/50 border-slate-700 focus:border-purple-500 text-white pr-10"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
          </button>
        </div>
        <p className="text-xs text-slate-400">Password must be at least 8 characters long</p>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="text-sm leading-tight">
          I agree to the{" "}
          <a href="/terms" className="text-purple-400 hover:text-purple-300">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-purple-400 hover:text-purple-300">
            Privacy Policy
          </a>
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
      >
        Create Account
      </Button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-700 w-full"></div>
        <span className="bg-slate-800/50 px-2 text-sm text-slate-400 relative z-10">or sign up with</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button type="button" variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
          Google
        </Button>
        <Button type="button" variant="outline" className="border-slate-700 text-white hover:bg-slate-700">
          Apple
        </Button>
      </div>
    </form>
  )
}
