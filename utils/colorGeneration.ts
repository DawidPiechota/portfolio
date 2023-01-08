import { randomRangeInt } from "./numbers";

export const randomPastelColor = () => 'hsl('+ 360*Math.random() +',62%,78%)';
export const randomNeonColor = () => 'hsl('+ 360*Math.random() +',100%,57%)';
export const randomDarkColor = () => 'hsl('+ 360*Math.random() +',46%,82%)';
export const randomNeonSelectionColor = () => {
  const color = randomRangeInt(1,3);
  switch(color) {
    case 1: return 'hsl('+ (-(20-80)+20)*Math.random() +',100%,53%)';
    case 2: return 'hsl('+ (-(145-210)+145)*Math.random() +',100%,53%)';
    case 3: return 'hsl('+ (-(270-335)+270)*Math.random() +',100%,53%)'; 
  }
};