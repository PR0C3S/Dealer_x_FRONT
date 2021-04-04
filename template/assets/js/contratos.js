var app = {
    backend: 'http://localhost:8080/contratos',
    init: function(){
        app.initDataTable('#tablaPrincipal')
    },
    initDataTable : function(id){
        $(id).DataTable({
            ajax : {
                url : app.backend + '/',
                dataSrc : function(json){
                    return json;
                }
            },
            columns : [
                {data : "id_Cliente"},
                {data : "nombreCompleto"},
                {data : "cedula"},
                {data : "sexo"},
                {data : "email"},
                {data : "celular"},
                {data : "telefono"}

            ]
        });
    }
};

$(document).ready(function(){
    app.init()
});