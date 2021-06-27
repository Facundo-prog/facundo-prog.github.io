class repository{
    constructor(user, sizeGetRepos){
        this.user = user;
        this.sizeGetRepos = sizeGetRepos;
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
            cadenaTemporal += String(user[i].description).substring(0,130) + "|";
            if(user[i].language == null){ cadenaTemporal += "indefinido" }else{ cadenaTemporal += String(user[i].language).substring(0,25).toLowerCase(); }

            arrayFechaRepos[i] = cadenaTemporal.split("|");
        }
    
        arrayFechaRepos.sort(function (a, b){
            return new Date(a[0]) - new Date(b[0]);
        });
        this.arrayRepos = arrayFechaRepos;
    }

    showRepos(id_cont_proyecto,class_listDiv,class_listName,class_listDesc){
        let divFather = document.getElementById(id_cont_proyecto);
        let proyectDiv;
        let proyectName;
        let proyectDesc;
        let proyectDivLenguajeLink;
        let proyectLenguaje;
        let proyectUrl;
        let textName;
        let textDesc;
        let textLenguaje;
        let quantityRepos = this.arrayUser.length-1;
        let sizeGetRepos = this.sizeGetRepos;

        if(this.sizeGetRepos == -1){ sizeGetRepos = quantityRepos; }
    
        for(let i=quantityRepos;i >= 0;i--){
            proyectDiv = document.createElement("div");
            proyectName = document.createElement("p");
            proyectDesc = document.createElement("p");
            proyectDivLenguajeLink = document.createElement("div");
            proyectLenguaje = document.createElement("p");
            proyectUrl = document.createElement("a");

            textName = document.createTextNode(this.arrayRepos[i][1]);
    
            if(this.arrayRepos[i][3] != "null"){

                if(this.arrayRepos[i][3].length >= 130){
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
    
            proyectName.appendChild(textName);
            proyectDesc.appendChild(textDesc);
            proyectLenguaje.appendChild(textLenguaje);
            proyectUrl.appendChild(document.createTextNode("Ver"));

            proyectName.setAttribute("class",class_listName);
            proyectDesc.setAttribute("class",class_listDesc);
            proyectDiv.setAttribute("class",class_listDiv);
            proyectDivLenguajeLink.setAttribute("class", "div_lenguaje_link_proyecto");
            proyectUrl.setAttribute("href", this.arrayRepos[i][2]);

            proyectDiv.appendChild(proyectName);
            proyectDiv.appendChild(proyectDesc);
            proyectDivLenguajeLink.appendChild(proyectLenguaje);
            proyectDivLenguajeLink.appendChild(proyectUrl);
            proyectDiv.appendChild(proyectDivLenguajeLink);

            if(i <= quantityRepos-sizeGetRepos){
                proyectDiv.setAttribute("style","display:none;");
            }

            divFather.appendChild(proyectDiv);
        }
    }

    showError(id_father){
        let father = document.getElementById(id_father);
        let errorElement = document.createElement("p");
        let errorText = document.createTextNode("Ups! Hubo un error al solicitar los repositorios");
        errorElement.appendChild(errorText);
        errorElement.setAttribute("class","textError");
        father.appendChild(errorElement);
    }

}