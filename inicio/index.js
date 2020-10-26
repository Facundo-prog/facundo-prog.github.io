var cont_img = document.getElementById("cont_img");
var lista = document.getElementById("lista");
var lista_lateral = document.getElementById("lista_lateral");
var estadoPrecionado = false;
var reposOrdenados = [];

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


function openLink(id){
    let host = reposOrdenados[id][2];
    window.location = host;
}


function getRepositorie() {
    let request = new XMLHttpRequest();
    let search = "guillermo-gerard";
    request.open("GET", "https://api.github.com/users/" + search + "/repos", true);
    request.onload = () => showListRepos(JSON.parse(request.responseText));
    request.send();
}
  
function showListRepos(user) {
    let listFather = document.getElementById("cont_proyecto");
    let repos = user.length - 1;
    reposOrdenados = lastRepo(user);

    //console.log(reposOrdenados);

    for(let i=repos;i > repos-8 && i >= 0;i--){
        let listDiv = document.createElement("div");
        let listName = document.createElement("p");
        let listDesc = document.createElement("p");
        let textName = document.createTextNode(textDecoder(reposOrdenados[i][1]));
        let textDesc = document.createTextNode(reposOrdenados[i][3]);

        listName.appendChild(textName);
        listName.setAttribute("href","http://google.com");
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
        let cadenaTemporal = fecha.slice(0, -10) + "|" + user[i].name + "|" + user[i].html_url + "|" + String(user[i].description).substring(0,100)
        arrayFechaRepos[i] = cadenaTemporal.split("|");
    }

    arrayFechaRepos.sort(function (a, b){
        return new Date(a[0]) - new Date(b[0]);
    })
    return arrayFechaRepos;
}
