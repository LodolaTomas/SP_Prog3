/// <reference path="./node_modules/@types/jquery/index.d.ts" />
$(document).ready(function() {
    $("#formRegister").on('submit', function(evt) {
        evt.preventDefault();
        var apellido = $("#apellido").val();
        var nombre = $("#nombre").val();
        var correo = $("#correo").val();
        var perfil = $("#perfil").val();
        var fotoFile = $('#foto')[0];
        var fotoName = $("#foto").val();
        var pathFoto = (fotoName.split('\\'))[2];
        var clave = $("#clave").val();
        var fm = new FormData();
        var json = { "correo": correo, "clave": clave, "nombre": nombre, "apellido": apellido, "perfil": perfil, "foto": pathFoto };
        fm.append("usuario", JSON.stringify(json));
        fm.append("foto", fotoFile.files[0]);
        $.ajax({
            type: 'POST',
            url: './BACKEND/usuarios',
            data: fm,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function(retorno) {
                console.log(retorno);
                if (retorno.exito) {
                    location.href = "./login.html";
                } else {
                    $("#errorRegister").html("<div class=\"alert alert-danger\" role=\"alert\"><strong>ERROR!</strong> " + retorno.mensaje + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>");
                    $("#errorRegister").show();
                }
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            var retorno = JSON.parse(jqXHR.responseText);
            console.log(retorno);
            $("#errorRegister").html("<div class=\"alert alert-danger\" role=\"alert\"><strong>ERROR!</strong> " + retorno.mensaje + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>");
            $("#errorRegister").show();
        });
    });
});