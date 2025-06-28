import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-slate-900">
                Alterno
              </span>
            </Link>
            <p className="text-slate-600 mb-4">
              AI-powered automation for modern businesses. Handle bookings, orders, and sales with chat & voice agents.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Early Bird Access
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-600 hover:text-slate-900 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-600">&copy; {new Date().getFullYear()} Alterno. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
