<template>
  <div class="mt-5">
    <div v-if="ventas.length > 0">
      <table class="table table-responsive-md" id="tabla">
        <thead class="thead-light">
          <tr>
            <th scope="col">Numero</th>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Cliente</th>
            <th scope="col">Total</th>
            <th scope="col">Forma de Pago</th>
            <th scope="col">Usuario</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="venta in ventas" :key="venta.codigo">
            <td :class="venta.estado === '1' ? 'text-danger' : ''">
              <p>{{ venta.codigo }}</p>
            </td>
            <td>
              <p>{{ formatearFecha(venta.fecha) }}</p>
            </td>
            <td>
              <p>{{ venta.hora }}</p>
            </td>
            <td>
              <p>{{ venta.cliente }}</p>
            </td>
            <td>
              <p>{{ verFormatoMoneda(venta.total) }}</p>
            </td>
            <td>
              <p>{{ venta.forma_pago }}</p>
            </td>
            <td>
              <p>{{ venta.usuario }}</p>
            </td>
            <td>
              <button class="btn btn-outline-success" @click="infoVenta(venta)">
                <span>&#x1F441;</span>
              </button>
            </td>
            <td>
              <button
                class="btn"
                :class="
                  venta.estado === '1'
                    ? 'btn-outline-success'
                    : 'btn-outline-danger'
                "
                @click="desactivar(venta)"
              >
                <span>{{
                  venta.estado === "1" ? "&#10003;" : "&#x2716;"
                }}</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button class="btn btn-success" @click="generarExcel()">
          Exportar Tabla a Excel
        </button>
      </div>
    </div>
    <div class="text-center" v-else>
      <h3>Sin ventas 🤗</h3>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import ExcelJS from "exceljs";
export default {
  props: {
    ventas: [],
  },
  data() {
    return {
      venta: {},
      registroVentas: [],
    };
  },
  methods: {
    verFormatoMoneda(numero) {
      const formatoMoneda = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      });
      return formatoMoneda.format(numero);
    },
    formatearFecha(fecha) {
      return moment(fecha).format("YYYY-MM-DD");
    },
    verDatosModal(venta) {
      this.venta = { ...venta };
    },
    infoVenta(item) {
      this.$router.push({
        name: "InfoVenta",
        query: { registro: JSON.stringify(item) },
      });
    },
    desactivar(venta) {
      const datoEnviar = {
        estado: venta.estado === "1" ? "0" : "1",
        codigo: venta.codigo,
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
    generarExcel() {
      // Crea un nuevo libro de Excel
      const workbook = new ExcelJS.Workbook();

      // Agrega una nueva hoja al libro
      const worksheet = workbook.addWorksheet("Datos");

      // Obtiene los datos de la tabla
      const tabla = document.getElementById("tabla");

      // Obtiene las filas de la tabla
      const filas = tabla.getElementsByTagName("tr");

      // Obtiene los encabezados de columna
      const encabezados = tabla.getElementsByTagName("th");

      // Agrega los nombres de columna a la hoja de cálculo
      const nombresColumna = [];
      for (let j = 0; j < encabezados.length; j++) {
        nombresColumna.push(encabezados[j].innerText);
        worksheet.getCell(`${String.fromCharCode(65 + j)}1`).value =
          encabezados[j].innerText;
      }

      // Itera sobre las filas y agrega los datos al archivo Excel
      for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName("td");

        for (let j = 0; j < celdas.length; j++) {
          const valorCelda = celdas[j].innerText;

          if (this.esColumnaMoneda(j)) {
            // Formatea el valor como moneda
            const soloNumero = valorCelda.replace("$", "");
            const celda = worksheet.getCell(
              `${String.fromCharCode(65 + j)}${i + 2}`
            );
            celda.value = soloNumero;
            celda.numFmt = '"$" #,##0.00';
          } else {
            worksheet.getCell(`${String.fromCharCode(65 + j)}${i + 2}`).value =
              valorCelda;
          }
        }
      }

      // Genera el archivo Excel
      workbook.xlsx.writeBuffer().then((buffer) => {
        // Crea un blob a partir del buffer
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Crea un objeto URL a partir del blob
        const url = window.URL.createObjectURL(blob);

        // Crea un enlace y haz clic en él para descargar el archivo
        const a = document.createElement("a");
        a.href = url;
        a.download = this.nombreArchivoExcel();
        a.click();

        // Libera el objeto URL
        window.URL.revokeObjectURL(url);
      });
    },
    nombreArchivoExcel() {
      let date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const dia = day < 10 ? "0" + day : day;
      const mes = month < 10 ? "0" + month : month;

      let fechaActual = new Date();
      let hora = fechaActual.getHours();
      let minutos = fechaActual.getMinutes();

      // Asegúrate de agregar un 0 al frente si los minutos son menores a 10
      if (minutos < 10) {
        minutos = "0" + minutos;
      }

      const horaVer = hora + "-" + minutos;
      const fechaVer = year + "-" + mes + "-" + dia;

      return "ventas_" + fechaVer + "_" + horaVer + ".xlsx";
    },
    esColumnaMoneda(indiceColumna) {
      // Aquí puedes agregar la lógica para determinar si la columna es de tipo moneda
      // Por ejemplo, puedes usar un arreglo con los índices de columna que son de tipo moneda
      const columnasMoneda = [8, 9]; // Ejemplo: las columnas 2 y 4 son de tipo moneda

      return columnasMoneda.includes(indiceColumna);
    },
  },
};
</script>
<style scoped>
.registro-ventas p {
  font-size: 15px;
}
</style>