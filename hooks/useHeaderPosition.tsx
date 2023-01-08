import { useEffect, useRef, useState } from 'react'

export enum HeaderPosition {
  STATIC = 'static',
  HIDDEN = 'hidden',
  STICKY = 'sticky',
}

const useHeaderPosition = () => {
  const [headerPosition, setHeaderPosition] = useState<HeaderPosition>(
    HeaderPosition.STATIC,
  )

  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setHeaderPosition(HeaderPosition.STATIC)
        console.log('static')
      } else if (
        window.scrollY > window.innerHeight * 0.05 &&
          prevScrollY.current - window.scrollY > 0
      ) {
        setHeaderPosition(HeaderPosition.STICKY);
        console.log('sticky')
      } else {
        setHeaderPosition(HeaderPosition.HIDDEN);
        console.log('hidden')
      }

      // setHeaderPosition(
      //   window.scrollY > window.innerHeight * 0.05 &&
      //     prevScrollY.current - window.scrollY > 0
      //     ? HeaderPosition.STICKY
      //     : HeaderPosition.HIDDEN,
      // );
      // else if (
      //   window.scrollY > window.innerHeight * 0.05 &&
      //   prevScrollY.current - window.scrollY > 0
      // ) {
      //   setHeaderPosition(HeaderPosition.STICKY)
      //   console.log('sticky')
      //   return
      // } else if (window.scrollY > window.innerHeight * 0.05) {
      //   setHeaderPosition(HeaderPosition.HIDDEN)
      //   console.log('hidden')
      //   return
      // }
      // setHeaderPosition(
      //   window.scrollY > window.innerHeight * 0.05 &&
      //     prevScrollY.current - window.scrollY > 0
      //     ? HeaderPosition.STATIC
      //     : HeaderPosition.STICKY,
      // )
      prevScrollY.current = window.scrollY
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return headerPosition
}

export default useHeaderPosition
