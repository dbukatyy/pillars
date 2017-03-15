jQuery(document).ready(function () {

    var topMenu = $('.header-top');

    $('.footer__img img').on('mouseover', function (e) {
        $(this).attr('src','assets/templates/vygoda/img/logo-txt.png');
    });
 
    $('.footer__img img').on('mouseout', function (e) {
        $(this).attr('src','assets/templates/vygoda/img/logo-light.png');
    });

   $('#panel').on('scroll', function (e) {

        var scrollTop = $(this).scrollTop();

        if (scrollTop > 100) {
            topMenu.addClass('bgr');
        } else {
            topMenu.removeClass('bgr');
        }
    });


    // aside menu
   
    var controller = new slidebars();
        controller.init();

    $( '.hamburger' ).on( 'click', function ( event ) {
    // Stop default action and bubbling
        event.stopPropagation();
        event.preventDefault();

        // Toggle the Slidebar with id 'id-1'
        controller.open('id-1');
    });

    $('#menu .btn-close').on('click', function (e) {
        controller.close('id-1');
    });

    // popup window
    $('.alert .btn-close').on('click', function (e) {
        $(this).closest('.alert').hide();
    });

    $('.alert').on('click', function (e) {
        e.stopPropagation();
        $(this).hide();
    });


    // form validate
    function validate () {
       
        var valid = true,
            inputs =  $('#orderForm input').not('#agree'),
            textarea = $('#message');

       inputs.each( function () {

            if ( $(this).val() === '' ) {
                valid = false;
                return false;
            } 
       });

       if (valid) {
            valid = !(textarea.val() === '');

            if (valid) {
                valid = agree.checked;
            }
       } 
      
      return valid;
    }

    // ajax send form
    $('#orderForm .button').on('click', function (e) {
        e.preventDefault();
        
        var win = $('.alert'),
            message = $('.alert__body'),
            errorMsg = $('.msg'),
            form = document.querySelector('#orderForm'),
            valid = validate ();

        function showMessage(data) {
            message.text(data);
            win.css('display','flex');
        }

        if (valid) {

             $.ajax({    
                url: $("#orderForm").attr('action'),
                data: $("#orderForm").serialize(),
                type: 'POST',
                success: function(data){
                    showMessage(data);
                },
                error: function(){
                    showMessage('Ошибка отправки. Пожалуйста, повторите попытку.');
                },
                complete: function(){
                    setTimeout(function () {
                        win.fadeOut(500);
                    }, 3000);

                    form.reset();
                }
            });
         } else {
            errorMsg.css('opacity', '1');
            setTimeout( function () {
                errorMsg.css('opacity', '0');
            }, 5000);
         }
    });
});


