import { useLogisticsStore } from '../stores/logistics';

class LogisticsStream {
  private socket: WebSocket | null = null;
  private reconnectTimeout: number | null = null;

  public init() {
    this.connect();
  }

  private connect() {
    const store = useLogisticsStore();

    this.socket = new WebSocket('wss://cargolog-7vyc.onrender.com');

    this.socket.onopen = () => {
      console.log('%c ✅ WS CONNECTED ', 'background: #222; color: #bada55; font-size: 14px');

      store.isStreaming = true;

      setTimeout(() => {
        this.syncVehicleIds();
      }, 500);

      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = null;
      }
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        console.log('%c 📥 DATA RECEIVED ', 'background: #0052D4; color: #fff', data);

        if (data.event) {
          store.addLog({
            id: data.id,
            type: data.type,
            message: data.message,
            vehicleId: data.vehicleId,
            timestamp: data.timestamp
          });
        }

        if (data.id && !data.event) {
          console.log(`Updating Truck: ${data.id}`);
          store.updateVehicle(data.id, data);
        }
      } catch (err) {
        console.error('Data parsing error:', err);
      }
    };

    this.socket.onclose = () => {
      console.log('%c ❌ WS DISCONNECTED ', 'background: #ff0000; color: #fff');

      store.isStreaming = false;

      this.reconnectTimeout = window.setTimeout(() => {
        this.connect();
      }, 5000);
    };

    this.socket.onerror = (err) => {
      console.error('📡 WebSocket Error:', err);
    };
  }

  public syncVehicleIds() {
    const store = useLogisticsStore();

    if (this.socket?.readyState === WebSocket.OPEN && store.vehicles.length > 0) {
      const ids = store.vehicles.map(v => v.id);

      console.log('📡 Syncing IDs with server:', ids);

      this.socket.send(JSON.stringify(ids));
    }
  }
}

export const streamService = new LogisticsStream();