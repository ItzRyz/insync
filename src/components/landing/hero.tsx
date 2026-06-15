'use client'

import { SignUpButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
    return (
        <section className="relative min-h-screen overflow-hidden pt-32 bg-background" id='about'>
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-linear-to-b from-background via-background to-blue-950/20 dark:to-blue-950/20" />
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4">
                    <div className="h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
                <div className="mb-8 inline-block rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-2">
                    <span className="text-sm font-medium text-blue-300">
                        ⚙️ ISC VisionSync Product
                    </span>
                </div>

                <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                    Send Real-time Reminders Directly to your&nbsp;
                    <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Telegram.
                    </span>
                </h1>

                <p className="mb-8 text-xl text-muted-foreground sm:text-2xl">
                    Manage schedules, tasks, and important events from a single dashboard. Receive instant, interactive notifications via Telegram Bot with no delay.
                </p>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                    <SignUpButton mode="redirect">
                        <Button size="lg" className="group">
                            Get Started
                        </Button>
                    </SignUpButton>
                    <Button variant="outline" size="lg">
                        <Link href="#features">
                            Learn More
                        </Link>
                    </Button>
                </div>

                <div className="mt-16 grid grid-cols-3 gap-8">
                    <div>
                        <div className="text-3xl font-bold text-foreground">Instant</div>
                        <div className="text-sm text-muted-foreground">Real-time Notifications</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-foreground">Easy</div>
                        <div className="text-sm text-muted-foreground">Manage your schedules</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold text-foreground">Security+</div>
                        <div className="text-sm text-muted-foreground">Enterprise-grade security</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
