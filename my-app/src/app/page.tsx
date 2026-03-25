'use client'

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Users, Route, Ticket, ClipboardList, ArrowRight, ShieldCheck } from "lucide-react"
import {Footer} from "@/components/footer";
import {Header} from "@/components/header";

interface BookingRowProps {
    name: string,
    route: string,
    date: string,
    status: string,
    color: string
}
interface ActionCardProps {
    title: string,
    desc: string,
    color: string,
    icon: string,
    onClick: string
}
export default function Home() {
    const router = useRouter()
    return (
        <div className="min-h-screen font-sans bg-gradient-to-b from-blue-50 via-white to-blue-100">
            <Header />
            <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                        Manage Travel <span className="text-blue-600">Smarter</span>
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        Easily create passengers, book routes, and track all your bookings in one simple platform.
                        Designed specifically for high-efficiency bus and shuttle operations.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/create-passenger')}
                            className="w-full flex-shrink-0 flex items-center justify-center py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-800 transition shadow-lg shadow-blue-200"
                        >
                            Get Started
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/showRoutes')}
                            className="w-full flex-shrink-0 flex items-center justify-center py-3 bg-white text-gray-800 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition"
                        >
                            View Routes
                        </motion.button>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 gap-4"
                >
                    <div className="h-48 bg-gradient-to-tr from-blue-500 to-blue-700 rounded-3xl shadow-xl flex items-center justify-center">
                        <Users className="w-16 h-16 text-white/50" />
                    </div>
                    <div className="h-48 bg-gradient-to-tr from-indigo-500 to-indigo-700 rounded-3xl shadow-xl mt-8 flex items-center justify-center">
                        <Ticket className="w-16 h-16 text-white/50" />
                    </div>
                </motion.div>
            </section>
            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">System Management</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <ActionCard
                        title="Create Passenger"
                        desc="Register new travelers"
                        color="bg-blue-600"
                        icon={<Users className="w-6 h-6" />}
                        onClick={() => router.push('/create-passenger')}
                    />
                    <ActionCard
                        title="Book Route"
                        desc="Reserve seating"
                        color="bg-indigo-600"
                        icon={<Ticket className="w-6 h-6" />}
                        onClick={() => router.push('/make-booking')}
                    />
                    <ActionCard
                        title="Create Route"
                        desc="Add new destinations"
                        color="bg-purple-600"
                        icon={<Route className="w-6 h-6" />}
                        onClick={() => router.push('/routes')}
                    />
                    <ActionCard
                        title="View Bookings"
                        desc="Audit all history"
                        color="bg-emerald-600"
                        icon={<ClipboardList className="w-6 h-6" />}
                        onClick={() => router.push('/bookings')}
                    />
                </div>
            </section>
            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-6">Built for Reliability</h2>
                        <ul className="space-y-4">
                            {[
                                "Fast and easy passenger registration",
                                "Effortless route management",
                                "Real-time booking tracking",
                                "Clean, mobile-first interface",
                                "Safe and reliable for bus operations"
                            ].map((item, index) => (
                                <li key={index} className="flex items-center gap-3 text-gray-300">
                                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                            <div className="text-4xl font-bold text-blue-400 mb-1">99.9%</div>
                            <div className="text-gray-400 uppercase text-xs tracking-widest font-bold">Uptime Guaranteed</div>
                        </div>
                        <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                            <div className="text-4xl font-bold text-indigo-400 mb-1">24/7</div>
                            <div className="text-gray-400 uppercase text-xs tracking-widest font-bold">Active Monitoring</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white shadow-xl max-w-7xl mx-auto px-6 py-20 flex flex-col items-center">
                <div className="flex flex-col items-center text-center mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-500 tracking-tight">Recent Activity</h2>
                        <p className="text-gray-500 text-sm mt-1">Latest passenger booking transmissions</p>
                    </div>
                    <button className="text-gray-500 font-bold flex items-center gap-2 hover:bg-blue-50 px-6 py-2 rounded-lg transition-all active:scale-95 text-sm">
                        View All <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="w-full border border-gray-100 overflow-hidden">
                    <div className="md:hidden divide-y divide-gray-50">
                        {[
                            { name: "John Doe", route: "Lagos → Abuja", date: "Mar 24, 2026", status: "Confirmed", color: "text-green-600", bg: "bg-green-50" },
                            { name: "Jane Smith", route: "PH → Lagos", date: "Mar 23, 2026", status: "Pending", color: "text-yellow-600", bg: "bg-yellow-50" },
                            { name: "Mike Ross", route: "Abuja → Kaduna", date: "Mar 22, 2026", status: "Cancelled", color: "text-red-600", bg: "bg-red-50" }
                        ].map((booking, idx) => (
                            <div key={idx} className="p-6 flex flex-col items-center text-center gap-3">
                                <span className="font-bold text-gray-500 text-lg">{booking.name}</span>
                                <span className={`px-3 py-1 text-gray-500 rounded-full text-xs font-bold uppercase tracking-tighter 
                             ${booking.bg} ${booking.color}`}>
                        {booking.status}
                    </span>
                                <div className="flex items-center justify-center text-gray-600 text-sm gap-2">
                                    <Route className="w-4 h-4 text-gray-500" />
                                    {booking.route}
                                </div>
                                <div className="text-gray-500 text-xs font-medium tabular-nums">
                                    Processed on {booking.date}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center md:block overflow-hidden">
                        <table className="min-w-full">
                            <thead className="hidden md:table-header-group">
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-gray-700 text-xs font-bold uppercase tracking-[0.1em]">
                                <th className="py-5 px-8 text-center">Passenger</th>
                            </tr>
                            </thead>
                            <tbody className="flex flex-col md:table-row-group divide-y divide-gray-50">
                            <BookingRow name="John Doe" route="Lagos → Abuja" date="Mar 24, 2026" status="Confirmed" color="text-green-600" />
                            <BookingRow name="Jane Smith" route="PH → Lagos" date="Mar 23, 2026" status="Pending" color="text-yellow-600" />
                            <BookingRow name="Mike Ross" route="Abuja → Kaduna" date="Mar 22, 2026" status="Cancelled" color="text-red-600" />
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}
function BookingRow({ name, route, date, status, color }: BookingRowProps) {
    return (
        <tr className="flex flex-wrap md:table-row hover:bg-gray-50 transition py-4 md:py-0">
            <td className="w-1/2 md:w-auto py-2 md:py-4 px-4 text-center text-gray-500 font-bold md:font-medium">
                <span className="block md:hidden text-[10px] uppercase text-gray-600 font-bold mb-1">Passenger: </span>
                {name}
            </td>
            <td className={`w-1/2 md:w-auto py-2 md:py-4 px-4 text-center text-gray-500 font-bold ${color}`}>
                <span className="block md:hidden text-[10px] uppercase text-gray-600 font-bold mb-1">Status: </span>
                {status}
            </td>
            <td className="w-1/2 md:w-auto py-2 md:py-4 px-4 text-center text-gray-500 text-sm md:text-base border-t border-gray-50 md:border-none">
                <span className="block md:hidden text-[10px] uppercase text-gray-600 font-bold mb-1">Route: </span>
                {route}
            </td>
            <td className="w-1/2 md:w-auto py-2 md:py-4 px-4 text-center text-gray-500 text-xs md:text-sm border-t border-gray-50 md:border-none">
                <span className="block md:hidden text-[10px] uppercase text-gray-600 font-bold mb-1">Date: </span>
                {date}
            </td>
        </tr>
    )
}
function ActionCard({ title, desc, color, icon, onClick }: ActionCardProps) {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`${color} text-white rounded-2xl shadow-lg p-6 flex flex-col justify-between h-40 cursor-pointer relative overflow-hidden group`}
        >
            <div className="relative z-10">
                <div className="mb-3 p-2 bg-white/20 rounded-lg w-fit">
                    {icon}
                </div>
                <h3 className="font-bold text-lg">{title}</h3>
                <p className="text-sm opacity-80 mt-1">{desc}</p>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                {icon}
            </div>
        </motion.div>
    )
}