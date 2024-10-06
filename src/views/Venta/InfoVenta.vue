<template>
  <div class="text-center">
    <CabeceraInfoVenta :venta="registro"/>
    <TablaRegistrosVentas :registrosVentas="registrosVentas" :venta="registro"/>
    <v-btn color="success" @click="volver()">Volver</v-btn>
  </div>
</template>
<script>
import CabeceraInfoVenta from '@/components/ventas/CabeceraInfoVenta.vue';
import TablaRegistrosVentas from '@/components/ventas/TablaRegistrosVentas.vue';
export default {
  components: { CabeceraInfoVenta, TablaRegistrosVentas },
  data() {
    return {
      registro: {},
      registrosVentas:[]
    };
  },
  mounted(){
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    console.log(registroObjeto);
    this.registro = registroObjeto;
    this.verRegistrosVenta();
  },
  methods: {
    verRegistrosVenta() {
      this.axios
        .get("registro_venta/buscarporcodigoventa/" + this.registro.codigo)
        .then((respuesta) => {
          this.registrosVentas = respuesta.data;
        });
    },
    volver(){
      this.$router.push({name:'Ventas'})
    }
  },
};
</script>