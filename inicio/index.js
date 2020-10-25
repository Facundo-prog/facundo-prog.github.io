var cont_img = document.getElementById("cont_img");
var lista = document.getElementById("lista");
var lista_lateral = document.getElementById("lista_lateral");
var estadoPrecionado = false;

function ajustarTamaño(){

    estadoPrecionado = false;

    if(document.body.clientWidth <= 1000){
        mostrarMenuLateral();
    }
    else{
        esconderMenuLateral();
    }
}

function mostrarMenuLateral(){
    cont_img.style = "display:block;";
    lista.style = "display:none;";
    lista_lateral.style = "display:none;"
}

function esconderMenuLateral(){
    cont_img.style = "display:none;";
    lista.style = "display:block;";
    lista_lateral.style = "display:none;"
}


function expandirMenu(){

    estadoPrecionado = !estadoPrecionado;

    if(estadoPrecionado == false){
        lista_lateral.style = "display:none;"
    }
    else{
        lista_lateral.style = "display:block;"
    }
}


function openLink(id){
    console.log(id);
}