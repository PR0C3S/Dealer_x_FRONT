var app = {
    backend: 'http://localhost:8080/empleados',
    table : null,
    init: function() {
        app.initDatatable('#empleado');

        $("#save").click(function(){
            app.save({

                //datos de la persona
                id: $('#id').val(),
                nombre : $('#nombre').val(),
                cedula: $('#cedula').val(),
                email: $('#email').val(),
                bday: $('#bday').val(),
                Sexo: $('#Sexo').val(),
                password: $('#password').val(),
                confpassword: $('#confpassword').val(),
                Tipo: $('#Tipo').val(),
                Cuenta: $('#Cuenta').val(),
                Estado: $('#Estado').val(),
                cel : $('#cel').val(),
                tel: $('#tel').val(),

                //datos de residencia
                Provincia: $('#Provincia').val(),
                Municipio: $('#Municipio').val(),
                Sector: $('#Sector').val(),
                Calle: $('#Calle').val(),
                Casa: $('#Casa').val(),
                Apartamento: $('#Apartamento').val()

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
                {data : "nombre"},
                {data : "cedula"},
                {data : "email"},
                {data : "bday"},
                {data : "Sexo"},
                {data : "Tipo"},
                {data : "password"},
                {data : "confpassword"},
                {data : "Cuenta"},
                {data : "Estado"},
                {data : "cel"},
                {data : "tel"},

                //datos de residencia
                {data : "Provincia"},
                {data : "Municipio"},
                {data : "Sector"},
                {data : "Calle"},
                {data : "Casa"},
                {data : "Apartamento"}
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

        //datos de la persona
        $('#id').val(data.id),
            $('#nombre').val(data.nombre),
            $('#cedula').val(data.cedula),
            $('#email').val(data.email),
            $('#bday').val(data.bday),
            $('#Tipo').val(data.Tipo),
            $('#Cuenta').val(data.Cuenta),
            $('#password').val(data.password),
            $('#confpassword').val(data.confpassword),
            $('#Estado').val(data.Estado),
            $('#Sexo').val(data.Sexo),
            $('#cel').val(data.cel),
            $('#tel').val(data.tel),

            //datos de residencia
            $('#Provincia').val(data.Provincia),
            $('#Municipio').val(data.Municipio),
            $('#Sector').val(data.Sector),
            $('#Calle').val(data.Calle),
            $('#Casa').val(data.Casa),
            $('#Apartamento').val(data.Apartamento)
    },
    save : function(data) {
        $.ajax({
            url: app.backend + '/save',
            data : JSON.stringify(data),
            method: 'POST',
            dataType : 'json',
            contentType: "application/json; charset=utf-8",
            success : function(json) {
                $("#msg").text('Se guardó la persona correctamente');
                $("#msg").show();
                $('#empleadoModal').modal('hide');
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