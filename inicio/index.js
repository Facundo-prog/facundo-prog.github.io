const size = new autoAdjustSize(1000, "cont_img", "lista", "lista_lateral");
const repos = new repository("guillermo-gerard", 4);
var estadoMostrarTodo = false;

function getArrayRepos(){
    let request = new XMLHttpRequest();

    request.open("GET", "https://api.github.com/users/" + repos.user + "/repos", true);
    request.onload = () =>{ 
        repos.setArrayUser(JSON.parse(request.responseText)); 
        repos.lastRepo();
        repos.showRepos("cont_proyecto","texto_proyecto","desc_proyecto","lenguaje_proyecto","proyecto");
    }
    request.send();
}

function openLink(id){ 
    window.location = repos.arrayRepos[id][2]; 
}

function mostrarTodo(){
    let inicio = (repos.arrayRepos.length-1) - repos.sizeGetRepos;
    let textoBoton = document.getElementById("boton_mostrarTodo");

    for(let i=inicio;i >= 0;i--){
        let element = document.getElementById(i);

        if(estadoMostrarTodo == false){ element.style = "display:inline-block;"; textoBoton.textContent = "Mostrar menos"; }
        else{ element.style = "display:none;"; textoBoton.textContent = "Mostrar mas"; }
    }

    estadoMostrarTodo = !estadoMostrarTodo;
}
