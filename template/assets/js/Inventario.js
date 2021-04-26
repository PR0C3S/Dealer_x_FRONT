var app = {
    backend: 'http://localhost:8080',
    table: null,
    init: function () {
        app.initDataTable('#tablaPrincipal')


        /* $('#marca').click(function () {
        }) */

        $('#marca').on('focus change', function(){
            $('#modelo').empty();
            //$('#tipo').empty();
            $('#version').empty();
            var nombreMarca = $('#marca').val();
            console.log(nombreMarca);
            $.ajax({
                url: app.backend + '/modelos/marca/?marca=' + nombreMarca,
                dataType: 'json',
                error: function(){
                    alert("Error en la peticion");
                }
            }).done(function(tipos){
                $.each(tipos, function(i,item){
                    $('#modelo').append($('<option>', {
                        value: item.nombreModelo,
                        text: item.nombreModelo
                    }));
                });
            });
        });

        $('#modelo').on('focus change', function(){
            $('#version').empty();
            var nombreModelo = $('#modelo').val();

            $.ajax({
                url: app.backend + '/versiones/modelo/?modelo=' + nombreModelo, 
                dataType: 'json',
                error: function(){
                    alert("Error en la peticion");
                }
            }).done(function(tipos){
                $.each(tipos, function(i,item){
                    $('#version').append($('<option>', {
                        value: item.nombreVersion,
                        text: item.nombreVersion
                        //Version_Vehiculo.nombreVersion
                    }));
                });
            });
        });

        $('#version').on('focus change', function(){
            var nombreVersion = $('#version').val();
            $.ajax({
                url: app.backend + '/versiones/version/?version=' + nombreVersion,
                dataType: 'json',
                error: function(){
                    alert("Error en la peticion");
                },
                success: function(data){
                    $('#puertas').val(data.puertas);
                    $('#pasajeros').val(data.pasajeros);
                    $('#motor').val(data.motor);
                    $('#combustible').val(data.combustible);
                    $('#transmision').val(data.transmision);
                    $('#traccion').val(data.traccion);
                    $('#tipo').val(data.tipo);
                }

            });
        });

        $("#save").click(function(){ //click en el boton de guardar en el modal
            if($('#id_Vehiculo').val() === ''){ //si el input escondido de id esta vacio

                var vehiculo={
                id_Vehiculo: $('#id_Vehiculo').val(), 
                kilometraje: $('#kilometraje').val(),
                accesorios: $('#accesorios').val(),
                ano: $('#year').val(),
                condicion: $('#condicion').val(),
                color_Exterior: $('#colorExt').val(),
                color_Interior: $('#colorInt').val(),
                precio: $('#precio').val(),
                estado: $('#estado').val(),
                tipo: $('#tipo').val(),
                descripcion: $('#descripcion').val()
                }

                var version={
                //id_Version: $('#id_Version'),
                nombreVersion: $('#version').val(),
                puertas: $('#puertas').val(),
                pasajeros: $('#pasajeros').val(),
                motor: $('#motor').val(),
                combustible: $('#combustible').val(),
                transmision: $('#transmision').val(),
                traccion: $('#traccion').val()
                };

                var data={
                    vehiculo:vehiculo,
                    version:version,
                    //nombreModelo:$('#modelo').val(),
                    //file: $('#customFile').val()  //revisar
                };
                app.save( //funcion que llama al save del api
                    data
                );
            }else{ //funcion que llama al edit del api
               var vehiculoEdit={
                id_Vehiculo: $('#id_Vehiculo').val(), 
                kilometraje: $('#kilometraje').val(),
                accesorios: $('#accesorios').val(),
                ano: $('#year').val(),
                condicion: $('#condicion').val(),
                color_Exterior: $('#colorExt').val(),
                color_Interior: $('#colorInt').val(),
                precio: $('#precio').val(),
                estado: $('#estado').val(),
                tipo: $('#tipo').val(),
                descripcion: $('#descripcion').val()
               }
               var versionEdit={
                id_Version: $('#id_Version'),
                nombreVersion: $('#version').val(),
                puertas: $('#puertas').val(),
                pasajeros: $('#pasajeros').val(),
                motor: $('#motor').val(),
                combustible: $('#combustible').val(),
                transmision: $('#transmision').val(),
                traccion: $('#traccion').val()
               }
               var dataEdit={
                   vehiculo: vehiculoEdit,
                   version: versionEdit,
                   //nombreModelo: $('#modelo').val(),
                   //file: $('#customFile').val()
               };
               app.edit(
                   dataEdit
               );
            }
        });
    },
    initDataTable : function(id){ //funcion que llena la tabla de data con el get del api
        app.table = $(id).DataTable({
            ajax : {
                url : app.backend + '/vehiculos/',
                dataSrc : function(json){
                    return json;
                }
            },
            dom: 'Bfrtip',

            columns : [
                {data: "id_Vehiculo"},
                {data: "kilometraje"},
                //{data: "accesorios"},
                {data: "ano"},
                {data: "color_Exterior"},
                {data: "precio"},
                {data: "estado"},
                //cargar imagen
            ],
            buttons: [
                {
                    text : 'Crear',
                    action : function(e, dt, node, config){
                        app.cleanForm();
                        $('#vehiculoModal').modal();
                    }
                },
                {
                    text : 'Editar',
                    action : function(e,dt,node,config){
                        var data = dt.rows('.table-active').data()[0];
                        app.setDataToModal(data);
                        $('#vehiculoModal').modal();
                    }
                },
                {
                    text: 'Eliminar',
                    action : function(e, dt, node, config){
                        var data = dt.rows('.table-active').data()[0];
                        if(confirm('¿Esta seguro que desea eliminar el registro?')){
                            app.delete(data.id_Vehiculo);
                        }
                    }
                }
            ]
        });

        $('#tablaPrincipal tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },
    setDataToModal : function(data){
        console.log(data);
        $('#id_Vehiculo').val(data);
        $('#kilometraje').val(data.kilometraje);
        $('#accesorios').val(data.accesorios);
        $('#condicion').val(data.condicion);
        $('#estado').val(data.estado);
        $('#year').val(data.ano);
        $('#colorExt').val(data);
        $('#colorInt').val(data);
        $('#precio').val(data.precio);
        $('#colorExt').val(data.color_Exterior);
        $('#colorInt').val(data.color_Interior);
        $('#descripcion').val(data.descripcion);
        $('#id_Version').val();
        
        $('#puertas').val(data.versionVehiculo.puertas);
        $('#pasajeros').val(data.versionVehiculo.pasajeros);
        $('#motor').val(data.versionVehiculo.motor);
        $('#combustible').val(data.versionVehiculo.combustible);
        $('#transmision').val(data.versionVehiculo.transmision);
        $('#traccion').val(data.versionVehiculo.traccion);
        
        $('#marca').val(data.versionVehiculo.modeloVehiculo.marcaVehiculo.nombreMarca);
        $('#modelo').val(data.versionVehiculo.modeloVehiculo.nombreModelo);
        $('#version').val(data.versionVehiculo.nombreVersion);
    },

    cleanForm: function(){
        $('#id_Vehiculo').val('');
        $('#kilometraje').val('');
        $('#accesorios').val('');
        $('#year').val('');
        $('#condicion').val('');
        $('#colorExt').val('');
        $('#colorInt').val('');
        $('#precio').val('');
        $('#telefono').val('');
        $('#estado').val('');
        $('#descripcion').val('');
        $('#id_Version').val('');
        $('#puertas').val('');
        $('#pasajeros').val('');
        $('#motor').val('');
        $('#combustible').val('');
        $('#transmision').val('');
        $('#traccion').val('');
        //$('#marca').empty();
        $('#modelo').empty();
        $('#version').empty();
        //$('#modelo').empty();

        $.ajax({
            url: app.backend + '/marcas/',
            dataType: 'json',
            error: function () {
                alert("Error en la petición");
            }
        }).done(function (marcas) {
            $.each(marcas, function (i, item) {
                $('#marca')
                .append($('<option>', {
                    value: item.nombreMarca,
                    text: item.nombreMarca
                }));
            });
        });
    },

    save : function(data){ //api call save
        console.log(data);
        $.ajax({
            url: app.backend + '/vehiculos/save',
            data : JSON.stringify({vehiculo: data.vehiculo, version: data.version}),  //, modelo: data.nombreModelo, file:data.file
            method: 'POST',
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            success : function(json){
                $('#msg').text('Se guardo correctamente');
                $('#msg').show();
                $('#vehiculoModal').modal('hide');
                app.table.ajax.reload();
            },
            error : function (error){
                $('#msg').text(error.error);
                $('#msg').show();
            }
        })
    },
    delete : function(id){ //api call delete
        $.ajax({
            url: app.backend + '/vehiculos/delete' + '?ID=' + id,
            
            method: 'DELETE',
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            success : function(json){
                $('#msg').text('Se elimino correctamente');
                $('#msg').show();
                app.table.ajax.reload();
            },
            error : function (error){
                $('#msg').text(error.error);
                $('#msg').show();
            }
        })
    },
    edit : function(data){ //api call edit

        $.ajax({
            url: app.backend + '/vehiculos/edit' /* + '?ID=' + id */,
            data : JSON.stringify({vehiculo:data.vehiculo, version: data.version}), //, modelo: data.nombreModelo, file:data.file
            method: 'PUT',
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            success : function(json){
                $('#msg').text('Se edito correctamente');
                $('#msg').show();
                app.table.ajax.reload();
            },
            error : function (error){
                $('#msg').text(error.error);
                $('#msg').show();
            }
        })
    }

};

$(document).ready(function(){
    app.init()
});