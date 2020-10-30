const size = new autoAdjustSize(1000, "cont_img", "lista", "lista_lateral");
const repos = new repository("guillermo-gerard", 8);

function getArrayRepos(quantityReturnRepos){
    let request = new XMLHttpRequest();

    request.open("GET", "https://api.github.com/users/" + repos.user + "/repos", true);
    request.onload = () =>{ 
        repos.setArrayUser(JSON.parse(request.responseText)); 
        repos.lastRepo();
        repos.showRepos(quantityReturnRepos,"cont_proyecto","texto_proyecto","desc_proyecto","proyecto");
    }
    request.send();
}
