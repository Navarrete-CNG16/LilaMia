window.onload=function(){
  /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  document.getElementById("addCat").onclick=function(){
    consulta("categorias.php", "subCat");
  }
  consulta("categorias.php", "tablaCats");

  document.getElementById("altaCatBto").addEventListener("click", insertarCat);

  document.getElementById("eliminarCatBto").addEventListener("click", eliminarCat);

  function consulta(filePHP, idHTML){
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function(){
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById(idHTML).innerHTML = this.responseText;
      }
    };
    xhttp.open("POST", filePHP+"?opc="+idHTML, true);
    xhttp.send();
  }

  function insertarCat(e){
      e.preventDefault();
      let formAddCat =document.querySelector('#formAddCat');
      let datos = new FormData(formAddCat);
      datos.append('ajax', 2);

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange =function() {
          if (this.readyState == 4 && this.status == 200) {
            //subirImg(document.getElementById('imgCat').files[0]);
            consulta("categorias.php","tablaCats");          
          }
      };
      xhttp.open("POST", "altaCat.php", true);
      xhttp.send(datos);
    }

  function subirImg(img) {
      let formData = new FormData();
      formData.append("img", img);
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              console.log("imagen subida correctamente");
          }
      };
      xhttp.open("POST", "uploadImg.php?url=img/catalogo/categorias/", true);
      xhttp.send(formData);
    }

    //Eliminar..........................................
    function eliminarCat(e) {
      e.preventDefault();
      let formCat = document.querySelector('#formBajaCat');
      let datos = new FormData(formCat);
      datos.append('ajax', 2);

      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
              consulta("categorias.php","tablaCats");
          }
      };
      xhttp.open("POST", "eliminarCat.php", true);
      xhttp.send(datos);
    }
}