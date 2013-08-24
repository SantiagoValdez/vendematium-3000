function showFormularioCliente(){
    $("#modal-cliente").modal('show');
}

function hideFormularioCliente(){
    $("#modal-cliente").modal('hide');
}

function clearFormularioCliente(){
    $("#p-id").val('');
    $("#p-descripcion").val('');
    $("#p-costo").val('0');
    $("#p-cantidad").val('0');
}

function newCliente(){
    clearFormularioCliente();
    showFormularioCliente()
}

function saveCliente(){
    var id =    parseInt( $("#p-id").val() );
    var descripcion =    $("#p-descripcion").val();
    var costo =    parseInt( $("#p-costo").val() );
    var cantidad =    parseInt( $("#p-cantidad").val() );
    if( descripcion != '' && !isNaN(costo) && !isNaN(cantidad) ){
        console.log(id);
        if ( isNaN(id) ){
            console.log("Nuevo cliente");

                var cliente = { "descripcion" : descripcion, "costo" : costo, "cantidad" : cantidad };

                $.ajax({ 
                     type: "POST",
                     dataType: "json",
                     url: "http://localhost:8080/CV/webresources/entidad.clientes",
                     data: JSON.stringify(cliente),
                     contentType: 'application/json; charset=utf-8',
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioCliente();
                        alerta("Felicidades", "Se ha creado un nuevo cliente con exito <br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaCliente();
                     },
                     error: function(data){
                        console.log("OCURRIO UN ERROR");
                        console.log(data);
                        //Avisar que salio todo mal
                        alerta("Error", "Ocurrio un error");
                     } 

                 });


        }
        else{
            console.log("Modificarrrrr");
            var cliente = { "id" : id, "descripcion" : descripcion, "costo" : costo, "cantidad" : cantidad };

                $.ajax({ 
                     type: "PUT",
                     dataType: "json",
                     url: "http://localhost:8080/CV/webresources/entidad.clientes",
                     data: JSON.stringify(cliente),
                     contentType: 'application/json; charset=utf-8',
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioCliente();
                        alerta("Felicidades", "Se ha modificado el cliente con exito <br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaCliente();
                     },
                     error: function(data){
                        console.log("OCURRIO UN ERROR");
                        console.log(data);
                        //Avisar que salio todo mal
                        alerta("Error", "Ocurrio un error");
                     } 

                 });
        }
    }else{
        console.log("formulario incompleto");
        
        alerta("Atencion", "El formulario esta incompleto o mal cargado");
        
    }
}

function refreshTablaCliente(){
    $.ajax({ 
             type: "GET",
             dataType: "json",
             url: "http://localhost:8080/CV/webresources/entidad.clientes",
             success: function(data){        
                rellenarTablaCliente(data);
             }
    });
}

function rellenarTablaCliente(e){
    var listadoClientes = e;
    
    $("#listado-clientes").hide(100);
    $("#listado-clientes").empty();
    $.Mustache.load('tpl/tablas.html').done(
        function(){
            
            console.log("YUVENTUDIIII");
            console.log(JSON.stringify(e));
            
            var salida = $.Mustache.render('single-template',{arr: e});
            $("#listado-clientes").append(salida);
            
            $("#listado-clientes").show(700);
        }
    )
    
    
    
}

function deleteCliente(id){
    $.ajax({ 
                     type: "DELETE",
                     url: "http://localhost:8080/CV/webresources/entidad.clientes/"+id,
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioCliente();
                        alerta("Felicidades", "Se ha eliminado el cliente<br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaCliente();
                     },
                     error: function(data){
                        console.log("OCURRIO UN ERROR");
                        console.log(data);
                        //Avisar que salio todo mal
                        alerta("Error", "Ocurrio un error");
                     } 

    });
}

function updateCliente(id){
    $.ajax({ 
             type: "GET",
             dataType: "json",
             url: "http://localhost:8080/CV/webresources/entidad.clientes/" + id,
             success: function(data){        
                rellenarFormularioCliente(data);
                showFormularioCliente();
             }
         });
}

function rellenarFormularioCliente(p){
    $("#p-id").val(p.id);
    $("#p-descripcion").val(p.descripcion);
    $("#p-costo").val(p.costo);
    $("#p-cantidad").val(p.cantidad);
}