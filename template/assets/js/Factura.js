var app = {
    backend: 'http://localhost:8080',
    table: null,
    init: function(){
        app.initDataTable('#tablaFactura')

        $("#buscar").click(function(){ //click en el boton de buscar en el modal
            if($('#id_Contrato').val() === ''){ //si el input escondido de id esta vacio

            }else{
                app.getById(data.contrato)
            }
        });

        $("#save").click(function(){ //click en el boton de guardar en el modal
            if($('#id_Factura').val() === ''){ //si el input escondido de id esta vacio

                var factura={
                    id_Factura: $('#id_Factura').val(),
                    contrato: $('#id_Contrato').val(),
                    Vehiculo: $('#Vehiculo').val(),
                    cliente: $('#cliente').val(),
                    deuda: $('#deuda').val(),
                    pagadopor: $('#pagadopor').val(),
                    Monto: $('#Monto').val(),
                    celular: $('#celular').val(),
                    telefono: $('#telefono').val()
                }
                var data={
                    factura: factura
                }
                //funcion que llama al save del api
                app.save(data);
            } else { //funcion que llama al edit del api
                var facturaEdit={
                    contrato: $('#id_Contrato').val(),
                    Vehiculo: $('#Vehiculo').val(),
                    cliente: $('#cliente').val(),
                    deuda: $('#deuda').val(),
                    pagadopor: $('#pagadopor').val(),
                    Monto: $('#Monto').val(),
                    celular: $('#celular').val(),
                    telefono: $('#telefono').val()
                }
                var dataEdit={
                    factura: facturaEdit
                }
                app.edit(dataEdit);
            }

        });
    },
    initDataTable : function(id){ //funcion que llena la tabla de data con el get del api
        app.table = $(id).DataTable({
            ajax : {
                url : app.backend + '/facturas/',
                dataSrc : function(json){
                    return json;
                }
            },
            dom: 'Bfrtip',

            columns : [
                //datos de la factura
                {data : "IDFactura"},
                {data : "contrato.ID_Contrato"},
                {data : "fecha"},
                {data : "contrato.cliente.nombreCompleto"},
                {data : "pagadopor"},
                {data : "Monto"},
                {rowId:"IDFactura"}
            ],
            buttons: [
                {
                    text : 'Crear',
                    action : function(e, dt, node, config){
                        app.cleanForm();
                        $('#facturaModal').modal();
                    }
                },
                {
                    text : 'Editar',
                    action : function(e,dt,node,config){
                        var data = dt.rows('.table-active').data()[0];
                        app.setDataToModal(data);
                        $('#facturaModal').modal();
                    }
                },
                {
                    text: 'Eliminar',
                    action : function(e, dt, node, config){
                        var data = dt.rows('.table-active').data()[0];
                        if(confirm('¿Esta seguro que desea eliminar el registro?')){
                            app.delete(data.id_Factura);
                        }
                    }
                }
            ]
        });

        $('#tablaFactura tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },
    setDataToModal : function(data){
        $('#id_Factura').val(data.id_Factura);
        $('#id_Contrato').val('');
        $('#cliente').val(data.contrato.cliente.nombreCompleto);
        $('#pagadopor').val(data.pagadopor);
        $('#Monto').val(data.Monto);
        $('#vehiculo').val('');

    },
    cleanForm: function(){ //vacia la data de la modal
        $('#id_Factura').val('');
        $('#id_Contrato').val('');
        $('#cliente').val('');
        $('#pagadopor').val('');
        $('#Monto').val('');
        $('#vehiculo').val('');
    },

    save : function(data){ //api call save

        $.ajax({
            url: app.backend + '/facturas/save',///save/' + sector,
            data : JSON.stringify({cliente: data.cliente, ubicacion: data.ubicacion, sector: data.nombreSector}),
            method: 'POST',
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            success : function(json){
                $('#msg').text('Se guardo correctamente');
                $('#msg').show();
                $('#facturaModal').modal('hide');
                app.table.ajax.reload();
            },
            error : function (error){
                $('#msg').text(error.error);
                $('#msg').show();
            }
        })
    },

    getById : function(id){
        $.ajax({
            url: app.backend + '/contratos/id' + '?ID=' + id,
            method: 'GET',
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            success : function(json){
                $('#id_Contrato').val(json.contrato.ID_Contrato);
                $('#cliente').val(json.contrato.cliente);
                $('#deuda').val('');
                $('#pagadopor').val('');
                $('#Monto').val('');
                $('#vehiculo').val('');

            },
            error : function (error){
                $('#msg').text(error.error);
                $('#msg').show();
            }
        })
    },

    delete : function(id){ //api call delete
        $.ajax({
            url: app.backend + '/facturas/delete' + '?ID=' + id,

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
        console.log(data);
        console.log(data.factura.id_Factura);
        $.ajax({
            url: app.backend + '/facturas/edit' /* + '?ID=' + id */,
            data : JSON.stringify({factura:data.factura}),
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