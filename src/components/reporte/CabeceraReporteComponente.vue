<template>
  <div class="text-center contenedor-cabecera">
    <div class="texto">
      <h2>SV REPARACIONES</h2>
      <p>CALLE 11 AVENIDA 0 0-30 LOCAL 213 <br> <b>CEL.</b> 310 577 1379 - <b>FIJO.</b> 5737010 <br> sergio.v.e@hotmail.com</p>
    </div>
    <div class="imagen">
      <img src="../../assets/logo.jpeg" alt="" class="img-fluid">
    </div>
  </div>
</template>
<style scoped>
  .contenedor-cabecera {
    display: flex;
    align-items: center;
    align-content: space-between;
    border: solid #1565C0 2px;
    border-radius: 10px;
  }
  .texto {
    margin-top: 15px;
    width: 70%;
  }
  .imagen {
    width: 30%;
  }
  img {
    width: 120px !important;
    height: 120px;
  }
  h2 {
    font-weight: 700;
  }
  p {
  margin-top: -5px;
  font-size: 17px;
  }
</style>