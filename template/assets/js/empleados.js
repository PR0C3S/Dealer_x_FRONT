var app = {

    //password: document.getElementById("password"),
    //confirm_password: document.getElementById("confirm_password"),
    backend: 'http://localhost:8080',
    table: null,
    init: function(){
        app.initDataTable('#tablaPrincipal')

        $('#provincia').click(function(){
            $.ajax({
                url: app.backend + '/provincias/',
                dataType: 'json',
                error: function(){
                    alert("Error en la peticion");
                }
            }).done(function(provincias){
                $.each(provincias, function(i,item){
                    $('#provincia')
                        .append($('<option>', {
                            value: item.nombreProvincia,
                            text: item.nombreProvincia
                        }));
                });
            });
        })

        $('#provincia').on('focus change', function(){
            $('#municipio').empty();
            $('#sector').empty();
            var nombreProvincia = $("#provincia").val();

            $.ajax({
                url: app.backend + '/municipios/municipiosenprovincia/?nombreProvincia=' + nombreProvincia,
                dataType: 'json',
                error: function(){
                    alert("Error en la peticion");
                }
            }).done(function(tipos){
                $.each(tipos, function(i,item){
                    $('#municipio').append($('<option>', {
                        value: item.nombreMunicipio,
                        text: item.nombreMunicipio
                    }));
                });
            });
        });

        $('#municipio').on('focus change', function(){
            $('#sector').empty();
            var nombreMunicipio = $("#municipio").val();

            $.ajax({
                url: app.backend + '/sectores/sectoresenmunicipio/?nombreMunicipio=' + nombreMunicipio,
                dataType: 'json',
                error: function(){
                    alert("Error en la peticion");
                }
            }).done(function(tipos){
                $.each(tipos, function(i,item){
                    $('#sector').append($('<option>', {
                        value: item.nombreSector,
                        text: item.nombreSector
                    }));
                });
            });
        });

        $("#save").click(function(){ //click en el boton de guardar en el modal

            if( password.value != confirm_password.value){

                window.alert("Error");
                alert("Las contraseñas no coinciden");
                //confirm_password.setCustomValidity("Passwords Don't Match");
            }else{
                //confirm_password.setCustomValidity('');
                if($('#id_Empleado').val() === ''){ //si el input escondido de id esta vacio
                    var empleado={
                        id_Empleado: $('#id_Empleado').val(),
                        nombreCompleto: $('#nombreCompleto').val(),
                        password: $('#password').val(),
                        cedula: $('#cedula').val(),

                        tipo: $('#tipo').val(),
                        estado: $('#estado').val(),

                        email: $('#email').val(),
                        sexo: $('#sexo').val(),
                        celular: $('#celular').val(),
                        telefono: $('#telefono').val()
                    }
                    var ubicacion={
                        calle: $('#calle').val(),
                        casa: $('#casa').val(),
                    };

                    var data={
                        empleado:empleado,
                        ubicacion:ubicacion,
                        nombreSector:$('#sector').val()
                    };
                    app.save( //funcion que llama al save del api
                        data
                    );
                }else{ //funcion que llama al edit del api
                    var empleadoEdit={
                        id_Empleado: $('#id_Empleado').val(),
                        nombreCompleto: $('#nombreCompleto').val(),
                        cedula: $('#cedula').val(),
                        email: $('#email').val(),
                        password: $('#password').val(),
                        sexo: $('#sexo').val(),
                        celular: $('#celular').val(),
                        telefono: $('#telefono').val(),
                        tipo: $('#tipo').val(),
                        estado: $('#estado').val()
                    }
                    var ubicacionEdit={
                        id_Ubicacion: $('#id_Ubicacion').val(),
                        calle: $('#calle').val(),
                        casa: $('#casa').val()
                    }
                    var dataEdit={
                        empleado: empleadoEdit,
                        ubicacion: ubicacionEdit,
                        nombreSector: $('#sector').val()
                    };
                    app.edit(
                        dataEdit
                    );
                }
            }

            

            //password.onchange = validatePassword;
            //confirm_password.onkeyup = validatePassword;


        });
    },
    initDataTable : function(id){ //funcion que llena la tabla de data con el get del api
        app.table = $(id).DataTable({
            ajax : {
                url : app.backend + '/empleados/',
                dataSrc : function(json){
                    return json;
                }
            },
            dom: 'Bfrtip',

            columns : [
                {data : "id_Empleado"},
                {data : "nombreCompleto"},
                {data : "cedula"},
                {data : "sexo"},
                {data : "email"},
                {data : "celular"},
                {data : "telefono"},
                {data : "tipo"},
                {data : "estado"},

            ],
            buttons: [
                {
                    text : 'Crear',
                    action : function(e, dt, node, config){
                        app.cleanForm();
                        $('#empleadoModal').modal();
                    }
                },
                {
                    text : 'Editar',
                    action : function(e,dt,node,config){
                        var data = dt.rows('.table-active').data()[0];
                        app.setDataToModal(data);
                        $('#empleadoModal').modal();
                    }
                },
                {
                    text: 'Eliminar',
                    action : function(e, dt, node, config){
                        var data = dt.rows('.table-active').data()[0];
                        if(confirm('¿Esta seguro que desea eliminar el registro?')){
                            app.delete(data.id_Empleado);
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
        $('#id_Empleado').val(data.id_Empleado);
        $('#nombreCompleto').val(data.nombreCompleto);
        $('#cedula').val(data.cedula);
        $('#email').val(data.email);
        $('#sexo').val(data.sexo);
        $('#celular').val(data.celular);
        $('#telefono').val(data.telefono);

        $('#tipo').val(data.tipo),
        $('#estado').val(data.estado),

        $('#id_Ubicacion').val(data.ubicacion.id_Ubicacion);
        //estos 3 no se como cargarlos bien
        //$('#provincia').append(data.ubicacion.sector.nombreMunicipio.nombreProvincia.nombreProvincia).select();
        //$('#municipio').append(data.ubicacion.sector.nombreMunicipio.nombreMunicipio);
        //$('#sector').append(data.ubicacion.sector.nombreSector);
        $('#calle').val(data.ubicacion.calle);
        $('#casa').val(data.ubicacion.casa);
    },
    cleanForm: function(){ //vacia la data de la modal
        $('#id_Cliente').val('');
        $('#id_Ubicacion').val('');
        $('#nombreCompleto').val('');
        $('#cedula').val('');
        $('#email').val('');
        $('#password').val('');
        $('#sexo').val('');
        $('#celular').val('');
        $('#telefono').val('');
        $('#calle').val('');
        $('#casa').val('');
        $('#provincia').empty();
        $('#municipio').empty();
        $('#sector').empty();
    },

    save : function(data){ //api call save

        $.ajax({
            url: app.backend + '/empleados/save',///save/' + sector,
            data : JSON.stringify({empleado: data.empleado, ubicacion: data.ubicacion, sector: data.nombreSector}),
            method: 'POST',
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            success : function(json){
                $('#msg').text('Se guardo correctamente');
                $('#msg').show();
                $('#empleadoModal').modal('hide');
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
            url: app.backend + '/empleados/delete' + '?ID=' + id,

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
            url: app.backend + '/empleados/edit' /* + '?ID=' + id */,
            data : JSON.stringify({empleado:data.empleado, ubicacion: data.ubicacion, sector: data.nombreSector}),
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
    },

    validate: function validatePassword(){
        if(password.value != confirm_password.value) {
            return false;
          confirm_password.setCustomValidity("Passwords Don't Match");
          
        } else {
            return true;
            confirm_password.setCustomValidity('');

        }
    }
};

$(document).ready(function(){
    app.init()
});

