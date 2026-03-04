import fetch from 'node-fetch';

const GOOGLE_ROUTES_API_KEY = process.env.GOOGLE_ROUTES_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

/**
 * Compute routes using Google Routes API with support for lat/lng and addresses.
 * Uses TRAFFIC_AWARE with departureTime ISO format.
 * Fallback if API keys are missing.
 */
export async function computeRoutes(origin, destination, departureTimeISO) {
    if (!GOOGLE_ROUTES_API_KEY && !GOOGLE_MAPS_API_KEY) {
        console.warn('API keys are missing. Using conservative fallback.');
        // Implement conservative fallback logic here
        return null; // Fallback implementation
    }

    const url = `https://routes.googleapis.com/v1:computeRoutes?key=${GOOGLE_ROUTES_API_KEY}`;
    const body = JSON.stringify({
        origin,
        destination,
        departureTime: departureTimeISO,
        routingPreference: 'TRAFFIC_AWARE',
        fields: 'routes.distanceMeters,routes.duration'
    });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        });

        if (!response.ok) {
            throw new Error(`Error fetching routes: ${response.statusText}`);
        }

        const data = await response.json();
        return data.routes;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export { computeRoutes };