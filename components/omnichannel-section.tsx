import { Phone, MessageCircle, Instagram, MessageSquare, Facebook, Globe } from "lucide-react"

export default function OmnichannelSection() {
  return (
    <section id="omnichannel" className="py-20 bg-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Omnichannel Booking Features</h2>
          <p className="text-slate-300">
            Give your clients the flexibility to book appointments through their preferred communication channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-center">Available Now</h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-500/30">
                <div className="p-3 bg-purple-500/20 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Phone Calls</h4>
                  <p className="text-slate-300">AI voice agent handles booking calls 24/7</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-indigo-500/20 to-violet-500/20 rounded-xl border border-indigo-500/30">
                <div className="p-3 bg-indigo-500/20 rounded-full mr-4">
                  <Globe className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Multilingual Support</h4>
                  <p className="text-slate-300">Our AI supports English, Chinese, Japanese, Italian, and French</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="inline-block text-xs font-medium px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full">
                      English
                    </span>
                    <span className="inline-block text-xs font-medium px-2 py-1 bg-red-500/20 text-red-300 rounded-full">
                      Chinese
                    </span>
                    <span className="inline-block text-xs font-medium px-2 py-1 bg-pink-500/20 text-pink-300 rounded-full">
                      Japanese
                    </span>
                    <span className="inline-block text-xs font-medium px-2 py-1 bg-green-500/20 text-green-300 rounded-full">
                      Italian
                    </span>
                    <span className="inline-block text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                      French
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-xl border border-violet-500/30">
                <div className="p-3 bg-violet-500/20 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-violet-400"
                  >
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                    <line x1="12" x2="12" y1="19" y2="22"></line>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Customizable Voice</h4>
                  <p className="text-slate-300">Choose between male or female voices for each language</p>
                  <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                    Personalize your brand voice
                  </span>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                <div className="p-3 bg-cyan-500/20 rounded-full mr-4">
                  <MessageSquare className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Booking Confirmations</h4>
                  <p className="text-slate-300">Automated text message confirmations sent before appointments</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                <div className="p-3 bg-blue-500/20 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Follow-up Calls</h4>
                  <p className="text-slate-300">Automated calls to clients who don't respond to text confirmations</p>
                  <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                    Customizable in settings
                  </span>
                </div>
              </div>

              <div className="flex items-center p-4 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl border border-emerald-500/30">
                <div className="p-3 bg-emerald-500/20 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-emerald-400"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                    <path d="M16 16h5v5"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold">Booking Management</h4>
                  <p className="text-slate-300">Update or cancel existing appointments via phone or text</p>
                  <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full">
                    24/7 availability
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 backdrop-blur-sm">
            <div className="relative">
              <h3 className="text-2xl font-bold mb-6 text-center">Roadmap</h3>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                COMING SOON
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-full"></div>
                <div className="ml-6 relative">
                  <div className="absolute -left-6 top-3 w-6 h-6 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="flex items-center p-4 bg-slate-700/30 rounded-xl">
                    <div className="p-3 bg-green-500/20 rounded-full mr-4">
                      <MessageCircle className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">WhatsApp</h4>
                      <p className="text-slate-300">Book appointments via WhatsApp messaging</p>
                      <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
                        Q3 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"></div>
                <div className="ml-6 relative">
                  <div className="absolute -left-6 top-3 w-6 h-6 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                  </div>
                  <div className="flex items-center p-4 bg-slate-700/30 rounded-xl">
                    <div className="p-3 bg-pink-500/20 rounded-full mr-4">
                      <Instagram className="h-6 w-6 text-pink-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Instagram DMs</h4>
                      <p className="text-slate-300">Book directly through Instagram messages</p>
                      <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-pink-500/20 text-pink-400 rounded-full">
                        Q4 2025
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                <div className="ml-6 relative">
                  <div className="absolute -left-6 top-3 w-6 h-6 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  </div>
                  <div className="flex items-center p-4 bg-slate-700/30 rounded-xl">
                    <div className="p-3 bg-blue-500/20 rounded-full mr-4">
                      <Facebook className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Facebook Messenger</h4>
                      <p className="text-slate-300">Book through Facebook Messenger</p>
                      <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                        Q1 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                <div className="ml-6 relative">
                  <div className="absolute -left-6 top-3 w-6 h-6 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  </div>
                  <div className="flex items-center p-4 bg-slate-700/30 rounded-xl">
                    <div className="p-3 bg-blue-500/20 rounded-full mr-4">
                      <MessageSquare className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">SMS Chat</h4>
                      <p className="text-slate-300">Book appointments via text message</p>
                      <span className="inline-block mt-1 text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                        Q2 2026
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-slate-300">
            Our omnichannel approach ensures your business never misses a booking opportunity, regardless of how your
            clients prefer to communicate.
          </p>
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-10"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-10"></div>
    </section>
  )
}
