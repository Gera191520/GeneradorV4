import React, { useState, useEffect } from 'react';
import TicketCard from './components/TicketCard'; 
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import GeneratedNumbersSection from './components/GeneratedNumbersSection';
import HomePage from './components/HomePage';
import PaymentMethodPage from './components/PaymentMethodPage';
import { generateRandomNumber, formatTicketNumber, formatDateTime } from './utils/helpers';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [allGeneratedNumbers, setAllGeneratedNumbers] = useState([]); // Almacena todos los números generados/vendidos
  const [confirmedNumbers, setConfirmedNumbers] = useState([]); // Almacena los números confirmados/pagados
  const [currentPage, setCurrentPage] = useState('home'); // Cambiado a 'home' como página inicial
  const [savedTickets, setSavedTickets] = useState([]); // Boletos guardados por el usuario

  // Número de WhatsApp del administrador (modificar aquí)
  // Asegúrate de incluir el código de país sin el signo '+'
  const adminWhatsappNumber = "521234567890"; // Ejemplo: 52 para México, 1234567890 tu número

  // --- INICIO: CONFIGURACIÓN PARA ADMINISTRADOR ---
  // Aquí puedes ver y modificar el estado de los números.
  // 'G' = Generado (apartado), 'V' = Vendido (confirmado/pagado)
  // Ejemplo:
  // const adminNumbersState = {
  //   "00000": "G", // Ejemplo: número 00000 generado
  //   "00001": "V", // Ejemplo: número 00001 vendido
  // };
  // Para cambiar un número a 'V' (vendido), simplemente cambia su estado aquí.
  // Por ejemplo, si "00001" ya fue pagado, cámbialo a "00001": "V"
  const adminNumbersState = {
    "00000": "G", 
    // "00001": "V", 
  };
  // --- FIN: CONFIGURACIÓN PARA ADMINISTRADOR ---


  useEffect(() => {
    const storedTickets = JSON.parse(localStorage.getItem('lotteryTickets')) || [];
    setTickets(storedTickets);
    const storedGeneratedNumbers = JSON.parse(localStorage.getItem('allGeneratedNumbers')) || [];
    setAllGeneratedNumbers(storedGeneratedNumbers);
    const storedConfirmedNumbers = JSON.parse(localStorage.getItem('confirmedNumbers')) || [];
    setConfirmedNumbers(storedConfirmedNumbers);
    const storedSavedTickets = JSON.parse(localStorage.getItem('savedTickets')) || [];
    setSavedTickets(storedSavedTickets);
  }, []);

  // Sincronizar el estado de los números con adminNumbersState al cargar o actualizar
  useEffect(() => {
    const newGenerated = new Set(allGeneratedNumbers);
    const newConfirmed = new Set(confirmedNumbers);

    for (const num in adminNumbersState) {
      if (adminNumbersState[num] === "G") {
        newGenerated.add(num);
        newConfirmed.delete(num); // Asegurarse de que no esté en confirmados si es solo generado
      } else if (adminNumbersState[num] === "V") {
        newGenerated.add(num); // Un número vendido también debe estar en generados
        newConfirmed.add(num);
      }
    }
    setAllGeneratedNumbers(Array.from(newGenerated));
    setConfirmedNumbers(Array.from(newConfirmed));
  }, [adminNumbersState]); // Dependencia de adminNumbersState para que se actualice si el admin lo cambia

  useEffect(() => {
    localStorage.setItem('lotteryTickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    localStorage.setItem('allGeneratedNumbers', JSON.stringify(allGeneratedNumbers));
  }, [allGeneratedNumbers]);

  useEffect(() => {
    localStorage.setItem('confirmedNumbers', JSON.stringify(confirmedNumbers));
  }, [confirmedNumbers]);

  useEffect(() => {
    localStorage.setItem('savedTickets', JSON.stringify(savedTickets));
  }, [savedTickets]);

  const handleGenerateTicket = async (playerName, lotteryName, playerPhone) => {
    const generatedTicketNumbers = [];
    const availableNumbersPool = [];
    
    // Llenar el pool de números disponibles
    // Se usa un Set para allGeneratedNumbers para una verificación de existencia más eficiente
    const currentUsedNumbers = new Set(allGeneratedNumbers); 

    for (let i = 0; i < 10500; i++) {
      const num = formatTicketNumber(i);
      // Solo añadir números que NO estén ya en el Set de números usados
      if (!currentUsedNumbers.has(num)) {
        availableNumbersPool.push(num);
      }
    }

    if (availableNumbersPool.length < 3) {
      alert('¡Ups! No hay suficientes números disponibles para generar 3 combinaciones únicas. Por favor, limpia el historial o espera a que haya más números.');
      return;
    }

    // Seleccionar 3 números aleatorios del pool de disponibles
    for (let i = 0; i < 3; i++) {
      const randomIndex = generateRandomNumber(0, availableNumbersPool.length - 1);
      const selectedNumber = availableNumbersPool[randomIndex];
      generatedTicketNumbers.push(selectedNumber);
      availableNumbersPool.splice(randomIndex, 1); // Eliminar el número seleccionado del pool para evitar duplicados en este mismo boleto
      currentUsedNumbers.add(selectedNumber); // Añadir al Set de usados para futuras verificaciones en este ciclo
    }

    const newTicket = {
      id: crypto.randomUUID(),
      playerName,
      lotteryName,
      playerPhone,
      numbers: generatedTicketNumbers.join(', '), // Almacena las 3 combinaciones
      timestamp: new Date(),
    };

    setTickets((prevTickets) => [...prevTickets, newTicket]);
    // Actualizar allGeneratedNumbers con los nuevos números generados
    setAllGeneratedNumbers((prevNumbers) => [...prevNumbers, ...generatedTicketNumbers]);

    // Mensaje para el cliente
    const cleanPlayerPhone = playerPhone.replace(/\D/g, ''); // Elimina cualquier caracter que no sea dígito
    const clientWhatsappMessage = `¡Hola ${playerName}! Tus números de la suerte para el sorteo "${lotteryName}" son: ${generatedTicketNumbers.join(', ')}. Han sido apartados. Te enviaremos los detalles para el pago en breve. ¡Mucha suerte!`;
    const clientWhatsappURL = `https://wa.me/${cleanPlayerPhone}?text=${encodeURIComponent(clientWhatsappMessage)}`;
    
    // Mensaje para el administrador (Primer mensaje: información del boleto)
    const adminMessageInfo = `¡Nuevo Boleto Generado!\n\nSorteo: ${lotteryName}\nJugador: ${playerName}\nTeléfono: ${playerPhone}\nNúmeros de Boleto: ${generatedTicketNumbers.join(', ')}\n\nPor favor, contacta al cliente para confirmar el pago.`;
    const adminWhatsappURLInfo = `https://wa.me/${adminWhatsappNumber}?text=${encodeURIComponent(adminMessageInfo)}`;

    // Alerta al usuario
    alert(`¡Boleto Generado! Tus números ${generatedTicketNumbers.join(', ')} han sido apartados. Se enviará un mensaje a tu WhatsApp (${playerPhone}) para proceder con el pago y confirmar tu compra.`);
    
    // Abrir WhatsApp del cliente
    window.open(clientWhatsappURL, '_blank');
    
    // Abrir WhatsApp del administrador (Primer mensaje)
    window.open(adminWhatsappURLInfo, '_blank');

    setCurrentPage('tickets');
  };

  const handleSaveTicket = (ticketToSave) => {
    // Verificar si el boleto ya está guardado para este usuario
    const isAlreadySaved = savedTickets.some(
      (savedTicket) => savedTicket.id === ticketToSave.id && savedTicket.playerPhone === ticketToSave.playerPhone
    );

    if (!isAlreadySaved) {
      setSavedTickets((prevSaved) => [...prevSaved, ticketToSave]);
      alert('¡Boleto guardado exitosamente! Solo tú podrás verlo.');
    } else {
      alert('Este boleto ya ha sido guardado.');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'form':
        return <TicketForm onGenerateTicket={handleGenerateTicket} />;
      case 'tickets':
        const userTickets = tickets.filter(t => t.playerPhone === tickets[tickets.length - 1]?.playerPhone);
        return <TicketList tickets={userTickets} onSaveTicket={handleSaveTicket} />;
      case 'numbers':
        return <GeneratedNumbersSection generatedNumbers={allGeneratedNumbers} confirmedNumbers={confirmedNumbers} />;
      case 'saved':
        return (
          <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-4xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6 text-center">Mis Boletos Guardados</h2>
            {savedTickets.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">Aún no has guardado ningún boleto.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))}
              </div>
            )}
          </div>
        );
      case 'payment': // Nueva página de método de pago
        return <PaymentMethodPage />;
      default:
        return <HomePage />;
    }
  };

  const buttonClass = (page) => 
    `px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-300 ${
      currentPage === page
        ? 'bg-orange-500 text-white shadow-lg shadow-orange-400/50'
        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md hover:shadow-lg'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-black dark:to-gray-900 text-gray-900 dark:text-white p-4 sm:p-8 font-sans">
      <header className="w-full max-w-6xl mx-auto mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 sm:mb-6 drop-shadow-sm">
          <img src="/logo.jpg" alt="Tu Logo" className="h-full inline-block mr-2" style={{ maxHeight: '3em' }} />
          Sorteos la Mamba
        </h1>
        <nav className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setCurrentPage('home')}
            className={buttonClass('home')}
          >
            Inicio
          </button>
          <button
            onClick={() => setCurrentPage('form')}
            className={buttonClass('form')}
          >
            Generar
          </button>
          <button
            onClick={() => setCurrentPage('tickets')}
            className={buttonClass('tickets')}
          >
            Mis Boletos
          </button>
          <button
            onClick={() => setCurrentPage('numbers')}
            className={buttonClass('numbers')}
          >
            Números Usados
          </button>
          <button
            onClick={() => setCurrentPage('saved')}
            className={buttonClass('saved')}
          >
            Guardados
          </button>
          <button
            onClick={() => setCurrentPage('payment')}
            className={buttonClass('payment')}
          >
            Método de Pago
          </button>
        </nav>
      </header>

      <main className="w-full max-w-6xl mx-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;