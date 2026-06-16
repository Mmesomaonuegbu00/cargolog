import http from 'http';
import { WebSocketServer } from 'ws';

console.log('--- 🚀 LOGISTICS SERVER STARTING (ESM MODE) ---');

const server = http.createServer();
const wss = new WebSocketServer({ server });

const drivers = [
    "Mmesoma Favour", "Chidi Okafor", "Amina Bello", "Emeka Adeyemi",
    "Sarah Connor", "John Wick", "Elena Rodriguez", "Kofi Mensah"
];

const locations = [
    "Lagos, Nigeria", "Anambra, Nigeria", "Accra, Ghana", "Nairobi, Kenya",
    "Johannesburg, SA", "London, UK", "Texas, USA", "Berlin, Germany",
    "Dubai, UAE", "Tokyo, Japan"
];

const alertMessages = [
    "Engine temperature rising",
    "Sudden braking detected",
    "Off-route deviation",
    "Fuel level critically low",
    "Long stationary period detected",
    "Security seal compromised",
    "Tire pressure low",
    "truck missed scheduled checkpoint",
    "Driver fatigue alert",
    "Cargo shift detected"
];

let knownIds = [];

wss.on('connection', (ws) => {
    console.log('🤝 NEW FRONTEND CONNECTED');

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            if (Array.isArray(data)) {
                knownIds = data;
                console.log(`✅ SYNCED: Server tracking ${knownIds.length} trucks`);
            }
        } catch (e) {
            console.log(message.toString());
        }
    });

    const interval = setInterval(() => {
        if (knownIds.length === 0) return;

        const randomId = knownIds[Math.floor(Math.random() * knownIds.length)];
        const randomDriver = drivers[Math.floor(Math.random() * drivers.length)];
        const randomLocation = locations[Math.floor(Math.random() * locations.length)];

        const isAlert = Math.random() > 0.6;

        if (isAlert) {
            const alert = {
                event: true,
                id: `alert-${Math.random().toString(36).substring(2, 9)}`,
                type: Math.random() > 0.7 ? 'critical' : 'warning',
                message: `${alertMessages[Math.floor(Math.random() * alertMessages.length)]} - Driver: ${randomDriver}`,
                vehicleId: randomId,
                timestamp: new Date().toISOString()
            };

            ws.send(JSON.stringify(alert));
        } else {
            const update = {
                id: randomId,
                driver: randomDriver,
                location: randomLocation,
                destination: randomLocation,
                revenue: Math.floor(Math.random() * 10000) + 500,
                status: Math.random() > 0.8 ? 'Delayed' : 'On Route',
                fuelEfficiency: Number((Math.random() * (15 - 8) + 8).toFixed(1)),
                chart: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 20)
            };

            ws.send(JSON.stringify(update));
        }
    }, 3000);

    ws.on('close', () => {
        clearInterval(interval);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});