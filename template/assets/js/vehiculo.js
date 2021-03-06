var app = {
    backend: 'http://localhost:8080',
    vehiculo: null,
    init: function(){
        var myParam = location.search.split('idVehiculo=')[1];
        //console.log(myParam);
        app.loadVehiculo(myParam);

        $("#submit").click(function (){
            if($("#password") !== "" && $("#correo") !== ""){
                var info = {
                    correo : $("#correo").val(),
                    password: $("#password").val()
                };
                app.login(info);
            }
        });

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

            $('#marca').html(json.versionVehiculo.modeloVehiculo.marcaVehiculo.nombreMarca);
            $('#modelo').html(json.versionVehiculo.modeloVehiculo.nombreModelo);
            $('#version').html(json.versionVehiculo.nombreVersion);
            $('#tipo').html(json.versionVehiculo.tipo);
            $('#colorExterior').html(json.color_Exterior);
            $('#colorInterior').html(json.color_Interior);
            $('#anno').html(json.ano);
            $('#condicion').html(json.condicion);
            $('#estado').html(json.estado);
            $('#transmision').html(json.versionVehiculo.transmision);
            $('#traccion').html(json.versionVehiculo.traccion);
            $('#kilometraje').html(json.kilometraje + 'KM');
            $('#combustible').html(json.versionVehiculo.combustible);
            $('#pasajeros').html(json.versionVehiculo.pasajeros);
            $('#puertas').html(json.versionVehiculo.puertas);
            $('#motor').html(json.versionVehiculo.motor);

            $('#descripcion').html(json.descripcion);
            $('#accesorios').html(json.accesorios);

            $('#precio').html('Precio: $' + json.precio);







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

    login: function(info) {
        console.log(info)
        $.ajax({
            url: app.backend + '/empleados/login',
            data: {email: info.correo, password: info.password},
            method: "GET",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (json){
                //alert(json.authenticated);
                if (json.authenticated === "true") {
                    //app.logged = true;
                    //console.log('klk');
                    window.location.href = "Dashboard.html"
                }else{
                    alert(json.message);
                }
            }
        })
    }//end login
};


$(document).ready(function(){
    app.init()
});