var app = {
    backend: 'http://localhost:8080',
    logged: false,

    init: function () {

        $("#submit").click(function (){
            if($("#password") !== "" && $("#correo") !== ""){
                var info = {
                    correo : $("#correo").val(),
                    password: $("#password").val()
                };
                app.login(info);
            }

        })
    },

    login: function(info) {
        console.log(info)
        $.ajax({
            url: app.backend + '/empleados/login',
            data: {email: info.correo, password: info.password},
            method: "GET",
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (json){
                //alert(json.authenticated);
                if (json.authenticated === "true") {
                    //app.logged = true;
                    window.location.href = "Dashboard.html"
                }else{
                    alert(json.message);
                }
            }
        })
    }
};
$(document).ready(function(){
    app.init()
    if(app.logged){
        let div = document.getElementById('iniciarbtn');
        div.style.display = 'none';
    }
});