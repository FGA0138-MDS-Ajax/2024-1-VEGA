document.addEventListener('DOMContentLoaded', () => {
    const formReservaMesa = document.getElementById('form-2');
    const feedbackMessageReserva = document.getElementById('feedback-message-reserva');
    const formEnviarFormulario = document.getElementById('form-1');
    const feedbackMessageFormulario = document.getElementById('feedback-message-formulario');

  //------------------------------------------------ Manipula o evento Reserva de Mesa ---------------------------------------------------------
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
  //-----------------------------------------------Manipula o evento formulario -----------------------------------------------------------------------------
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
// ---------------------------------------------- Manipula o evento login ------------------------------------------------
    if (loginFuncionario) {
      loginFuncionario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrao do formulario

        const formData = new FormData(loginFuncionario);
        const data = Object.fromEntries(formData.entries());

        try {
          const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });

          if (response.ok) {
            const result = await response.text();
            feedbackMessageLogin.textContent = result;
            feedbackMessageLogin.style.color = 'green';
          } else {
            const errorText = await response.text();
            feedbackMessageLogin.textContent = errorText;
            feedbackMessageLogin.style.color = 'red';
          }
        } catch (error) {
          feedbackMessageLogin.textContent = 'Erro ao tentar fazer login. Por favor, tente novamente.';
          feedbackMessageLogin.style.color = 'red';
        }
      });
    }



});

    (function ($) {
      "use strict";
    
      /*========== Loader start ================*/
      $(window).on('load', function () {
        $('#loader-wrapper').fadeIn();
        setTimeout(function () {
          $('#loader-wrapper').fadeOut();
        }, 500);
      });
      
      // Password input
      $(".toggle-password").on('click', function () {
    
        $(this).toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("data-toggle"));
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });
    })(jQuery);


    // Get the modal
    

    
  
  