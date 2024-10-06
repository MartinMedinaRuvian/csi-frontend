<template>
  <div class="cabecera">
    <v-row>
      <v-col cols="6" class="text-start">
        <p> <b>Número:</b> {{ venta.codigo }} </p> 
      </v-col>
      <v-col cols="6" class="text-end">
        <p> <b>Fecha:</b> {{ formatearFecha(venta.fecha) }} - <b>Hora:</b> {{ venta.hora }} </p> 
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="text-start">
        <p> <b>Cliente:</b> {{ venta.cliente }} </p> 
      </v-col>
      <v-col cols="6" class="text-end">
        <p> <b>Total:</b> {{ verFormatoMoneda(venta.total) }} </p> 
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" class="text-start">
        <p> <b>Usuario:</b> {{ venta.usuario }} </p> 
      </v-col>
      <v-col cols="6" class="text-end">
        <p> <b>Forma de Pago:</b> {{ venta.forma_pago }} </p> 
      </v-col>
    </v-row>
  </div>
</template>
<script>
import FechaUtil from "@/util/FechaUtil";
import MonedaUtil from "@/util/MonedaUtil";
export default {
  props: {
    venta: {},
  },
  methods: {
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha);
    },
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
  }
};
</script>
<style scoped>
  .cabecera{
    border: solid #28a745 1px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 50px;
  }
  p {
    margin-bottom: -5px;
  }
</style>