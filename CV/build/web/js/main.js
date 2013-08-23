generarFormularioCliente();
generarFormularioProducto();
generarFormularioVenta();

function scroll(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}

function alerta(titulo, mensaje){
    $("#alerta-mensaje").empty().append(mensaje);
    $("#alerta-titulo").empty().append(titulo);
    $("#alerta").modal('show');
}

function ocultarTodo(){
    $("#panel-venta").hide();
    $("#panel-producto").hide();
    $("#panel-cliente").hide();
}

function showProducto(){
    ocultarTodo();
    $("#panel-producto").show(500);
    refreshTablaProducto();
    scroll("productos")
}

function showCliente(){
    ocultarTodo();
    $("#panel-cliente").show(500);
    refreshTablaCliente();
    scroll("clientes")
}

function showVenta(){
    ocultarTodo();
    $("#panel-venta").show(500);
    refreshTablaVenta();
    scroll("ventas")
}
function generarFormularioProducto(){
    $("#modal-producto").empty();
        $.Mustache.load('tpl/producto.html').done(
            function(){

                console.log("Añadimos el modal del producto");
                var salida = $.Mustache.render('tpl-modal-producto', {a:""});
                $("#modal-producto").append(salida);

            }
    );
}

function generarFormularioCliente(){
    $("#modal-cliente").empty();
        $.Mustache.load('tpl/cliente.html').done(
            function(){

                console.log("Añadimos el modal del cliente");
                var salida = $.Mustache.render('tpl-modal-cliente', {a:""});
                $("#modal-cliente").append(salida);

            }
    );
}

function generarFormularioVenta(){
    $("#modal-venta").empty();
        $.Mustache.load('tpl/venta.html').done(
            function(){

                console.log("Añadimos el modal de la venta");
                var salida = $.Mustache.render('tpl-modal-venta', {a:""});
                $("#modal-venta").append(salida);

            }
    );
}


(function ($) {
window.AppView = Backbone.View.extend({
  el: $("body"),
  events: {
    "click #nav-cliente":  "mostrarCliente",
    "click #nav-producto":  "mostrarProducto",
    "click #nav-venta":  "mostrarVenta",
    "click #btn-cliente":  "mostrarCliente",
    "click #btn-producto":  "mostrarProducto",
    "click #btn-venta":  "mostrarVenta",
    "click #btn-new-cliente":  "nuevoCliente",
    "click #btn-new-producto":  "nuevoProducto",
    "click #btn-new-venta":  "nuevoVenta"
  },
  mostrarCliente : function (){
            showCliente();
  },
  mostrarProducto : function (){
            showProducto();
  },
  mostrarVenta : function (){
            showVenta();
  },
  nuevoCliente : function (){
            newCliente();
  },
  nuevoProducto : function (){
            newProducto();
  },
  nuevoVenta : function (){
            newVenta();
  }
  
});
var appview = new AppView;
})(jQuery);