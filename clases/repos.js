class repository{
    constructor(user, quantityGetRepos){
        this.user = user;
        this.sizeGetRepos = quantityGetRepos;
        this.arrayUser = [];
        this.arrayRepos = [];
    }

    setArrayUser(value){
        this.arrayUser = value;
    }

    lastRepo(){
        let arrayFechaRepos = [];
        let user = this.arrayUser;
        let arrayTexto = [];
        let textoFinal = "";
        
        for(let i=0;i < user.length;i++){
            let fecha = user[i].pushed_at;
            let cadenaTemporal = fecha.slice(0, -10) + "|";

            arrayTexto = String(user[i].name).split("_");
            textoFinal = arrayTexto.join(" ");
            cadenaTemporal += textoFinal.substring(0,50) + "|";

            cadenaTemporal += user[i].html_url + "|";
            cadenaTemporal += String(user[i].description).substring(0,125) + "|";
            if(user[i].language == null){ cadenaTemporal += "" }else{ cadenaTemporal += user[i].language; }

            arrayFechaRepos[i] = cadenaTemporal.split("|");
        }
    
        arrayFechaRepos.sort(function (a, b){
            return new Date(a[0]) - new Date(b[0]);
        });
        this.arrayRepos = arrayFechaRepos;
    }

    showRepos(id_cont_proyecto,class_listName,class_listDesc,class_listLenguaje,class_listDiv){
        let listFather = document.getElementById(id_cont_proyecto);
        let listDiv;
        let listName;
        let listDesc;
        let listLenguaje;
        let textName;
        let textDesc;
        let textLenguaje;
        let quantityRepos = this.arrayUser.length-1;
        let quantityGetRepos = this.sizeGetRepos;
    
        if(this.sizeGetRepos == -1){quantityGetRepos = quantityRepos+1;}
    
        for(let i=quantityRepos;i > quantityRepos-quantityGetRepos && i >= 0;i--){
            listDiv = document.createElement("div");
            
            listName = document.createElement("p");
            listDesc = document.createElement("p");
            listLenguaje = document.createElement("p");
            textName = document.createTextNode(this.arrayRepos[i][1]);
    
            if(this.arrayRepos[i][3] != "null"){

                if(this.arrayRepos[i][3].length >= 125){
                    textDesc = document.createTextNode(this.arrayRepos[i][3] + " ...");
                }
                else{
                    textDesc = document.createTextNode(this.arrayRepos[i][3]);
                }
            }
            else{
                textDesc = document.createTextNode("Sin descripción");
            }

            textLenguaje = document.createTextNode(this.arrayRepos[i][4]);
    
            listName.appendChild(textName);
            listDesc.appendChild(textDesc);
            listLenguaje.appendChild(textLenguaje);
            listName.setAttribute("class",class_listName);
            listDesc.setAttribute("class",class_listDesc);
            listLenguaje.setAttribute("class",class_listLenguaje);
            listDiv.appendChild(listName);
            listDiv.appendChild(listDesc);
            listDiv.appendChild(listLenguaje);
            listDiv.setAttribute("class",class_listDiv);
            listDiv.setAttribute("onclick","openLink(id)");
            listDiv.setAttribute("id", String(i));
            listFather.appendChild(listDiv);
        }
    }

}