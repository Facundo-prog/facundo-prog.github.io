
class repository{
    constructor(user){
        this.user = user;
    }

    getRepos(){
        let request = new XMLHttpRequest();

        request.open("GET", "https://api.github.com/users/" + this.user + "/repos", true);
        request.onload = () =>{ user = JSON.parse(request.responseText); }
        request.send();
    }

    lastRepo(user){
        let arrayFechaRepos = [];
        
        for(let i=0;i < user.length;i++){
            let fecha = user[i].pushed_at;
            let cadenaTemporal = fecha.slice(0, -10) + "|";
            cadenaTemporal += user[i].name + "|";
            cadenaTemporal += user[i].html_url + "|";
            cadenaTemporal += String(user[i].description).substring(0,125) + "|";
            cadenaTemporal += user[i].language;
        
            arrayFechaRepos[i] = cadenaTemporal.split("|");
        }
    
        arrayFechaRepos.sort(function (a, b){
            return new Date(a[0]) - new Date(b[0]);
        });
        return arrayFechaRepos;
    }

    textDecoder(texto){
        let arrayTexto = [];
        let textoFinal = "";
        
        arrayTexto = texto.split("_");
        textoFinal = arrayTexto.join(" ");
        
        return textoFinal;
    }

    showRepos(quantity,quantityRepos,id_cont_proyecto,class_listName,class_listDesc,class_listDiv){
        let listFather = document.getElementById(id_cont_proyecto);
        let listDiv;
        let listName;
        let listDesc;
        let textName;
        let textDesc;
    
        if(quantity == 0){quantity = quantityRepos+1;}
    
        for(let i=quantityRepos;i > quantityRepos-quantity && i >= 0;i--){
            listDiv = document.createElement("div");
            
            listName = document.createElement("p");
            listDesc = document.createElement("p");
            textName = document.createTextNode(repos.textDecoder(reposOrdenados[i][1]));
    
            if(reposOrdenados[i][3] != "null"){

                if(reposOrdenados[i][3].length >= 125){
                    textDesc = document.createTextNode(reposOrdenados[i][3] + " ...");
                }
                else{
                    textDesc = document.createTextNode(reposOrdenados[i][3]);
                }
            }
            else{
                textDesc = document.createTextNode("No description");
            }
    
            listName.appendChild(textName);
            listDesc.appendChild(textDesc);
            listName.setAttribute("class",class_listName);
            listDesc.setAttribute("class",class_listDesc);
            listDiv.appendChild(listName);
            listDiv.appendChild(listDesc);
            listDiv.setAttribute("class",class_listDiv);
            listDiv.setAttribute("onclick","openLink(id)");
            listDiv.setAttribute("id", String(i));
            listFather.appendChild(listDiv);
        }
    }


}