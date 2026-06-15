'use client'

export function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Privacy Policy</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="prose prose-invert max-w-none space-y-8 text-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">Introduction</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            InSync ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application and website (collectively, the "Service").
                        </p>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">1. Information We Collect</h2>

                        <h3 className="mt-6 text-xl font-semibold text-foreground">Personal Information</h3>
                        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                            We collect information you provide directly to us, such as:
                        </p>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-muted-foreground">
                            <li>Account credentials (email address, password)</li>
                            <li>Profile information (name, profile picture)</li>
                            <li>Reminders and task content you create</li>
                            <li>Communication preferences and notification settings</li>
                            <li>Payment and billing information (if applicable)</li>
                        </ul>

                        <h3 className="mt-6 text-xl font-semibold text-foreground">Automatically Collected Information</h3>
                        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
                            When you use InSync, we automatically collect certain information:
                        </p>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-muted-foreground">
                            <li>Device information (device type, operating system, unique device identifiers)</li>
                            <li>Usage analytics (features used, reminders set, app interactions)</li>
                            <li>Location data (only if you grant permission)</li>
                            <li>IP address and general geographic location</li>
                            <li>Cookies and similar tracking technologies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We use the information we collect to:
                        </p>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-muted-foreground">
                            <li>Provide, operate, and maintain the Service</li>
                            <li>Improve and personalize your experience</li>
                            <li>Send you technical notices and support messages</li>
                            <li>Respond to your inquiries and requests</li>
                            <li>Send promotional communications (with your consent)</li>
                            <li>Monitor and analyze trends, usage, and activities</li>
                            <li>Detect, investigate, and prevent fraudulent activity</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">3. How We Share Your Information</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We do not sell your personal information. We may share information with:
                        </p>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-muted-foreground">
                            <li><strong>Service Providers:</strong> Third parties who assist us in operating our Service</li>
                            <li><strong>Legal Requirements:</strong> When required by law or legal process</li>
                            <li><strong>Business Partners:</strong> With your consent for joint marketing initiatives</li>
                            <li><strong>Aggregated Data:</strong> Non-personally identifiable information for research and analytics</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">4. Data Security</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission or electronic storage is completely secure. We encourage you to use a strong password and secure your devices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">5. Your Privacy Rights</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            Depending on your location, you may have rights including:
                        </p>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-muted-foreground">
                            <li>Right to access your personal information</li>
                            <li>Right to correct inaccurate data</li>
                            <li>Right to request deletion of your data</li>
                            <li>Right to opt-out of marketing communications</li>
                            <li>Right to data portability</li>
                        </ul>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            To exercise these rights, please contact us at privacy@insync-app.com.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">6. Cookies and Tracking</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We use cookies and similar tracking technologies to enhance your experience, remember your preferences, and understand how you use InSync. You can control cookie settings through your browser preferences.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">7. Children's Privacy</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            InSync is not intended for children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will promptly delete it and terminate the child's account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">8. Changes to This Policy</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. We will notify you of material changes by updating the "Last updated" date and, when required, by obtaining your consent.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">9. Contact Us</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
                        </p>
                        <div className="mt-4 space-y-2 text-base text-muted-foreground">
                            <p><strong>Email:</strong> privacy@insync-app.com</p>
                            <p><strong>Address:</strong> InSync, Inc.<br />123 Main Street<br />San Francisco, CA 94105</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
