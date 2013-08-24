package entidad;

import entidad.DetalleVenta;
import javax.annotation.Generated;
import javax.persistence.metamodel.CollectionAttribute;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value="EclipseLink-2.5.0.v20130507-rNA", date="2013-08-23T17:55:16")
@StaticMetamodel(Productos.class)
public class Productos_ { 

    public static volatile SingularAttribute<Productos, Integer> id;
    public static volatile CollectionAttribute<Productos, DetalleVenta> detalleVentaCollection;
    public static volatile SingularAttribute<Productos, Integer> cantidad;
    public static volatile SingularAttribute<Productos, String> descripcion;
    public static volatile SingularAttribute<Productos, Double> costo;

}