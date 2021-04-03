var app = {
    backend: 'http://localhost:8080/clientes',
    table: null,
    init: function(){
        app.initDataTable('#tablaPrincipal')

        $("#save").click(function(){
            if($('#id_Cliente').val() === ''){
                //console.log($('#id_Cliente').val());
                app.save({
                    /* id : $('#id_Cliente').val(), */
                    nombreCompleto: $('#nombreCompleto').val(),
                    cedula: $('#cedula').val(),
                    email: $('#email').val(),
                    fecha_Nacimiento: $('#fecha_Nacimiento').val(),
                    sexo: $('#sexo').val(),
                    celular: $('#celular').val(),
                    telefono: $('#telefono').val()
                });
            } else {
                app.edit($('id_Cliente').val()*1,
                {
                    nombreCompleto: $('#nombreCompleto').val(),
                    cedula: $('#cedula').val(),
                    email: $('#email').val(),
                    fecha_Nacimiento: $('#fecha_Nacimiento').val(),
                    sexo: $('#sexo').val(),
                    celular: $('#celular').val(),
                    telefono: $('#telefono').val()
                });
            }
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
                {data : "id_Cliente"},
                {data : "nombreCompleto"},
                {data : "cedula"},
                {data : "sexo"},
                {data : "email"},
                {data : "celular"},
                {data : "telefono"},
                //{data : "fecha_Nacimiento"}

                //{data : "ubicacion"},
                //{data : "contratos"}
            ],
            buttons: [
                {
                    text : 'Crear',
                    action : function(e, dt, node, config){
                        app.cleanForm();
                        $('#clienteModal').modal();
                    }
                },
                {
                    text : 'Editar',
                    action : function(e,dt,node,config){
                        var data = dt.rows('.table-active').data()[0];
                        app.setDataToModal(data);
                        $('#clienteModal').modal();
                    }
                },
                {
                    text: 'Eliminar',
                    action : function(e, dt, node, config){
                        var data = dt.rows('.table-active').data()[0];
                        if(confirm('¿Esta seguro que desea eliminar el registro?')){
                            app.delete(data.id_Cliente);
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
        $('#id_Cliente').val(data.id_Cliente);
        $('#nombreCompleto').val(data.nombreCompleto);
        $('#cedula').val(data.cedula);
        $('#email').val(data.email);
        $('#fecha_Nacimiento').val(data.fecha_Nacimiento);
        $('#sexo').val(data.sexo);
        $('#celular').val(data.celular);
        $('#telefono').val(data.telefono);
        //$('#ubicacion').val(data.ubicacion);
        //$('#contratos').val(data.contratos);
        //datos de residencia
        /* $('#provincia').val(data.Provincia);
        $('#municipio').val(data.Municipio);
        $('#sector').val(data.Sector);
        $('#calle').val(data.Calle);
        $('#casa').val(data.Casa);
        $('#apartamento').val(data.Apartamento); */
    },
    cleanForm: function(){
        $('#id_Cliente').val('');
        $('#nombreCompleto').val('');
        $('#cedula').val('');
        $('#email').val('');
        $('#fecha_Nacimiento').val('');
        $('#sexo').val('');
        $('#celular').val('');
        $('#telefono').val('');
        //$('#ubicacion').val(data.ubicacion);
        //$('#contratos').val(data.contratos);
        //datos de residencia
        /* $('#provincia').val('');
        $('#municipio').val('');
        $('#sector').val('');
        $('#calle').val('');
        $('#casa').val('');
        $('#apartamento').val(''); */
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
                $('#clienteModal').modal('hide');
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