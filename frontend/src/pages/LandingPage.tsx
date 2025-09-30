
import type { PropsWithChildren } from "react";


function Container({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
    return <div className={`mx-auto max-w-7xl px-6 ${className}`}>{children}</div>;
}

function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
    return (
        <div
            className={[
                "rounded-2xl border border-zinc-200 dark:border-zinc-700",
                "bg-white/85 dark:bg-zinc-900/85 backdrop-blur",
                "shadow-sm hover:shadow-md transition-shadow",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
}

type ButtonProps = PropsWithChildren<{
    as?: "button" | "a";
    href?: string;
    variant?: "primary" | "secondary";
    className?: string;
}> & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function Button({ as = "button", href, variant = "primary", className = "", children, ...rest }: ButtonProps) {
    const base =
        "inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-400 dark:focus:ring-zinc-600";
    const styles =
        variant === "primary"
            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90"
            : "border border-zinc-300 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/70 hover:bg-white/95 dark:hover:bg-zinc-900";
    const cls = `${base} ${styles} ${className}`;
    return as === "a" ? (
        <a href={href} className={cls} {...(rest as any)}>{children}</a>
    ) : (
        <button className={cls} {...(rest as any)}>{children}</button>
    );
}

type SectionProps = PropsWithChildren<
    React.ComponentPropsWithoutRef<'section'> & {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    narrow?: boolean;
}
>;

function Section({ eyebrow, title, subtitle, narrow, className = "", children, ...rest }: SectionProps) {
    return (
        <section {...rest} className={`py-16 ${className}`}>
            <Container className={narrow ? "max-w-4xl" : ""}>
                <div className="mx-auto max-w-3xl text-center">
                    {eyebrow && <div className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{eyebrow}</div>}
                    <h2 className="mt-1 text-3xl font-bold tracking-tight">{title}</h2>
                    {subtitle && <p className="mt-3 text-zinc-700 dark:text-zinc-300">{subtitle}</p>}
                </div>
                <div className="mt-10">{children}</div>
            </Container>
        </section>
    );
}


const Icon = {
    Map: () => <svg width="24" height="24" viewBox="0 0 24 24" className="text-sky-500"><path fill="currentColor" d="M9 3 4 5v16l5-2 6 2 5-2V3l-5 2-6-2Zm6 4V19l-6-2V5l6 2Z"/></svg>,
    Cal: () => <svg width="24" height="24" viewBox="0 0 24 24" className="text-emerald-500"><path fill="currentColor" d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm12 8H5v10h14V10Z"/></svg>,
    Share: () => <svg width="24" height="24" viewBox="0 0 24 24" className="text-fuchsia-500"><path fill="currentColor" d="M18 16a3 3 0 0 0-2.24 1.02l-7.1-3.55A3 3 0 0 0 8 12a3 3 0 0 0-.34-1.39l7.1-3.56A3 3 0 1 0 14 5a3 3 0 0 0 .34 1.39l-7.1 3.56A3 3 0 1 0 6 15a3 3 0 0 0 2.24-1.02l7.1 3.55A3 3 0 1 0 18 16Z"/></svg>,
};


export default function LandingPage() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* Background accents */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-sky-400/20 blur-3xl" />
                <div className="absolute top-1/2 -right-28 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-[42rem] rounded-full bg-fuchsia-400/20 blur-3xl" />
            </div>

            {/* Nav */}
            <header className="sticky top-0 z-20 backdrop-blur bg-white/60 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800">
                <Container className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-2 font-semibold">
                        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-500" />
                        <span>Trip Planner</span>
                    </div>
                    <nav className="hidden sm:flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                        <a href="#features" className="hover:text-zinc-900 dark:hover:text-zinc-200">Features</a>
                        <a href="#how" className="hover:text-zinc-900 dark:hover:text-zinc-200">How it works</a>
                        <a href="#faq" className="hover:text-zinc-900 dark:hover:text-zinc-200">FAQ</a>
                    </nav>
                    <Button as="a" href="#get-started">Get started</Button>
                </Container>
            </header>


            <Section narrow title="Plan trips beautifully." subtitle="Collect places, craft day-by-day plans, and keep everything in one spot. Simple, fast, and built for real travel.">
                <div className="flex justify-center">

                    <Card className="w-full max-w-3xl p-6">
                        <div className="flex items-center justify-between pb-3">
                            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400">Your trips</div>
                            <div className="flex gap-1">
                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                            </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            {["Chicago Weekend", "Miami Retreat", "Kyoto Fall"].map((name, i) => (
                                <Card key={i} className="p-4">
                                    <div className="font-semibold">{name}</div>
                                    <div className="text-sm text-zinc-600 dark:text-zinc-400">Oct—Nov 2025</div>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-center gap-3">
                            <Button as="a" href="#get-started">Create your first trip</Button>
                            <Button as="a" href="#features" variant="secondary">Explore features</Button>
                        </div>
                    </Card>
                </div>
            </Section>


            <Section id="features" title="Everything you need" subtitle="Cards for activities, a calendar for days, and a map for places — working together.">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    <Card className="p-6 w-full max-w-sm">
                        <div className="flex items-start gap-3">
                            <Icon.Cal />
                            <div>
                                <div className="font-medium">Itinerary builder</div>
                                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Create activities with time, notes, and day grouping.</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 w-full max-w-sm">
                        <div className="flex items-start gap-3">
                            <Icon.Map />
                            <div>
                                <div className="font-medium">Map & places</div>
                                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Save locations and see your plan on a map at a glance.</p>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-6 w-full max-w-sm">
                        <div className="flex items-start gap-3">
                            <Icon.Share />
                            <div>
                                <div className="font-medium">Share (coming soon)</div>
                                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Invite friends or export to calendar when you’re ready.</p>
                            </div>
                        </div>
                    </Card>
                </div>
            </Section>

            {/* How it works (centered steps) */}
            <Section id="how" title="How it works">
                <div className="grid gap-6 md:grid-cols-3 justify-items-center">
                    {[
                        { n: "1", t: "Create a trip", d: "Pick dates and a timezone." },
                        { n: "2", t: "Add activities", d: "Times, notes, and locations." },
                        { n: "3", t: "See it on a map", d: "Pins for your places day-by-day." },
                    ].map((s, i) => (
                        <Card key={i} className="p-6 w-full max-w-sm text-center">
                            <div className="mx-auto h-8 w-8 rounded-full bg-zinc-100 dark:bg-zinc-800 grid place-items-center text-sm">{s.n}</div>
                            <div className="mt-3 font-medium">{s.t}</div>
                            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{s.d}</p>
                        </Card>
                    ))}
                </div>
            </Section>


            <Section id="get-started" narrow title="Ready to plan?" subtitle="Start with your first trip — you can add details later.">
                <Card className="mx-auto max-w-xl p-6 text-center">
                    <p className="text-zinc-700 dark:text-zinc-300">No sign-in yet. Your data stays on your device while you build.</p>
                    <div className="mt-4 flex justify-center gap-3">
                        <Button as="a" href="/trips">Get started</Button>
                        <Button as="a" href="#features" variant="secondary">See features</Button>
                    </div>
                </Card>
            </Section>


            <footer className="border-t border-zinc-200 dark:border-zinc-800">
                <Container className="py-8 flex flex-wrap items-center justify-between gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2 font-medium">
                        <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-sky-500 to-emerald-500" />
                        <span>Trip Planner</span>
                    </div>
                    <div>© {new Date().getFullYear()} Trip Planner</div>
                </Container>
            </footer>
        </div>
    );
}
