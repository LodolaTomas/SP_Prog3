/// <reference path="./node_modules/@types/jquery/index.d.ts" />

function ListadoUsuarios() {
    $.ajax({
        type: "GET",
        url: "./BACKEND/",
        dataType: "text",
        data: {},
        async: true,
        success: function (retorno: any) {
            let respuesta = JSON.parse(retorno);
            if (respuesta.exito) {
                let listaElementos = respuesta.lista;
                var html =
                    '<table class="table table-hover"><tr><th>Correo</th><th>Nombre</th><th>Apellido</th><th>Perfil</th><th>Foto</th></tr>';
                listaElementos.forEach(function (element) {
                    html += `<tr><td>${element.correo}</td>
                    <td>${element.nombre} </td>
                    <td> ${element.apellido} </td>
                    <td> ${element.perfil}</td>
                    <td><img src="BACKEND/fotos/${element.foto}" width="50px" height="50px"></td></tr>`;
                });
                html += "</table>";
                $("#tabDerecha").html(html);
            } else {
                $("#error").html(`<div class="alert alert-danger" role="alert">
                        <strong>ERROR!</strong> ${retorno.mensaje}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`);
                $("#error").show();
            }
        },
    }).fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
        let retorno = JSON.parse(jqXHR.responseText);
        $("#error").html(`<div class="alert alert-danger" role="alert">
            <strong>ERROR!</strong> ${retorno.mensaje}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`);
        $("#error").show();
    });
}

function ListadoAutos() {
    $.ajax({
        type: "GET",
        url: "./BACKEND/autos",
        dataType: "text",
        success: function (retorno: any) {
            let respuesta = JSON.parse(retorno);
            if (respuesta.exito) {
                let listaElementos = respuesta.lista;
                var html = `<table class="table table-hover"><tr><th>Marca</th><th>color</th><th>Modelo</th><th>Precio</th><th>Eliminar</th><th>Modificar</th></tr>`;
                listaElementos.forEach(function (element) {
                    html += `<tr><td>${element.marca}</td>
                    <td> ${element.color} </td>
                    <td> ${element.modelo} </td>
                    <td> ${element.precio} </td>
                    <td><input type="button" value="Eliminar" onclick="EliminarAuto(${element.id
                        })" class="btn-danger form-control"></td>
                    <td><input type='button' value='Modificar' onclick='ModificarAuto(${JSON.stringify(
                            element
                        )})' class='btn-info form-control'></td></tr>`;
                });
                html += "</table>";
                $("#tabIzquierda").html(html);
            } else {
                $("#error").html(`<div class="alert alert-danger" role="alert">
                <strong>ERROR!</strong> ${retorno.mensaje}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>`);
                $("#error").show();
            }
        },
    }).fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
        let retorno = JSON.parse(jqXHR.responseText);
        $("#error").html(`<div class="alert alert-danger" role="alert">
            <strong>ERROR!</strong> ${retorno.mensaje}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`);
        $("#error").show();
    });
}

function VerificarJWT(): void {
    let jwt = localStorage.getItem("jwt");
    $.ajax({
        type: "GET",
        url: "./BACKEND/login",
        dataType: "json",
        data: {},
        headers: { token: jwt },
        async: true,
    })
        .done(function (resultado: any) {
            console.log(resultado);
            let aux = resultado.datos;
            console.log(aux.data);
            localStorage.setItem("data", JSON.stringify(aux.data));
        })
        .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
            let retorno = JSON.parse(jqXHR.responseText);
            localStorage.removeItem("jwt");
            localStorage.removeItem("data");
            alert(retorno.mensaje);
            location.href = "./login.html";
        });
}

function EliminarAuto(id: number): void {
    VerificarJWT();
    if (confirm("Seguro que desea Eliminar el Auto?")) {
        let jwt = localStorage.getItem("jwt");
        $.ajax({
            type: "DELETE",
            url: "./BACKEND/",
            dataType: "json",
            data: { id_auto: id },
            headers: { token: jwt },
            async: true,
        })
            .done(function (resultado: any) {
                ListadoAutos();
                if (resultado.exito) {
                    $("#error").html(`<div class="alert alert-success" role="alert">
        <strong>EXITO!</strong> ${resultado.mensaje}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`);
                    $("#error").show();
                } else {
                    $("#error").html(`<div class="alert alert-warning" role="alert">
        <strong>ERROR!</strong> ${resultado.mensaje}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`);
                    $("#error").show();
                }
            })
            .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
                let retorno = JSON.parse(jqXHR.responseText);
                let data = retorno.data;
                $("#error").html(`<div class="alert alert-warning" role="alert">
        <strong>ERROR!</strong> El Usuario:${data.nombre} ${data.apellido}, ${retorno.mensaje} Para Eliminar
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`);
                $("#error").show();
            });
    }
}

function ModificarAuto(json: any): void {
    var html = `<div class="container-fluid" style="background-color: darkcyan;">
    <form action="">
    <div class="form-group">
    <div class="row mt-1">
    <div class="col-1 mt-3" ><label for="marca" class="fas fa-trademark "></label></div>
    <div class="col mt-3"><input type="text" id="marca" class="form-control" value="${json.marca}" placeholder="Marca"></div></div>
    <div class="row mt-1">
    <div class="col-1"><label for="color" class="fas fa-palette "></label></div>
    <div class="col"><input type="text" id="color" class="form-control" value="${json.color}" placeholder="Color"></div></div>
    <div class="row mt-1">
    <div class="col-1"><label for="modelo" class="fas fa-car"></label></div>
    <div class="col"><input type="text" id="modelo" class="form-control" value="${json.modelo}" placeholder="Modelo"></div></div>
    <div class="row mt-1">
    <div class="col-1"><label for="precio" class="fas fa-dollar-sign "></label></div>
    <div class="col"><input type="text" id="precio" class="form-control" value="${json.precio}" placeholder="Precio"></div>
    </div><div class="row mt-3">
    <div class="col ml-5"><input type="button" value="Modificar" class="btn-success form-control" onclick="Modificar(${json.id})"></div>
    <div class="col mr-5"><input type="reset" value="Limpiar" class="btn-warning form-control" ></div>
    </div>
    </div></form></div>`;
    $("#tabIzquierda").html(html);
}

function Modificar(id) {
    VerificarJWT();
    let marca = $("#marca").val();
    let color = $("#color").val();
    let modelo = $("#modelo").val();
    let precio = $("#precio").val();

    let pagina = "./BACKEND/";
    let auto = { marca: marca, color: color, modelo: modelo, precio: precio };
    let jwt = localStorage.getItem("jwt");
    let token = { token: jwt };

    $.ajax({
        url: pagina,
        type: "PUT",
        headers: token,
        dataType: "json",
        cache: false,
        data: { id_auto: id, auto: JSON.stringify(auto) },
        async: true,
    })
        .done(function (resultado) {
            if (resultado.exito) {
                ListadoAutos();
                $("#error").html(`<div class="alert alert-success" role="alert">
            <strong>EXITO!</strong> ${resultado.mensaje}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`);
                $("#error").show();
            } else {
                $("#error").html(`<div class="alert alert-warning" role="alert">
            <strong>ERROR!</strong> ${resultado.responseText}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>`);
                $("#error").show();
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            let retorno = JSON.parse(jqXHR.responseText);
            let data = retorno.data;
            $("#error").html(`<div class="alert alert-warning" role="alert">
        <strong>ERROR!</strong> El Usuario:${data.nombre} ${data.apellido}, ${retorno.mensaje} Para Modificar
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`);
            $("#error").show();
        });
}
