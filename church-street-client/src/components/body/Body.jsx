import React from 'react';
//import "./body.css"
import HeroCarousel from './HeroCarousel';
const Body = () => {
   return (
   <div id='home'>
      <HeroCarousel />
      
      {/* Puedes seguir con más secciones debajo */}
      {/* <section style={{ padding: '3rem' }}>
         <h2>Contenido Principal</h2>
          <p>Este es el contenido debajo del hero.</p>
        </section> */}
    </div>
  );
};

export default Body;
