
class autoAdjustSize{
    constructor(size,id_img, id_lista,id_lista_lateral){
        this.size = size;
        this.cont_img = document.getElementById(id_img);
        this.lista = document.getElementById(id_lista);
        this.lista_lateral = document.getElementById(id_lista_lateral);
        this.estadoPrecionado = false;
    }

    ajustarTamaño(){

        this.estadoPrecionado = false;
        this.lista_lateral.style = "display:none;"
    
        if(document.body.clientWidth <= this.size){
            this.cont_img.style = "display:block;";
            this.lista.style = "display:none;";
        }
        else{
            this.cont_img.style = "display:none;";
            this.lista.style = "display:block;";
        }
    }

    expandirMenu(){

        this.estadoPrecionado = !this.estadoPrecionado;
    
        if(this.estadoPrecionado == false){
            this.lista_lateral.style = "display:none;"
        }
        else{
            this.lista_lateral.style = "display:block;"
        }
    }
}
