const size = new autoAdjustSize(1000, "cont_img", "lista", "lista_lateral");
const repos = new repository("guillermo-gerard", 8);

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
