import React from 'react';
import './bento-grip.css';
import { FaVectorSquare, FaLightbulb, FaRegBuilding, FaGem  } from 'react-icons/fa';

// Aquí importas tus imágenes
import image1 from '../../assets/hero-1.jpg'; // Ejemplo: Asegúrate de que la ruta sea correcta
import image2 from '../../assets/hero-2.jpg'; // Otro ejemplo de imagen
import image3 from '../../assets/hero-3.jpg'; // Y otro más
import image4 from '../../assets/hero-4.jpg'; // Un cuarto

// Componente BentoGrid (sin cambios)
const BentoGrid = ({ className = '', children }) => {
  return (
    <div className={`bento-grid ${className}`}>
      {children}
    </div>
  );
};

// Componente BentoGridItem (modificado)
const BentoGridItem = ({
  className = '',
  title,
  description,
  header, // Keep this if you still want to pass custom header content
  icon,
  backgroundImage, // <-- Nuevo prop para la imagen de fondo
}) => {
  const headerStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};

  return (
    <div className={`bento-item ${className}`}>
      <div className="bento-header" style={headerStyle}> {/* Aplica el estilo aquí */}
        {header}
      </div>
      <div className="bento-content">
        <div className="bento-icon">
          {icon}
        </div>
        <div className="bento-title">
          {title}
        </div>
        <div className="bento-description">
          {description}
        </div>
      </div>
    </div>
  );
};


// Datos de los items (modificado para incluir backgroundImage)
const items = [
  {
    title: "Geometría de la Visión",
    description: "Explore how structures and space define our perspectives and create new visual realities..",
    header: null,
    className: "col-span-2",
    icon: <FaVectorSquare />,
    backgroundImage: image1, // <-- Asigna la imagen aquí
  },
  {
    title: "The Gleam of Modernity",
    description: "Immerse yourself in the essence of innovation.",
    header: null,
    className: "col-span-1",
    icon: <FaLightbulb />,
    backgroundImage: image2, // <-- Asigna la imagen aquí
  },
  {
    title: "Inspiring Structures",
    description: "Discover the harmony between form and function in architectural designs that combine strength and beauty.",
    header: null,
    className: "col-span-1",
    icon: <FaRegBuilding />,
    backgroundImage: image3, // <-- Asigna la imagen aquí
  },
  {
    title: "The Essence of Elegance",
    description: "Admire the timeless sophistication and exquisite detail that only true distinction can offer.",
    header: null,
    className: "col-span-2",
    icon: <FaGem  />,
    backgroundImage: image4, // <-- Asigna la imagen aquí
  },
];

// Componente principal (modificado para pasar el nuevo prop)
const BentoGridDemo = () => {
  return (
    <div  className="app">
      <div className="container">
        <h1  id='services' className="main-title">Modern Elegance: Visionary Design</h1>
        <BentoGrid className="main-grid">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={item.className}
              icon={item.icon}
              backgroundImage={item.backgroundImage} // <-- Pasa el prop de la imagen
            />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

export default BentoGridDemo;