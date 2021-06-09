const size = new autoAdjustSize(1000, "cont_img", "lista");
var repos;
var estadoMostrarTodo = false;

function getArrayRepos(){
    repos = new repository("facundo-prog", 8);
    let request = new XMLHttpRequest();
    let btn_mostrarTodo = document.getElementById("boton_mostrarTodo");

    request.open("GET", "https://api.github.com/users/" + repos.user + "/repos", true);
    request.onload = () =>{ 
        repos.setArrayUser(JSON.parse(request.responseText));

        if(repos.arrayUser.length <= 0 || repos.arrayUser['message'] == "Not Found"){ 
            repos.showError("titulo"); 
        } 

        repos.lastRepo();
        repos.showRepos("cont_proyecto","proyecto","texto_proyecto","desc_proyecto","lenguaje_proyecto");

        if(repos.arrayUser.length > 8){
            btn_mostrarTodo.style = "display:inline-block;"
        }
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
