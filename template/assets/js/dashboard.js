$(document).ready(function(){

    //count clientes
    $.ajax({
        url: 'http://localhost:8080/clientes/count',
        //data : JSON.stringify(data),
        method: 'GET',
        dataType : 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            //console.log(json);
            $('#countClientes').text(json);
        },
        error: function (error) {
            $('#countClientes').text(error.error);
        }
    }),

    //count ubicaciones
    $.ajax({
        url: 'http://localhost:8080/clientes/countUbicacion',
        //data : JSON.stringify(data),
        method: 'GET',
        dataType : 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            //console.log(json);
            $('#countUbicacion').text(json);
        },
        error: function (error) {
            $('#countUbicacion').text(error.error);
        }
    }),
        //count vehiculos disponibles
    $.ajax({
        url: 'http://localhost:8080/vehiculos/count',
        //data : JSON.stringify(data),
        method: 'GET',
        dataType : 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            //console.log(json);
            $('#countVehiculos').text(json);
        },
        error: function (error) {
            $('#countVehiculos').text(error.error);
        }
    }),

    $.ajax({
        url: 'http://localhost:8080/empleados/count',
        //data : JSON.stringify(data),
        method: 'GET',
        dataType : 'json',
        contentType: 'application/json; charset=utf-8',
        success: function (json) {
            //console.log(json);
            $('#countEmpleados').text(json);
        },
        error: function (error) {
            $('#countEmpleados').text(error.error);
        }
    })

    //funcion de contar contratos
    //funcion de contar formularios
    //funcion de cargar datos de tabla
    //funcion de editar en la tabla
    //funcion de eliminar en la tabla


});