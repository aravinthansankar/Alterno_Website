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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-slate-900">
                Alterno
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </Link>
            <Link href="#integrations" className="text-slate-600 hover:text-slate-900 transition-colors">
              Integrations
            </Link>
            <Link href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
              Pricing
            </Link>
            {!user ? (
              <>
                <Link href="/login" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-200"
                >
                  Join Early Bird List
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-200"
              >
                Dashboard
              </Link>
            )}
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-slate-900">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="#features"
              className="block text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#integrations"
              className="block text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Integrations
            </Link>
            <Link
              href="#pricing"
              className="block text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            {!user ? (
              <>
                <Link
                  href="/login"
                  className="block text-slate-600 hover:text-slate-900 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="block px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-200 w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Early Bird List
                </Link>
              </>
            ) : (
              <Link
                href="/dashboard"
                className="block px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-all duration-200 w-full text-center"
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
