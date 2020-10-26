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
    document.body.style = "font-size:18px;";
    cont_img.style = "display:block;";
    lista.style = "display:none;";
    lista_lateral.style = "display:none;"
}

function esconderMenuLateral(){
    document.body.style = "font-size:;";
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


function openLink(){

}


function getRepositorie() {
    let request = new XMLHttpRequest();
    let search = "facundo-prog";
    request.open("GET", "https://api.github.com/users/" + search + "/repos", true);
    request.onload = () => showListRepos(JSON.parse(request.responseText));
    request.send();
}
  
function showListRepos(user) {
    let listFather = document.getElementById("cont_proyecto");
    let reposOrdenados = lastRepo(user);
    let repos = user.length - 1;

    for(let i=repos;i > repos-8 && i >= 0;i--){
        let listDiv = document.createElement("div");
        let listP = document.createElement("p");
        let listText = document.createTextNode(textDecoder(reposOrdenados[i][1]));

        listP.appendChild(listText);
        listP.setAttribute("class","texto_proyecto");
        listDiv.appendChild(listP);
        listDiv.setAttribute("class","proyecto");
        listDiv.setAttribute("onclick","openlink()");
        listFather.appendChild(listDiv);
    }
}


function textDecoder(texto){
    let arrayTexto = [];
    let textoFinal = "";

    arrayTexto = texto.split("_");

    for(let i=0;i < arrayTexto.length;i++){
        textoFinal += arrayTexto[i] + " ";  
    }
    return textoFinal;
}


function lastRepo(user){
    let arrayFechaRepos = [];
    
    for(let i=0;i < user.length;i++){
        let fecha = user[i].pushed_at;
        let cadenaTemporal = fecha.slice(0, -10) + "|" + user[i].name;
        arrayFechaRepos[i] = cadenaTemporal.split("|");
    }

    arrayFechaRepos.sort(function (a, b){
        return new Date(a[0]) - new Date(b[0]);
    })
    return arrayFechaRepos;
}
