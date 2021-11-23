/// <reference path="./node_modules/@types/jquery/index.d.ts" />
$(document).ready(function () {
    $("#formRegister").on('submit', function (evt) {
        evt.preventDefault();
        let apellido = $("#apellido").val();
        let nombre = $("#nombre").val();
        let correo = $("#correo").val();
        let perfil = $("#perfil").val();
        let fotoFile: any = $('#foto')[0];
        let fotoName = $("#foto").val();
        let pathFoto = (fotoName.split('\\'))[2];
        let clave = $("#clave").val();
        let fm = new FormData();
        let json: any = { "correo": correo, "clave": clave, "nombre": nombre, "apellido": apellido, "perfil": perfil, "foto": pathFoto };
        fm.append("usuario", JSON.stringify(json));
        fm.append("foto", fotoFile.files[0]);
        $.ajax({
            type: 'POST',
            url: './BACKEND/usuarios',
            data: fm,
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (retorno: any) {
                console.log(retorno);
                if (retorno.exito) {
                    location.href = "./login.html";
                } else {
                    $("#errorRegister").html(`<div class="alert alert-danger" role="alert"><strong>ERROR!</strong> ${retorno.mensaje}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`);
                    $("#errorRegister").show();
                }
            }
        }).fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
            let retorno = JSON.parse(jqXHR.responseText);
            console.log(retorno);
            $("#errorRegister").html(`<div class="alert alert-danger" role="alert"><strong>ERROR!</strong> ${retorno.mensaje}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`);
            $("#errorRegister").show();

        });
    });

});