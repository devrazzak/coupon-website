import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="absolute left-0 right-0 top-0 z-50 px-5 pt-5 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-[-0.04em] text-white">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#d7ed65] text-sm text-[#18352b]">%</span>
                        savewise
                    </Link>

                    <nav className="hidden items-center gap-8 text-sm font-semibold text-[#d3dfd5] md:flex">
                        <Link
                            href="#about"
                            className="transition hover:text-[#d7ed65]"
                        >
                            About
                        </Link>
                        <Link
                            href="#services"
                            className="transition hover:text-[#d7ed65]"
                        >
                            Services
                        </Link>
                        <Link
                            href="#testimonials"
                            className="transition hover:text-[#d7ed65]"
                        >
                            Testimonials
                        </Link>
                        <Link
                            href="#contact"
                            className="transition hover:text-[#d7ed65]"
                        >
                            Contact
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        <Search className="hidden h-5 w-5 text-[#d3dfd5] sm:block" />
                        <LanguageSwitcher />
                        <Link href="/auth/login" className="hidden text-sm font-bold text-white sm:block">Sign in</Link>
                        <button aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)} className="grid h-9 w-9 place-items-center rounded-lg border border-white/20 text-white md:hidden">
                            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
            </div>
            {menuOpen && <nav className="mt-4 grid gap-3 rounded-2xl bg-[#f7f5f0] p-5 text-sm font-bold text-[#18352b] shadow-xl md:hidden"><Link href="#about">About</Link><Link href="#services">Services</Link><Link href="#testimonials">Testimonials</Link><Link href="#contact">Contact</Link></nav>}
        </header>
    );
}
