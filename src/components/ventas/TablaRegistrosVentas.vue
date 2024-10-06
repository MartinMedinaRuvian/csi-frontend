<template>
  <div class="mt-5">
    <div v-if="registrosVentas.length > 0">
      <table class="table table-responsive-md" id="tabla">
        <thead class="thead-light">
          <tr>
            <th scope="col">Producto</th>
            <th scope="col">Precio Técnico</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Precio</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="registroVenta in registrosVentas"
            :key="registroVenta.codigo"
          >
            <td>
              <p>{{ registroVenta.producto }}</p>
            </td>
            <td>
              <p>{{ verFormatoMoneda(registroVenta.costo) }}</p>
            </td>
            <td>
              <p>{{ registroVenta.cantidad }}</p>
            </td>
            <td>
              <p>{{ verFormatoMoneda(registroVenta.precio) }}</p>
            </td>
            <td>
              <p>{{ verFormatoMoneda(registroVenta.total) }}</p>
            </td>
            <td v-if="registrosVentas.length === 1">
              <button
                class="btn btn-outline-success"
                @click="generarReporte(registroVenta)"
              >
                <span>&#128196;</span>
              </button>
            </td>
            <td v-if="registrosVentas.length === 1">
              <button
                data-toggle="modal"
                data-target="#modalDevolucion"
                class="btn btn-outline-primary"
                @click="verDatosModal(registroVenta)"
              >
                <span>&#x21A9;</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="text-center" v-else>
      <h3>Sin registrosVentas 🤗</h3>
    </div>

    <!-- Modal Devolucion -->
    <div
      class="modal fade"
      id="modalDevolucion"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalDevolucion"
      aria-hidden="true"
      data-backdrop="static"
      data-keyboard="false"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Estás seguro de realizar la devolución a prestamo?
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="devolucion = {}"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>
              Devolución de la Venta # <b>{{ venta.codigo }}</b> a Prestamo
            </h5>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button
                  type="button"
                  class="btn btn-secondary form-control"
                  data-dismiss="modal"
                  @click="devolucion = {}"
                >
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input
                  type="button"
                  class="btn btn-success form-control"
                  value="Devolver"
                  @click="devolver()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MonedaUtil from "@/util/MonedaUtil";
export default {
  props: {
    registrosVentas: [],
    venta: {},
  },
  data() {
    return {
      registroVenta: {},
    };
  },
  methods: {
    generarReporte(item) {
      item.tipo_reporte = "Venta";
      item.tipo = "Producto";
      item.ruta_volver = "/ventas";
      item.tipoDescripcion = "Observación";
      item.tituloObservacion = "Recibido por";
      item.tieneProducto = true;
      item.cliente = this.venta.cliente
      item.telefono_cliente = this.venta.telefono_cliente
      item.hora = this.venta.hora
      item.usuario = this.venta.usuario
      item.precio_producto = this.venta.total
      //item.descripcion = 'Cantidad: ' + item.cantidad + '. Precio Unidad: ' + this.verFormatoMoneda(item.precio_producto)
      this.$router.push({
        name: "Reporte",
        query: { registro: JSON.stringify(item) },
      });
    },
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
    verDatosModal(registroVenta) {
      this.registroVenta = { ...registroVenta };
    },
    devolver() {
      const registroVenta = this.registroVenta;
      const prestamo = {
        observacion: "Devuelto desde una venta",
        producto_codigo: registroVenta.producto_codigo,
        cantidad: registroVenta.cantidad,
        usuario_codigo: this.venta.usuario_codigo,
        cliente_codigo: this.venta.cliente_codigo,
        desderegistroventa: "S",
      };
      this.axios
        .post("prestamo", prestamo)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.desactivar();
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    desactivar() {
      const datoEnviar = {
        estado: this.venta.estado === "1" ? "0" : "1",
        codigo: this.venta.codigo,
      };
      this.axios
        .post("venta/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/ventas";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
  },
};
</script>