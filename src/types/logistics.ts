export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Vehicle {
  id: string;
  type: 'truck' | 'van';
  status: 'On Route' | 'Waiting' | 'Inactive' | 'Delayed';
  capacity: number; // Current load %
  fuelLevel: number; // 0-100 for real-time alerts
  driver: string;
  history: Coordinate[];
  location: string | Coordinate;
  eta: string;
  lastUpdated: string;
  revenue?: number;
  chart?: number[];
  distanceTraveled?: number;
  deliveriesCompleted?: number;
  destination?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  vehicleId?: string;
}

export interface Partner {
  id: string;
  name: string;
  reliability: number;
  activeFleet: number;
  region: string;
  status: 'Preferred' | 'Probation' | 'Standard';
}