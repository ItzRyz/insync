import { Navbar } from '@/components/landing/navbar'
import { PrivacyPolicy } from '@/components/landing/privacy-policy'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
};

export default function PrivacyPage() {
    return (
        <main className="bg-background">
            <Navbar />
            <PrivacyPolicy />
        </main>
    )
}
