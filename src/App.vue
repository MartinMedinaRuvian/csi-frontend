<template>
  <div id="app">
    <NavegacionAdmin v-if="usuario !== null && usuario.rol_id === 1"/>
    <NavegacionUsuario v-if="usuario !== null && usuario.rol_id === 2"/>
    <router-view class="contenedor-vistas"/>
    <Footer/>
  </div>
</template>
<script>
import NavegacionUsuario from './components/Navegacion/NavegacionUsuario.vue'
import NavegacionAdmin from './components/Navegacion/NavegacionAdmin.vue'
import Footer from './components/parciales/Footer.vue'
import { mapGetters } from "vuex";
export default {
  components: { 
    NavegacionUsuario,
    NavegacionAdmin,
    Footer 
  },
  computed:{
    ...mapGetters(['usuario'])
  }
  
}
</script>