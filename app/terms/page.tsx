import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
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
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Terms of Service</h1>
            <p className="text-lg text-slate-600">
              Last Updated: December 2024
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8">
            <p className="text-lg text-slate-700 mb-8">
              Welcome to Alterno. These Terms of Service ("<strong>Terms</strong>") govern your access to and use of our software platform, website, and related services (collectively, the "<strong>Service</strong>"), operated by <strong>FrullaFru Pty Ltd</strong>, trading as <strong>Alterno</strong>, a company registered in Australia with headquarters in <strong>Sydney, New South Wales</strong> ("<strong>Alterno</strong>," "we," "our," or "us").
            </p>

            <p className="text-slate-700 mb-8">
              By accessing or using the Service, you agree to these Terms. If you do not agree, do not use the Service.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Contact Information</h3>
                  <p className="text-slate-700 mb-2">
                    <strong>Website:</strong> <a href="https://www.alterno.com.au" className="text-amber-600 hover:text-amber-700 underline">www.alterno.com.au</a>
                  </p>
                  <p className="text-slate-700">
                    <strong>Support:</strong> <a href="mailto:support@alterno.com.au" className="text-amber-600 hover:text-amber-700 underline">support@alterno.com.au</a>
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-200" />

            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Eligibility</h2>
            <p className="text-slate-700 mb-8">
              To use the Service, you must be at least 18 years old or have legal authority to bind an entity. By using the Service, you represent and warrant that you meet this eligibility requirement.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Account Registration</h2>
            <p className="text-slate-700 mb-4">You may need to register an account to access parts of the Service. You agree to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Keep your login credentials confidential</li>
              <li>Notify us immediately of unauthorized use</li>
            </ul>
            <p className="text-slate-700 mb-8">
              You are responsible for all activity that occurs under your account.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Acceptable Use</h2>
            <p className="text-slate-700 mb-4">You may not use the Service to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Violate laws or regulations</li>
              <li>Transmit spam or malicious content</li>
              <li>Interfere with or disrupt the Service or networks</li>
              <li>Misuse any API or automation capability</li>
            </ul>
            <p className="text-slate-700 mb-8">
              We reserve the right to suspend or terminate access for violations.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Subscriptions & Payments</h2>
            <p className="text-slate-700 mb-4">Some features may require a paid subscription. By subscribing, you agree to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Pay all applicable fees</li>
              <li>Authorize billing via your chosen payment method</li>
              <li>Be responsible for taxes unless stated otherwise</li>
            </ul>
            <p className="text-slate-700 mb-8">
              Fees are non-refundable unless required by law.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Trial and Beta Features</h2>
            <p className="text-slate-700 mb-4">We may offer experimental or beta services ("Beta Services") which:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Are provided "as-is"</li>
              <li>May change or be discontinued at any time</li>
              <li>May contain bugs or incomplete features</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. APIs and Integrations</h2>
            <p className="text-slate-700 mb-4">Alterno provides APIs and third-party integrations (e.g., Meta, Square). By using these, you agree to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Follow provided documentation and rate limits</li>
              <li>Comply with third-party platform terms</li>
              <li>Not abuse or misuse the API or data access</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Privacy and Data</h2>
            <p className="text-slate-700 mb-4">
              Our handling of personal data is governed by our <a href="/privacy" className="text-amber-600 hover:text-amber-700 underline">Privacy Policy</a> and <a href="https://www.alterno.com.au/legal/dpa" className="text-amber-600 hover:text-amber-700 underline">Data Processing Addendum</a>.
            </p>
            <p className="text-slate-700 mb-4">We:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Do not sell user data</li>
              <li>May use Sub-Processors (see <a href="https://www.alterno.com.au/legal/subprocessors" className="text-amber-600 hover:text-amber-700 underline">Sub-Processor List</a>)</li>
              <li>Host services on third-party platforms like <strong>Railway</strong> and <strong>AWS</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Intellectual Property</h2>
            <p className="text-slate-700 mb-4">We retain all rights in the Service, including software, design, content, and branding. You may not:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Copy, modify, or distribute our content</li>
              <li>Use our branding without written permission</li>
            </ul>
            <p className="text-slate-700 mb-8">
              You retain rights to any content or data you submit via the platform.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Termination</h2>
            <p className="text-slate-700 mb-4">You may terminate your account at any time. We may suspend or terminate your access if:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>You breach these Terms</li>
              <li>We suspect misuse or unlawful activity</li>
              <li>Required by legal authorities</li>
            </ul>
            <p className="text-slate-700 mb-8">
              Upon termination, access to your data and services will end. Some data may be retained as required by law.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Disclaimers</h2>
            <p className="text-slate-700 mb-4">The Service is provided "as-is" and "as-available." We do not guarantee:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Error-free operation</li>
              <li>100% uptime</li>
              <li>That automation outcomes will be accurate or complete</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Limitation of Liability</h2>
            <p className="text-slate-700 mb-4">To the maximum extent allowed by law:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>Our total liability is limited to the fees paid by you in the past 12 months</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Indemnity</h2>
            <p className="text-slate-700 mb-4">You agree to indemnify and hold harmless FrullaFru Pty Ltd, its affiliates, and personnel from any claims arising from:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your infringement of any rights or laws</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Governing Law</h2>
            <p className="text-slate-700 mb-8">
              These Terms are governed by the laws of <strong>New South Wales, Australia</strong>. Disputes will be resolved in the courts of <strong>Sydney, NSW</strong>.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">14. Changes to Terms</h2>
            <p className="text-slate-700 mb-8">
              We may update these Terms from time to time. Material updates will be communicated via email or platform notifications. Continued use of the Service constitutes acceptance of updated Terms.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">15. Contact Us</h2>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <p className="text-slate-700 mb-2">
                <strong>FrullaFru Pty Ltd (trading as Alterno)</strong>
              </p>
              <p className="text-slate-700 mb-2">Sydney, NSW, Australia</p>
              <p className="text-slate-700">
                📧 <a href="mailto:support@alterno.com.au" className="text-amber-600 hover:text-amber-700 underline">support@alterno.com.au</a>
              </p>
            </div>

            <hr className="my-8 border-slate-200" />

            <p className="text-slate-700 text-center font-medium">
              By using Alterno, you agree to these Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 