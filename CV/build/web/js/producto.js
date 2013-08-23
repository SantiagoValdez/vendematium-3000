/*
 * Funciones para ABML de Producto
 */
function showFormularioProducto(){
    $("#modal-producto").modal('show');
}

function hideFormularioProducto(){
    $("#modal-producto").modal('hide');
}

function clearFormularioProducto(){
    $("#p-id").val('');
    $("#p-descripcion").val('');
    $("#p-costo").val('0');
    $("#p-cantidad").val('0');
}

function newProducto(){
    clearFormularioProducto();
    showFormularioProducto();
}

function saveProducto(){
    var id =    parseInt( $("#p-id").val() );
    var descripcion =    $("#p-descripcion").val();
    var costo =    parseInt( $("#p-costo").val() );
    var cantidad =    parseInt( $("#p-cantidad").val() );
    
    console.log("Descripcion:" + descripcion);
    
    if( descripcion != '' && !isNaN(costo) && !isNaN(cantidad) ){
        console.log(id);
        if ( isNaN(id) ){
            console.log("Nuevo producto");

                var producto = { "descripcion" : descripcion, "costo" : costo, "cantidad" : cantidad };

                $.ajax({ 
                     type: "POST",
                     dataType: "json",
                     url: "http://localhost:8080/CV/webresources/entidad.productos",
                     data: JSON.stringify(producto),
                     contentType: 'application/json; charset=utf-8',
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioProducto();
                        alerta("Felicidades", "Se ha creado un nuevo producto con exito <br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaProducto();
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
            var producto = { "id" : id, "descripcion" : descripcion, "costo" : costo, "cantidad" : cantidad };

                $.ajax({ 
                     type: "PUT",
                     dataType: "json",
                     url: "http://localhost:8080/CV/webresources/entidad.productos",
                     data: JSON.stringify(producto),
                     contentType: 'application/json; charset=utf-8',
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioProducto();
                        alerta("Felicidades", "Se ha modificado el producto con exito <br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaProducto();
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

function refreshTablaProducto(){
    $.ajax({ 
             type: "GET",
             dataType: "json",
             url: "http://localhost:8080/CV/webresources/entidad.productos",
             success: function(data){        
                rellenarTablaProducto(data);
             }
    });
}

function rellenarTablaProducto(e){
    var listadoProductos = e;
    
    $("#listado-productos").hide(100);
    $("#listado-productos").empty();
    $.Mustache.load('tpl/producto.html').done(
        function(){
            
            console.log("YUVENTUDIIII");
            console.log(JSON.stringify(e));
            
            var salida = $.Mustache.render('tabla-producto',{arr: e});
            $("#listado-productos").append(salida);
            
            $("#listado-productos").show(700);
        }
    );
    
    
    
}

function deleteProducto(id){
    $.ajax({ 
                     type: "DELETE",
                     url: "http://localhost:8080/CV/webresources/entidad.productos/"+id,
                     success: function(data){        
                        console.log(data);
                        //Avisar que salio todo bien
                        hideFormularioProducto();
                        alerta("Felicidades", "Se ha eliminado el producto<br/> <img src='img/exito.jpg' width='50%'>");
                        refreshTablaProducto();
                     },
                     error: function(data){
                        console.log("OCURRIO UN ERROR");
                        console.log(data);
                        //Avisar que salio todo mal
                        alerta("Error", "Ocurrio un error");
                     } 

    });
}

function updateProducto(id){
    $.ajax({ 
             type: "GET",
             dataType: "json",
             url: "http://localhost:8080/CV/webresources/entidad.productos/" + id,
             success: function(data){        
                rellenarFormularioProducto(data);
                showFormularioProducto();
             }
         });
}

function rellenarFormularioProducto(p){
    $("#p-id").val(p.id);
    $("#p-descripcion").val(p.descripcion);
    $("#p-costo").val(p.costo);
    $("#p-cantidad").val(p.cantidad);
}