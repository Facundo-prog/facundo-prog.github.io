var cont_img = document.getElementById("cont_img");
var lista = document.getElementById("lista");
var lista_lateral = document.getElementById("lista_lateral");
var estadoPrecionado = false;
var reposOrdenados = [];
var quantityRepos = 0;

function ajustarTamaño(){

    estadoPrecionado = false;
    lista_lateral.style = "display:none;"

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
}

function esconderMenuLateral(){
    cont_img.style = "display:none;";
    lista.style = "display:block;";
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
    let host = reposOrdenados[id][2];
    window.location = host;
}


function getRepositorie(cantidad) {
    let request = new XMLHttpRequest();
    let search = "guillermo-gerard";
    request.open("GET", "https://api.github.com/users/" + search + "/repos", true);
    request.onload = () => showListRepos(JSON.parse(request.responseText), cantidad);
    request.send();
}
  
function showListRepos(user, value) {
    let listDiv;
    let listName;
    let listDesc;
    let textName;
    let textDesc;
    let listFather = document.getElementById("cont_proyecto");
    let cantidad = value;

    quantityRepos = user.length - 1;
    reposOrdenados = lastRepo(user);

    if(cantidad == 0){cantidad = quantityRepos+1;}

    for(let i=quantityRepos;i > quantityRepos-cantidad && i >= 0;i--){
        listDiv = document.createElement("div");
        listName = document.createElement("p");
        listDesc = document.createElement("p");
        textName = document.createTextNode(textDecoder(reposOrdenados[i][1]));

        if(reposOrdenados[i][3] != "null"){
            textDesc = document.createTextNode(reposOrdenados[i][3]);
        }
        else{
            textDesc = document.createTextNode("No description");
        }

        listName.appendChild(textName);
        listDesc.appendChild(textDesc);
        listName.setAttribute("class","texto_proyecto");
        listDesc.setAttribute("class","desc_proyecto");
        listDiv.appendChild(listName);
        listDiv.appendChild(listDesc);
        listDiv.setAttribute("class","proyecto");
        listDiv.setAttribute("onclick","openLink(id)");
        listDiv.setAttribute("id", String(i));
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
        let cadenaTemporal = fecha.slice(0, -10) + "|" + user[i].name + "|" + user[i].html_url + "|" + String(user[i].description).substring(0,100);
    
        arrayFechaRepos[i] = cadenaTemporal.split("|");
    }

    arrayFechaRepos.sort(function (a, b){
        return new Date(a[0]) - new Date(b[0]);
    })
    return arrayFechaRepos;
}
