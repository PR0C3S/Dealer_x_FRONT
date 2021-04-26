var app = {
    backend: 'http://localhost:8080',
    vehiculos: null,
    init: function(){
        //app.initDataTable('#tablaPrincipal')
        app.loadVehiculos();


    },


    loadVehiculos: function(){
        //app.vehiculos = $.getJSON(app.backend + '/vehiculos/');

        /* $.ajax({
            type: "GET",
            data:'',
            url: app.backend + '/vehiculos/',
            dataType: "json",
            succes: function(data){
                app.vehiculos = data;
            }
        });  */

        jQuery.when(
            jQuery.getJSON(app.backend + '/vehiculos/')
        ).done( function(json) {
            app.vehiculos = json;
            console.log(app.vehiculos);

            $.each($('.vehiculs-box'), function(index,value){
                var strPrecio = '#price' + index;
                var strNombre = '#nombre' + index;
                var strCondicion = '#condicion' + index;
                var strId = '#id' + index;
                var indiceNuevo = app.vehiculos.length - index - 1;

                $(value).find(strId).html(app.vehiculos[indiceNuevo].id_Vehiculo);
                $(value).find(strPrecio).html('$' + app.vehiculos[indiceNuevo].precio);
                $(value).find(strNombre).html(app.vehiculos[indiceNuevo].versionVehiculo.modeloVehiculo.marcaVehiculo.nombreMarca + ' '+
                    app.vehiculos[indiceNuevo].versionVehiculo.modeloVehiculo.nombreModelo + ' ' + 
                    app.vehiculos[indiceNuevo].versionVehiculo.nombreVersion + ' ' + app.vehiculos[indiceNuevo].ano);
                    $(value).find(strCondicion).html(app.vehiculos[indiceNuevo].condicion);
            });

        });
        
    },//end loadVehiculos
};


$(document).ready(function(){
    app.init()
});