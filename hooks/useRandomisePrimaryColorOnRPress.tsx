import { useEffect } from 'react';
import { Point } from '../components/PointsSimulation/utils/utils';
import { randomNeonColor, randomPastelColor } from '../utils/colorGeneration';

const useRandomisePrimaryColorOnRPress = () => {
  useEffect(() => {
    const setColors = (event: any) => {
      if (event.key === 'r') {
        let color: string;
        let textStyle: string;
        if (Math.random() > 0.5) {
          color = randomPastelColor()
          textStyle = 'PASTEL'
        } else {
          color = randomNeonColor()
          textStyle = 'NEON'
        }
        document.documentElement.style.setProperty('--primary', color);
        Point.setColor(color);
        Point.setTextStyle(textStyle);
      }
    };
    window.addEventListener('keydown', setColors);

    return () => {
      window.removeEventListener('keydown', setColors);
    };
  }, []);
};

export default useRandomisePrimaryColorOnRPress;