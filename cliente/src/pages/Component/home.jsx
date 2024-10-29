import React from 'react';
import agriculturalog from '../../assets/fresas-cultivos-berries.jpg'
import agriculturalogon from '../../assets/1.png'
const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-green-600">
      <header className="bg-green-900 py-6">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-white text-center text-3xl font-bold">AGROGESTION</h1>
        </div>
      </header>
      <main className="flex-grow">
        <section className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${agriculturalogon})` }}>
          <div className="bg-green-900 bg-opacity-50 h-full flex items-center">
            <div className="container mx-auto text-center text-white">
              <h2 className="text-4xl sm:text-6xl font-bold mb-4">Bienvenidos a Agrogestion</h2>
              <p className="text-lg sm:text-2xl mb-8">Soluciones agrícolas de alta calidad para un crecimiento sostenible</p>
              <p className="text-lg sm:text-1xl mb-6">En Agrogestion, nos dedicamos a ofrecer productos y servicios agrícolas que optimizan la producción y promueven la sostenibilidad.</p>
              <a href="#productos" className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded">Descubre más</a>
            </div>
          </div>
        </section>
        <section id="productos" className="py-16 bg-green-600" style={{
          backgroundImage: `url(${agriculturalog})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}>
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-green-600 text-center mb-12 bg-gray-100 rounded-lg shadow-lg p-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              Conoce Agrogestion
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-100 rounded-lg shadow-lg p-6 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Innovación Agrícola</h3>
                <p className="text-gray-600">Nos especializamos en soluciones agrícolas que mejoran el rendimiento de los cultivos y promueven prácticas sostenibles.</p>
              </div>
              <div className="bg-gray-100 rounded-lg shadow-lg p-6 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Nuestro Compromiso</h3>
                <p className="text-gray-600">En AgroVida, estamos comprometidos con la sostenibilidad y la innovación, ofreciendo productos que mejoran la calidad del suelo y los cultivos.</p>
              </div>
              <div className="bg-gray-100 rounded-lg shadow-lg p-6 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Nuestra Visión</h3>
                <p className="text-gray-600">Ser líderes en el sector agrícola, proporcionando productos que fortalezcan la producción agrícola sostenible y responsable.</p>
              </div>
              <div className="bg-gray-100 rounded-lg shadow-lg p-6 text-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                <h3 className="text-xl font-semibold text-green-800 mb-4">Conócenos</h3>
                <p className="text-gray-600">Somos apasionados por el campo, trabajando día a día para ofrecer soluciones confiables que mejoren la vida de los agricultores.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-green-900 py-6">
        <div className="container mx-auto text-center text-white">
          <p>Derechos de autor © 2024 AgroVida. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;

