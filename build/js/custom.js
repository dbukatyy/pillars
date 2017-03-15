jQuery(document).ready(function () {


// aside menu

    var slideout = new Slideout({
        'panel': document.getElementById('panel'),
        'menu': document.getElementById('mobile-menu'),
        'padding': 256,
        'tolerance': 70,
        'side': 'right'
    });

    $('#fullpage').fullpage({
        anchors:['index','service','pillars', 'conditions', 'contacts'],
        navigation:true,
        menu:'#menu',
    });
});