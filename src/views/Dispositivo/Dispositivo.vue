<template>
  <div class="text-center">
    <div v-if="usuario !== null && usuario.rol_codigo === 1">
      <h3 class="text-success mb-4 titulo-principal">Dispositivos</h3>
      <div class="row mt-5">
        <div class="form-group col-md-6">
          <label for="select">Condicion:</label>
          <select
            id="select"
            class="form-select form-control"
            aria-label="Default select example"
            v-model="condicion"
          >
            <option
              :value="condicion.valor"
              v-for="condicion in condiciones"
              :key="condicion.valor"
              class="text-success"
            >
              {{ condicion.descripcion }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-6">
          <label for="select">Buscar:</label>
          <div class="input-buscar">
            <input
              class="form-control"
              type="text"
              v-model="buscar"
              @keypress.enter="verdispositivos()"
            />
            <button class="btn btn-success" @click="verdispositivos()">
              &#128269;
            </button>
          </div>
        </div>
      </div>
      <Tabladispositivos :dispositivos="dispositivos" />
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import Tabladispositivos from "@/components/dispositivos/TablaDispositivos";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje },
  data() {
    return {
      dispositivo: {},
      dispositivos: [],
      mensaje: { ver: false },
      condiciones: [
        { descripcion: "Código Serie", valor: "codigo_serie" },
        { descripcion: "Descripción", valor: "descripcion" },
      ],
      condicion: "codigo_serie",
      buscar: "",
    };
  },
  created() {
    this.verdispositivos();
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
    guardardispositivo() {
      this.axios
        .post("dispositivo", this.dispositivo)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/dispositivos')
            window.location.href = "/dispositivos";
            $("#modalGuardardispositivo").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verdispositivos() {
      const buscarPor = {
        condicion: this.condicion,
        buscar: this.buscar,
      };
      this.axios
        .post("dispositivo/buscarfiltrado", buscarPor)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.dispositivos = respuesta.data;
          }
        });
    },
  },
  components: {
    Tabladispositivos,
  },
};
</script>
<style>
.input-buscar {
  display: flex;
  align-content: center;
  align-items: center;
}
</style>