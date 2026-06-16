# Vue 3 + TypeScript + Vite

# CargoLog | Global Logistics Intelligence Terminal

CargoLog is a real-time logistics dashboard that tracks fleets, shipments, and route activity.  
It shows live updates, analytics, and performance data for delivery operations.

---

## Setup Instructions

Follow these steps to run the project locally:

### 1. Install dependencies
```bash
npm install.

npm run dev
npm run build

Architecture Overview

CargoLog is built using a mo# CargoLog — Global Logistics Intelligence Terminal

> Real-time fleet tracking, shipment monitoring, and route analytics for modern delivery operations.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🏗️ Architecture Overview

CargoLog is built using a modular structure with **Vue 3** and **Vite**.

| Layer | Details |
|---|---|
| **UI** | Vue 3 components using the Composition API |
| **Services** | Separate modules for data fetching and WebSocket connections |
| **Charts** | Reusable canvas-based chart components (Line, Bar, etc.) |
| **Styling** | Tailwind CSS for consistent, utility-first design |

---

## state Management

CargoLog uses **Pinia** as its central state manager.

- All fleet data lives in a single store
- State is only mutated through store actions (e.g. `updateVehicle`)
- Controlled updates keep data consistent across pages and prevent conflicts

---

## Performance & Rendering

To keep the app responsive during live updates:

- Large lists are paginated to reduce DOM load
- Only changed reactive values trigger re-renders
- Charts use canvas rendering for high-frequency data
- Data diffing prevents unnecessary UI refreshes

---

## Real-Time Data Streaming

CargoLog is designed around a **live mission control** experience.

- WebSockets push fleet updates at **1Hz (once per second)**
- Incoming data flows directly into the Pinia store
- The UI reactively reflects every change with no manual polling

> During initial development, a mock WebSocket system simulates live data before the backend is connected.

---

## Trade-offs

| Decision | Reason |
|---|---|
| **ECharts over D3.js** | Easier API, better out-of-the-box dashboard performance |
| **Mock WebSocket** | Enables frontend development before the real backend is ready |
| **Tailwind CSS** | Fast iteration, consistent design tokens, minimal custom CSS |

---

## Summary

CargoLog is built to feel like a live control system for logistics — focused on **speed**, **clarity**, and **real-time decision-making** for fleet operations.dular structure with Vue 3 and Vite.

## UI Layer: Built with Vue 3 components using the Composition API for clean reactivity.
Service Layer: Separate services handle data fetching and WebSocket connections.
Charts & Visuals: Reusable chart components (Line, Bar, etc.) for consistent analytics views.
Design System: Tailwind CSS is used for fast and consistent styling across the app.
State Management Strategy

We use Pinia as the main state manager.

All fleet data is stored in a single central store.
Only store actions are allowed to update data.
Updates go through controlled functions like updateVehicle.

## This helps to:

Keep data consistent across pages
Avoid conflicting updates
Make debugging easier
 Performance & Rendering Strategy

## To keep the app fast during live updates:

Large lists are limited to avoid heavy DOM load.
Only changed parts of the UI re-render (reactive updates).
Charts use canvas rendering for better performance.
Data updates are optimized to prevent unnecessary refreshes.
 Data Streaming Approach

## CargoLog is designed for real-time updates.

Uses WebSockets to receive live fleet data.
Data updates every second (1Hz refresh rate).
Incoming data is sent directly to the Pinia store.
UI automatically updates based on store changes.

This creates a live “mission control” experience.

Trade-offs Made
ECharts over D3.js
Chosen because it is easier to use and performs better for dashboards.
Mock WebSocket system (initial phase)
Used during development to simulate real-time data before backend was ready.
Tailwind CSS
Used for speed, consistency, and to maintain a clean UI system without writing large CSS files.

## Summary

CargoLog is built to feel like a live control system for logistics.
It focuses on speed, clarity, and real-time decision-making for fleet operations.