/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
export const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
/**
 * 
 * @param deg Degrees
 * @description Converts degrees to radians
 * @example deg2rad(180) // returns 3.141592653589793
 */
export const deg2rad = (deg: number) => deg/180 * Math.PI;
/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 */
 export function randomRangeInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}