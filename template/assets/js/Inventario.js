var app = {
    backend: 'http://localhost:8080',
    table: null,
    init: function () {
        app.initDataTable('#tablaPrincipal')


        $('#marca').click(function () {
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
        })

        $('#marca').on('focus change', function(){
            $('#modelo').empty();
            //$('#tipo').empty();
            $('#version').empty();
            var nombreMarca = $('#marca').val();

            $.ajax({
                url: app.backend + '/modelos/marca/?nombreMarca=' + nombreMarca,
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
            //$('#tipo').empty();
            //$('#version').empty();
            var nombreVersion = $('#version').val();

            $.ajax({
                url: app.backend + '/versiones/marca/?nombreMarca=' + nombreVersion, //*
                dataType: 'json',
                error: function(){
                    alert("Error en la peticion");
                }
            }).done(function(tipos){
                $.each(tipos, function(i,item){
                    $('#version').append($('<option>', {
                        value: item.nombreVersion, //*
                        text: item.nombreVersion
                        //Version_Vehiculo.nombreVersion
                    }));
                });
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
                estado: $('#telefono').val(),
                tipo: $('#estado').val(),
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
                    nombreModelo:$('#modelo').val(),
                    file: $('#customFile').val()  //revisar
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
                estado: $('#telefono').val(),
                tipo: $('#estado').val(),
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
                   nombreModelo: $('#modelo').val(),
                   file: $('#customFile').val()
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
        $('#id_Vehiculo').val(data);
        $('#kilometraje').val(data);
        $('#accesorios').val(data);
        $('#year').val(data);
        $('#condicion').val(data);
        $('#colorExt').val(data);
        $('#colorInt').val(data);
        $('#precio').val(data);
        $('#telefono').val(data);
        //$('#estado').val(data);
        $('#descripcion').val(data);
        $('#id_Version').val();
        //$('#version').val();
        $('#puertas').val();
        $('#pasajeros').val();
        $('#motor').val();
        //$('#combustible').val();
        //$('#transmision').val();
        //$('#traccion').val();
        //$('#modelo').val();
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
        $('#estado').empty();
        $('#descripcion').val('');
        $('#id_Version').val('');
        $('#version').empty();
        $('#puertas').val('');
        $('#pasajeros').val('');
        $('#motor').val('');
        $('#combustible').empty();
        $('#transmision').empty();
        $('#traccion').empty();
        $('#modelo').empty();
    },

    save : function(data){ //api call save
        console.log(data.file);
        $.ajax({
            url: app.backend + '/vehiculos/save',
            data : JSON.stringify({vehiculo: data.vehiculo, version: data.version, modelo: data.nombreModelo, file:data.file}),
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
            data : JSON.stringify({vehiculo:data.vehiculo, version: data.version, modelo: data.nombreModelo, file:data.file}),
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