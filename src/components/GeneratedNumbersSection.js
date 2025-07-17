import React from 'react';
import { formatTicketNumber } from '../utils/helpers';

const GeneratedNumbersSection = ({ generatedNumbers, confirmedNumbers }) => {
  const allPossibleNumbers = Array.from({ length: 10500 }, (_, i) => formatTicketNumber(i));

  // Colores configurables por el administrador
  const AVAILABLE_COLOR = 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'; // Color para números disponibles (blanco/gris claro)
  const RESERVED_COLOR = 'bg-orange-400 text-white'; // Color para números apartados (naranja)
  const CONFIRMED_COLOR = 'bg-yellow-500 text-white'; // Color para números confirmados/pagados (amarillo)

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-6xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Estado de los Números</h2>
      
      {/* Simbología */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm sm:text-base text-gray-900 dark:text-white">
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${CONFIRMED_COLOR}`}></span>
          <span>Amarillo - Comprado</span>
        </div>
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${AVAILABLE_COLOR}`}></span>
          <span>Blanco - Disponible</span>
        </div>
        <div className="flex items-center">
          <span className={`w-4 h-4 rounded-full mr-2 ${RESERVED_COLOR}`}></span>
          <span>Naranja - Apartado</span>
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-15 lg:grid-cols-20 xl:grid-cols-25 2xl:grid-cols-30 gap-0.5 sm:gap-1">
        {allPossibleNumbers.map((num) => {
          const isConfirmed = Array.isArray(confirmedNumbers) && confirmedNumbers.includes(num);
          const isReserved = Array.isArray(generatedNumbers) && generatedNumbers.includes(num) && !isConfirmed;
          
          let cellClass = AVAILABLE_COLOR;
          let titleText = `Número ${num} disponible`;

          if (isReserved) {
            cellClass = RESERVED_COLOR;
            titleText = `Número ${num} apartado`;
          } else if (isConfirmed) {
            cellClass = CONFIRMED_COLOR;
            titleText = `Número ${num} confirmado y pagado`;
          }

          return (
            <div
              key={num}
              className={`flex items-center justify-center text-[8px] sm:text-xs font-medium py-0.5 sm:py-1 rounded-sm transition-colors duration-200 ${cellClass}`}
              title={titleText}
            >
              {num}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneratedNumbersSection;