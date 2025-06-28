import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
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
              Welcome to Alterno.
            </p>

            <p className="text-slate-700 mb-8">
              This Privacy Policy explains how <strong>FrullaFru Pty Ltd</strong>, trading as <strong>Alterno</strong> ("we", "our", or "us") collects, uses, shares, and safeguards personal information through our website, SaaS platform, and related services. We are headquartered in <strong>Sydney, New South Wales, Australia</strong>, and are committed to protecting your privacy in compliance with the <strong>General Data Protection Regulation (GDPR)</strong>, <strong>California Consumer Privacy Act (CCPA)</strong>, and the <strong>Australian Privacy Act 1988 (Cth)</strong>.
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
                    <strong>Contact:</strong> <a href="mailto:support@alterno.com.au" className="text-amber-600 hover:text-amber-700 underline">support@alterno.com.au</a>
                  </p>
                </div>
              </div>
            </div>

            <hr className="my-8 border-slate-200" />

            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Who This Policy Applies To</h2>
            <p className="text-slate-700 mb-4">This policy applies to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Visitors of our website</li>
              <li>Clients using the Alterno platform</li>
              <li>Users interacting with Alterno via integrations (e.g., Facebook, Instagram, WhatsApp, Square)</li>
              <li>End users whose data is processed through our platform</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. What We Collect</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-3">A. Information You Provide</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-1">
              <li>Contact details (name, email, phone, business name)</li>
              <li>Account credentials</li>
              <li>Customer service communications</li>
              <li>Billing and payment data (via third-party processors)</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">B. Information Collected Automatically</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-1">
              <li>IP address, browser type, operating system</li>
              <li>Cookies and analytics data</li>
              <li>Log and device information</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">C. Information from Third Parties</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-1">
              <li>Messaging platform metadata (Meta platforms)</li>
              <li>Booking and POS data (via Square, etc.)</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Why We Collect Data</h2>
            <p className="text-slate-700 mb-4">We use your data to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Deliver and maintain our services</li>
              <li>Provide customer support</li>
              <li>Improve platform functionality</li>
              <li>Classify and respond to messages</li>
              <li>Detect and block spam</li>
              <li>Ensure security and legal compliance</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Legal Bases for Processing (GDPR)</h2>
            <p className="text-slate-700 mb-4">If you're located in the EEA or UK, we rely on:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li><strong>Contractual necessity</strong> (e.g., to deliver services)</li>
              <li><strong>Consent</strong> (e.g., for marketing communications)</li>
              <li><strong>Legitimate interests</strong> (e.g., fraud prevention, service improvement)</li>
              <li><strong>Legal obligation</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
            
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Under GDPR:</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-1">
              <li>Access, correct, delete, or restrict your data</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
              <li>File complaints with your local data protection authority</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Under CCPA:</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-6 space-y-1">
              <li>Know what personal data we collect</li>
              <li>Request deletion</li>
              <li>Opt-out of sale (we do <strong>not</strong> sell data)</li>
              <li>Non-discrimination for exercising rights</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Under Australian Privacy Act:</h3>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-1">
              <li>Request access and correction</li>
              <li>Complain to the <strong>Office of the Australian Information Commissioner (OAIC)</strong></li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Sharing of Data</h2>
            <p className="text-slate-700 mb-4">We may share your data with:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-1">
              <li>Hosting providers (e.g., Railway, AWS)</li>
              <li>Messaging platforms (e.g., Meta)</li>
              <li>POS systems (e.g., Square)</li>
              <li>Legal authorities when required</li>
            </ul>
            <p className="text-slate-700 mb-8">
              We do <strong>not</strong> sell your personal information.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. International Transfers</h2>
            <p className="text-slate-700 mb-4">We may transfer data internationally with safeguards such as:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Standard Contractual Clauses (SCCs)</li>
              <li>UK IDTA</li>
              <li>Hosting data in compliant regions (e.g., Railway, AWS)</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Retention</h2>
            <p className="text-slate-700 mb-4">We retain data:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>For the duration of your account</li>
              <li>As required by law</li>
              <li>For up to 12 months after account termination unless requested otherwise</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Security</h2>
            <ul className="list-disc pl-6 text-slate-700 mb-8 space-y-2">
              <li>Data encryption at rest and in transit</li>
              <li>Access controls</li>
              <li>Hosted securely on Railway infrastructure with autoscaling, backups, and failover</li>
              <li>Breach notification protocols (72 hours)</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">10. Cookies & Analytics</h2>
            <p className="text-slate-700 mb-4">We use cookies to:</p>
            <ul className="list-disc pl-6 text-slate-700 mb-4 space-y-2">
              <li>Improve platform experience</li>
              <li>Track analytics and usage patterns</li>
              <li>Display content tailored to your interests</li>
            </ul>
            <p className="text-slate-700 mb-8">
              You may opt out via browser settings or cookie banners.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">11. Children's Privacy</h2>
            <p className="text-slate-700 mb-8">
              Alterno is not intended for children under 13. We do not knowingly collect personal information from children.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">12. Changes to This Policy</h2>
            <p className="text-slate-700 mb-8">
              We may update this policy. If changes are significant, we will notify users via email or in-app alert.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">13. Contact Us</h2>
            <p className="text-slate-700 mb-4">For any inquiries:</p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 mb-8">
              <p className="text-slate-700 mb-2">
                <strong>FrullaFru Pty Ltd (trading as Alterno)</strong>
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Location:</strong> Sydney, NSW, Australia
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Website:</strong> <a href="https://www.alterno.com.au" className="text-amber-600 hover:text-amber-700 underline">www.alterno.com.au</a>
              </p>
              <p className="text-slate-700">
                <strong>Email:</strong> <a href="mailto:support@alterno.com.au" className="text-amber-600 hover:text-amber-700 underline">support@alterno.com.au</a>
              </p>
            </div>

            <hr className="my-8 border-slate-200" />

            <p className="text-slate-700 text-center">
              By using Alterno, you acknowledge and agree to this Privacy Policy. See our <a href="https://www.alterno.com.au/legal/dpa" className="text-amber-600 hover:text-amber-700 underline">Data Processing Addendum</a> for further details.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 