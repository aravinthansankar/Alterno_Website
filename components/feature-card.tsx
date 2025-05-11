import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group">
      <div className="mb-4 p-3 bg-slate-700/50 rounded-xl inline-block group-hover:bg-gradient-to-r group-hover:from-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  )
}
