'use client'

import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()

    return (
        <div className="min-h-screen flex flex-col font-sans bg-gradient-to-br from-blue-50 via-white to-blue-100">
            <header className="w-full px-6 py-4 flex flex-col md:flex-row md:justify-between md:items-center
             gap-4 bg-white/80 backdrop-blur-md shadow-sm">
                <h2 className="text-xl font-bold text-blue-900 tracking-wide text-center md:text-left">
                    Passenger App
                </h2>
                <div className="flex flex-wrap justify-center md:justify-end gap-3">
                    <button
                        onClick={() => router.push('/create-passenger')}
                        className="px-4 py-2 rounded-lg bg-blue-900 text-white text-sm sm:text-base
                        hover:bg-blue-700 transition shadow-sm"
                    >
                        Create Passenger
                    </button>
                    <button
                        onClick={() => router.push('/make-booking')}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm sm:text-base
                        hover:bg-indigo-500 transition shadow-sm"
                    >
                        Book Route
                    </button>
                    <button
                        onClick={() => router.push('/routes')}
                        className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm sm:text-base
                        hover:bg-purple-500 transition shadow-sm"
                    >
                        Create Route
                    </button>
                    <button
                        onClick={() => router.push('/bookings')}
                        className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm sm:text-base
                        hover:bg-emerald-500 transition shadow-sm"
                    >
                        View Bookings
                    </button>

                </div>
            </header>
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="bg-white shadow-xl rounded-2xl p-10 max-w-2xl text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6">
                        Passenger App
                    </h1>
                    <p className="text-gray-600 mb-8 text-lg">
                        Easily create passenger accounts, book travel routes,
                        and manage all your bookings in one simple platform.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => router.push('/create-passenger')}
                            className="px-6 py-3 bg-blue-900 text-white rounded-xl font-semibold hover:bg-blue-700
                            transition shadow-md"
                        >
                            Get Started
                        </button>
                        <button
                            onClick={() => router.push('/showRoutes')}
                            className="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl font-semibold hover:bg-gray-200
                             transition"
                        >
                            View Routes
                        </button>
                    </div>
                </div>
            </main>
            <footer className="text-center text-gray-500 text-sm py-4">
                © {new Date().getFullYear()} Passenger App
            </footer>

        </div>
    )
}