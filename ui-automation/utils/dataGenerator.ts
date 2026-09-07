/**
 * Small, dependency-free random data generator so every test run creates
 * fresh, unique data (no faker library needed — keeps the project light).
 */

const FIRST_NAMES = ['Alex', 'Sam', 'Jordan', 'Taylor', 'Riya', 'Kabir', 'Nadia', 'Omar', 'Lina', 'Zayn'];
const LAST_NAMES = ['Morgan', 'Chowdhury', 'Islam', 'Karim', 'Rahman', 'Silva', 'Brown', 'Ahsan', 'Noor', 'Khan'];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(list: T[]): T {
  return list[randomInt(0, list.length - 1)];
}

export function randomSuffix(length = 5): string {
  return Math.random().toString(36).substring(2, 2 + length);
}

export function randomEmployeeName() {
  const suffix = randomSuffix(4);
  return {
    firstName: `${pick(FIRST_NAMES)}`,
    lastName: `${pick(LAST_NAMES)}${suffix}`,
  };
}

/** yyyy-mm-dd date string, `daysFromToday` days in the future (or past, if negative). */
export function futureDate(daysFromToday: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  return d.toISOString().split('T')[0];
}
