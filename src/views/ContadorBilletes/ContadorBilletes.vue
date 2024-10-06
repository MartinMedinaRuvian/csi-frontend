<template>
  <div class="text-center">
    <div v-if="usuario !== null">
      <h3 class="text-success mb-5 titulo-principal">Contador de Billetes</h3>
      <div class="contenedor-billetes">
        <div class="card">
        <div class="card-body">
          <img src="../../assets/billetes/100000.jpg" alt="BILLETE DE $100.000" class="mb-2">
          <input type="number" class="form-control" min="0" v-model="CIEN_CANTIDAD" @keyup="totalBilletes()" @change="totalBilletes()" />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <img src="../../assets/billetes/50000.png" alt="BILLETE DE $50.000" class="mb-2">
          <input type="number" class="form-control" min="0" v-model="CINCUENTA_CANTIDAD" @keyup="totalBilletes()" @change="totalBilletes()" />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <img src="../../assets/billetes/20000.png" alt="BILLETE DE $20.000" class="mb-2">
          <input type="number" class="form-control" min="0" v-model="VEINTE_CANTIDAD" @keyup="totalBilletes()" @change="totalBilletes()" />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <img src="../../assets/billetes/10000.jpg" alt="BILLETE DE $10.000" class="mb-2">
          <input type="number" class="form-control" min="0" v-model="DIEZ_CANTIDAD" @keyup="totalBilletes()" @change="totalBilletes()" />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <img src="../../assets/billetes/5000.jpeg" alt="BILLETE DE $5.000" class="mb-2">
          <input type="number" class="form-control" min="0" v-model="CINCO_CANTIDAD" @keyup="totalBilletes()" @change="totalBilletes()" />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <img src="../../assets/billetes/2000.jpg" alt="BILLETE DE $2.000" class="mb-2">
          <input type="number" class="form-control" min="0" v-model="DOS_CANTIDAD" @keyup="totalBilletes()" @change="totalBilletes()" />
        </div>
      </div>
      <div class="card">
        <div class="card-body">
          <img src="../../assets/billetes/1000.png" alt="BILLETE DE $1.000" class="mb-2">
          <input type="number" class="form-control" min="0" v-model="MIL_CANTIDAD" @keyup="totalBilletes()" @change="totalBilletes()" />
        </div>
      </div>
      </div>
      <div class="mt-4">
        <h4>Total: <b>{{ verFormatoMoneda(total) }}</b></h4>
      </div>
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import MonedaUtil from '@/util/MonedaUtil';
export default {
  data() {
    return {
      total: 0,
      CIEN_CANTIDAD: 0,
      CINCUENTA_CANTIDAD: 0,
      VEINTE_CANTIDAD: 0,
      DIEZ_CANTIDAD: 0,
      CINCO_CANTIDAD: 0,
      DOS_CANTIDAD:0,
      MIL_CANTIDAD:0
    };
  },
  methods: {
    totalBilletes(){
      let totalEnBilletes = 
      this.valorPesosPorCantidadBilletes(this.CIEN_CANTIDAD, 100000) + 
      this.valorPesosPorCantidadBilletes(this.CINCUENTA_CANTIDAD, 50000) +
      this.valorPesosPorCantidadBilletes(this.VEINTE_CANTIDAD, 20000) + 
      this.valorPesosPorCantidadBilletes(this.DIEZ_CANTIDAD, 10000) +
      this.valorPesosPorCantidadBilletes(this.CINCO_CANTIDAD, 5000) + 
      this.valorPesosPorCantidadBilletes(this.DOS_CANTIDAD, 2000) +
      this.valorPesosPorCantidadBilletes(this.MIL_CANTIDAD, 1000)
      
      this.total = totalEnBilletes
    },
    valorPesosPorCantidadBilletes(cantidad, valor){
      return cantidad * valor;
    },
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero);
    },
  },
};
</script>
<style scoped>
.card-body>img {
  width: 160px;
  height: 100px;
}
.card{
  max-width: 200px;
  margin: 10px;
}
.contenedor-billetes{
  display: flex;
  text-align: center;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
}
</style>