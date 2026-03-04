// routing.ts - Use Node 20 global fetch + Google Routes API v2 implementation

export async function estimateTravelTime(origin, destination) {
    const routesApiKey = process.env.GOOGLE_ROUTES_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/routes/v2?origin=${origin}&destination=${destination}&key=${routesApiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes && data.routes.length > 0) {
            return data.routes[0].legs[0].duration; // Travel time in seconds
        } else {
            // Return a conservative fallback result
            return 3600; // 1 hour fallback
        }
    } catch (error) {
        console.error('Failed to fetch route:', error);
        return 3600; // 1-hour fallback
    }
}