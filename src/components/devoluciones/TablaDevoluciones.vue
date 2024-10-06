<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="devoluciones.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Número</th>
          <th scope="col">Producto</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Observación</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Cliente</th>
          <th scope="col">Usuario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="devolucion in devoluciones" :key="devolucion.codigo">
          <td :class="devolucion.estado === '1' ? 'text-danger' : ''">
            <p>{{ devolucion.codigo }}</p>
          </td>
          <td>
            <p>{{ devolucion.producto }}</p>
          </td>
          <td>
            <p>{{ devolucion.cantidad }}</p>
          </td>
          <td>
            <p>
              {{
                devolucion.observacion === null
                  ? "Sin observación"
                  : devolucion.observacion
              }}
            </p>
          </td>
          <td>
            <p>{{ formatearFecha(devolucion.fecha) }}</p>
          </td>
          <td>
            <p>{{ devolucion.hora }}</p>
          </td>
          <td>
            <p>{{ devolucion.cliente }}</p>
          </td>
          <td>
            <p>{{ devolucion.usuario }}</p>
          </td>
          <td>
            <button
              class="btn btn-outline-info"
              @click="
                enviarMensajeWhatsapp(
                  devolucion.cliente,
                  devolucion.telefono_cliente,
                  devolucion.producto,
                  devolucion.codigo_serie_producto,
                  devolucion.codigo,
                  devolucion.fecha,
                  devolucion.hora,
                  devolucion.observacion,
                  devolucion.cantidad
                )
              "
            >
              <span class="icon-whatsapp">&#x1F4F1;</span>
            </button>
          </td>
          <td>
            <button class="btn btn-outline-success"
              @click="generarReporte(devolucion)">
              <span>&#128196;</span>
            </button>
          </td>
          <td>
            <button
              class="btn"
              :class="
                devolucion.estado === '1'
                  ? 'btn-outline-success'
                  : 'btn-outline-danger'
              "
              @click="desactivar(devolucion)"
            >
              <span>{{
                devolucion.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>
        Sin devoluciones, te invitamos a registrar tu primer devolucion 🤗
      </h3>
    </div>
  </div>
</template>
<script>
import FechaUtil from "@/util/FechaUtil";
export default {
  props: {
    devoluciones: [],
  },
  data() {
    return {
      devolucion: {},
      clientedevolucionGuardar: {
        identificacion: "",
        nombre_completo: "",
      },
    };
  },
  methods: {
    generarReporte(item){
      item.tipo_reporte = 'Devolución'
      item.tipo = 'Producto'
      item.ruta_volver = '/devoluciones',
      item.tipoDescripcion = 'Observación',
      item.tieneProducto = true,
      item.descripcion = 'Cantidad: ' + item.cantidad
      this.$router.push({ name: "Reporte", query: { registro: JSON.stringify(item) } });
    },
    enviarMensajeWhatsapp(
      nombreCliente,
      telefonoCliente,
      descripcionProducto,
      codigoSerieProducto,
      codigodevolucion,
      fecha,
      hora,
      observacion,
      cantidad
    ) {
      const observacionMostrar = observacion === null
                  ? "Sin observación"
                  : observacion
      if (
        telefonoCliente !== undefined &&
        telefonoCliente !== null &&
        telefonoCliente.length > 0
      ) {
        const mensaje =
          "Apreciad@ " +
          nombreCliente +
          "\n\n" +
          "*Sv prestamos Electrónicas* le informa que se ha procesado la *devolución* del producto " +
          descripcionProducto +
          " con el *Código del Serie: " +
          codigoSerieProducto +
          "*. A continuación, los detalles correspondientes:\n\n" +
          "Código de la devolución: *" +
          codigodevolucion +
          "*\n" +
          "Fecha: " +
          this.formatearFecha(fecha) +
          "\n" +
          "Hora: " +
          hora +
          "\n" +
          "*Cantidad: " +
          cantidad +
          "*\n\n" +
          "Observación: " +
          observacionMostrar +
          "\n";

        const url =
          "https://api.whatsapp.com/send?phone=+57" +
          telefonoCliente +
          "&text=" +
          encodeURIComponent(mensaje);
        window.open(url);
      } else {
        alert("El Cliente no tiene un número de teléfono");
      }
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
    verDatosModal(devolucion) {
      this.devolucion = { ...devolucion };
    },
    desactivar(devolucion) {
      const datoEnviar = {
        estado: devolucion.estado === "1" ? "0" : "1",
        codigo: devolucion.codigo,
      };
      this.axios
        .post("devolucion_prestamo/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/devoluciones";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  },
};
</script>
<style>
.input-password,
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>