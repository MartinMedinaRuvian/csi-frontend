<template>
  <div id="app">
    <NavegacionAdmin v-if="usuario !== null && usuario.rol_id === 1 && locationURL !== '/reset-password'"/>
    <NavegacionUsuario v-if="usuario !== null && usuario.rol_id === 2 && locationURL !== '/reset-password'"/>
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
  data(){
    return {
      locationURL: ''
    }
  },
  mounted() {
    const pathnameURL = window.location.pathname
    this.locationURL = pathnameURL
  },
  computed:{
    ...mapGetters(['usuario'])
  }
  
}
</script>