<template>
  <div>
    <div class="ticket-page" id="printable-ticket">
      <CabeceraReporteComponente class="mb-2"/>
      <InfoReporteComponenteVue :codigo="codigo" :fecha="fecha" :hora="hora" :tipoReporte="tipoReporte" class="quitar-espacio_bottom" />
      <InfoClienteReporteComponenteVue :nombreCliente="nombreCliente" :telefonoCliente="telefonoCliente" class="quitar-espacio_bottom"/>
      <InfoArticuloReporteComponenteVue :tipoArticulo="tipoArticulo" :descripcionArticulo="descripcionArticulo" :codigoSerieArticulo="codigoSerieArticulo" :modeloArticulo="modeloArticulo" :marcaArticulo="marcaArticulo" :tieneProducto="tieneProducto" class="quitar-espacio_bottom" />
      <InfoSecundariaReporteComponente v-if="ruta_volver === '/reparaciones' || ruta_volver === '/prestamos' || ruta_volver === '/ventas'" :tituloCantidad="tituloCantidad" :tituloValor="tituloValor" :cantidad="cantidad" :valor="valor" class="quitar-espacio_bottom_descripcion" />
      <div class="quitar-espacio_bottom_descripcion" v-if="ruta_volver !== '/ventas'">
        <p><b>Descripción / {{ tipoDescripcion }}:</b></p>
      <p class="textarea">{{ descripcion }}</p>
      </div>
      <div v-if="ruta_volver !== '/ventas'">
        <p><b>{{ tituloObservacion }}:</b></p>
      <p class="textarea">{{ observacion }}</p>
      </div>
      <FooterReporteComponente :nombreUsuario="nombreUsuario" :tipoUsuario="tipoUsuario" class="mt-5" />
    </div>
    <div class="text-center">
      <button @click="imprimirPDF2()" class="btn btn-success">Imprimir</button>
    </div>
    <div class="text-center mt-4">
      <button @click="volver()" class="btn btn-secondary">Volver</button>
    </div>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";
import CabeceraReporteComponente from "@/components/reporte/CabeceraReporteComponente.vue";
import InfoReporteComponenteVue from '@/components/reporte/InfoReporteComponente.vue';
import InfoClienteReporteComponenteVue from '@/components/reporte/InfoClienteReporteComponente.vue';
import InfoArticuloReporteComponenteVue from '@/components/reporte/InfoArticuloReporteComponente.vue';
import FooterReporteComponente from '@/components/reporte/FooterReporteComponente.vue';
import InfoSecundariaReporteComponente from "@/components/reporte/InfoSecundariaReporteComponente.vue";
import FechaUtil from "@/util/FechaUtil";
export default {
  components: {
    CabeceraReporteComponente,
    InfoReporteComponenteVue,
    InfoClienteReporteComponenteVue,
    InfoArticuloReporteComponenteVue,
    FooterReporteComponente,
    InfoSecundariaReporteComponente
  },
  data() {
    return {
      registro: {},
      tipoReporte: 'Entrada',
      codigo: 1,
      fecha: '2023-11-25',
      hora: '17:25',
      nombreCliente: 'Martin Medina',
      telefonoCliente: '3115643736',
      tipoArticulo: 'Dispositivo',
      descripcionArticulo: 'Portatil Acer Compact',
      modeloArticulo: 'Prueba001',
      marcaArticulo: 'HP',
      descripcion: '',
      observacion: '',
      codigoSerieArticulo: '04344345344543',
      nombreUsuario: 'Martin Medina',
      ruta_volver: '/entradas',
      tipoDescripcion: 'Daño',
      tituloObservacion: 'Observación / Notas',
      tipoUsuario: 'Técnico',
      tieneProducto: false,
      tituloCantidad: '',
      tituloValor: '',
      cantidad: '',
      valor: ''
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    console.log(registroObjeto);
    this.registro = registroObjeto;

    this.tipoReporte = this.registro.tipo_reporte
    this.codigo = this.registro.codigo
    this.fecha = this.formatearFecha(this.registro.fecha)
    this.hora = this.registro.hora
    this.nombreCliente = this.registro.cliente
    this.telefonoCliente = this.registro.telefono_cliente
    this.tieneProducto = this.registro.tieneProducto
    this.descripcionArticulo = !this.tieneProducto ? this.registro.dispositivo : this.registro.producto
    this.modeloArticulo = this.registro.modelo_dispositivo
    this.marcaArticulo = this.registro.marca_dispositivo
    this.ruta_volver = this.registro.ruta_volver
    this.descripcion = (this.ruta_volver === '/reparaciones') ? this.registro.reporte_final : this.registro.descripcion
    this.observacion = this.registro.observacion
    this.tipoArticulo = this.registro.tipo
    this.codigoSerieArticulo = (this.tipoArticulo === 'Dispositivo') ? this.registro.codigo_serie_dispositivo : this.registro.codigo_serie_producto
    this.tipoDescripcion = this.registro.tipoDescripcion
    this.tipoUsuario = this.registro.usuario_rol_codigo === 1 ? 'Administrador' : 'Técnico'
    this.nombreUsuario = this.registro.usuario
    this.tituloObservacion = (this.registro.tituloObservacion !== null && this.registro.tituloObservacion !== undefined) ? this.registro.tituloObservacion : 'Observación / Notas'
    if(this.ruta_volver === '/reparaciones'){
      this.verificarInfoSecundaria('', this.registro.valor)
    } else {
      this.verificarInfoSecundaria(this.registro.cantidad, this.registro.precio_producto)
    }
  },
  methods: {
    verificarInfoSecundaria(cantidad, valor){
      if(this.ruta_volver === '/reparaciones' || this.ruta_volver === '/prestamos' || this.ruta_volver === '/ventas'){
        if(this.ruta_volver === '/reparaciones') {
          this.tituloCantidad = ''
          this.tituloValor = 'Valor:'
          this.valor = this.verFormatoMoneda(valor)
        } else if (this.ruta_volver === '/ventas' || this.ruta_volver === '/prestamos') {
          this.tituloCantidad = 'Cantidad:'
          this.tituloValor = 'Precio Unidad:'
          this.cantidad = cantidad
          this.valor = this.verFormatoMoneda(valor / cantidad) + ' - Total: ' + this.verFormatoMoneda(valor)
        }
      }
    },
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
    async imprimirPDF2() {
      const printContents =
        document.getElementById("printable-ticket").innerHTML;
      var opt = {
        margin: 1,
        filename: "myfile.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: [216, 279], orientation: "portrait" },
        //jsPDF: { unit: "mm", format: "letter", orientation: "portrait" },
      };
      const pdfDoc = await html2pdf()
        .from(printContents)
        .set(opt)
        .outputPdf("arraybuffer");
      const pdfBytes = new Uint8Array(pdfDoc);
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const blobUrl = URL.createObjectURL(blob);

      const windowFeatures = "resizable,scrollbars,status,width=1000,height=1000";
      const printWindow = window.open(blobUrl, "_blank", windowFeatures);

      printWindow.onload = function () {
        printWindow.print();
      };
    },
    verFormatoMoneda(numero) {
      const formatoMoneda = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      });
      return formatoMoneda.format(numero);
    },
    volver() {
      window.location.href = this.ruta_volver;
    }
  },
};
</script>

<style scoped>
.ticket-page {
  margin: 10mm auto;
  padding: 5mm;
  width: 216mm;
  font-family: Arial, sans-serif;
}
.quitar-espacio_bottom {
  margin-bottom: -13px;
}
.quitar-espacio_bottom_descripcion{
  margin-bottom: -10px;
}
.textarea {
  margin-top: -13px;
  border-radius: 10px;
  border: solid #000 1px;
  width: 100%;
  height: 50px;
  padding: 10px;
  font-size: 14px;
}
p {
  font-size: 17px;
}
</style>