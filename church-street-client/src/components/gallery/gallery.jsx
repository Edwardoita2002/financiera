import './gallery.css';

function Gallery() {
  return (
    <section className="black-section">
      {/* Header */}
      <div className="section-header">
        <h2>Architectural Highlights</h2>
        <p>Discover iconic structures and modern cityscapes that redefine urban living.</p>
      </div>

      {/* Imagen grande + texto al lado */}
      <div className="highlight-row">
        <img src="/cards/card-1.jpg" alt="City Skyline" />
        <div className="highlight-info">
          <div className='medatidad'>
            <h4>Modern City Skyline</h4>
            <p>Experience breathtaking views and contemporary architectural designs that shape our cities.</p>
          </div>
          <div className='medatidad-2'>
            <div className='text-group'>
              <h4 className='title'>Sustainable Design</h4>
              <p className='description'>Innovative eco-friendly buildings with minimal environmental impact.</p>
            </div>
            <div className='text-group'>
              <h4 className='title'>Urban Planning</h4>
              <p className='description'>Thoughtfully designed spaces that balance functionality and aesthetics.</p>
            </div>
            <div className='text-group'>
              <h4 className='title'>Cultural Landmarks</h4>
              <p className='description'>Structures that reflect the history and identity of their surroundings.</p>
            </div>
            <div className='text-group'>
              <h4 className='title'>Residential Towers</h4>
              <p className='description'>High-rise living spaces offering comfort, luxury, and stunning city views.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Segunda fila de 3 imágenes */}
      <div className="section-subtitle">
        <h3>Featured Projects</h3>
      </div>
      <div className="projects-grid">
        <img src="/cards/card-2.jpg" alt="Luxury Apartments" />
        <img src="/cards/card-3.jpg" alt="Office Complex" />
        <img src="/cards/card-4.jpg" alt="Civic Center" />
      </div>

      {/* Cuatro imágenes horizontales */}
      <div className="section-subtitle">
        <h3>Design Concepts that Inspire</h3>
      </div>
      <div className="row-four">
        <img src="/cards/card-2.jpg" alt="Minimalist Interior" />
        <img src="/cards/card-3.jpg" alt="Green Rooftop" />
        <img src="/cards/card-2.jpg" alt="Glass Facade" />
        <img src="/cards/card-3.jpg" alt="Open Courtyard" />
      </div>

      {/* Texto con botones */}
      <div className="info-block">
        <h3>Work with Top Architectural Firms</h3>
        <p>
          Explore collaborations with leading architecture studios known for their creativity, innovation, and sustainable urban solutions.
        </p>
        <div className="info-buttons">
          {/* Aquí puedes agregar botones de acción si quieres */}
        </div>
      </div>
    </section>
  );
}

export default Gallery;
