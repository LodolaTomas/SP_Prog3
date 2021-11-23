/// <reference path="./node_modules/@types/jquery/index.d.ts" />

$(document).ready(function () {



  $("#errorLogin").hide();
  $('#btn02').click(function () {
    $('input[type="text"]').val('');
    $('input[type="password"]').val('');
  });
  $("#formLogin").on('submit', function (evt) {
    evt.preventDefault();
    let correo = $("#inputEmail").val();
    let clave = $("#inputPassword").val();
    let dato: any = {};
    dato.correo = correo;
    dato.clave = clave;

    $.ajax({
      type: 'POST',
      url: "./BACKEND/login",
      dataType: "json",
      data: { "user": JSON.stringify(dato) },
      async: true
    })
      .done(function (resultado: any) {
        if (resultado.exito) {
          $("#errorLogin").html(`<div class="alert alert-success" role="alert">Logeado Correctamente!</div>`);
          $("#errorLogin").show();
          console.log(resultado);
          localStorage.setItem("jwt", resultado.jwt);
          location.href = "./principal.php";
        } else {
          console.log(resultado);
        }

      })
      .fail(function (jqXHR: any, textStatus: any, errorThrown: any) {
        let retorno = JSON.parse(jqXHR.responseText);
        $("#errorLogin").html(`<div class="alert alert-danger" role="alert"><strong>ERROR!</strong> ${retorno.mensaje}<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>`);
        $("#errorLogin").show();

      });
  });

  $("#registro").click(function () {
    location.href = "./registro.html";
  });

});