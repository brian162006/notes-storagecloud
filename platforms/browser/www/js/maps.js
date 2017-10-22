var app = {
    inicio: function(){
        this.iniciarFastClick();
    },

    iniciarFastClick: function(){
        FastClick.attach(document.body);
    },

    dispositivoListo: function(){
        navigator.geolocation.getCurrentPosition(app.pintarCoordenadasEnMapa, app.errorAlSolicitarLocalizacion);
    },

    pintarCoordenadasEnMapa: function(position){
        var miMapa = L.map('map').setView([position.coords.latitude, position.coords.longitude],13);

        L.tileLayer('https://api.mapbox.com/styles/v1/brian162006/cj8pgwxff9m3e2rnt0lvc7u1g/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnJpYW4xNjIwMDYiLCJhIjoiY2o4cGZ2Mm8wMGY5cjJxcXUxeWpzaHQzYiJ9.6_tX4fxvgKRFR7PjXjXZdA',{
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
            maxZoom: 18
        }).addTo(miMapa);

        app.pintaMarcador([position.coords.latitude, position.coords.longitude],'¡Estoy aqui!', miMapa);

        miMapa.on('click',function(evento){
            var texto = 'Marcador en l('+ evento.latlng.lat.toFixed(2) + ') y L('+ evento.latlng.lng.toFixed(2)+')';
            app.pintaMarcador(evento.latlng,texto, miMapa);
        });
    },

    pintaMarcador: function(latlng,texto, mapa){
        var marcador = L.marker(latlng).addTo(mapa);
        marcador.bindPopup(texto).openPopup();
    },

    errorAlSolicitarLocalizacion: function(error){
        console.log(error.code +': '+error.message);
    }
};

if ('addEventListener' in document){
    document.addEventListener('DOMContentLoaded',function(){
        app.inicio();
    },false);
    document.addEventListener('deviceready',function(){
        app.dispositivoListo();
    }, false);
}