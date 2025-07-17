import React from 'react';

const HomePage = () => {
  // --- INICIO: CONFIGURACIÓN DE CONTENIDO DE LA PÁGINA DE INICIO ---
  const lotteryInfo = {
    title: "¡Gran Sorteo de la Suerte!",
    description: "Participa en nuestro emocionante sorteo y gana premios increíbles. ¡Cada boleto te acerca más al vehículo de tus sueños!",
    prices: [
      { amount: "1 boleto por $180 ", description: "(3 oportunidades)" },
      { amount: "2 boletos por $360", description: "(6 oportunidades)" },
      { amount: "3 boletos por $540", description: "(9 oportunidades)" },
      { amount: "4 boletos por $720", description: "(12 oportunidades)" },
      { amount: "5 boletos por $900", description: "(15 oportunidades)" },
      { amount: "10 boletos por $1800", description: "(30 oportunidades)" },
      { amount: "50 boletos por $9000", description: "(150 oportunidades)" },
    ],
    // Aquí puedes añadir las URLs de tus imágenes
    // Reemplaza con tu URL de imagen
     image1: "Imagen de WhatsApp 2025-07-15 a .jpg",
    image2: "IMG-20250716-WA0005[1].jpg", // Reemplaza con tu URL de imagen
    
   
  };
  // --- FIN: CONFIGURACIÓN DE CONTENIDO DE LA PÁGINA DE INICIO ---

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-orange-500 dark:text-orange-300 mb-6 sm:mb-8 animate-slide-down">
        {lotteryInfo.title}
      </h2>
      
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center mb-8 animate-fade-in-delay">
        {lotteryInfo.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="relative overflow-hidden rounded-lg shadow-lg group animate-zoom-in">
          <img 
            src={lotteryInfo.image1} 
            alt="Imagen del Sorteo 1" 
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
            <p className="text-white text-lg font-semibold">Te está esperando</p>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg shadow-lg group animate-zoom-in-delay">
          <img 
            src={lotteryInfo.image2} 
            alt="Imagen del Sorteo 2" 
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
            <p className="text-white text-lg font-semibold">¡No te lo pierdas!</p>
          </div>
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-bold text-center text-orange-600 dark:text-orange-400 mb-6 animate-slide-up">
        Precios de los Boletos
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {lotteryInfo.prices.map((price, index) => (
          <div 
            key={index} 
            className="bg-yellow-100 dark:bg-gray-800 p-5 rounded-lg shadow-md text-center transform transition-transform duration-300 hover:scale-105 animate-fade-in-price"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="text-3xl font-extrabold text-yellow-800 dark:text-yellow-200 mb-2">{price.amount}</p>
            <p className="text-sm text-gray-700 dark:text-gray-400">{price.description}</p>
          </div>
        ))}
      </div>
    
    </div>
  );
};

export default HomePage;