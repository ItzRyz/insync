'use client'

export function TermsOfService() {
    return (
        <div className="min-h-screen bg-background py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-foreground sm:text-5xl">Terms of Service</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="prose prose-invert max-w-none space-y-8 text-foreground">
                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            By accessing and using InSync ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service. We reserve the right to modify these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">2. Use License</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We grant you a limited, non-exclusive, non-transferable license to use InSync for personal, non-commercial purposes. This license does not permit you to:
                        </p>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-muted-foreground">
                            <li>Reproduce, distribute, or transmit the Service or its content</li>
                            <li>Reverse engineer, decompile, or hack the Service</li>
                            <li>Use the Service for any commercial purpose without authorization</li>
                            <li>Remove or alter any proprietary notices or labels</li>
                            <li>Attempt to gain unauthorized access to the Service or systems</li>
                            <li>Use the Service in any way that violates applicable laws</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">3. User Accounts</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            When you create an account, you agree to:
                        </p>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-muted-foreground">
                            <li>Provide accurate, current, and complete information</li>
                            <li>Maintain the confidentiality of your password</li>
                            <li>Accept responsibility for all activity under your account</li>
                            <li>Notify us immediately of unauthorized account access</li>
                            <li>Not use another person's account without permission</li>
                        </ul>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We reserve the right to suspend or terminate accounts that violate these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">4. User Content</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            You retain ownership of all content you create within InSync (reminders, notes, etc.). However, you grant us a worldwide, non-exclusive license to use, reproduce, and display your content for the purpose of providing and improving the Service.
                        </p>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            You represent and warrant that your content does not infringe on third-party rights and does not contain illegal, defamatory, or obscene material.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">5. Prohibited Conduct</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            You agree not to:
                        </p>
                        <ul className="mt-3 list-inside list-disc space-y-2 text-base text-muted-foreground">
                            <li>Harass, abuse, or threaten other users or our staff</li>
                            <li>Transmit spam, malware, or malicious code</li>
                            <li>Engage in phishing or social engineering attempts</li>
                            <li>Use the Service to send unsolicited marketing messages</li>
                            <li>Attempt to disrupt Service availability or performance</li>
                            <li>Violate any applicable laws or regulations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">6. Intellectual Property Rights</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            InSync and its entire contents, features, and functionality (including but not limited to all information, software, code, text, displays, graphics, and interfaces) are owned by InSync, Inc., its licensors, or other providers of such material and are protected by United States and international copyright, trademark, and other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">7. Disclaimer of Warranties</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            THE SERVICE IS PROVIDED ON AN "AS-IS" AND "AS AVAILABLE" BASIS. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">8. Limitation of Liability</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            TO THE EXTENT PERMITTED BY LAW, IN NO EVENT SHALL INSYNC, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, REVENUE, DATA, OR USE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">9. Indemnification</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            You agree to indemnify and hold harmless InSync and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of the Service or violation of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">10. Termination</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We may terminate or suspend your account and access to the Service immediately, without notice, for conduct that violates these Terms or is otherwise harmful to our Service or other users. You may terminate your account at any time by contacting us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">11. Governing Law</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            These Terms are governed by and construed in accordance with the laws of the State of California, without regard to its conflict of laws principles.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">12. Dispute Resolution</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            Any dispute arising from these Terms or your use of InSync shall be resolved through binding arbitration in San Francisco, California, except for claims of intellectual property infringement, which may be brought in court.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">13. Severability</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full effect.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-foreground">14. Contact Us</h2>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            If you have questions about these Terms of Service, please contact us at:
                        </p>
                        <div className="mt-4 space-y-2 text-base text-muted-foreground">
                            <p><strong>Email:</strong> legal@insync-app.com</p>
                            <p><strong>Address:</strong> InSync, Inc.<br />123 Main Street<br />San Francisco, CA 94105</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}
