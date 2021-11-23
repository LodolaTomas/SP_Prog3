<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">

  <script src="./FRONTEND/libs/bootstrap/dist/css/bootstrap.css"></script>
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
  </link>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script type="text/javascript" src="./FRONTEND/libs/jquery/dist/jquery.min.js"></script>
  <script type="text/javascript" src="./FRONTEND/libs/bootstrap/dist/js/bootstrap.min.js"></script>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
  <script src="./FRONTEND/principal.js"></script>
</head>

<body>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Alta Autos <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Listado
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button class="dropdown-item" type="button" id="listadoUsuarios" onclick="ListadoUsuarios()">Usuarios</button>
              <button class="dropdown-item" type="button" id="listadoAutos" onclick="ListadoAutos()">Autos</button>
            </div>
          </li>
      </div>
    </nav>
  </div>
  <div id="error"></div>

  <div class="container-fluid" style=" padding-top: 2%; max-width:auto ;">
    <div class="row">
      <div class="col bg-danger">
        <h6>IZQUIERDA</h6>
        <div style="height: auto;" id="tabIzquierda">
        </div>
      </div>

      <div class="col bg-success">
        <h6>DERECHA</h6>
        <div style="height: auto; " id="tabDerecha">

        </div>
      </div>
    </div>
  </div>

  </div>
</body>

</html>