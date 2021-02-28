
class autoAdjustSize{
    constructor(size,id_img, id_lista,id_lista_lateral){
        this.size = size;
        this.cont_img = document.getElementById(id_img);
        this.lista = document.getElementById(id_lista);
        this.estadoPrecionado = false;
    }

    ajustarTamaño(){

        this.estadoPrecionado = false;
    
        if(document.body.clientWidth <= this.size){
            this.lista.style = "display:none;";
            this.cont_img.style = "display:block;";
            this.lista.className = "lista_lateral";
        }
        else{
            this.lista.style = "display:block;";
            this.cont_img.style = "display:none;";
            this.lista.className = "lista";
        }
    }

    expandirMenu(){

        this.estadoPrecionado = !this.estadoPrecionado;
    
        if(this.estadoPrecionado == false){
            this.lista.style = "display:none;";
        }
        else{
            this.lista.style = "display:block;";
        }
    }
}
