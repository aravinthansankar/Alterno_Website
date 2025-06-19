"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Voiceflow
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#omnichannel" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link href="#pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            {!user ? (
              <>
                <Link href="/login" className="text-slate-300 hover:text-white transition-colors">
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="#omnichannel"
              className="block text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="block text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="block text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="block text-slate-300 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="block px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 w-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
