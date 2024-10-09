<template>
  <div class="text-center">
    <div class="contenedor-principal mb-5">
      <button class="btn btn-success mb-4" @click="verEdificios()">Ver Edificios</button>
      <div class="contenedor-imagen">
        <h5>{{ edificio.nombre }} - <span>{{ edificio.codigo }}</span></h5>
        <img id="imagen" :src="ruta_servidor + '/' + edificio.ruta_imagen" alt="">
      </div>
      <div class="contenedor-informacion mt-3">
        <p v-if="edificio.observacion != null && edificio.observacion != undefined">Observación <br> {{ edificio.observacion }}</p>
      </div>
    </div>
    <CentroCableadoTarjeta :centros_cableados="centros_cableados" :id_edificio="edificio.id" />
  </div>
</template>
<script>
import CentroCableadoTarjeta from "@/components/centros_cableados/CentroCableadoTarjeta";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje, CentroCableadoTarjeta },
  data() {
    return {
      edificio: {},
      centros_cableados: [],
      mensaje: { ver: false },
      ruta_servidor: this.axios.defaults.baseURL
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.edificio = registroObjeto;
    this.verCentrosCableados()
  },
  computed: {
    ...mapGetters(["usuario"]),
  },
  methods: {
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    actualizar() {
      this.axios
        .post("edificio", this.edificio)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/edificios')
            window.location.href = "/edificios";
            $("#modalGuardaredificio").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verCentrosCableados() {
      const idEdificio = this.edificio.id
      console.log(this.edificio)
      this.axios.get("centro_cableado/" + idEdificio).then((respuesta) => {
        if (respuesta.status === 200) {
          this.centros_cableados = respuesta.data;
          console.log(this.centros_cableados, 'centrosCableados')
        }
      });
    },
    verEdificios(){
      location.href = '/'
    }
  }
};
</script>
<style scoped>
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}

#imagen {
  width: 250px;
  height: 250px;
  border-radius: 182px;
  border: solid 2px #28a745;
}

.contenedor-principal{
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
}

</style>