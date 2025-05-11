import Image from "next/image"
import { Calendar, Clock, MessageSquare, BarChart } from "lucide-react"

export default function MobileAppSection() {
  return (
    <section className="py-20 bg-slate-950 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Mobile App for Business Owners</h2>
          <p className="text-slate-300">
            Take control of your bookings on the go with our dedicated mobile application for salon and aesthetic clinic
            owners.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-xl mr-4">
                    <Calendar className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Integrated Calendar System</h3>
                    <p className="text-slate-300">
                      Our app seamlessly integrates with Google Calendar and our in-house calendar system, giving you
                      flexibility in managing your bookings.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-cyan-500/20 rounded-xl mr-4">
                    <Clock className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Track & Manage Bookings</h3>
                    <p className="text-slate-300">
                      View your upcoming appointments, manage staff schedules, and make real-time adjustments to your
                      booking calendar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl mr-4">
                    <MessageSquare className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Client Interaction Management</h3>
                    <p className="text-slate-300">
                      View and respond to client interactions, manage appointment requests, and keep track of client
                      communication history.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-amber-500/20 rounded-xl mr-4">
                    <BarChart className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Business Analytics</h3>
                    <p className="text-slate-300">
                      Get insights into your booking patterns, peak hours, and client preferences to optimize your
                      business operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-[280px] h-[600px]">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 to-cyan-500/20 rounded-[40px] blur-xl opacity-50"></div>
              <div className="relative z-10 w-full h-full rounded-[40px] overflow-hidden border-8 border-slate-800 shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Simulator%20Screenshot%20-%20iPhone%2012%20-%202025-05-11%20at%2017.55.45-IbQh29zLZZAt3M2o1d75rg7aVfPOXC.png"
                  alt="Voiceflow Mobile App Calendar Interface"
                  width={280}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full blur-xl opacity-40"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-xl opacity-40"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient orbs */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-[150px] opacity-10"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-500 rounded-full filter blur-[150px] opacity-10"></div>
    </section>
  )
}
