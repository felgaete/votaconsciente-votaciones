try {
    window.$ = window.jQuery = require('jquery');

    require('materialize-css');

} catch (e) {}

$(function(){
    $('.tooltipped').tooltip();
})
