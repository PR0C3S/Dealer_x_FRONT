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
            $('#tipo').empty();
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


        $('#tipo').on('focus change', function(){
            $('#modelo').empty();
            $('#version').empty();
            var nombreMarca = $('#marca').val();
            var nombreTipo = $('#tipo').val();

            $.ajax({
                url: app.backend + '/modelos/tipomarca/?tipo='+nombreTipo+'&marca=' + nombreMarca,
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
                url: app.backend + '/versiones/modelo/?modelo='+nombreModelo,
                dataType: 'json',
                error: function(){
                    alert("Error en la peticion");
                }
            }).done(function(tipos){
                $.each(tipos, function(i,item){
                    $('#version').append($('<option>', {
                        value: item.nombreVersion,
                        text: item.nombreVersion
                    }));
                });
            });

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
                {data: ""},
                {data: ""},
                {data: ""},
                {data: ""},
                {data: ""},
                {data: ""},
                {data: ""},
                {data: ""},
                {data: ""},
                {data: ""},
            ]

}