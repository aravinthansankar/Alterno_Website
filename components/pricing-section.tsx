import { Button } from "@/components/ui/button"

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
          <p className="text-slate-300">
            Choose the plan that works best for your business needs with no hidden fees or long-term commitments.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Background decorative elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-3xl transform rotate-1"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-3xl transform -rotate-1"></div>

          {/* Pricing cards container */}
          <div className="relative grid md:grid-cols-3 gap-0 overflow-hidden rounded-2xl">
            {/* 10 Hours Package */}
            <div className="bg-slate-800/70 p-8 border-r border-slate-700/50 transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="relative h-full flex flex-col">
                <div className="mb-8">
                  <div className="text-lg text-slate-300 mb-2">Basic</div>
                  <h3 className="text-2xl font-bold mb-2">10 Hours</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold">$152</span>
                    <span className="text-xl font-bold">.50</span>
                    <span className="text-slate-300 ml-1">AUD</span>
                  </div>
                  <p className="text-sm inline-block px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full">
                    $0.127/min (15% savings)
                  </p>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">600 minutes of call time</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Valid for 3 months</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Mobile app access</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Basic analytics</span>
                  </div>
                </div>

                <Button className="w-full bg-slate-700 hover:bg-slate-600 hover:text-white">Select Package</Button>
              </div>
            </div>

            {/* 20 Hours Package */}
            <div className="bg-gradient-to-b from-slate-800/90 to-slate-800/70 p-8 relative transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-purple-500/20 border-t-4 border-cyan-500">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <div className="relative h-full flex flex-col">
                <div className="mb-8">
                  <div className="text-lg text-cyan-300 mb-2">Standard</div>
                  <h3 className="text-2xl font-bold mb-2">20 Hours</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold">$242</span>
                    <span className="text-xl font-bold">.50</span>
                    <span className="text-slate-300 ml-1">AUD</span>
                  </div>
                  <p className="text-sm inline-block px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full">
                    $0.101/min (32% savings)
                  </p>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">1,200 minutes of call time</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Valid for 6 months</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Mobile app access</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Advanced analytics</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Priority support</span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                  Select Package
                </Button>
              </div>
            </div>

            {/* 30 Hours Package */}
            <div className="bg-slate-800/70 p-8 border-l border-slate-700/50 transform transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-xl hover:shadow-emerald-500/10">
              <div className="relative h-full flex flex-col">
                <div className="mb-8">
                  <div className="text-lg text-slate-300 mb-2">Premium</div>
                  <h3 className="text-2xl font-bold mb-2">30 Hours</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold">$335</span>
                    <span className="text-xl font-bold">.00</span>
                    <span className="text-slate-300 ml-1">AUD</span>
                  </div>
                  <p className="text-sm inline-block px-3 py-1 bg-emerald-500/10 text-emerald-300 rounded-full">
                    $0.093/min (38% savings)
                  </p>
                </div>

                <div className="space-y-4 mb-8 flex-grow">
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">1,800 minutes of call time</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Valid for 12 months</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Mobile app access</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Premium analytics</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">24/7 priority support</span>
                  </div>
                  <div className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <span className="ml-3 text-slate-300">Custom voice agent</span>
                  </div>
                </div>

                <Button className="w-full bg-slate-700 hover:bg-slate-600 hover:text-white">Select Package</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
            <span className="text-purple-300">Need a custom plan for your enterprise?</span>
            <a href="#contact" className="ml-2 text-cyan-400 hover:text-cyan-300 font-medium">
              Contact us
            </a>
          </div>
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-10"></div>
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-10"></div>
    </section>
  )
}
