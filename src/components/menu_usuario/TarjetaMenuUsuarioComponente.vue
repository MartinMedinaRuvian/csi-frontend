<template>
  <div class="text-center">
    <div class="row">
      <div class="col-lg-6 col-md-6">
        <div class="card">
          <div class="card-header">
            <img
              @click="entrada()"
              src="../../assets/entrada.svg"
              alt=""
              class="img-fluid"
            />
            <br />
          </div>
          <div class="card-body">
            <router-link
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              to="/entradas"
              class="btn btn-success mt-2"
              >ENTRADAS</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6">
        <div class="card">
          <div class="card-header">
            <img
              @click="reparacion()"
              src="../../assets/reparacion.svg"
              alt=""
              class="img-fluid"
            />
            <br />
          </div>
          <div class="card-body">
            <router-link
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              to="/reparaciones"
              class="btn btn-success mt-2"
              >REPARACIONES</router-link
            >
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-lg-6 col-md-6">
        <div class="card">
          <div class="card-header">
            <img
              @click="prestamo()"
              src="../../assets/prestamo.svg"
              alt=""
              class="img-fluid"
            />
            <br />
          </div>
          <div class="card-body">
            <router-link
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              to="/prestamos"
              class="btn btn-success mt-2"
              >PRESTAMOS</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6">
        <div class="card">
          <div class="card-header">
            <img
              @click="devoluciones()"
              src="../../assets/return.svg"
              alt=""
              class="img-fluid"
            />
            <br />
          </div>
          <div class="card-body">
            <router-link
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              to="/devoluciones"
              class="btn btn-success mt-2"
              >DEVOLUCIONES</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img
              @click="verVentas()"
              src="../../assets/venta.svg"
              alt=""
              class="img-fluid"
            />
            <br />
          </div>
          <div class="card-body">
            <router-link
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              to="/ventas"
              class="btn btn-success mt-2"
              >VENTAS</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img
              @click="verMovimientosCaja()"
              src="../../assets/venta.svg"
              alt=""
              class="img-fluid"
            />
            <br />
          </div>
          <div class="card-body">
            <router-link
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
              to="/movimiento_caja"
              class="btn btn-success mt-2"
              >MOVIMIENTOS CAJA</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">   
            <div class="card">
                <div class="card-header">
                    <img @click="verServiciosPendientes()" src="../../assets/entrada.svg" alt="" class="img-fluid"> <br>      
                </div>
                <div class="card-body">
                     <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/servicios_pendientes" class="btn btn-success mt-2">Servicios Pendientes</router-link>
                </div>
            </div>        
        </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    entrada() {
      this.$router.push({ name: "Entradas" });
    },
    reparacion() {
      this.$router.push({ name: "Reparaciones" });
    },
    prestamo() {
      this.$router.push({ name: "Prestamos" });
    },
    devoluciones() {
      this.$router.push({ name: "Devoluciones" });
    },
    verVentas() {
      this.$router.push({ name: "Ventas" });
    },
    verMovimientosCaja() {
      this.$router.push({ name: "MovimientoCaja" });
    },
    verServiciosPendientes(){
      this.$router.push({ name: "ServiciosPendientes" });
    }
  },
};
</script>
<style scoped>
.card-header > img {
  width: 300px;
  height: 300px;
}
</style>