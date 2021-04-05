var app = {
    backend: 'http://localhost:8080/contratos',
    table : null,
    init: function() {
        app.initDatatable('#factura');

        $("#save").click(function(){
            app.save({

                //datos de la factura
                contrato : $('#contrato').val(),
                Tipo: $('#Tipo').val(),
                IDVendedor: $('#IDVendedor').val(),
                IDCliente: $('#IDCliente').val(),
            });
        });
    },
    initDatatable : function(id) {
        app.table = $(id).DataTable({
            ajax : {
                url : app.backend + '/all',
                dataSrc : function(json) {
                    return json;
                }
            },
            dom: 'Bfrtip',
            columns : [

                //datos de la persona
                {data : "id"},
                {data : "contrato"},
                {data : "cliente"},
                {data : "pagadopor"},
                {data : "Monto"}
            ],
            buttons: [
                {
                    text : 'Editar',
                    action : function(e, dt, node, config) {
                        var data = dt.rows('.table-active').data()[0];
                        app.setDataToModal(data);
                        $('#empleadoModal').modal();
                    }
                }
            ]
        });

        $('#empleado tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')) {
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },
    setDataToModal : function(data) {

        //datos de la factura
        $('#id').val(data.id),
            $('#contrato').val(),
            $('#cliente').val(),
            $('#pagadopor').val(),
            $('#Monto').val()
    },
    save : function(data) {
        $.ajax({
            url: app.backend + '/save',
            data : JSON.stringify(data),
            method: 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            success : function(json) {
                $("#msg").text('Se guardó la factura correctamente');
                $("#msg").show();
                $('#contratoModal').modal('hide');
                app.table.ajax.reload();
            },
            error : function(error) {
            }
        })
    }
};

$(document).ready(function(){
    app.init();
});