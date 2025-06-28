import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Business meeting"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-xl opacity-90 max-w-md">
              Streamline your business communications with AI-powered voice agents and seamless integrations.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">Sign in to your account</h2>
            <p className="text-muted-foreground mt-2">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-card border rounded-lg p-6 shadow-sm">
            <LoginForm />
          </div>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
