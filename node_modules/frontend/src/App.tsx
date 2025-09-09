import { useEffect, useState } from 'react';
import { getTrips, createTrip, type Trip } from './api';

export default function App() {
    const [trips, setTrips] = useState<Trip[]>([]);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [tz, setTz] = useState('America/Chicago');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await getTrips();
                setTrips(data);
            } catch (e: any) {
                setError(e.message ?? 'Failed to load trips');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
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

    return (
        <div className="mx-auto max-w-3xl p-6">
            <h1 className="text-3xl font-bold mb-6">Trips</h1>

            <form onSubmit={onSubmit} className="grid gap-3 p-4 rounded-xl border">
                {error && <div className="text-red-600">{error}</div>}

                <label className="grid gap-1">
                    <span className="text-sm text-gray-600">Trip name</span>
                    <input
                        className="border rounded px-3 py-2"
                        placeholder="Chicago Weekend"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </label>

                <div className="grid grid-cols-2 gap-3">
                    <label className="grid gap-1">
                        <span className="text-sm text-gray-600">Start date</span>
                        <input
                            type="date"
                            className="border rounded px-3 py-2"
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            required
                        />
                    </label>
                    <label className="grid gap-1">
                        <span className="text-sm text-gray-600">End date</span>
                        <input
                            type="date"
                            className="border rounded px-3 py-2"
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            required
                        />
                    </label>
                </div>

                <label className="grid gap-1">
                    <span className="text-sm text-gray-600">Timezone</span>
                    <input
                        className="border rounded px-3 py-2"
                        value={tz}
                        onChange={e => setTz(e.target.value)}
                        placeholder="America/Chicago"
                        required
                    />
                </label>

                <button
                    className="justify-self-start px-4 py-2 rounded-lg border shadow disabled:opacity-50"
                    disabled={saving}
                >
                    {saving ? 'Saving…' : 'Create trip'}
                </button>
            </form>

            <div className="mt-8">
                {loading ? (
                    <div>Loading…</div>
                ) : trips.length === 0 ? (
                    <div className="text-gray-600">No trips yet — add one above.</div>
                ) : (
                    <ul className="grid gap-3">
                        {trips.map(t => (
                            <li key={t.id} className="p-4 rounded-xl border">
                                <div className="font-semibold">{t.name}</div>
                                <div className="text-sm text-gray-600">
                                    {t.startDate} → {t.endDate} · {t.tripTimezone}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
