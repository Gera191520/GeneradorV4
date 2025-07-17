import React from 'react';

const PaymentMethodPage = () => {
  // --- INICIO: CONFIGURACIÓN DE DATOS DEL MÉTODO DE PAGO ---
  const paymentInfo = {
    title: "Método de Pago",
    description: "Para confirmar tu participación y asegurar tus números de la suerte, por favor realiza el pago a la siguiente cuenta. Una vez realizado, envía tu comprobante por WhatsApp para validación.",
    accountDetails: [
      { label: "Banco", value: "Banco de la Suerte S.A." },
      { label: "Titular de la Cuenta", value: "Juan Pérez Sorteos" },
      { label: "Número de Cuenta", value: "1234 5678 9012 3456" },
      { label: "CLABE Interbancaria", value: "012345678901234567" },
      { label: "Referencia (Concepto de transferencia)", value: "Tu ID de Boleto" },
    ],
    whatsappContact: "521234567890", // Número de WhatsApp para enviar comprobante
    whatsappMessage: "¡Hola! Ya realicé el pago de mi boleto. Aquí está mi comprobante.",
    instructions: [
      "1. Genera tu boleto.",
      "2. Realiza la transferencia o depósito a la cuenta indicada.",
      "3. Indica tu ID (Identificador) de Boleto como referencia en la transferencia.",
      "4. Toma una captura de pantalla o foto clara de tu comprobante de pago.",
      "5. Envía el comprobante a nuestro número de WhatsApp junto con tu nombre completo y el ID de tu boleto.",
      "6. Recibirás una confirmación de tu pago en breve.",
    ],
  };
  // --- FIN: CONFIGURACIÓN DE DATOS DEL MÉTODO DE PAGO ---

  const handleWhatsappClick = () => {
    const url = `https://wa.me/${paymentInfo.whatsappContact}?text=${encodeURIComponent(paymentInfo.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-2xl mx-auto animate-fade-in">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-orange-500 dark:text-orange-300 mb-6 sm:mb-8 animate-slide-down">
        {paymentInfo.title}
      </h2>
      
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 text-center mb-8 animate-fade-in-delay">
        {paymentInfo.description}
      </p>

      <div className="bg-yellow-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 animate-zoom-in">
        <h3 className="text-xl sm:text-2xl font-bold text-yellow-800 dark:text-yellow-400 mb-4 border-b-2 border-yellow-300 dark:border-yellow-600 pb-2">
          Detalles de la Cuenta
        </h3>
        <ul className="space-y-3">
          {paymentInfo.accountDetails.map((detail, index) => (
            <li key={index} className="flex justify-between items-center text-gray-800 dark:text-gray-200 text-base sm:text-lg">
              <span className="font-semibold text-orange-600 dark:text-orange-300">{detail.label}:</span>
              <span>{detail.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-yellow-100 dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 animate-zoom-in-delay">
        <h3 className="text-xl sm:text-2xl font-bold text-yellow-800 dark:text-yellow-400 mb-4 border-b-2 border-yellow-300 dark:border-yellow-600 pb-2">
          Instrucciones
        </h3>
        <ul className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 text-base sm:text-lg">
          {paymentInfo.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <button 
          onClick={handleWhatsappClick}
          className="bg-orange-500 text-white py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 animate-bounce-in"
        >
          Enviar Comprobante por WhatsApp
        </button>
      </div>
    </div>
  );
};

export default PaymentMethodPage;