<template>
  <div>
    <div class="modal-content">
      <div class="modal-header bg-success">
        <h5 class="modal-title" id="exampleModalLongTitle">Guardar Prestamo</h5>
      </div>
      <div class="modal-body">
        <form @submit.prevent>
          <div class="form group">
            <label for="nombrecompleto">Recibido por:</label>
            <textarea
              type="text"
              placeholder="Recibido por"
              v-model="prestamo.observacion"
              class="form-control"
            />
          </div>

          <v-row class="mt-5">
            <v-col>
              <v-autocomplete
                label="Cliente"
                v-model="prestamo.cliente_codigo"
                :items="clientes"
                :item-title="titulosAutocompleteClientes"
                item-value="codigo"
                :filter="filterAutocompleteClientes"
              ></v-autocomplete>
              <div class="float-left">
                <v-btn
                  color="success"
                  data-toggle="modal"
                  data-target="#modalGuardarCliente"
                >
                  Nuevo Cliente
                </v-btn>
              </div>
            </v-col>
          </v-row>
          <v-row class="mt-5">
            <v-col>
              <v-autocomplete
                label="Producto"
                v-model="prestamo.producto_codigo"
                :items="productos"
                :item-title="titulosAutocompleteProductos"
                item-value="codigo"
                :filter="filterAutocompleteProductos"
              ></v-autocomplete>
              <div class="float-left">
                <v-btn
                  class="mr-4"
                  color="success"
                  data-toggle="modal"
                  data-target="#modalCantidadPrestar"
                  :disabled="productoYaSeleccionado(prestamo.producto_codigo)"
                >
                  Agregar Producto
                </v-btn>
                <v-btn
                  color="success"
                  data-toggle="modal"
                  data-target="#modalGuardarProducto"
                >
                  Guardar un nuevo producto
                </v-btn>
              </div>
            </v-col>
          </v-row>

          <div class="form group mt-5" v-if="productosSeleccionados.length > 0">
            <label for="stock">Productos a Prestar:</label>
            <v-row
              v-for="producto in productosSeleccionados"
              :key="producto.codigo"
            >
              <v-col cols="12">
                <div class="container-producto_seleccionado">
                  <p>
                    <b> {{ producto.descripcion }} </b> <br />
                    Cantidad: {{ producto.cantidad }}
                  </p>
                  <v-btn
                    color="danger"
                    @click="quitarProductoSeleccionado(producto.codigo)"
                    >X</v-btn
                  >
                </div>
              </v-col>
            </v-row>
          </div>

          <div class="mt-5 float-right">
            <v-btn
              color="success"
              @click="guardarprestamo()"
              :disabled="!validarDatosObligatorios()"
            >
              Guardar
            </v-btn>
          </div>
        </form>
      </div>
    </div>
    <div
      class="modal fade"
      id="modalGuardarCliente"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalGuardarCliente"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Cliente
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cliente = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombrecompleto">Nombre completo:</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  v-model="cliente.nombre_completo"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="identificacion">Identificación:</label>
                  <input
                    type="text"
                    placeholder="Identificación"
                    v-model="cliente.identificacion"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="numerotelefono">Numero telefono:</label>
                  <input
                    type="text"
                    placeholder="Numero telefono"
                    v-model="cliente.telefono"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="placa">Dirección:</label>
                  <input
                    type="text"
                    placeholder="Dirección"
                    v-model="cliente.direccion"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="placa">Email:</label>
                  <input
                    type="text"
                    placeholder="Email"
                    v-model="cliente.email"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary form-control"
                    data-dismiss="modal"
                    @click="cliente = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Guardar"
                    @click="guardarCliente()"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="modalCantidadPrestar"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalCantidadPrestar"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Ingrese Cantidad
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="cantidadPrestar = 1"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form group mt-3">
              <v-text-field
                label="Cantidad a Prestar"
                v-model="cantidadPrestar"
                @keypress.enter="agregarProducto()"
              ></v-text-field>
            </div>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="cantidadPrestar = 1"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-success form-control"
                  value="Guardar"
                  @click="agregarProducto()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="modalGuardarProducto"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalGuardarProducto"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Producto
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="producto = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="descripcion">Descripción:</label>
                <input
                  type="text"
                  placeholder="Descripción"
                  v-model="producto.descripcion"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <label for="descripcion">Código Serie:</label>
                <input
                  type="text"
                  placeholder="Código Serie"
                  v-model="producto.codigo_serie"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <label for="stock">Stock:</label>
                <input
                  type="text"
                  placeholder="Stock"
                  v-model="producto.stock"
                  class="form-control"
                />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="precioUnidad">Precio:</label>
                  <input
                    type="number"
                    placeholder="Precio"
                    v-model="producto.precio"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="costo">Precio Técnico:</label>
                  <input
                    type="number"
                    placeholder="Precio Técnico"
                    v-model="producto.costo"
                    class="form-control"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button
                    type="button"
                    class="btn btn-secondary form-control"
                    data-dismiss="modal"
                    @click="producto = {}"
                  >
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input
                    type="button"
                    class="btn btn-success form-control"
                    value="Guardar"
                    @click="guardarProducto()"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje },
  data() {
    return {
      prestamo: {},
      mensaje: { ver: false },
      clientes: [],
      productos: [],
      cliente: {},
      producto: {},
      productosSeleccionados: [],
      cantidadPrestar: 1,
    };
  },
  created() {
    this.verClientes();
    this.verProductos();
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    quitarProductoSeleccionado(codigo) {
      const productosSeleccionadosMenosQuitar =
        this.productosSeleccionados.filter((p) => p.codigo !== codigo);
      this.productosSeleccionados = productosSeleccionadosMenosQuitar;
    },
    agregarProducto() {
      const codigoProductoAgregar = this.prestamo.producto_codigo;
      if (
        codigoProductoAgregar !== null &&
        codigoProductoAgregar !== undefined
      ) {
        if (!this.productoYaSeleccionado(codigoProductoAgregar)) {
          this.productosSeleccionados.push(
            this.verProductoSeleccionado(codigoProductoAgregar)
          );
          this.cantidadPrestar = 1;
          $("#modalCantidadPrestar").modal("hide");
        }
      } else {
        alert("Debe seleccionar un producto");
      }
    },
    verProductoSeleccionado(codigo) {
      const cantidad =
        this.cantidadPrestar === "" ? 1 : parseInt(this.cantidadPrestar);
      const productos = this.productos;
      const productoSeleccionado = productos.filter(
        (p) => p.codigo === codigo
      )[0];
      let productoSeleccionadoMostrar = {
        codigo: productoSeleccionado.codigo,
        descripcion: productoSeleccionado.descripcion,
        cantidad,
      };
      return productoSeleccionadoMostrar;
    },
    productoYaSeleccionado(codigo) {
      const productosSeleccionados = this.productosSeleccionados.filter(
        (p) => p.codigo === codigo
      );
      return productosSeleccionados.length > 0;
    },
    guardarProducto() {
      this.axios
        .post("producto", this.producto)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.verProductos();
            this.prestamo.producto_codigo = respuesta.data.codigo;
            $("#modalGuardarProducto").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    guardarCliente() {
      this.axios
        .post("cliente", this.cliente)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.verClientes();
            this.prestamo.cliente_codigo = respuesta.data.codigo;
            $("#modalGuardarCliente").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    titulosAutocompleteClientes(item) {
      return `${item.nombre_completo} - C.C. ${item.identificacion}`;
    },
    filterAutocompleteClientes(item, queryText, itemText) {
      return (
        item.nombre_completo
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1 ||
        item.identificacion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    titulosAutocompleteProductos(item) {
      return `${item.descripcion} - S/N: ${item.codigo_serie}`;
    },
    filterAutocompleteproductos(item, queryText, itemText) {
      return (
        item.descripcion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1 ||
        item.codigo_serie
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    async guardarprestamos(productosSeleccionados) {
      // Crear un array de promesas
      const promesas = productosSeleccionados.map((producto) => {
        const prestamo = {
          observacion: this.prestamo.observacion,
          cliente_codigo: this.prestamo.cliente_codigo,
          producto_codigo: producto.codigo,
          cantidad: producto.cantidad,
          usuario_codigo: this.usuario.codigo,
        };

        console.log(prestamo, "Prestamo guardar");

        // Devolver la promesa resultante de axios.post
        return this.axios
          .post("prestamo", prestamo)
          .then((respuesta) => {
            console.log(respuesta)
          })
          .catch((error) => {
            console.log(error);
          });
      });

      // Esperar a que todas las promesas se resuelvan
      await Promise.all(promesas);

      // Después de que todas las promesas se resuelvan
      //window.location.href = "/prestamos";
      this.$router.push('/prestamos')
    },
    guardarprestamo() {
      const registrosSeleccionados = this.productosSeleccionados;
      if (registrosSeleccionados.length > 1) {
        this.guardarprestamos(registrosSeleccionados)
      } else {
        const prestamo = {
          observacion: this.prestamo.observacion,
          cliente_codigo: this.prestamo.cliente_codigo,
          producto_codigo: registrosSeleccionados[0].codigo,
          cantidad: registrosSeleccionados[0].cantidad,
          usuario_codigo: this.usuario.codigo,
        };
        this.axios
          .post("prestamo", prestamo)
          .then((respuesta) => {
            if (respuesta.status === 200) {
              this.$router.push('/prestamos')
              //window.location.href = "/prestamos";
            }
          })
          .catch((error) => {
            alert(error.response.data);
          });
      }
    },
    verClientes() {
      this.axios.get("cliente").then((respuesta) => {
        this.clientes = respuesta.data;
      });
    },
    verProductos() {
      this.prestamo.usuario_codigo = this.usuario.codigo;
      this.axios.get("producto").then((respuesta) => {
        this.productos = respuesta.data;
      });
    },
    validarDatosObligatorios() {
      return (
        this.productosSeleccionados.length > 0 &&
        this.prestamo.cliente_codigo !== undefined
      );
    },
  },
};
</script>
<style scoped>
.container-producto_seleccionado,
p {
  font-size: 15px;
}
</style>