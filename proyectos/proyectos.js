const s = new autoAdjustSize(1000, "cont_img", "lista", "lista_lateral");
const r = new repository("guillermo-gerard", 0);//quantityGetRepos 0 = todos


function getArrayRepos(quantityReturnRepos){
    let request = new XMLHttpRequest();

    request.open("GET", "https://api.github.com/users/" + r.user + "/repos", true);
    request.onload = () =>{ 
        r.setArrayUser(JSON.parse(request.responseText)); 
        r.lastRepo();
        r.showRepos(quantityReturnRepos,"cont_proyecto","texto_proyecto","desc_proyecto","proyecto");
    }
    request.send();
}