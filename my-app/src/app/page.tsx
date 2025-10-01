'use client'
import {useRouter} from "next/navigation"

export default function Home() {
    const router = useRouter()
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <header className="w-full px-6 py-4 flex justify-between items-center shadow-sm bg-white">
            <h2 className="text-lg font-bold text-gray-800">Passenger App</h2>
            <div className="space-x-4">
                <button className="px-4 py-2 bg-blue-900 text-white rounded" onClick={() => router.push('/create-passenger')}>
                    Create A Passenger Account
                </button>
                <button className="px-4 py-2 bg-blue-900 text-white rounded" onClick={() => router.push('/make-booking')}>
                    Book a Route
                </button>
                <button className="px-4 py-2 bg-blue-900 text-white rounded" onClick={() => router.push('/routes')}>
                    Create A Route
                </button>
                <button className="px-4 py-2 bg-blue-900 text-white rounded" onClick={() => router.push('/bookings')}>
                    View All Bookings
                </button>
            </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">Passenger App</h1>
        <p>Create account, book a route, search for all routes</p>
        </main>
    </div>
  );
}
