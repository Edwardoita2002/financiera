import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import "./card-hover-effect.css";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`hover-grid ${className || ""}`}>
      {items.map((item, idx) => (
        <div
          
          key={idx}
          className="hover-card-link"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="hover-background"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.icon && (
              <div className="card-icon">
                <item.icon />
              </div>
            )}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => (
  <div className={`card ${className || ""}`}>
    <div className="card-content">
      <div className="card-inner">{children}</div>
    </div>
  </div>
);

export const CardTitle = ({ className, children }) => (
  <h4 className={`card-title ${className || ""}`}>{children}</h4>
);

export const CardDescription = ({ className, children }) => (
  <p className={`card-description ${className || ""}`}>{children}</p>
);
