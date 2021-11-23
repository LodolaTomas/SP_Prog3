/// <reference path="./node_modules/@types/jquery/index.d.ts" />
function ListadoUsuarios() {
    $.ajax({
        type: 'GET',
        url: './BACKEND/',
        dataType: "text",
        data: {},
        async: true,
        success: function (retorno) {
            var respuesta = JSON.parse(retorno);
            if (respuesta.exito) {
                var listaElementos = respuesta.lista;
                var html = '<table class="table table-hover"><tr><th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Foto</th></tr>';
                listaElementos.forEach(function (element) {
                    html += "<tr><td>" + element.correo + "</td>\n                    <td>" + element.nombre + " </td>\n                    <td> " + element.apellido + " </td>\n                    <td> " + element.perfil + "</td>\n                    <td><img src=\"BACKEND/fotos/" + element.foto + "\" width=\"50px\" height=\"50px\"></td></tr>";
                });
                html += '</table>';
                $("#tabDerecha").html(html);
            }
            else {
                $("#error").html("<div class=\"alert alert-danger\" role=\"alert\">\n                        <strong>ERROR!</strong> " + retorno.mensaje + "\n                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                        <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                        </div>");
                $("#error").show();
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        $("#error").html("<div class=\"alert alert-danger\" role=\"alert\">\n            <strong>ERROR!</strong> " + retorno.mensaje + "\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>");
        $("#error").show();
    });
}
function ListadoAutos() {
    $.ajax({
        type: 'GET',
        url: './BACKEND/autos',
        dataType: "text",
        success: function (retorno) {
            var respuesta = JSON.parse(retorno);
            if (respuesta.exito) {
                var listaElementos = respuesta.lista;
                var html = "<table class=\"table table-hover\"><tr><th>Marca</th><th>color</th><th>Modelo</th><th>Precio</th><th>Eliminar</th><th>Modificar</th></tr>";
                listaElementos.forEach(function (element) {
                    html += "<tr><td>" + element.marca + "</td>\n                    <td> " + element.color + " </td>\n                    <td> " + element.modelo + " </td>\n                    <td> " + element.precio + " </td>\n                    <td><input type=\"button\" value=\"Eliminar\" onclick=\"EliminarAuto(" + element.id + ")\" class=\"btn-danger form-control\"></td>\n                    <td><input type='button' value='Modificar' onclick='ModificarAuto(" + JSON.stringify(element) + ")' class='btn-info form-control'></td></tr>";
                });
                html += '</table>';
                $("#tabIzquierda").html(html);
            }
            else {
                $("#error").html("<div class=\"alert alert-danger\" role=\"alert\">\n                <strong>ERROR!</strong> " + retorno.mensaje + "\n                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n                  <span aria-hidden=\"true\">&times;</span>\n                </button>\n              </div>");
                $("#error").show();
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        $("#error").html("<div class=\"alert alert-danger\" role=\"alert\">\n            <strong>ERROR!</strong> " + retorno.mensaje + "\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>");
        $("#error").show();
    });
}
function VerificarJWT() {
    var jwt = localStorage.getItem("jwt");
    $.ajax({
        type: 'GET',
        url: "./BACKEND/login",
        dataType: "json",
        data: {},
        headers: { "token": jwt },
        async: true
    }).done(function (resultado) {
        console.log(resultado);
        var aux = resultado.datos;
        console.log(aux.data);
        localStorage.setItem("data", JSON.stringify(aux.data));
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        localStorage.removeItem("jwt");
        localStorage.removeItem("data");
        alert(retorno.mensaje);
        location.href = "./login.html";
    });
}
function EliminarAuto(id) {
    VerificarJWT();
    if (confirm("Seguro que desea Eliminar el Auto?")) {
        var jwt = localStorage.getItem("jwt");
        $.ajax({
            type: 'DELETE',
            url: "./BACKEND/",
            dataType: "json",
            data: { "id_auto": id },
            headers: { "token": jwt },
            async: true
        }).done(function (resultado) {
            ListadoAutos();
            if (resultado.exito) {
                $("#error").html("<div class=\"alert alert-success\" role=\"alert\">\n        <strong>EXITO!</strong> " + resultado.mensaje + "\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>");
                $("#error").show();
            }
            else {
                $("#error").html("<div class=\"alert alert-warning\" role=\"alert\">\n        <strong>ERROR!</strong> " + resultado.mensaje + "\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>");
                $("#error").show();
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            var retorno = JSON.parse(jqXHR.responseText);
            var data = retorno.data;
            $("#error").html("<div class=\"alert alert-warning\" role=\"alert\">\n        <strong>ERROR!</strong> El Usuario:" + data.nombre + " " + data.apellido + ", " + retorno.mensaje + " Para Eliminar\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>");
            $("#error").show();
        });
    }
}
function ModificarAuto(json) {
    var html = "<div class=\"container-fluid\" style=\"background-color: darkcyan;\">\n    <form action=\"\">\n    <div class=\"form-group\">\n    <div class=\"row mt-1\">\n    <div class=\"col-1 mt-3\" ><label for=\"marca\" class=\"fas fa-trademark \"></label></div>\n    <div class=\"col mt-3\"><input type=\"text\" id=\"marca\" class=\"form-control\" value=\"" + json.marca + "\" placeholder=\"Marca\"></div></div>\n    <div class=\"row mt-1\">\n    <div class=\"col-1\"><label for=\"color\" class=\"fas fa-palette \"></label></div>\n    <div class=\"col\"><input type=\"text\" id=\"color\" class=\"form-control\" value=\"" + json.color + "\" placeholder=\"Color\"></div></div>\n    <div class=\"row mt-1\">\n    <div class=\"col-1\"><label for=\"modelo\" class=\"fas fa-car\"></label></div>\n    <div class=\"col\"><input type=\"text\" id=\"modelo\" class=\"form-control\" value=\"" + json.modelo + "\" placeholder=\"Modelo\"></div></div>\n    <div class=\"row mt-1\">\n    <div class=\"col-1\"><label for=\"precio\" class=\"fas fa-dollar-sign \"></label></div>\n    <div class=\"col\"><input type=\"text\" id=\"precio\" class=\"form-control\" value=\"" + json.precio + "\" placeholder=\"Precio\"></div>\n    </div><div class=\"row mt-3\">\n    <div class=\"col ml-5\"><input type=\"button\" value=\"Modificar\" class=\"btn-success form-control\" onclick=\"Modificar(" + json.id + ")\"></div>\n    <div class=\"col mr-5\"><input type=\"reset\" value=\"Limpiar\" class=\"btn-warning form-control\" ></div>\n    </div>\n    </div></form></div>";
    $("#tabIzquierda").html(html);
}
function Modificar(id) {
    VerificarJWT();
    var marca = $("#marca").val();
    var color = $("#color").val();
    var modelo = $("#modelo").val();
    var precio = $("#precio").val();
    var pagina = "./BACKEND/";
    var auto = { "marca": marca, "color": color, "modelo": modelo, "precio": precio };
    var jwt = localStorage.getItem("jwt");
    var token = { "token": jwt };
    $.ajax({
        url: pagina,
        type: "PUT",
        headers: token,
        dataType: "json",
        cache: false,
        data: { "id_auto": id, "auto": JSON.stringify(auto) },
        async: true
    }).done(function (resultado) {
        if (resultado.exito) {
            ListadoAutos();
            $("#error").html("<div class=\"alert alert-success\" role=\"alert\">\n            <strong>EXITO!</strong> " + resultado.mensaje + "\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>");
            $("#error").show();
        }
        else {
            $("#error").html("<div class=\"alert alert-warning\" role=\"alert\">\n            <strong>ERROR!</strong> " + resultado.responseText + "\n            <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n              <span aria-hidden=\"true\">&times;</span>\n            </button>\n          </div>");
            $("#error").show();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        var data = retorno.data;
        $("#error").html("<div class=\"alert alert-warning\" role=\"alert\">\n        <strong>ERROR!</strong> El Usuario:" + data.nombre + " " + data.apellido + ", " + retorno.mensaje + " Para Modificar\n        <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>");
        $("#error").show();
    });
}
