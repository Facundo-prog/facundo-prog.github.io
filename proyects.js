
function ajustarTamaño(){
    let menu = document.getElementById("menu");
    let titulo = document.getElementById("titulo");
    let sub = document.getElementById("subtitulo");

    if(menu.clientWidth < 600){
        menu.style = "font-size:5vw;";
        titulo.style = "font-size:6vw;";
        sub.style = "font-size:4vw;";
    }
    else{
        menu.style = "font-size:20px;";
        titulo.style = "font-size:30px;";
        sub.style = "font-size:18px;";
    }
}