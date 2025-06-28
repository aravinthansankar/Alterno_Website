"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, MessageSquare, Phone, Calendar, ShoppingBag, Instagram, MessageCircle, Facebook, Mail, Building2, User, Phone as PhoneIcon, Square as SquareIcon } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatbotWidget from "@/components/chatbot-widget"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

export default function Home() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-amber-50 text-amber-600 rounded-lg font-medium mb-8">
              Pre-Launch Special Offer
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8 leading-tight">
              Transform Your Business with <span className="text-amber-600">AI-Powered</span> Customer Service
                </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto">
              Automate bookings, orders, and customer support with intelligent AI agents that work 24/7 across all your channels.
                </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-amber-600 text-white font-semibold text-lg hover:bg-amber-700 transition-all duration-200"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                href="#pricing"
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-white text-slate-900 font-semibold text-lg border border-slate-200 hover:border-amber-600 hover:text-amber-600 transition-all duration-200"
              >
                View Pricing
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" id="features">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Everything You Need to Automate Customer Service</h2>
            <p className="text-lg text-slate-600">
              Powerful features designed to help your business grow and provide excellent customer service around the clock.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <MessageSquare className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">AI Chat Support</h3>
              <p className="text-slate-600">Handle customer inquiries, bookings, and orders automatically through chat.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <Phone className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Voice Assistant</h3>
              <p className="text-slate-600">AI-powered voice calls for seamless phone support and bookings.</p>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-100">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Smart Scheduling</h3>
              <p className="text-slate-600">Automated appointment booking and calendar management system.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 bg-white" id="integrations">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-left">Works With Your Existing Tools</h2>
            <p className="text-slate-500 text-lg mb-8 text-left">Integrate seamlessly with the platforms and tools your business already relies on.</p>
            <div className="grid md:grid-cols-2 gap-12">
              {/* Supported Platforms */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Supported Platforms</h3>
                <ul className="space-y-4 divide-y divide-slate-100">
                  <li className="flex items-center gap-4 pt-0">
                    <MessageCircle className="h-6 w-6 text-slate-400" />
                    <span className="text-base text-slate-800">WhatsApp Business</span>
                  </li>
                  <li className="flex items-center gap-4 pt-4">
                    <Facebook className="h-6 w-6 text-slate-400" />
                    <span className="text-base text-slate-800">Facebook Messenger</span>
                  </li>
                  <li className="flex items-center gap-4 pt-4">
                    <Instagram className="h-6 w-6 text-slate-400" />
                    <span className="text-base text-slate-800">Instagram Direct</span>
                  </li>
                  <li className="flex items-center gap-4 pt-4">
                    <Phone className="h-6 w-6 text-slate-400" />
                    <span className="text-base text-slate-800">Voice Calls</span>
                  </li>
                </ul>
              </div>
              {/* Business Tools */}
              <div>
                <h3 className="text-lg font-semibold text-slate-700 mb-4">Business Tools</h3>
                <ul className="space-y-4 divide-y divide-slate-100">
                  <li className="flex items-center gap-4 pt-0">
                    <SquareIcon className="h-6 w-6 text-slate-400" />
                    <span className="text-base text-slate-800">Square</span>
                  </li>
                  <li className="flex items-center gap-4 pt-4">
                    <Calendar className="h-6 w-6 text-slate-400" />
                    <span className="text-base text-slate-800">Google Calendar</span>
                  </li>
                  <li className="flex items-center gap-4 pt-4">
                    <Calendar className="h-6 w-6 text-slate-400" />
                    <span className="text-base text-slate-800">Outlook Calendar</span>
                  </li>
                  <li className="flex items-center gap-4 pt-4">
                    <CheckCircle className="h-6 w-6 text-slate-400" />
                    <span className="text-base text-slate-800">Custom API Integration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white" id="pricing">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-slate-600">
              Choose the plan that works best for your business
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-bold mb-4">Monthly</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$75</span>
                <span className="text-slate-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>All Features Included</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Unlimited Messages</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <Link
                href="#contact"
                className="block text-center px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-bold mb-4">6 Months</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$65</span>
                <span className="text-slate-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>All Features Included</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Unlimited Messages</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <Link
                href="#contact"
                className="block text-center px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
            <div className="bg-slate-50 p-8 rounded-lg border border-slate-200">
              <h3 className="text-xl font-bold mb-4">Yearly</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$60</span>
                <span className="text-slate-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>All Features Included</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Unlimited Messages</span>
                </li>
                <li className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Priority Support</span>
                </li>
              </ul>
              <Link
                href="#contact"
                className="block text-center px-6 py-3 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-slate-50" id="contact">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Get Started Today</h2>
            <p className="text-lg text-slate-600">
              Fill out the form below and we'll get in touch to help you transform your business.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10 border border-slate-100">
              <div className="flex flex-col items-center mb-8">
                <User className="h-10 w-10 text-amber-500 mb-2" />
                <span className="text-xl font-semibold text-slate-800">Contact Sales</span>
              </div>
              <form className="space-y-7">
                <div>
                  <label htmlFor="name" className="block text-base font-medium text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full px-4 py-4 border border-slate-200 rounded-xl bg-white text-slate-900 text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    placeholder="John Smith"
                    required
                  />
                  </div>
                <div>
                  <label htmlFor="company" className="block text-base font-medium text-slate-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="block w-full px-4 py-4 border border-slate-200 rounded-xl bg-white text-slate-900 text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    placeholder="Your Company"
                    required
                  />
                  </div>
                <div>
                  <label htmlFor="email" className="block text-base font-medium text-slate-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="block w-full px-4 py-4 border border-slate-200 rounded-xl bg-white text-slate-900 text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    placeholder="you@company.com"
                    required
                  />
                  </div>
                <div>
                  <label htmlFor="phone" className="block text-base font-medium text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="block w-full px-4 py-4 border border-slate-200 rounded-xl bg-white text-slate-900 text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-base font-medium text-slate-700 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full px-4 py-4 border border-slate-200 rounded-xl bg-white text-slate-900 text-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    placeholder="Tell us about your business and how we can help..."
                    required
                  ></textarea>
              </div>
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold rounded-xl text-lg shadow-md hover:from-amber-600 hover:to-amber-700 transition-all duration-200"
                >
                  Submit Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatbotWidget />
    </div>
  )
}
