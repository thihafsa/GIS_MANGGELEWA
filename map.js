async function getAddressFromLatLng(lat, lng, apiKey) {
    try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`);
        if (!response.ok) {
            throw new Error('Failed to fetch address');
        }
        const data = await response.json();
        if (data.results.length > 0) {
            const address = data.results[0].formatted_address;
            return address;
        } else {
            return 'No address found';
        }
    } catch (error) {
        console.error('Error fetching address:', error);
        throw error;
    }
}

// Contoh penggunaan
const apiKey = 'AIzaSyD4P3rMVrMzwD_8l1I1ETldunN6Vdx7Tqk';
const lat = -8.4937908; // Contoh latitude
const lng = 118.2982895; // Contoh longitude

getAddressFromLatLng(lat, lng, apiKey)
    .then(address => {
        console.log('Address:', address);
    })
    .catch(error => {
        console.error('Error:', error);
    });