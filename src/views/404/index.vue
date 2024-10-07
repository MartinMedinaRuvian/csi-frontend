<template>
  <div class="text-center">
    <h3>No se encontro la página</h3>
    <button class="btn btn-success mt-5" @click="regresarInicio()">Regresar al inicio</button>
  </div>
</template>
<script>
  export default {
    methods:{
      regresarInicio(){
        location.href = '/'
      }
    }
  }
</script>