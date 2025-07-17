export const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatTicketNumber = (num) => {
  return String(num).padStart(5, '0');
};

export const formatDateTime = (date) => {
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  return new Intl.DateTimeFormat('es-MX', options).format(date);
};

// Se elimina la función generateTicketPdf