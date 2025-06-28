import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-amber-50 to-white border-b border-amber-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/" 
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 hover:border-amber-300 transition-colors duration-200 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">About Us</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <p className="text-lg text-slate-700 mb-8">
              <strong>Alterno</strong> is a cutting-edge automation platform designed to help businesses elevate their customer engagement across leading social messaging channels — including <strong>Facebook Messenger</strong>, <strong>Instagram Direct</strong>, and <strong>WhatsApp Business</strong>.
            </p>
            <p className="text-slate-700 mb-8">
              Our platform intelligently interprets customer messages using AI-driven intent detection, filters out spam and irrelevant noise, and automates key workflows such as appointment bookings, order support, and general inquiries. All of this happens seamlessly within your existing communication tools, ensuring your team stays responsive and efficient without disrupting their current processes.
            </p>
            <p className="text-slate-700 mb-8">
              In addition to messaging automation, Alterno integrates with popular point-of-sale systems, currently supporting <strong>Square POS</strong>, with plans to expand to multiple POS providers. This enables a smoother connection between customer conversations and commerce workflows.
            </p>
            <p className="text-slate-700 mb-8">
              We are committed to continuously evolving our platform to meet the growing needs of modern businesses by expanding channel support and enhancing automation capabilities.
            </p>
            <hr className="my-8 border-slate-200" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Roadmap</h2>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-4">
              <li>
                <strong>Multi-POS System Support</strong><br />
                Expand integrations beyond Square POS to include a variety of retail and hospitality point-of-sale solutions, enabling scalable commerce automation.
              </li>
              <li>
                <strong>New Messaging Channels</strong><br />
                Upcoming support for <strong>TikTok Messaging</strong> and <strong>WeChat Official Accounts</strong>, opening new avenues for customer engagement in emerging markets.
              </li>
              <li>
                <strong>Multilingual Chatbot Flows</strong><br />
                Enhance conversational AI to support multiple languages for truly global customer communication.
              </li>
              <li>
                <strong>AI-Powered Auto-Tagging & Analytics</strong><br />
                Introduce intelligent conversation categorization and advanced analytics dashboards to provide deeper insights into customer interactions and business performance.
              </li>
              <li>
                <strong>Third-Party Integrations</strong><br />
                Build connections with CRMs, marketing tools, and scheduling systems to create a unified workflow ecosystem.
              </li>
            </ul>
            <hr className="my-8 border-slate-200" />
            <p className="text-slate-700 text-center font-medium">
              At Alterno, we believe in empowering businesses to maintain clear, actionable, and always-on customer conversations — effortlessly and at scale.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 