try {

    require('chart.js');

} catch (e) {}

var ChartResultado = function(eleccion){
    this.eleccion = eleccion;
    this.error = false;
    this.creator = null;
};

ChartResultado.prototype.getCanvas = function(){
    return document.getElementById('resultado-eleccion-' + this.eleccion.id);
};

ChartResultado.prototype.loadData = function (data) {
    this.eleccion = data;
};

ChartResultado.prototype.getData = function(callback){
    var self = this;
    var url = '/resultados/eleccion/' + this.eleccion.id;
    $.ajax({
        type: 'get',
        url: url,
        error: function(){
            self.error = true;
        }
    }).done(function(data){
        self.loadData(data);
        callback();
    });
};

ChartResultado.prototype.loadChart = function () {
    var self = this;
    this.getData(function(){
        self.creator = new ChartCreator(self.getCanvas(), self.eleccion.candidaturas);
        self.creator.draw();
    });
};

var ChartCreator = function(container, candidaturas){
    this.candidaturas = candidaturas;
    this.container = container;
    this.chart = null;
};

ChartCreator.prototype.labels = function () {
    return this.candidaturas.map(function(candidatura){
        return candidatura.politico.nombre;
    });
};

ChartCreator.prototype.data = function () {
    return this.candidaturas.map(function(candidatura){
        var portion = 100 * candidatura.resultado.votos / candidatura.resultado.total_votos;
        return Math.round(portion * 100) / 100;
    });
};

ChartCreator.prototype.draw = function () {
    this.chart = new Chart(this.container, {
        type: 'horizontalBar',
        data: {
            labels: this.labels(),
            datasets: [{
                label: '% de votos',
                data: this.data(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
};

window.loadCharts = function(votaciones){
    for(item in votaciones){
        for(jitem in votaciones[item].elecciones){
            var eleccion = votaciones[item].elecciones[jitem];
            chart = new ChartResultado(eleccion);
            chart.loadChart();
        }
    }
};
