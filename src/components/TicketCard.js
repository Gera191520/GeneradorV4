import React from 'react';
import { formatDateTime } from '../utils/helpers';

const TicketCard = ({ ticket, onSaveTicket }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 w-full max-w-sm mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{ticket.lotteryName}</h3>
        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full mt-1 sm:mt-0">
          ID: {ticket.id.substring(0, 6)}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-1">
        <span className="font-semibold">Jugador:</span> {ticket.playerName}
      </p>
      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-3">
        <span className="font-semibold">Teléfono:</span> {ticket.playerPhone}
      </p>
      <div className="mb-3 sm:mb-4">
        <p className="text-gray-700 dark:text-gray-300 font-semibold text-sm sm:text-base mb-2">Números:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {ticket.numbers.split(', ').map((num, index) => (
            <span
              key={index}
              className="w-20 h-10 sm:w-24 sm:h-12 flex items-center justify-center bg-yellow-200 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-100 text-lg sm:text-xl font-bold rounded-lg shadow-inner"
            >
              {num}
            </span>
          ))}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-right">
        Generado: {formatDateTime(ticket.timestamp)}
      </p>
      {onSaveTicket && ( // Solo muestra el botón si la prop onSaveTicket existe
        <div className="mt-4 text-center">
          <button
            onClick={() => onSaveTicket(ticket)}
            className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition duration-200 shadow-md"
          >
            Guardar Boleto
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketCard;