'use client';

import Image from 'next/image';

import { Flame } from 'lucide-react';
import { useState } from 'react';

import HeroImage from '@/public/images/hero-savings.jpg';

export function HeroSection() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <section className="relative overflow-hidden bg-linear-to-b from-hero via-background to-surface py-15">
            {/* Background glowing ambient elements */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-32 top-0 h-115 w-115 rounded-full bg-primary/8 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 top-1/4 h-115 w-115 rounded-full bg-secondary-brand/10 blur-3xl"
            />

            <div className="container-page relative">
                <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
                    {/* Left Column: Value Prop & Smart Search */}
                    <div className="min-w-0">
                        {/* Top Trust Pill */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-light px-3.5 py-1.5 text-[12px] font-bold text-primary shadow-xs">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                <Flame className="h-3 w-3" />
                            </span>
                            <span>250,000+ Codes &amp; Cash Back Deals Verified Today</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="mt-5 font-display text-[38px] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-[46px] md:text-[52px] lg:text-[56px]">
                            Never Pay Full Price. <br />
                            <span className="bg-linear-to-r from-primary via-[#FF4D50] to-secondary-brand bg-clip-text text-transparent">
                                Auto-Apply Coupons
                            </span>
                        </h1>

                        {/* Subtitle */}
                        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-foreground sm:text-[17px]">
                            Coupello automatically tests &amp; applies the best promo codes at
                            checkout on 50,000+ stores — plus gives you instant cash back. 100%
                            free.
                        </p>
                    </div>

                    {/* Right Column: Coupert-style Interactive Checkout Savings Widget */}
                    <div className="relative min-w-0">
                        {/* Background glow and decorative framing */}
                        <div className="relative mx-auto max-w-115">
                            <div className="overflow-hidden rounded-xl">
                                <Image
                                    alt="Hero Image"
                                    src={HeroImage}
                                    width={HeroImage.width}
                                    height={HeroImage.height}
                                    className="h-auto w-full object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-5 -right-6 max-w-[350px] flex items-center gap-2.5 rounded-2xl border border-border bg-card p-3 shadow-lift">
                                <div>
                                    <p className="text-[14px] font-extrabold text-foreground">
                                        How do we make money?
                                    </p>
                                    <p className="font-display text-[11px]  text-foreground">
                                        Coupello earns a commission when you shop through our links,
                                        and we share part of it back with you as cash back.
                                        That&apos;s why using Coupello is always free.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
