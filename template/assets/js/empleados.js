var app = {
    backend: 'http://localhost:8080/empleados',
    table: null,
    init: function(){
        app.initDataTable('#tablaPrincipal')

        $("#save").click(function(){
            // if($('#id').val() === ''){
                app.save({

                    //datos de la persona
                    //id: $('#id').val(),
                    nombreCompleto : $('#Nombre').val(),
                    cedula: $('#Cedula').val(),
                    email: $('#Correo').val(),
                    //fecha_Creacion: $('#FechaNacimiento').val(),
                    sexo: $('#Sexo').val(),

                    celular : $('#Celular').val(),
                    telefono: $('#Telefono').val(),
                    password: $('#Contrasena').val(),
                    //ConfContrasena: $('#ConfContrasena').val(),
                    tipo: $('#Tipo').val(),
                    //cuentaBancaria: $('#Cuenta').val(),
                    estado: $('#Estado').val(),

                    /*
                                        //datos de residencia
                                        Provincia: $('#Provincia').val(),
                                        Municipio: $('#Municipio').val(),
                                        Sector: $('#Sector').val(),
                                        Calle: $('#Calle').val(),
                                        Casa: $('#Casa').val(),
                                        Apartamento: $('#Apartamento').val()*/

                });
            // } else {
            //     app.edit($('id').val()*1,
            //         {
            //             //datos de la persona
            //             //id: $('#id').val(),
            //             Nombre : $('#Nombre').val(),
            //             Cedula: $('#Cedula').val(),
            //             Correo: $('#Correo').val(),
            //             FechaNacimiento: $('#FechaNacimiento').val(),
            //             Sexo: $('#Sexo').val(),
            //             Celular : $('#Celular').val(),
            //             Telefono: $('#Telefono').val(),
            //             Contrasena: $('#Contrasena').val(),
            //             ConfContrasena: $('#ConfContrasena').val(),
            //             Tipo: $('#Tipo').val(),
            //             Cuenta: $('#Cuenta').val(),
            //             Estado: $('#Estado').val(),
            //             /*
            //                                 //datos de residencia
            //                                 Provincia: $('#Provincia').val(),
            //                                 Municipio: $('#Municipio').val(),
            //                                 Sector: $('#Sector').val(),
            //                                 Calle: $('#Calle').val(),
            //                                 Casa: $('#Casa').val(),
            //                                 Apartamento: $('#Apartamento').val()*/
            //
            //
            //         });
            // }
        });
    },
    initDataTable : function(id){
        app.table = $(id).DataTable({
            ajax : {
                url : app.backend + '/',
                dataSrc : function(json){
                    return json;
                }
            },
            dom: 'Bfrtip',

            columns : [
                //datos de la persona
                {data : "id_Empleado"},
                {data : "nombreCompleto"},
                {data : "cedula"},
                {data : "email"},
                {data : "fecha_Creacion"},
                {data : "sexo"},
                {data : "celular"},
                {data : "telefono"},
                {data : "password"},
                //{data : "ConfContrasena"},
                {data : "tipo"},
                //{data : "Cuenta"},
                {data : "estado"}

                //
                // //datos de residencia
                // {data : "Provincia"},
                // {data : "Municipio"},
                // {data : "Sector"},
                // {data : "Calle"},
                // {data : "Casa"},
                // {data : "Apartamento"}
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
                            app.delete(data.id);
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
        //datos de la persona
        $('#id').val(data.id),
            $('#Nombre').val(data.nombreCompleto),
            $('#Cedula').val(data.cedula),
            $('#Correo').val(data.email),
            $('#FechaNacimiento').val(data.fecha_Nacimiento),
            $('#Sexo').val(data.sexo),
            $('#Celular').val(data.celular),
            $('#Telefono').val(data.telefono),
            $('#Contrasena').val(data.password),
            //$('#ConfContrasena').val(data.confpassword),
            $('#Tipo').val(data.Tipo),
            //$('#Cuenta').val(data.Cuenta),
            $('#Estado').val(data.Estado)


        /* //datos de residencia
         $('#Provincia').val(data.Provincia),
         $('#Municipio').val(data.Municipio),
         $('#Sector').val(data.Sector),
         $('#Calle').val(data.Calle),
         $('#Casa').val(data.Casa),
         $('#Apartamento').val(data.Apartamento)*/
    },
    cleanForm: function(){

        //datos de la persona
        $('#id').val(''),
            $('#Nombre').val(''),
            $('#Cedula').val(''),
            $('#Correo').val(''),
            $('#FechaNacimiento').val(''),
            $('#Sexo').val('< Seleccionar sexo >'),
            $('#Celular').val(''),
            $('#Telefono').val(''),
            $('#Contrasena').val(''),
            $('#ConfContrasena').val(''),
            $('#Tipo').val('< Seleccionar tipo de empleado >'),
            $('#Cuenta').val(' '),
            $('#Estado').val('< Seleccionar estado >')

        //datos de residencia
        $('#Provincia').val('< Seleccionar provincia >'),
            $('#Municipio').val('< Seleccionar municipio >'),
            $('#Sector').val(''),
            $('#Calle').val(''),
            $('#Casa').val(''),
            $('#Apartamento').val('')
    },

    save : function(data){
        $.ajax({
            url: app.backend + '/save',
            data : JSON.stringify(data),
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
    delete : function(id){
        $.ajax({
            url: app.backend + '/delete' + '?ID=' + id,

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
    edit : function(id,data){
        $.ajax({
            url: app.backend + '/edit' + '?ID=' + id,
            data : JSON.stringify(data),

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

