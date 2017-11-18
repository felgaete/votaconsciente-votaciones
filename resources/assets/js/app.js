try {
    window.$ = window.jQuery = require('jquery');

    require('materialize-css');

} catch (e) {}

var formatoRut = function(){
    var $this = $(this);
    $this.on('change', function(e){
        var val = this.value.replace(/[\.\-A-Ja-jL-Zl-z]/g, '');
        if(val.length > 1){
            val = val.split('').reverse().join('');
            var dv = val.substring(0, 1);
            var r = val.substring(1);
            r = r.replace(/(\d{3})/g, '$1.').split('').reverse().join('').replace(/^\./, '');
            val = r + '-' + dv;
        }
        this.value = val;
    });
};

var bloquearSubmit = function(){
    var $form = $(this);
    var $btn = $form.find('button[type=submit]');
    $form.on('submit', bloquear($btn))
};

var bloquear = function($btn){
    var sendingText = $btn.data('submit-text') || 'Sending';
    return function(){
        $btn.prop('disabled', true)
            .addClass('sending')
            .text(sendingText);
    };
};

$(function(){
    $('.tooltipped').tooltip();
    $('.ci-field').each(formatoRut);
    $('form.block-on-submit').each(bloquearSubmit);
})
