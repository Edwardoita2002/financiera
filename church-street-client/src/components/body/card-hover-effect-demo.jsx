import { HoverEffect } from "./Card-hover-effect";
import "./card-hover-effect-demo.css";
import {
  FaBuilding,       // para apartamentos modernos
  FaMapMarkerAlt,   // para ubicación
  FaShieldAlt,      // para seguridad
  FaTools,          // para mantenimiento
  FaHome,           // para hogar inteligente
  FaHandshake       // para contratos flexibles
} from "react-icons/fa";

export const projects = [
  {
    title: "Modern Apartments",
    description: "Stylish living spaces with contemporary designs and premium finishes.",
    icon: FaBuilding,
  },
  {
    title: "Prime Locations",
    description: "Centrally located properties with easy access to amenities and transportation.",
    icon: FaMapMarkerAlt,
  },
  {
    title: "Secure Environment",
    description: "24/7 security and modern safety systems for your peace of mind.",
    icon: FaShieldAlt,
  },
  {
    title: "Quick Maintenance",
    description: "Responsive maintenance team available for all your needs.",
    icon: FaTools,
  },
  {
    title: "Smart Home Tech",
    description: "Integrated smart home technology for modern, convenient living.",
    icon: FaHome,
  },
  {
    title: "Flexible Leasing",
    description: "Customizable lease terms to suit your unique living situation.",
    icon: FaHandshake,
  },
];


export default function CardHoverEffectDemo() {
  return (
    <div className="container-bx">
      <h3 className="title-proyectos">Proyectos Destacados</h3>
      <div className="demo-container">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
