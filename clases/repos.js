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
            cadenaTemporal += user[i].language;

            arrayFechaRepos[i] = cadenaTemporal.split("|");
        }
    
        arrayFechaRepos.sort(function (a, b){
            return new Date(a[0]) - new Date(b[0]);
        });
        this.arrayRepos = arrayFechaRepos;
    }

    showRepos(quantity,id_cont_proyecto,class_listName,class_listDesc,class_listDiv){
        let listFather = document.getElementById(id_cont_proyecto);
        let listDiv;
        let listName;
        let listDesc;
        let textName;
        let textDesc;
        let quantityRepos = this.arrayUser.length-1;
        let quantityGetRepos = this.sizeGetRepos;
    
        if(this.sizeGetRepos == 0){quantityGetRepos = quantityRepos+1;}
    
        for(let i=quantityRepos;i > quantityRepos-quantityGetRepos && i >= 0;i--){
            listDiv = document.createElement("div");
            
            listName = document.createElement("p");
            listDesc = document.createElement("p");
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