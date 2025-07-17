import React, { useState } from 'react';

const TicketForm = ({ onGenerateTicket }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [playerPhone, setPlayerPhone] = useState('');

  // Nombre del sorteo predeterminado, solo modificable desde el código fuente
  const defaultLotteryName = "Gran Sorteo de la Suerte"; 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar que los campos no estén vacíos
    if (!firstName.trim()) {
      alert('Por favor, ingresa el nombre del jugador.');
      return;
    }
    if (!lastName.trim()) {
      alert('Por favor, ingresa el apellido del jugador.');
      return;
    }
    if (!playerPhone.trim()) {
      alert('Por favor, ingresa el número de WhatsApp del jugador.');
      return;
    }

    const playerName = `${firstName.trim()} ${lastName.trim()}`; // Combinar nombre y apellido
    onGenerateTicket(playerName, defaultLotteryName, playerPhone);
    setFirstName('');
    setLastName('');
    setPlayerPhone('');
  };

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Generar Nuevo Boleto</h2>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Nombre del Jugador
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ej. Juan"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 text-gray-900 dark:text-white"
            required // HTML5 required attribute
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Apellido del Jugador
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Ej. Pérez"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 text-gray-900 dark:text-white"
            required // HTML5 required attribute
          />
        </div>
        <div>
          <label htmlFor="playerPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Número de WhatsApp
          </label>
          <input
            type="tel"
            id="playerPhone"
            value={playerPhone}
            onChange={(e) => setPlayerPhone(e.target.value)}
            placeholder="Ej. 521234567890 (incluye código de país)"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200 text-gray-900 dark:text-white"
            required // HTML5 required attribute
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-200 shadow-md hover:shadow-lg"
        >
          Generar Boleto
        </button>
      </form>
    </div>
  );
};

export default TicketForm;