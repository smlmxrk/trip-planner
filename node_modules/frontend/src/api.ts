export type Trip = {
    id: string;
    name: string;
    startDate: string;   // YYYY-MM-DD
    endDate: string;     // YYYY-MM-DD
    tripTimezone: string;
};

export async function getTrips(): Promise<Trip[]> {
    const res = await fetch('/api/trips');
    if (!res.ok) throw new Error('Failed to load trips');
    return res.json();
}

export async function createTrip(payload: Omit<Trip, 'id'>): Promise<Trip> {
    const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to create trip');
    }
    return res.json();
}
