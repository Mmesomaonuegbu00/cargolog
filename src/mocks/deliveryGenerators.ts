import { faker } from '@faker-js/faker';
import type { Vehicle, ActivityLog } from '../types/logistics';

const nigerianLocations = [
  "Lagos, Nigeria", "Anambra, Nigeria", "Abuja, Nigeria", "Kano, Nigeria",
  "Port Harcourt, Nigeria", "Ibadan, Nigeria", "Benin City, Nigeria", "Enugu, Nigeria"
];

export const generateInitialFleet = (count: number = 12): Vehicle[] => {
  return Array.from({ length: count }, () => ({
    id: `SD-${faker.string.numeric(6)}`,
    type: faker.helpers.arrayElement(['truck', 'van']),
    status: faker.helpers.arrayElement(['On Route', 'Waiting', 'Delayed']),
    capacity: faker.number.int({ min: 30, max: 90 }),
    fuelLevel: faker.number.int({ min: 40, max: 100 }),
    driver: faker.person.fullName(),
      location: faker.helpers.arrayElement(nigerianLocations),
    history: [],
    eta: `${faker.number.int({ min: 1, max: 8 })}h`,
    lastUpdated: new Date().toISOString(),

    revenue: faker.number.int({ min: 1000, max: 5000 }),

    chart: Array.from({ length: 10 }, () =>
      faker.number.int({ min: 20, max: 100 })
    )
  }));
};

export const createRandomAlert = (vehicle: any): ActivityLog => {
  const type = faker.helpers.arrayElement(['info', 'warning', 'critical'] as const);
  
  // Using more "Layman" relatable messages
  const messages = {
    info: `Unit ${vehicle.id} just passed a checkpoint.`,
    warning: `${vehicle.driver.split(' ')[0]} reports heavy traffic near ${faker.location.city()}.`,
    critical: `Urgent: ${vehicle.id} has stopped unexpectedly!`
  };

  return {
    id: faker.string.uuid(),
    timestamp: new Date().toISOString(),
    message: messages[type],
    type,
    vehicleId: vehicle.id
  };
};