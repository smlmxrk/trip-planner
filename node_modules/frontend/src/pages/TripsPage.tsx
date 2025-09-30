import { useEffect, useMemo, useState } from 'react';
import { getTrips, createTrip, type Trip } from '../api';
import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{ className?: string }>;

function Card({ className = '', children }: CardProps) {
    return (
        <div className={`rounded-xl border p-4 shadow-sm ${className}`}>
            {children ?? null}
        </div>
    );
}


function SectionTitle({ children }: { children: React.ReactNode }) {
    return <h2 className="text-xl font-semibold">{children}</h2>;
}

function Field({
                   label,
                   children,
                   hint,
               }: {
    label: string;
    children: React.ReactNode;
    hint?: string;
}) {
    return (
        <label className="grid gap-1">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
            {children}
            {hint && <span className="text-xs text-zinc-500">{hint}</span>}
        </label>
    );
}

function PrimaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className = '', ...rest } = props;
    return (
        <button
            {...rest}
            className={[
                'px-4 py-2 rounded-lg',
                'border border-zinc-300 dark:border-zinc-700',
                'bg-zinc-100 dark:bg-zinc-800',
                'hover:bg-zinc-200 dark:hover:bg-zinc-700',
                'shadow-sm disabled:opacity-50',
                className,
            ].join(' ')}
        />
    );
}

// helpers
const nights = (t: Trip) =>
    Math.max(
        0,
        Math.round(
            (new Date(t.endDate).getTime() - new Date(t.startDate).getTime()) /
            86400000
        )
    );

function TripCard({ t }: { t: Trip }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="font-semibold text-lg truncate">{t.name}</div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t.startDate} → {t.endDate}
                    </div>
                    <div className="text-xs text-zinc-500">
                        {t.tripTimezone} • {nights(t)} {nights(t) === 1 ? 'night' : 'nights'}
                    </div>
                </div>
                {/* placeholder action for later */}
                <button
                    className="text-xs px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-700"
                    title="Coming soon"
                >
                    Open
                </button>
            </div>
        </Card>
    );
}

// page
export default function TripsPage() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tz, setTz] = useState('America/Chicago');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // use system timezone by default
    useEffect(() => {
        try {
            const z = Intl.DateTimeFormat().resolvedOptions().timeZone;
            if (z) setTz(z);
        } catch {}
    }, []);

    useEffect(() => {
        (async () => {
            try {
                setTrips(await getTrips());
            } catch (e: any) {
                setError(e.message ?? 'Failed to load trips');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const valid = name && startDate && endDate && tz && startDate <= endDate;

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!valid) return;
        setSaving(true);
        setError(null);
        try {
            const newTrip = await createTrip({
                name,
                startDate,
                endDate,
                tripTimezone: tz,
            });
            setTrips([newTrip, ...trips]);
            setName('');
            setStartDate('');
            setEndDate('');
        } catch (e: any) {
            setError(e.message ?? 'Failed to create trip');
        } finally {
            setSaving(false);
        }
    }


    const sorted = useMemo(
        () => [...trips].sort((a, b) => b.startDate.localeCompare(a.startDate)),
        [trips]
    );

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            <div className="mx-auto max-w-5xl p-6 grid gap-6">
                <h1 className="text-3xl font-bold">Trips</h1>


                <Card>
                    <SectionTitle>New trip</SectionTitle>
                    <form onSubmit={onSubmit} className="mt-3 grid gap-3">
                        {error && <div className="text-red-600">{error}</div>}

                        <Field label="Trip name">
                            <input
                                className="border rounded px-3 py-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                placeholder="Chicago Weekend"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                autoFocus
                                required
                            />
                        </Field>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Field label="Start date">
                                <input
                                    type="date"
                                    className="border rounded px-3 py-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    required
                                />
                            </Field>
                            <Field label="End date" hint={startDate ? `≥ ${startDate}` : undefined}>
                                <input
                                    type="date"
                                    className="border rounded px-3 py-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                    value={endDate}
                                    min={startDate || undefined}
                                    onChange={e => setEndDate(e.target.value)}
                                    required
                                />
                            </Field>
                        </div>

                        <Field label="Timezone">
                            <input
                                className="border rounded px-3 py-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                                value={tz}
                                onChange={e => setTz(e.target.value)}
                                placeholder="America/Chicago"
                                required
                            />
                        </Field>

                        <PrimaryButton disabled={!valid || saving}>
                            {saving ? 'Saving…' : 'Create trip'}
                        </PrimaryButton>
                    </form>
                </Card>


                <section className="grid gap-3">
                    <SectionTitle>Your trips</SectionTitle>

                    {loading ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Card key={i} className="h-28 animate-pulse" />
                            ))}
                        </div>
                    ) : sorted.length === 0 ? (
                        <Card>
                            <div className="text-zinc-600 dark:text-zinc-400">
                                No trips yet — create your first trip above.
                            </div>
                        </Card>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sorted.map(t => (
                                <TripCard key={t.id} t={t} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

