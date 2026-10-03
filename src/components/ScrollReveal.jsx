import React, { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal: Hardware-accelerated IntersectionObserver reveal component.
 * Causes elements to smoothly slide and fade in as the user scrolls down the page.
 * 
 * @param {Object} props
 * @param {'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'flip-up'} [props.animation='fade-up']
 * @param {number} [props.delay=0] Delay in milliseconds (e.g. 100, 200, 300 for staggered children)
 * @param {number} [props.duration=700] Duration in milliseconds
 * @param {string} [props.className=''] Custom Tailwind or CSS classes
 * @param {React.ReactNode} props.children
 */
export default function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  threshold = 0.12,
  className = '',
  style = {}
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px' // triggers slightly before full view for smooth anticipation
      }
    );

    const currentElem = domRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [threshold]);

  const getTransformBefore = () => {
    switch (animation) {
      case 'fade-up':
        return 'translate3d(0, 36px, 0)';
      case 'fade-down':
        return 'translate3d(0, -30px, 0)';
      case 'fade-left':
        return 'translate3d(-40px, 0, 0)';
      case 'fade-right':
        return 'translate3d(40px, 0, 0)';
      case 'zoom-in':
        return 'scale(0.92)';
      case 'flip-up':
        return 'perspective(600px) rotateX(20deg) translate3d(0, 30px, 0)';
      default:
        return 'translate3d(0, 30px, 0)';
    }
  };

  const animStyle = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : getTransformBefore(),
    transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
    willChange: 'opacity, transform'
  };

  return (
    <div ref={domRef} style={animStyle} className={className}>
      {children}
    </div>
  );
}
