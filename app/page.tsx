"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, Mic, Phone, Calendar } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import MobileAppSection from "@/components/mobile-app-section"
import OmnichannelSection from "@/components/omnichannel-section"
import PricingSection from "@/components/pricing-section"
import HeroAnimationWrapper from "@/components/hero-animation-wrapper"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400 leading-tight">
                  AI-Powered Voice Agents for Seamless Bookings
                </h1>
                <p className="mt-6 text-lg text-slate-300 max-w-xl">
                  Voiceflow handles calls and schedules appointments on behalf of your clients at salons, beauty shops,
                  and aesthetic clinics.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                {!user ? (
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                )}
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-slate-800 text-white font-medium border border-slate-700 hover:bg-slate-700 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="h-[400px] lg:h-[500px] w-full bg-slate-800/30 rounded-2xl overflow-hidden">
              <HeroAnimationWrapper />
            </div>
          </div>
        </div>

        {/* Background gradient orbs */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-20"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-20"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Revolutionize Your Booking Experience</h2>
            <p className="text-slate-300">
              Our AI voice agents handle calls and schedule appointments, freeing up your staff to focus on what matters
              most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Phone className="h-8 w-8 text-purple-400" />}
              title="Automated Calls"
              description="Our AI voice agents handle incoming calls with natural conversation, just like a human receptionist."
            />
            <FeatureCard
              icon={<Calendar className="h-8 w-8 text-cyan-400" />}
              title="Smart Scheduling"
              description="Seamlessly integrate with your existing calendar systems to book appointments without double-booking."
            />
            <FeatureCard
              icon={<Mic className="h-8 w-8 text-emerald-400" />}
              title="Natural Voice Interaction"
              description="Advanced voice technology that sounds natural and understands context and nuance."
            />
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <MobileAppSection />

      {/* Omnichannel Section */}
      <OmnichannelSection />

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Voiceflow Works</h2>
            <p className="text-slate-300">A simple three-step process to transform your booking experience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2">Connect Your Calendar</h3>
              <p className="text-slate-300">Integrate Voiceflow with your existing scheduling system in minutes.</p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2">Customize Your Agent</h3>
              <p className="text-slate-300">
                Tailor your AI voice agent's personality and responses to match your brand.
              </p>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-4 mt-2">Let AI Handle Bookings</h3>
              <p className="text-slate-300">Your voice agent takes calls and schedules appointments automatically.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Businesses</h2>
            <p className="text-slate-300">
              See how Voiceflow is transforming businesses across the beauty and wellness industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-purple-400">S</span>
                </div>
                <div>
                  <h4 className="font-bold">Serenity Spa</h4>
                  <p className="text-sm text-slate-400">Luxury Spa</p>
                </div>
              </div>
              <p className="text-slate-300 italic">
                "Voiceflow has reduced our missed appointments by 35% and freed up our front desk staff to provide
                better in-person service."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-cyan-400">G</span>
                </div>
                <div>
                  <h4 className="font-bold">Glow Beauty</h4>
                  <p className="text-sm text-slate-400">Aesthetic Clinic</p>
                </div>
              </div>
              <p className="text-slate-300 italic">
                "Our clients love how easy it is to book appointments any time of day. Voiceflow has increased our
                after-hours bookings by 50%."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mr-4">
                  <span className="text-xl font-bold text-emerald-400">C</span>
                </div>
                <div>
                  <h4 className="font-bold">Chic Salon</h4>
                  <p className="text-sm text-slate-400">Hair Salon</p>
                </div>
              </div>
              <p className="text-slate-300 italic">
                "We've reduced no-shows by 40% with Voiceflow's automated reminders and our stylists can focus on their
                clients instead of the phone."
              </p>
              <div className="mt-4 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-950 to-slate-900 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-8 md:p-12 rounded-3xl border border-slate-700 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Booking Experience?</h2>
                <p className="text-slate-300 mb-8">
                  Join the businesses that are saving time, reducing no-shows, and delighting customers with Voiceflow's
                  AI voice agents.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "No more missed calls or opportunities",
                    "24/7 booking availability",
                    "Seamless calendar integration",
                    "Natural-sounding AI voice agents",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-emerald-400 mr-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
              <div className="relative h-[300px] md:h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-2xl overflow-hidden flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <Mic className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full border-2 border-purple-500/30 animate-ping"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-60 h-60 rounded-full border-2 border-cyan-500/20 animate-ping"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background gradient orbs */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-10"></div>
      </section>

      <Footer />
    </div>
  )
}
