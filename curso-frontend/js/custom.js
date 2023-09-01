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
   $('.featured-item a').css('margin-top', '10px');
   // $('.featured-item:first h4').start('<span class="badge bg-secondary">Novo</span>')
   // $('.featured-item:first h4').html('<span class="badge bg-secondary">Novo</span>')
   // $('.featured-item:first h4').addClass('active')
   // $('.featured-item:first h4').removeClass('active')
   // $('.featured-item:first h4').toggleClass('active')
   // $('.featured-item:first h4').hide()
   // $('.featured-item:first h4').show()
   // $('.featured-item:first h4').fadeIn(2000)
   // $('.featured-item:first h4').fadeOut()
   //  $('.featured-item:first h4').css('color', '#f00')

   
   // $('.featured-item h4').dblclick( function(){
      
   //    $(this).css({
   //       'color': '#f00',
   //       'background': '#ff0',
   //       'font-weight': '100',
   //    });
      
   // });
   
   /*
    * Manipulação de eventos
    */
   $('.featured-item a').on('click', function(event){
      
      event.preventDefault();
      alert('Produto esgotado');
      
   });

   /* 
    * Callback
    * entendendo ações que começam ao termino de outra
    */
   // $('.featured-item:nth(1)')
   //    .hide(500, function(){
   //       // este é o callback
   //       console.log( $(this).find('h4').text() + ' esgotado')
   //    })
   //    .show(500, function(){
   //       console.log( $(this).find('h4').text() + ' em estoque')
   //    })
 

   /*
    * Animações
    */
   //const duracao = 1000 // equivalenta a 1 segundo

   // $('.featured-item:nth(0)')
   //    .hide(duracao)
   //    .show(duracao)
   //    .fadeOut(duracao)
   //    .fadeIn(duracao)
   //    .toggle(duracao)
   //    .toggle(duracao)

   // $('#form-submit').on('click', function(e){

   //    e.preventDefault()

   //    if( $('#email').val() != '' ){

   //       $('#email').animate({
   //          opacity: "toggle",
   //          top: "-50"
   //       }, 500, function(){
   //          console.log($(this).val())
   //       })

   //    }

   // });


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
    */
   $('.featured-item').each(function() {
      $(this).append('<button class="btn-favorite btn btn-outline-dark"><i class="bi bi-heart"></i></button>');
   });

   // Css para alinhar o botão favoritar
   $('.btn-favorite').css('margin-top', '9px');
 
   /*
    * Manipular evento de clique no botão de favoritar
    */
   $('body').on('click', '.btn-favorite', function(e) {
      e.preventDefault();
      $(this).toggleClass('favorited'); // Alternar classe de favorito
   });

   /*
    * TODO: incrementar a validação
    * - checar se o nome é válido (mais de 2 caracteres)
    * - checar se o email é válido com ao menos um "@" e "."
    * - checar se o cpf é válido com regex
    */

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

});