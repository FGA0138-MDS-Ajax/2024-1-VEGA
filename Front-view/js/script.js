document.addEventListener('DOMContentLoaded', () => {
    const formReservaMesa = document.getElementById('form-2');
    const feedbackMessageReserva = document.getElementById('feedback-message-reserva');
    const formEnviarFormulario = document.getElementById('form-1');
    const feedbackMessageFormulario = document.getElementById('feedback-message-formulario');
  
    if (formReservaMesa) {
      formReservaMesa.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário
  
        const formData = new FormData(formReservaMesa);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const response = await fetch('/api/reservar_mesa', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          if (response.ok) {
            const result = await response.text();
            feedbackMessageReserva.textContent = result;
            feedbackMessageReserva.style.color = 'green';
          } else {
            const errorText = await response.text();
            feedbackMessageReserva.textContent = errorText;
            feedbackMessageReserva.style.color = 'red';
          }
        } catch (error) {
          feedbackMessageReserva.textContent = 'Erro ao tentar reservar a mesa. Por favor, tente novamente.';
          feedbackMessageReserva.style.color = 'red';
        }
      });
    }
  
    if (formEnviarFormulario) {
      formEnviarFormulario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário
  
        const formData = new FormData(formEnviarFormulario);
        const data = Object.fromEntries(formData.entries());
  
        try {
          const response = await fetch('/api/enviar_formulario', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          if (response.ok) {
            const result = await response.text();
            feedbackMessageFormulario.textContent = result;
            feedbackMessageFormulario.style.color = 'green';
          } else {
            const errorText = await response.text();
            feedbackMessageFormulario.textContent = errorText;
            feedbackMessageFormulario.style.color = 'red';
          }
        } catch (error) {
          feedbackMessageFormulario.textContent = 'Erro ao tentar enviar o formulário. Por favor, tente novamente.';
          feedbackMessageFormulario.style.color = 'red';
        }
      });
    }
  });
  