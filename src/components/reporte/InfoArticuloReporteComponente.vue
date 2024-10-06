<template>
  <div>
    <div class="contenedor-info_reporte quitar_bottom">
    <div class="parte1">
      <p><b>{{ tipoArticulo }}:</b> {{ descripcionArticulo }}</p>
    </div>
    <div class="parte2">
      <p><b>Serie:</b> {{ codigoSerieArticulo }}</p>
    </div>
  </div>
  <div class="contenedor-info_reporte" v-if="!tieneProducto">
    <div class="parte1">
      <p><b>Marca:</b> {{ marcaArticulo }}</p>
    </div>
    <div class="parte2">
      <p><b>Modelo:</b> {{ modeloArticulo }}</p>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  props: {
    tipoArticulo: '',
    descripcionArticulo: '',
    codigoSerieArticulo: '',
    modeloArticulo: '',
    marcaArticulo: '',
    tieneProducto: false
  }
}
</script>
<style scoped>
  .contenedor-info_reporte {
    display: flex;
    align-items: center;
    align-content: space-between;
  }
  .parte1 {
    width: 70%;
    text-align: left;
  }
  .parte2 {
    width: 30%;
    text-align: right;
  }
  p {
  font-size: 17px;
}
.quitar_bottom{
  margin-bottom: -12px;
}
</style>