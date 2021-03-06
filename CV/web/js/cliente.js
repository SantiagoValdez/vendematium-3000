function showFormularioCliente(){
    $("#modal-cliente").modal('show');
}

function hideFormularioCliente(){
    $("#modal-cliente").modal('hide');
}

function clearFormularioCliente(){
    $("#c-id").val('');
    $("#c-cedula").val('0');
    $("#c-email").val('');
    $("#c-nombre").val('');
    $("#c-saldo").val('0');
}

function newCliente(){
    clearFormularioCliente();
    showFormularioCliente();
}

function saveCliente(){
    var id =    parseInt( $("#c-id").val() );
    var cedula = parseInt(    $("#c-cedula").val() );
    var email =    $("#c-email").val();
    var nombre =   $("#c-nombre").val();
    var saldo =    parseInt( $("#c-saldo").val() );
    
    if( !isNaN(cedula) && email != '' &&  nombre != '' && !isNaN(saldo) ){
        console.log(id);
        if ( isNaN(id) ){
            console.log("Nuevo cliente");

                var cliente = { "cedula" : cedula, "email" : email, "nombre" : nombre, "saldo" : saldo };

                $.ajax({ 
                     type: "POST",
                     dataType: "json",
                     url: "http://localhost:8080/CV/webresources/entidad.cliente",
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
            var cliente = { "id" : id, "cedula" : cedula, "email" : email, "nombre" : nombre, "saldo" : saldo };

                $.ajax({ 
                     type: "PUT",
                     dataType: "json",
                     url: "http://localhost:8080/CV/webresources/entidad.cliente",
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
             url: "http://localhost:8080/CV/webresources/entidad.cliente",
             success: function(data){        
                rellenarTablaCliente(data);
             }
    });
}

function rellenarTablaCliente(e){
    var listadoClientes = e;
    
    $("#listado-clientes").hide(100);
    $("#listado-clientes").empty();
    $.Mustache.load('tpl/cliente.html').done(
        function(){
            
            console.log("YUVENTUDIIII");
            console.log(JSON.stringify(e));
            
            var salida = $.Mustache.render('tabla-cliente',{arr: e});
            $("#listado-clientes").append(salida);
            
            $("#listado-clientes").show(700);
        }
    )
    
    
    
}

function deleteCliente(id){
    $.ajax({ 
                     type: "DELETE",
                     url: "http://localhost:8080/CV/webresources/entidad.cliente/"+id,
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
             url: "http://localhost:8080/CV/webresources/entidad.cliente/" + id,
             success: function(data){        
                rellenarFormularioCliente(data);
                showFormularioCliente();
             }
         });
}

function rellenarFormularioCliente(c){
    $("#c-id").val(c.id);
    $("#c-cedula").val(c.cedula);
    $("#c-email").val(c.email);
    $("#c-nombre").val(c.nombre);
    $("#c-saldo").val(c.saldo);
}
