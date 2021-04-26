var app = {
    backend: 'http://localhost:8080',
    vehiculo: null,
    init: function(){
        var myParam = location.search.split('idVehiculo=')[1];
        //console.log(myParam);
        app.loadVehiculo(myParam);


    },


    loadVehiculo: function(id){
        jQuery.when(
            jQuery.getJSON(app.backend + '/vehiculos/id?id=' + Number(id))
        ).done(function(json) {
            app.vehiculo = json;
            console.log(app.vehiculo);

            $('#nombre').html(json.versionVehiculo.modeloVehiculo.marcaVehiculo.nombreMarca + ' '+ 
            json.versionVehiculo.modeloVehiculo.nombreModelo + ' ' +
            json.versionVehiculo.nombreVersion + ' ' + json.ano);

            $('#precio').html('Precio: $' + json.precio);
            $('#marca').html(json.versionVehiculo.modeloVehiculo.marcaVehiculo.nombreMarca);
            $('#modelo').html(json.versionVehiculo.modeloVehiculo.nombreModelo);

            $('#tipo').html(json.versionVehiculo.tipo);
            $('#colorExt').html(json.color_Exterior);
            $('#kilometraje').html(json.kilometraje + 'KM');
            $('#combustible').html(json.versionVehiculo.combustible);
            //$('#precio').html('Precio: $' + json.precio);

            /* $.each($('.vehiculs-box'), function(index,value){
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
            }); */

        });
        
    },//end loadVehiculos
};


$(document).ready(function(){
    app.init()
});