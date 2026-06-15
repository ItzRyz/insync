'use client'

import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'

export function Navbar() {
    const { isSignedIn } = useUser()
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { label: 'About', href: '#about' },
        { label: 'Features', href: '#features' },
    ]

    return (
        <nav className="fixed left-0 right-0 top-0 z-50 mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="relative rounded-2xl border border-border bg-background/40 px-6 py-3 backdrop-blur-md">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-cyan-500">
                                <span className="font-bold text-foreground">Is</span>
                            </div>
                            <span className="font-semibold text-foreground">InSync</span>
                        </div>

                        <div className="hidden items-center gap-8 md:flex">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {isSignedIn ? (
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: 'w-10 h-10',
                                        },
                                    }}
                                />
                            ) : (
                                <>
                                    <SignInButton mode="redirect">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="hidden sm:flex"
                                        >
                                            Sign In
                                        </Button>
                                    </SignInButton>
                                    <SignUpButton mode="redirect">
                                        <Button size="sm" className="hidden sm:flex">
                                            Get Started
                                        </Button>
                                    </SignUpButton>
                                </>
                            )}

                            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                                <SheetTrigger className="md:hidden" asChild>
                                    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10">
                                        <Menu className="h-5 w-5" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent>
                                    <div className="flex flex-col gap-6 pt-8">
                                        {navItems.map((item) => (
                                            <a
                                                key={item.href}
                                                href={item.href}
                                                className="text-sm font-medium"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.label}
                                            </a>
                                        ))}
                                        {!isSignedIn && (
                                            <div className="flex flex-col gap-3 border-t pt-4">
                                                <SignInButton mode="redirect">
                                                    <Button variant="outline" className="w-full">
                                                        Sign In
                                                    </Button>
                                                </SignInButton>
                                                <SignUpButton mode="redirect">
                                                    <Button className="w-full">Get Started</Button>
                                                </SignUpButton>
                                            </div>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
