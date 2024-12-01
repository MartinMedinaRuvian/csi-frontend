<template>
  <div class="mt-5">

    <div id="dialog-window">
      <div id="scrollable-content" class="containe-imagenes mb-5">
        <table class="table table-responsive-lg" v-if="elementos && elementos.length > 0">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Imagen</th>
              <th scope="col">Dispositivo</th>
              <th scope="col">Código</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="elemento in elementos" :key="elemento.id">
              <td>
                <div class="contenedor-imagen">
                  <img id="imagen" :src="rutaImagenVer(elemento.ruta_imagen)" alt="">
                </div>
              </td>
              <td>
                <p>{{ elemento.tipo_dispositivo }}</p>
              </td>
              <td>
                <p>{{ elemento.codigo }}</p>
              </td>
              <td>
                <v-btn class="botones-icon mr-5" data-toggle="modal" data-target="#modalelementoEditar"
                  @click="verInfo(elemento)">
                  <v-icon icon="mdi-file-search-outline"></v-icon>
                  <v-tooltip activator="parent" location="top">Ver</v-tooltip>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else class="container-no_registros">
          <span>
            <v-icon color="grey-darken-3" icon="mdi-file-remove-outline"></v-icon>
          </span>
          <span>
            <h5>Sin Registros</h5>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    elementos: [],
    es_activo: Boolean,
    info_gabinete: {},
    info_edificio: {},
    info_centro_cableado: {}
  },
  data() {
    return {
      ruta_servidor: this.axios.defaults.baseURL
    }
  },
  methods: {
    verDatosModal(elemento) {
      this.elemento = { ...elemento };
    },
    rutaImagenVer(ruta_imagen) {
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/elemento_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verInfo(registro) {
      const datosRegistro = {
        id: registro.id,
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado,
        info_gabinete: this.info_gabinete
      }
      if (this.es_activo) {
        this.$router.push({
          name: "ElementoActivo",
          query: { registro: JSON.stringify(datosRegistro) },
        });
      } else {
        this.$router.push({
          name: "ElementoPasivo",
          query: { registro: JSON.stringify(datosRegistro) },
        });
      }
    }
  },
};
</script>
<style scoped>
.container-principal_archivos {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* Para que el contenido dentro de .container-principal esté en una columna */
}

.card {
  margin-bottom: 20px;
  border-radius: 10px;
}

.card-header {
  position: relative;
  text-align: center;
}

.contenedor-imagen img {
  width: 50px !important;
  height: 50px !important;
}

.card-header .numero {
  position: absolute;
  top: 0px;
  /* Mueve el número hacia la parte superior */
  left: 0px;
  /* Mueve el número hacia la izquierda */
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-top-left-radius: 10px;
  font-size: 20px;
}

.card-body {
  background-color: #f8f9fa;
}

#imagenPrevisualizacion {
  width: 80px;
  height: 80px;
}

#imagenInfo {
  width: 80px;
  height: 80px;
}

.requerido::before {
  content: "* ";
  /* Agrega el asterisco */
  color: red;
  /* Asterisco de color rojo */
  font-weight: bold;
  /* Opcional, para darle más énfasis */
}

.card-body p {
  font-size: 15px;
}

.icono {
  font-size: 80px;
}


.texto-mediano {
  font-size: 15px;
}

.pointer-hand {
  cursor: pointer;
}

#dialog-window {
  width: 100%;
  height: 200px;
  margin-bottom: 40px;
}

#scrollable-content {
  height: 250px;
  overflow: auto;
  border: solid 0.5px #212121;
  border-radius: 15px;
  background-color: #fff;
}

#imagenArchivoVer {
  width: 100%;
  height: 300px;
}

.texto-archivos {
  width: 85%;
  word-wrap: break-word !important;
}

.texto-archivos p {
  font-size: 15px;
}

.botones-archivos {
  width: 15%;
}

#scrollable-content li {
  background-color: #BDBDBD;
  color: #212121;
}

#scrollable-content li p {
  font-size: 18px;
}

.container-no_registros {
  margin-top: 45px;
}

.container-no_registros span {
  font-size: 60px;
}

.botones-icon {
  font-size: 25px;
  color: #00B0FF;
  background-color: #fff;
  border: solid #fff;
}
</style>
