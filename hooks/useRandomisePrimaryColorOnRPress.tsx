import { useEffect } from 'react';
import { Point } from '../components/PointsSimulation/utils/utils';
import { randomNeonColor, randomPastelColor } from '../utils/colorGeneration';

const setColors = (event: any) => {
  if (event.key === 'r') {
    let color: string;
    let textStyle: string;
    if (Math.random() > 0.5) {
      color = randomPastelColor()
      textStyle = 'PASTEL';
    } else {
      color = randomNeonColor()
      textStyle = 'NEON';
    }
    document.documentElement.style.setProperty('--primary', color);
    changeFavicon(color);
    Point.setColor(color);
    Point.setTextStyle(textStyle);
  }
};

const changeFavicon = (color: string) => {
  const canvas = document.createElement('canvas');
  canvas.height = 64;
  canvas.width = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#1a1a1c';
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, 2 * Math.PI);
  ctx.fill();
  ctx.font = 'bold 26px sans-serif';
  ctx.fillStyle = color;
  ctx.fillText('[DP]', 4, 40);

  const link = document.createElement('link');
  const oldLinks = document.querySelectorAll('link[rel="shortcut icon"]');
  const bacicFavicon = document.querySelector('link[rel="icon"]');
  if (bacicFavicon) {
    bacicFavicon.parentNode?.removeChild(bacicFavicon);
  }
  oldLinks.forEach(e => e.parentNode?.removeChild(e));
  link.id = 'dynamic-favicon';
  link.rel = 'shortcut icon';
  link.href = canvas.toDataURL();
  document.head.appendChild(link);
}

const useRandomisePrimaryColorOnRPress = () => {

  useEffect(() => {
    window.addEventListener('keydown', setColors);

    return () => {
      window.removeEventListener('keydown', setColors);
    };
  }, []);
};

export default useRandomisePrimaryColorOnRPress;