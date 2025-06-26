import React from 'react';
import { Carousel } from 'antd';
import { Link as ScrollLink } from 'react-scroll';
import './HeroBanner.css';
import hero1 from '../../assets/hero-1.jpg';
import hero2 from '../../assets/hero-2.jpg';
import hero3 from '../../assets/hero-3.jpg';
import hero4 from '../../assets/hero-4.jpg';
import facebook from '../../assets/icon/facebook.svg';
import instagram from '../../assets/icon/instagram.svg';
import linkedin from '../../assets/icon/linkedin.svg';

const slides = [hero1, hero2, hero3, hero4];

const scrollLinkProps = {
  smooth: true,
  offset: -80,
  duration: 500,
  spy: true,
  activeClass: 'active',
};

const HeroBanner = () => (
  <div className="hero-container">
    <div className="hero-carousel-bg">
      <Carousel autoplay dots={false}>
        {slides.map((image, index) => (
          <div key={index}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${image})` }}
            >
              <div className="hero-overlay"></div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>

    <div className="hero-content">
      <h2 className="hero-title">
        EXPERIENCE{'\n'}
        <span className="hero-hashtag-title">LUXURY LIVING</span>{'\n'}
        IN <span className="hero-hashtag-title">PATERSON, NJ</span>
      </h2>
      <p className="hero-paragraph">
        Church Street Management offers modern, fully-equipped apartments in the heart of Paterson. Discover your perfect home with our innovative property solutions.
      </p>

      <div className="hero-buttons">
        <ScrollLink to="services" {...scrollLinkProps}>
          <button className="hero-btn hero-btn-primary">View Properties</button>
        </ScrollLink>

        <ScrollLink to="contact" {...scrollLinkProps} offset={-20}>
          <button className="hero-btn hero-btn-secondary">Schedule Tour</button>
        </ScrollLink>
      </div>

      <div className='hero-hashtag-container'>
        <div className='hero-hashtag-espacio'></div>
        <div className="hero-hashtags">
          <a href="#" className="hashtag-link">
            <img src={facebook} alt="Facebook" style={{ width: 40, height: 40 }} />
          </a>
          <a href="#" className="hashtag-link">
            <img src={instagram} alt="Instagram" style={{ width: 40, height: 40 }} />
          </a>
          <a href="#" className="hashtag-link">
            <img src={linkedin} alt="LinkedIn" style={{ width: 40, height: 40 }} />
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default HeroBanner;
