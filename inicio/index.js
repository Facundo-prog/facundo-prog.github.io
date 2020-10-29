const repos = new repository("guillermo-gerard");
const size = new autoAdjustSize(1000, "cont_img", "lista", "lista_lateral");
var reposOrdenados = [];
var user = [];

function getRepos(){
    repos.getRepos();
    setTimeout(listRepos,1000);
}


function openLink(id){
    let host = reposOrdenados[id][2];
    window.location = host;
}

function listRepos(){

    if(user.length > 0){
        reposOrdenados = repos.lastRepo(user);
        showRepos(8);
    }
    else{
        alert("Ups! El repositorio solisitado no esta disponible");
    }
}

function showRepos(quantity){
    repos.showRepos(quantity,(user.length-1),"cont_proyecto","texto_proyecto","desc_proyecto","proyecto");
}
