import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import SignupForm from "@/components/signup-form"
import SignupAnimationWrapper from "@/components/signup-animation-wrapper"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] lg:h-[500px] w-full bg-slate-800/30 rounded-2xl overflow-hidden">
            <SignupAnimationWrapper />
          </div>
          <div>
            <SignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}
