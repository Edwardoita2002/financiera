import React, { useRef, useEffect, useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import './about.css';
import aboutFirmImg from '../../assets/about.jpg';

// Componente para el número animado
const AnimatedNumber = ({ endNumber, label, duration = 2000 }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const ref = useRef(null);
  const startedAnimation = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedAnimation.current) {
            startedAnimation.current = true;
            let startTimestamp = null;

            const animate = (timestamp) => {
              if (!startTimestamp) startTimestamp = timestamp;
              const progress = timestamp - startTimestamp;
              const percentage = Math.min(progress / duration, 1);

              let numToDisplay;
              if (typeof endNumber === 'string' && endNumber.includes('%')) {
                const pureNumber = parseFloat(endNumber.replace('%', ''));
                numToDisplay = Math.floor(pureNumber * percentage);
                setCurrentNumber(`${numToDisplay}%`);
              } else if (typeof endNumber === 'string' && endNumber.includes('m')) {
                const pureNumber = parseFloat(endNumber.replace('$', '').replace('m', ''));
                const animatedValue = pureNumber * percentage;
                numToDisplay = percentage === 1 ? `$${pureNumber}m` : `$${animatedValue.toFixed(1)}m`;
                setCurrentNumber(numToDisplay);
              } else if (typeof endNumber === 'string' && endNumber.includes('+')) {
                const pureNumber = parseFloat(endNumber.replace('+', ''));
                numToDisplay = Math.floor(pureNumber * percentage);
                setCurrentNumber(percentage === 1 ? `${numToDisplay}+` : `${numToDisplay}`);
              } else {
                numToDisplay = Math.floor(endNumber * percentage);
                setCurrentNumber(numToDisplay);
              }

              if (progress < duration) {
                requestAnimationFrame(animate);
              } else {
                setCurrentNumber(endNumber);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [endNumber, duration]);

  return (
    <div className="stat-item" ref={ref}>
      <span className="stat-number">{currentNumber}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const scrollLinkProps = {
  smooth: true,
  offset: -80,
  duration: 500,
  spy: true,
  activeClass: 'active',
};

const About = () => {
  return (
    <div className="about-section">
      <div className="about-content">
        <h3 id="about">About our firm</h3>
        <p>
          Our firm is a dedicated team delivering tailored employee solutions. With years of experience,
          we provide exceptional service to clients ranging from startups to global enterprises.
        </p>

        <div className="about-actions">
          <ScrollLink to="contact" {...scrollLinkProps} offset={-20}>
            <button className="btn primary">Get Started</button>
          </ScrollLink>
        </div>

        <div className="about-stats">
          <AnimatedNumber endNumber="95%" label="Customer Satisfaction" />
          <AnimatedNumber endNumber="10+" label="Years in Business" />
          <AnimatedNumber endNumber="$10m" label="Annual Revenue" />
        </div>
      </div>

      <div className="about-image-container">
        <img src={aboutFirmImg} alt="About our firm" className="about-firm-image" />
      </div>
    </div>
  );
};

export default About;
