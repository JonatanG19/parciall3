function login(){
    var user,pass;

    user = document.getElementById("usuario").value;
    pass = document.getElementById("contraseña").value;

    if(user == "admin" && pass == "admin123"){
        window.location= "../html/principal.html"
    } else {
        alert ("Usted no tiene acceso")
    }


}