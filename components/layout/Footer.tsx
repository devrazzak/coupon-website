import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#18352b] text-[#d3dfd5]">
            <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                    {/* Company Info */}
                    <div>
                        <h3 className="flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-white">
                            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#d7ed65] text-sm text-[#18352b]">
                                %
                            </span>
                            savewise
                        </h3>
                        <p className="mb-4 mt-5 max-w-xs text-sm leading-6 text-[#9eb2a3]">
                            A calmer way to find useful offers from stores you already love.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-sm font-bold text-[#d7ed65] hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            {/* Add more social icons */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#d7ed65]">
                            Explore
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="#about" className="text-[#c3d0c5] hover:text-white">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#services" className="text-[#c3d0c5] hover:text-white">
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-[#c3d0c5] hover:text-white">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#d7ed65]">
                            Categories
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="#services" className="text-[#c3d0c5] hover:text-white">
                                    Web Development
                                </Link>
                            </li>
                            <li>
                                <Link href="#services" className="text-[#c3d0c5] hover:text-white">
                                    Mobile Apps
                                </Link>
                            </li>
                            <li>
                                <Link href="#services" className="text-[#c3d0c5] hover:text-white">
                                    Consulting
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#d7ed65]">
                            Keep in touch
                        </h3>
                        <ul className="space-y-3 text-sm text-[#c3d0c5]">
                            <li>hello@savewise.example</li>
                            <li>New deals, no noise.</li>
                            <li>Made for better browsing.</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-[#365548] pt-8 text-sm text-[#91a99a]">
                    <p>
                        &copy; {new Date().getFullYear()} Savewise. Better choices, lighter
                        checkout.
                    </p>
                </div>
            </div>
        </footer>
    );
}
