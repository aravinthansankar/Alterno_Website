'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const LoginAnimation = dynamic(() => import("@/components/login-animation"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-800/30 rounded-2xl">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
})

export default function LoginAnimationWrapper() {
  return (
    <Suspense fallback={
      <div className="w-full h-full flex items-center justify-center bg-slate-800/30 rounded-2xl">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <LoginAnimation />
    </Suspense>
  )
}