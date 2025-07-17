import React, { useState, useEffect } from 'react';

const LuckyMachine = ({ onReveal, numbers }) => {
  const [revealedNumbers, setRevealedNumbers] = useState(['', '', '']);
  const [isAnimating, setIsAnimating] = useState(true);

  // Función para reproducir sonido
  const playSound = () => {
    // Puedes cambiar esta URL por la de tu propio archivo de sonido
    // Asegúrate de que el archivo de sonido esté accesible públicamente
    const audio = new Audio('https://www.soundjay.com/buttons/button-3.mp3'); // Ejemplo de sonido de botón
    audio.play().catch(e => console.error("Error al reproducir sonido:", e));
  };

  useEffect(() => {
    if (numbers && numbers.length === 3) {
      setIsAnimating(true);
      const timers = [];
      const totalDuration = 3000; // 3 segundos en milisegundos
      const interval = totalDuration / 3; // Intervalo para cada número

      // Simular revelación de números uno por uno
      timers.push(setTimeout(() => {
        setRevealedNumbers([numbers[0], '', '']);
        playSound(); // Sonido al revelar el primer número
      }, interval));
      timers.push(setTimeout(() => {
        setRevealedNumbers([numbers[0], numbers[1], '']);
        playSound(); // Sonido al revelar el segundo número
      }, interval * 2));
      timers.push(setTimeout(() => {
        setRevealedNumbers([numbers[0], numbers[1], numbers[2]]);
        playSound(); // Sonido al revelar el tercer número
        setIsAnimating(false);
        onReveal(); // Notificar al padre que los números han sido revelados
      }, totalDuration)); // La animación completa dura 3 segundos

      return () => timers.forEach(clearTimeout);
    }
  }, [numbers, onReveal]);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-200 to-indigo-300 rounded-3xl shadow-2xl border-4 border-purple-500 w-full max-w-md mx-auto text-center relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300 to-indigo-400 opacity-20 rounded-3xl"></div>
      <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full opacity-30"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full opacity-30"></div>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-6 relative z-10 drop-shadow-md">
        ¡Tu Combinación de la Suerte!
      </h3>
      <div className="flex justify-center space-x-3 sm:space-x-4 mb-8 relative z-10">
        {revealedNumbers.map((num, index) => (
          <div
            key={index}
            className={`w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full font-bold text-3xl sm:text-4xl transition-all duration-500 ease-out transform
              ${isAnimating 
                ? 'bg-indigo-400 text-white animate-pulse scale-90' 
                : 'bg-white text-indigo-800 shadow-lg scale-100 border-2 border-indigo-300'}`}
          >
            {num}
          </div>
        ))}
      </div>
      {isAnimating && (
        <p className="text-indigo-700 font-semibold text-lg relative z-10">Generando tus números...</p>
      )}
    </div>
  );
};

export default LuckyMachine;