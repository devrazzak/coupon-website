'use client';

import { useMemo, useState } from 'react';
import {
    ArrowRight,
    Check,
    ChevronRight,
    Clock3,
    Copy,
    Search,
    ShieldCheck,
    Sparkles,
    Tag,
    TrendingUp,
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

type Deal = {
    merchant: string;
    category: string;
    offer: string;
    detail: string;
    code?: string;
    accent: string;
    age: string;
};

const deals: Deal[] = [
    { merchant: 'NORTH & KIND', category: 'Fashion', offer: '25% off your first order', detail: 'Fresh layers, easy essentials, better prices.', code: 'WELCOME25', accent: '#e9f2d0', age: '12 min ago' },
    { merchant: 'MINTY HOME', category: 'Home', offer: '$40 off orders over $180', detail: 'Make room for the pieces you will keep.', code: 'ROOM40', accent: '#f8dfcf', age: '28 min ago' },
    { merchant: 'ROAM COFFEE', category: 'Food & Drink', offer: '20% off subscriptions', detail: 'Small-batch beans, delivered on your schedule.', code: 'ROAM20', accent: '#dce9ef', age: '41 min ago' },
    { merchant: 'KITE & CABLE', category: 'Tech', offer: 'Up to 35% off selected gear', detail: 'Useful upgrades for the way you work and play.', accent: '#e6def5', age: '1 hr ago' },
    { merchant: 'SUNDAY SKIN', category: 'Beauty', offer: '15% off sitewide', detail: 'A calmer routine starts here.', code: 'SUNDAY15', accent: '#f4e3dc', age: '2 hrs ago' },
    { merchant: 'TRAILMARK', category: 'Travel', offer: '$75 off your next stay', detail: 'Go somewhere that gives you stories back.', code: 'GOFAR75', accent: '#dcebdc', age: '3 hrs ago' },
];

const categories = ['Fashion', 'Home', 'Tech', 'Beauty', 'Travel'];

export default function CouponLandingPage() {
    const [query, setQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const filteredDeals = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        return deals.filter((deal) => {
            const matchesCategory = activeCategory === 'All' || deal.category === activeCategory;
            const matchesQuery = !normalizedQuery || `${deal.merchant} ${deal.offer} ${deal.category}`.toLowerCase().includes(normalizedQuery);
            return matchesCategory && matchesQuery;
        });
    }, [activeCategory, query]);

    const copyCode = async (code: string) => {
        await navigator.clipboard?.writeText(code);
        setCopiedCode(code);
        window.setTimeout(() => setCopiedCode(null), 1800);
    };

    return (
        <div className="min-h-screen bg-[#f7f5f0] text-[#17251d]">
            <Header />
            <main>
                <section className="relative overflow-hidden border-b border-[#d9ded4] bg-[#18352b] px-5 pb-20 pt-32 text-[#f7f5f0] sm:px-8 lg:px-12 lg:pb-28">
                    <div className="absolute -right-24 top-16 h-72 w-72 rounded-full border-[42px] border-[#c9e75d]/20 sm:h-96 sm:w-96" />
                    <div className="absolute bottom-[-7rem] left-[38%] h-60 w-60 rounded-full bg-[#d7ed65] blur-3xl opacity-15" />
                    <div className="relative mx-auto max-w-7xl">
                        <div className="max-w-3xl">
                            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c9e75d]/40 bg-[#c9e75d]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#d7ed65]"><Sparkles className="h-3.5 w-3.5" /> Curated for clever shoppers</div>
                            <h1 className="max-w-3xl text-5xl font-black leading-[0.96] tracking-[-0.04em] sm:text-7xl lg:text-8xl">Pay less for the things you actually want.</h1>
                            <p className="mt-7 max-w-xl text-lg leading-8 text-[#c2d1c5] sm:text-xl">Fresh promo codes, honest deals, and a faster way to find the good stuff online.</p>
                        </div>
                        <div className="mt-10 flex max-w-2xl items-center gap-3 rounded-2xl bg-[#f7f5f0] p-2 shadow-2xl shadow-[#07150f]/30">
                            <Search className="ml-4 h-5 w-5 shrink-0 text-[#718078]" />
                            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a store, category, or deal" className="min-w-0 flex-1 bg-transparent px-1 py-3 text-base text-[#17251d] outline-none placeholder:text-[#87918a]" />
                            <button className="hidden rounded-xl bg-[#d7ed65] px-5 py-3 text-sm font-bold text-[#18352b] transition hover:bg-white sm:block">Find deals</button>
                        </div>
                        <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#c2d1c5]"><span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#d7ed65]" /> Verified by people</span><span className="flex items-center gap-2"><Tag className="h-4 w-4 text-[#d7ed65]" /> New deals every day</span><span className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#d7ed65]" /> Always free to use</span></div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
                    <div className="flex flex-col justify-between gap-5 border-b border-[#cfd8ce] pb-7 sm:flex-row sm:items-end">
                        <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#738178]">The daily edit</p><h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl">Deals worth opening a new tab for.</h2></div>
                        <Link href="#all-deals" className="group flex items-center gap-2 text-sm font-bold text-[#28735b]">Browse all deals <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
                    </div>
                    <div className="mt-7 flex gap-2 overflow-x-auto pb-2">{['All', ...categories].map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-bold transition ${activeCategory === category ? 'border-[#18352b] text-[#18352b]' : 'border-transparent text-[#849087] hover:border-[#9aae9f] hover:text-[#18352b]'}`}>{category}</button>)}</div>
                    <div id="all-deals" className="mt-5 overflow-hidden rounded-2xl border border-[#ccd6cb] bg-white">
                        {filteredDeals.map((deal, index) => <article key={deal.merchant} className="group relative grid gap-4 border-b border-[#e1e6df] px-4 py-5 transition last:border-b-0 hover:bg-[#f4f7ef] sm:grid-cols-[3rem_1fr_auto] sm:items-center sm:gap-5 sm:px-6">
                            <div className="grid h-10 w-10 place-items-center rounded-xl text-xs font-black tracking-tight" style={{ backgroundColor: deal.accent }}>{deal.merchant.slice(0, 2)}</div>
                            <div className="min-w-0"><div className="flex flex-wrap items-center gap-x-3 gap-y-1"><p className="text-xs font-black tracking-[0.12em] text-[#26362d]">{deal.merchant}</p><span className="text-[11px] text-[#92a096]">{deal.category}</span><span className="flex items-center gap-1 text-[11px] text-[#92a096]"><TrendingUp className="h-3 w-3" /> {deal.age}</span></div><h3 className="mt-1 text-lg font-black tracking-[-0.02em] text-[#17251d] sm:text-xl">{deal.offer}</h3><p className="mt-1 truncate text-sm text-[#718078]">{deal.detail}</p></div>
                            <div className="flex items-center justify-between gap-4 sm:justify-end">{deal.code ? <button onClick={() => copyCode(deal.code!)} className="flex items-center gap-2 rounded-lg border border-[#cbd7c9] px-3 py-2 text-xs font-bold text-[#28735b] transition hover:bg-[#eaf3df]">{copiedCode === deal.code ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}{copiedCode === deal.code ? 'Copied' : deal.code}</button> : <span className="text-xs font-bold text-[#28735b]">Automatic</span>}<button aria-label={`View ${deal.merchant} deal`} className="grid h-9 w-9 place-items-center rounded-full text-[#17251d] transition group-hover:bg-[#d7ed65]"><ChevronRight className="h-4 w-4" /></button></div>
                        </article>)}
                    </div>
                    <p className="mt-4 text-xs text-[#829087]">Showing {filteredDeals.length} carefully selected offers · Updated throughout the day</p>
                </section>

                <section className="border-y border-[#d9ded4] bg-[#ebe9df] px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto max-w-7xl"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#738178]">Shop by mood</p><h2 className="mt-2 text-3xl font-black tracking-[-0.03em] sm:text-4xl">A shortcut to your next favorite store.</h2></div><div className="mt-8 divide-y divide-[#cfd7cc] border-y border-[#cfd7cc]">{categories.map((name, index) => <button key={name} onClick={() => { setActiveCategory(name); document.getElementById('all-deals')?.scrollIntoView({ behavior: 'smooth' }); }} className="group flex w-full items-center justify-between py-4 text-left transition hover:px-3"><span className="flex items-center gap-5"><span className="text-xs font-bold text-[#9aa69b]">/{String(index + 1).padStart(2, '0')}</span><span className="text-2xl font-black tracking-[-0.03em] text-[#18352b]">{name}</span></span><ArrowRight className="h-5 w-5 text-[#28735b] transition group-hover:translate-x-1" /></button>)}</div></div></section>
                <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24"><div className="mx-auto grid max-w-7xl gap-10 rounded-3xl bg-[#d7ed65] p-7 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#36502d]">The good stuff, occasionally</p><h2 className="mt-3 max-w-xl text-4xl font-black leading-none tracking-[-0.04em] text-[#18352b] sm:text-5xl">A little inbox magic. Zero spam energy.</h2></div><form className="flex w-full max-w-md gap-2 rounded-2xl bg-white p-2" onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="you@example.com" aria-label="Email address" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none" /><button type="submit" className="rounded-xl bg-[#18352b] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#28735b]">Sign me up</button></form></div></section>
            </main>
            <Footer />
        </div>
    );
}
