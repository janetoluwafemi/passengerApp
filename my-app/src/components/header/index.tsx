import {Route} from "lucide-react";

export const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-blue-100">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
                    <Route className="w-8 h-8 text-blue-600" />
                    Passenger App
                </h1>
            </div>
        </header>

    )
}