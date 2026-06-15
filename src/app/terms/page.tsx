import { Navbar } from '@/components/landing/navbar'
import { TermsOfService } from '@/components/landing/terms-of-service'
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
};

export default function TermsPage() {
    return (
        <main className="bg-background">
            <Navbar />
            <TermsOfService />
        </main>
    )
}
