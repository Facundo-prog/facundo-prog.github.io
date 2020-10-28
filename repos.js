
class repository{
    constructor(user,quantity){
        this.user = user;
        this.quantity = quantity;
        this.quantityRepos;
    }

    getRepos(){
        let request = new XMLHttpRequest();
        request.open("GET", "https://api.github.com/users/" + user + "/repos", true);
        request.onload = () => getArrayRepos(JSON.parse(request.responseText), quantity);
        request.send();
    }

    getArrayRepos(user, quantity){
        let listDiv;
        let listName;
        let listDesc;
        let textName;
        let textDesc;
        let listFather = document.getElementById("cont_proyecto");
        let cantidad = quantity;

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

    textDecoder(){
        let arrayTexto = [];
        let textoFinal = "";

        arrayTexto = texto.split("_");

        for(let i=0;i < arrayTexto.length;i++){
            textoFinal += arrayTexto[i] + " ";  
        }
        return textoFinal;
    }


    lastRepo(user){
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


};