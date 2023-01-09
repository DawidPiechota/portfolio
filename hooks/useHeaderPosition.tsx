import { useEffect, useRef, useState } from 'react';

export enum HeaderPosition {
  STATIC = 'static',
  HIDDEN = 'hidden',
  STICKY = 'sticky',
}

const useHeaderPosition = () => {
  const [headerPosition, setHeaderPosition] = useState<HeaderPosition>(
    HeaderPosition.STATIC,
  );

  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setHeaderPosition(HeaderPosition.STATIC);
      } else if (
        window.scrollY > window.innerHeight * 0.05 &&
        prevScrollY.current - window.scrollY > 0
      ) {
        setHeaderPosition(HeaderPosition.STICKY);
      } else {
        setHeaderPosition(HeaderPosition.HIDDEN);
      }
      prevScrollY.current = window.scrollY;
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return headerPosition;
};

export default useHeaderPosition;
