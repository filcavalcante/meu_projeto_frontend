// instancia jquery e evita conflitos
// jQuery( function($){
$(document).ready(function(){

   $('.owl-carousel').owlCarousel();
   let titulos = $('h4'); // tag
   let itens = $('.featured-item'); // class
   let destaques = $('#featured'); // id
   
   // Configuração de produtos
   $('.featured-item a').addClass('btn btn-dark stretch-link');
   $('.featured-item h6').css('color', '#f00');
   $('.featured-item h4').append('  <span class="badge bg-secondary">Novo!</span>');
   $('.featured-item a').css('margin-top', '10px', 'margin-right', '10px'); // Adicionar espaço entre os elementos "botão comprar"
   
   /*
    * Manipulação de eventos
    */
   $('.featured-item a').on('click', function(event){
      
      event.preventDefault();
      alert('Produto esgotado');
      
   });

   
   /*
    * Ouvinte de eventos .nav-modal-open
    */
   $('.nav-modal-open').on('click', function(e){

      e.preventDefault();
      let elem = $(this).attr('rel');
      $('.modal-body').html($('#'+elem).html());
      $('.modal-header h5.modal-title').html($(this).text());
      let myModal = new bootstrap.Modal($('#modelId'));
      myModal.show();

   });

   /*
    * Adicionar botão de favoritar e manipular evento de clique
    * O evento de clique será implementado depois, por enquanto será exibido apenas a visualização do botão
    */
    var lordIcon = $('<lord-icon>', {
        src: 'https://cdn.lordicon.com/ytuosppc.json',
        colors: 'primary:#dc94ee, secondary:#dc94ee',
        stroke: '50',
        style: 'width:50px; height:50px; vertical-align: middle; margin-left: 10px; top: 4px;'
    });

   // Adiciona o elemento lord-icon à div .featured-item
   $('.featured-item').append(lordIcon);

   // Função para validar o nome
   function isValidName(name) {
      const regex = /^[a-zA-Z ]{3,}$/;
      return regex.test(name);
   };
 
   // Função para validar o email
   function isValidEmail(email) {
       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       return regex.test(email);
   };
 
   // Função para validar o CPF    
   function isValidCPF(cpf) {
       const regex = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/;
       if (!regex.test(cpf)) return false;
 
       cpf = cpf.replace(/\D/g, '');
       const cpfArray = cpf.split('').map(Number);
 
       const sum1 = cpfArray.slice(0, 9).reduce((acc, digit, idx) => acc + digit * (10 - idx), 0);
       const mod1 = (sum1 * 10) % 11;
       const check1 = (mod1 === 10 || mod1 === cpfArray[9]);
 
       const sum2 = cpfArray.slice(0, 10).reduce((acc, digit, idx) => acc + digit * (11 - idx), 0);
       const mod2 = (sum2 * 10) % 11;
       const check2 = (mod2 === 10 || mod2 === cpfArray[10]);
 
       return check1 && check2;
   };
 
   // Função para validar data
   function isValidDate(date) {
       const regex = /^\d{2}\/\d{2}\/\d{4}$/;
       if (!regex.test(date)) return false;
 
       const parts = date.split('/');
       const day = parseInt(parts[0], 10);
       const month = parseInt(parts[1], 10);
       const year = parseInt(parts[2], 10);
 
       if (month < 1 || month > 12 || day < 1 || day > 31) return false;
 
       const checkDate = new Date(year, month - 1, day);
       return checkDate.getFullYear() === year && checkDate.getMonth() === (month - 1);
   };
  
   // Validação campo CEP
   $('body').on('blur', '#cep', function(){
      const input = $(this);
      const cleanedValue = input.val().replace(/\D/g, '');
      if (cleanedValue.length !== 8) {
          input.addClass('invalid');
          input.parent().find('.text-muted').show();
      } else {
          input.removeClass('invalid');
          input.parent().find('.text-muted').hide();
      }
      input.val(cleanedValue.replace(/^(\d{5})(\d{3})$/, '$1-$2'));
   });
 
   // Validação campo Nome
   $('body').on('blur', '#nome', function(){
       const input = $(this);
       if (!isValidName(input.val())) {
           input.addClass('invalid');
           input.parent().find('.text-muted').show();
       } else {
           input.removeClass('invalid');
           input.parent().find('.text-muted').hide();
       }
   });
 
   // Validação campo Email
   $('body').on('blur', '#email', function(){
       const input = $(this);
       if (!isValidEmail(input.val())) {
           input.addClass('invalid');
           input.parent().find('.text-muted').show();
       } else {
           input.removeClass('invalid');
           input.parent().find('.text-muted').hide();
       }
   });

    // Validação campo Mensagem
    $('body').on('blur', '#msg', function(){
        const input = $(this);
        if (input.val().trim().length < 4) {
            input.addClass('invalid');
            input.parent().find('.text-muted').show();
        } else {
            input.removeClass('invalid');
            input.parent().find('.text-muted').hide();
        }
    });
 
   // Validação campo CPF
   $('body').on('blur', '#cpf', function(){
       const input = $(this);
       if (!isValidCPF(input.val())) {
           input.addClass('invalid');
           input.parent().find('.text-muted').show();
       } else {
           input.removeClass('invalid');
           input.parent().find('.text-muted').hide();
       }
   });
 
   // Validação campo data
   $('body').on('blur', '#date', function(){
       const input = $(this);
       if (!isValidDate(input.val())) {
           input.addClass('invalid');
           input.parent().find('.text-muted').show();
       } else {
           input.removeClass('invalid');
           input.parent().find('.text-muted').hide();
       }
       input.val(input.val().replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3'));
   });

   // Validação campo celular
   $('#phone').on('input', function() {
        const input = $(this);
        const cleanedValue = input.val().replace(/\D/g, ''); // Remover caracteres não numéricos
        if (cleanedValue.length > 0) {
            input.val(cleanedValue.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3'));
        }
    });
    
    // Validação campo celular
    $('body').on('blur', '#phone', function() {
        const input = $(this);
        const cleanedValue = input.val().replace(/\D/g, '');
        // Verificar o comprimento do número
        if (cleanedValue.length !== 11) { 
           input.addClass('invalid');
           input.parent().find('.text-muted').show();
        } else {
           input.removeClass('invalid');
           input.parent().find('.text-muted').hide();
        }
     });

   // Validação campo Hora
   $('body').on('blur', '#time', function(){
       const input = $(this);
       const cleanedValue = input.val().replace(/\D/g, '');
       if (cleanedValue.length !== 4) {
           input.addClass('invalid');
           input.parent().find('.text-muted').show();
       } else {
           input.removeClass('invalid');
           input.parent().find('.text-muted').hide();
       }
       input.val(cleanedValue.replace(/^(\d{2})(\d{2})$/, '$1:$2'));
   });

   $('body').on('blur', '#emailLogin', function() {
        const input = $(this);
        const email = input.val();
        if (!isValidEmail(email)) {
            input.addClass('invalid');
            input.parent().find('.text-muted').show();
        } else {
            input.removeClass('invalid');
            input.parent().find('.text-muted').hide();
        }
    });

    // Função para validar a força da senha
    function isStrongPassword(password) {
        // Pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    // Evento de blur para validar a força da senha
    $('body').on('blur', '#senhaLogin', function() {
        const input = $(this);
        const password = input.val();
        
        if (!isStrongPassword(password)) {
            input.addClass('invalid');
            input.parent().find('.text-muted').show();
        } else {
            input.removeClass('invalid');
            input.parent().find('.text-muted').hide();
        }
    });

   // Evento para o campo Data
   $('body').on('focus', '#date', function(){
      $(this).datepicker();
   });

   // Máscara para o campo Data
   $('body').on('blur', '#date', function(){
      $(this).mask('00/00/0000');
   });

   // Máscara para o campo Hora
   $('body').on('blur', '#time', function(){
      $(this).mask('00:00');
   });

   // Máscara para o campo CEP
   $('body').on('blur', '#cep', function(){
      $(this).mask('00000-000');
   });

   // Máscara para o campo Celular
   $('body').on('blur', '#phone', function(){
      $(this).mask('(00)00000-0000');
   });

   // Máscara para o campo CPF
   $('body').on('blur', '#cpf', function(){
      $(this).mask('000.000.000-00');
   });

    // Array de usuários e senhas (apenas para fins de demonstração)
    const users = [
        { username: 'fil@gmail.com', password: 'Senha123!' },
        { username: 'teste@teste.com', password: 'Senha456@' },
    ];

    $('#modelId').on('show.bs.modal', function() {
        // Limpa campos e mensagens quando a modal for aberta
        $('#emailLogin').val('');
        $('#senhaLogin').val('');
        $('.msg-login').remove(); // Remove a mensagem anterior, se existir
        $('.modal-body').children().show();
    });

    
    $('body').on('click', '#btnLogin', function(event) {
        event.preventDefault();

        console.log("Button clicked!");
        
        // Verifica se há campos inválidos ou vazios
        const invalidFields = $('.invalid');
        const emailInput = $('#emailLogin').val();
        const passwordInput = $('#senhaLogin').val();
        
        if (invalidFields.length > 0 || emailInput === '' || passwordInput === '') {
            // Exibe uma mensagem de erro acima do botão
            const errorMsg = $('<div class="msg-login error-msg">Preencha todos os campos corretamente.</div>');
            errorMsg.insertBefore(this);

            // Remove a mensagem após 3 segundos
            setTimeout(function() {
                errorMsg.remove();
            }, 3000);

            return; // Impede o envio do formulário
        };

        const msg = $('.msg-login');

        const usernameInput = $('#emailLogin').val();
        const user = users.find(u => u.username === usernameInput && u.password === passwordInput);
        
        if (user) {
            // Esconde todos os elementos dentro da modal e exibe mensagem de sucesso
            $('.modal-body').children().hide();
            msg.remove(); // Remove mensagem anterior, se existir
            const successMsg = $('<div class="msg-login success-msg">Login realizado com sucesso!</div>');
            $('.modal-body').append(successMsg);
        
            // Mostra a mensagem por 3 segundos e depois fecha a modal
            setTimeout(function() {
                $('#modelId').modal('hide');
            }, 3000);
        } else {
            // Esconde todos os elementos dentro da modal e exibe mensagem de erro
            $('.modal-body').children().hide();
            msg.remove(); // Remove mensagem anterior, se existir
            const errorMsg = $('<div class="msg-login error-msg">Usuário ou senha incorretos. Tente novamente.</div>');
            $('.modal-body').append(errorMsg);
        
            // Limpa mensagem de erro após 3 segundos e mostrar os elementos novamente
            setTimeout(function() {
                errorMsg.remove();
                $('#emailLogin').val(''); // Limpa campo de e-mail
                $('#senhaLogin').val(''); // Limpa campo de senha
                $('.modal-body').children().show();
            }, 3000);
        }
    });

});