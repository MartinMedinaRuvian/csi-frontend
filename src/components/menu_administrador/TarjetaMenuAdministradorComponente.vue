<template>
  <div class="text-center">
    <div class="row">
        <div class="col-lg-6 col-md-6 mb-5">   
            <div class="card">
                <div class="card-header">
                    <img @click="verEntradas()" src="../../assets/entrada.svg" alt="" class="img-fluid"> <br>      
                </div>
                <div class="card-body">
                     <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/entradas" class="btn btn-success mt-2">ENTRADAS</router-link>
                </div>
            </div>        
        </div>
          <div class="col-lg-6 col-md-6 mb-5">   
              <div class="card">
                  <div class="card-header">
                      <img @click="verReparaciones()" src="../../assets/reparacion.svg" alt="" class="img-fluid"> <br>      
                  </div>
                  <div class="card-body">
                       <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/reparaciones" class="btn btn-success mt-2">REPARACIONES</router-link>
                  </div>
              </div>        
          </div>
      </div>   
    <div class="row">     
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verProductos()" src="../../assets/productos.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/productos"
              class="btn btn-success mt-2">PRODUCTOS</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verUsuarios()" src="../../assets/usuarios.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/usuarios"
              class="btn btn-success mt-2">USUARIOS</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verClientes()" src="../../assets/clientes.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/clientes"
              class="btn btn-success mt-2">CLIENTES</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verDispositivos()" src="../../assets/dispositivos.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/dispositivos"
              class="btn btn-success mt-2">DISPOSITIVOS</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verPrestamos()" src="../../assets/prestamo.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/prestamos"
              class="btn btn-success mt-2">PRESTAMOS</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="devoluciones()" src="../../assets/return.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/devoluciones"
              class="btn btn-success mt-2">DEVOLUCIONES</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">     
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verVentas()" src="../../assets/venta.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/ventas"
              class="btn btn-success mt-2">VENTAS</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verMovimientosCaja()" src="../../assets/venta.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/movimiento_caja"
              class="btn btn-success mt-2">MOVIMIENTOS CAJA</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verMovimientosCajaMayor()" src="../../assets/venta.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/movimiento_caja_mayor"
              class="btn btn-success mt-2">MOVIMIENTOS CAJA MAYOR</router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 mb-5">
        <div class="card">
          <div class="card-header">
            <img @click="verContadorBilletes()" src="../../assets/contador_billetes.svg" alt="" class="img-fluid" />
            <br />
          </div>
          <div class="card-body">
            <router-link data-toggle="collapse" data-target=".navbar-collapse.show" to="/movimiento_caja_mayor"
              class="btn btn-success mt-2">CONTADOR DE BILLETES</router-link>
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
    verEntradas() {
      this.$router.push({ name: "Entradas" });
    },
    verReparaciones() {
      this.$router.push({ name: "Reparaciones" });
    },
    verClientes() {
      this.$router.push({ name: "Clientes" });
    },
    verUsuarios() {
      this.$router.push({ name: "Usuarios" });
    },
    verVentas() {
      this.$router.push({ name: "Ventas" });
    },
    verDispositivos() {
      this.$router.push({ name: "Dispositivos" });
    },
    devoluciones () {
      this.$router.push({ name: "Devoluciones" });
    },
    verPrestamos() {
      this.$router.push({ name: "Prestamos" });
    },
    verProductos() {
      this.$router.push({ name: "Productos" });
    }, 
    verVentas(){
      this.$router.push({ name: "Ventas" });
    }, 
    verMovimientosCaja() {
      this.$router.push({ name: "MovimientoCaja" });
    },
    verMovimientosCajaMayor(){
      this.$router.push({ name: "MovimientoCajaMayor" });
    },
    verContadorBilletes(){
      this.$router.push({ name: "ContadorBilletes" });
    },
    verServiciosPendientes(){
      this.$router.push({ name: "ServiciosPendientes" });
    }
  }
}
</script>
<style scoped>
.card-header>img {
  width: 300px;
  height: 300px;
}
</style>