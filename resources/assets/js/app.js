try {
    window.$ = window.jQuery = require('jquery');

    require('materialize-css');

} catch (e) {}

var formatoRut = function(){
    var $this = $(this);
    $this.on('change, input', function(e){
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

$(function(){
    $('.tooltipped').tooltip();
    $('.ci-field').each(formatoRut);
})
