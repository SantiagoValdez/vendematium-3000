/*
 * Funciones para ABML de Venta
 */
function showFormularioVenta(){
    $("#modal-venta").modal('show');
}

function hideFormularioVenta(){
    $("#modal-venta").modal('hide');
}

function clearFormularioVenta(){
    $("#p-id").val('');
    $("#p-descripcion").val('');
    $("#p-costo").val('0');
    $("#p-cantidad").val('0');
}

function newVenta(){
    clearFormularioVenta();
    showFormularioVenta()
}

function saveVenta(){
    var id =    parseInt( $("#p-id").val() );
    var descripcion =    $("#p-descripcion").val();
    var costo =    parseInt( $("#p-costo").val() );
    var cantidad =    parseInt( $("#p-cantidad").val() );
    if( descripcion != '' && !isNaN(costo) && !isNaN(cantidad) ){
        console.log(id);
        if ( isNaN(id) ){
            console.log("Nuevo venta");

                var venta = { "descripcion" : descripcion, "costo" : costo, "cantidad" : cantidad };

                $.ajax({ 
                     type: "POST",
                     dataType: "json",
                     url: "http://localhost:8080/CV/webresources/entidad.ventas",
                     data: JSON.stringify(venta),
                     contentType: 'application/json; charset=utf-8',
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioVenta();
                        alerta("Felicidades", "Se ha creado un nuevo venta con exito <br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaVenta();
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
            var venta = { "id" : id, "descripcion" : descripcion, "costo" : costo, "cantidad" : cantidad };

                $.ajax({ 
                     type: "PUT",
                     dataType: "json",
                     url: "http://localhost:8080/CV/webresources/entidad.ventas",
                     data: JSON.stringify(venta),
                     contentType: 'application/json; charset=utf-8',
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioVenta();
                        alerta("Felicidades", "Se ha modificado el venta con exito <br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaVenta();
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

function refreshTablaVenta(){
    $.ajax({ 
             type: "GET",
             dataType: "json",
             url: "http://localhost:8080/CV/webresources/entidad.ventas",
             success: function(data){        
                rellenarTablaVenta(data);
             }
    });
}

function rellenarTablaVenta(e){
    var listadoVentas = e;
    
    $("#listado-ventas").hide(100);
    $("#listado-ventas").empty();
    $.Mustache.load('tpl/venta.html').done(
        function(){
            
            console.log("YUVENTUDIIII");
            console.log(JSON.stringify(e));
            
            var salida = $.Mustache.render('tabla-venta',{arr: e});
            $("#listado-ventas").append(salida);
            
            $("#listado-ventas").show(700);
        }
    )
    
    
    
}

function deleteVenta(id){
    $.ajax({ 
                     type: "DELETE",
                     url: "http://localhost:8080/CV/webresources/entidad.ventas/"+id,
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioVenta();
                        alerta("Felicidades", "Se ha eliminado el venta<br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaVenta();
                     },
                     error: function(data){
                        console.log("OCURRIO UN ERROR");
                        console.log(data);
                        //Avisar que salio todo mal
                        alerta("Error", "Ocurrio un error");
                     } 

    });
}

function updateVenta(id){
    $.ajax({ 
             type: "GET",
             dataType: "json",
             url: "http://localhost:8080/CV/webresources/entidad.ventas/" + id,
             success: function(data){        
                rellenarFormularioVenta(data);
                showFormularioVenta();
             }
         });
}

function rellenarFormularioVenta(p){
    $("#p-id").val(p.id);
    $("#p-descripcion").val(p.descripcion);
    $("#p-costo").val(p.costo);
    $("#p-cantidad").val(p.cantidad);
}