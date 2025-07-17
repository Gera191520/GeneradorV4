import React from 'react';
// Aquí está la CORRECCIÓN
import TicketCard from './TicketCard'; // Si ambos están en la misma carpeta 'src/components'

const TicketList = ({ tickets, onSaveTicket }) => {
  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 w-full max-w-4xl mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6 text-center">Boletos Generados</h2>
      {tickets.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Aún no se han generado boletos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            // Pasa la función onSaveTicket a TicketCard
            <TicketCard key={ticket.id} ticket={ticket} onSaveTicket={onSaveTicket} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;