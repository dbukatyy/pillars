jQuery(document).ready(function () {

    var windoWidth = window.innerWidth,
        fixed = document.querySelector('.header');

// aside menu

    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('mobile-menu'),
        'padding': 256,
        'tolerance': 70,
        'side': 'right'
    });

    slideout.on('translate', function(translated) {
      fixed.style.transform = 'translateX(' + translated + 'px)';
    });

    slideout.on('beforeopen', function () {
      fixed.style.transition = 'transform 300ms ease';
      fixed.style.transform = 'translateX(-256px)';
    });

    slideout.on('beforeclose', function () {
      fixed.style.transition = 'transform 300ms ease';
      fixed.style.transform = 'translateX(0px)';
    });

    slideout.on('open', function () {
      fixed.style.transition = '';
    });

    slideout.on('close', function () {
      fixed.style.transition = '';
    });

    $('.hamburger').on('click', function (e) {
        $(this).toggleClass('hamburger_active');
        slideout.toggle();
    });

// fullpage
    $('#fullpage').fullpage({
        anchors:['pindex','pservice','ppillars', 'pconditions', 'pcontacts'],
        navigation:true,
        menu:'#menu',
        onLeave: function(index, nextIndex, direction){
            
            var leavingSection = $(this),
                bgVideo = $('.bg-video');
                
            if (index == 2 && direction =='down'){
                
                if (windoWidth > 850) {
                    bgVideo.css('left', '45%');               
                } else {
                    bgVideo.css('left', '41%');
                }

            }

            else if (index == 3 && direction == 'up'){
                bgVideo.css('left', '60%'); 
            }

            else if (index == 4 && direction == 'up'){
                
                if (windoWidth > 850) {
                    bgVideo.css('left', '45%');               
                } else {
                    bgVideo.css('left', '41%');
                }

            }
        }
    });

    if (windoWidth < 992) {
        $.fn.fullpage.destroy();
         $('.header').css('background', 'transparent');
    }

    // map
    
    var latlng = new google.maps.LatLng("52.0969256", "23.7300");

    var myOptions = {
        zoom: 12,
        center: latlng,
        navigationControlOptions: {
            style: google.maps.NavigationControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.querySelector(".map"),myOptions);

    map.scrollwheel=true;
    map.setOptions({ mapTypeControl:true});

    var locations = [
        {
            title: 'Домус Сити',
            position: {lat: 52.0969256, lng: 23.7400777},
            icon: {
                url: "../img/marker-fill.png",
            }

        },
        {
            title: 'ТЦ Экватор',
            position: {lat: 52.1090827, lng: 23.7701758},
            icon: {
                url: "../img/marker-fill.png",
            }
        },
        {
            title: 'Галерея Гранд',
            position: {lat: 52.0964521, lng: 23.68949268},
            icon: {
                url: "../img/marker-fill.png",
            }
        },
        {
            title: 'ТЦ Алми',
            position: {lat: 52.0836334, lng: 23.7308067},
            icon: {
                url: "../img/marker-fill.png",
            }
        },
        {
            title: 'Дидас персия',
            position: {lat: 52.0941779, lng: 23.6903513},
            icon: {
                url: "../img/marker-fill.png",
            }
        },
        {
            title: 'Интурист',
            position: {lat: 52.0859475, lng: 23.68748378},
            icon: {
                url: "../img/marker-fill.png",
            }
        },
        {
            title: 'Кинотеатр Беларусь',
            position: {lat: 52.090839, lng: 23.6925745},
            icon: {
                url: "../img/marker-fill.png",
            }
        }                                           
    ];

    locations.forEach( function( element ) {
        var marker = new google.maps.Marker({
            position: element.position,
            map: map,
            title: element.title,
            icon: element.icon,
        });
    });


    // validate form
   $('.form__btn .btn').on('click', function (e) {
        e.preventDefault();

        var msg = $('.alert'),
            // message = $('.form-alert .msg'),
            form = $('.form'),
            inputs =  $('.form__field'),
            // errorMsg = form.find('.error'),
            valid = validate();


        function validate () {
       
            var valid = true;

            // console.log(inputs );

            inputs.each( function () {

                if ( $(this).val() === '' ) {
                     // console.log($(this).val());
                    valid = false;
                    return false;
                } 
            });
               
            return valid;
        }

        function showMessage(data) {
            msg.html(data);
            msg.css('display', 'flex');
        }

        if (valid) {

             $.ajax({    
                url: form.attr('action'),
                data: form.serialize(),
                type: 'POST',
                success: function(data){
                    showMessage(data);
                    msg.css('color', 'rgba(39,179,101,.8)');
                },
                error: function(){
                    showMessage('Ошибка отправки. Пожалуйста, повторите попытку.');
                    msg.css('color', 'rgba(158,26,47,.8)');
                },
                complete: function(){
                    setTimeout(function () {
                        msg.css('display', 'none');
                    }, 2000);
                    form[0].reset();
                }
            });
         } else {
            showMessage('Пожалуйста, заполните все поля.')
            msg.css('color', 'rgba(158,26,47,.8)');
            setTimeout( function () {
                msg.css('display', 'none');
            }, 2000);
         }
    });

   $(document).on('scroll', function (e) {
        $(this).scrollTop() > 300 ? $('.header').css('background', '#fff') : $('.header').css('background', 'transparent');
   });
});