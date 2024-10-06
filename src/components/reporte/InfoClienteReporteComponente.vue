<template>
  <div class="contenedor-info_reporte">
    <div class="parte1">
      <p><b>Nombre del Cliente:</b> {{ nombreCliente }}</p>
    </div>
    <div class="parte2">
      <p><b>Teléfono:</b> {{ telefonoCliente }}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    nombreCliente: '',
    telefonoCliente: ''
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
    width: 60%;
    text-align: left;
  }
  .parte2 {
    width: 40%;
    text-align: right;
  }
  p {
  font-size: 17px;
}
</style>