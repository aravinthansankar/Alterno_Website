"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import Link from "next/link"

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="flex justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
            Forgot password?
          </Link>
        </div>
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
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white"
      >
        Log In
      </Button>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-slate-700 w-full"></div>
        <span className="bg-slate-800/50 px-2 text-sm text-slate-400 relative z-10">or continue with</span>
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
