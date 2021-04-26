var app = {
    backend: 'http://localhost:8080',
    vehiculos: null,
    init: function(){
        app.loadVehiculos();

        $('.proeprty-sh-more').click(function(){
            //console.log($(this).parent().siblings('p').text());
            window.location.href = "vehicul.html?idVehiculo=" + $(this).parent().siblings('p').text();
            //localStorage.setItem("idVehiculo", "abc123");
        });

        $('.nombre').click(function(){
            //console.log($(this).parent().siblings('p').text());
            window.location.href = "vehicul.html?idVehiculo=" + $(this).parent().siblings('p').text();
            //localStorage.setItem("idVehiculo", "abc123");
        });

        $('#submit').click(function (){
            if($('#password') !== "" && $('#correo') !== ""){
                var info = {
                    correo : $("#correo").val(),
                    password: $("#password").val()
                };
                app.login(info);
            }
        });
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
        ).done(function(json) {
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