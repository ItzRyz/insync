'use client'

import { Zap, Lock, Rocket, Palette, BarChart3, Cloud } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function Features() {
    const features = [
        {
            icon: Zap,
            title: 'Instant & No Delay',
            description: 'Notifications are sent via the fastest Telegram Webhook/API. When the scheduled minute arrives, the bot responds immediately.',
        },
        {
            icon: Rocket,
            title: 'Easy to Configure',
            description: 'Simply run the bot command once in your chat to securely link your Telegram ID to the dashboard.',
        },
        {
            icon: Lock,
            title: 'Security Guaranteed',
            description: 'Your data is processed securely. We do not store your personal messages or sensitive information.',
        },
        {
            icon: Palette,
            title: 'Flexible Scheduling',
            description: 'Choose any date, time, and interval for your reminders. The system will handle the rest automatically.',
        },
        {
            icon: Cloud,
            title: 'Cloud Cron',
            description: 'All reminders are managed securely in the cloud with high reliability. No need to keep your computer running 24/7.',
        },
        {
            icon: BarChart3,
            title: 'Cross-Platform',
            description: 'Access your dashboard from any device with a web browser. Your data syncs in real-time across all your devices.',
        },
    ]

    return (
        <section id="features" className="relative py-20 sm:py-32 bg-background">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl">
                        Powerful Features
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        A modern infrastructure designed to integrate easily with your daily routines.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Card
                                key={index}
                                className="border-border bg-card/50 backdrop-blur transition-all hover:border-border/80 hover:bg-card"
                            >
                                <CardHeader>
                                    <div className="mb-3 inline-flex items-center rounded-lg bg-blue-500/10 p-3 gap-2">
                                        <Icon className="h-6 w-6 text-blue-400 mr-2" />
                                        <CardTitle>{feature.title}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>
                                        {feature.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
