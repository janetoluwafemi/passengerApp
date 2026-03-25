import React from "react";

export const Footer = () => {
    return (
        <footer
            style={{ backgroundColor: '#001e4d', color: '#ffffff' }}
            className="border-t border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col items-center text-center gap-12">
                <div className="max-w-md">
                    <h2 className="text-2xl font-bold text-white mb-4">Passenger App</h2>
                    <p className="text-blue-200 text-sm leading-relaxed">
                        The professional standard for managing travel routes and passenger logistics across the continent.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-12 md:gap-24">
                    <div className="flex flex-col items-center space-y-4">
                        <h3 className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">Company</h3>
                        <div className="flex flex-col space-y-2">
                            <a href="#" className="text-white hover:text-blue-400 transition text-sm">About</a>
                            <a href="#" className="text-white hover:text-blue-400 transition text-sm">Careers</a>
                            <a href="#" className="text-white hover:text-blue-400 transition text-sm">Contact</a>
                        </div>
                    </div>
                    <div className="flex flex-col items-center space-y-4">
                        <h3 className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">Support</h3>
                        <div className="flex flex-col space-y-2">
                            <a href="#" className="text-white hover:text-blue-400 transition text-sm">Help Center</a>
                            <a href="#" className="text-white hover:text-blue-400 transition text-sm">API Docs</a>
                            <a href="#" className="text-white hover:text-blue-400 transition text-sm">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 py-8 border-t border-blue-900/50 text-center text-blue-400/60 text-xs tracking-wide">
                © {new Date().getFullYear()} Passenger App. Engineering Excellence.
            </div>
        </footer>
    );
};