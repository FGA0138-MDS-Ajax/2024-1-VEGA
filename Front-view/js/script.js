document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-2');
  const feedbackMessage = document.getElementById('feedback-message');

  form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Impede o envio padrão do formulário

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
          const response = await fetch('/api/reservar_mesa', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          });

          if (response.ok) {
              const result = await response.text();
              feedbackMessage.textContent = result;
              feedbackMessage.style.color = 'green';
          } else {
              const errorText = await response.text();
              feedbackMessage.textContent = errorText;
              feedbackMessage.style.color = 'red';
          }
      } catch (error) {
          feedbackMessage.textContent = 'Erro ao tentar reservar a mesa. Por favor, tente novamente.';
          feedbackMessage.style.color = 'red';
      }
  });
});
