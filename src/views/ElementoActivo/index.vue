<template>
  <div class="text-center">
    <div class="ruta">
      <h6>
        <span>
          <v-icon color="red-accent-4" icon="mdi-domain"></v-icon>
        </span>
        <span class="ml-1">
          {{ info_edificio.nombre }}
        </span>
        -
        <span>
          <v-icon color="red-accent-4" icon="mdi-ethernet"></v-icon>
        </span>
        <span>
          C. CABLEADO #{{ info_centro_cableado.numero }}
        </span>
        -
        <span>
          <v-icon color="red-accent-4" icon="mdi-desktop-tower"></v-icon>
        </span>
        <span>
          GABINETE R{{
            info_gabinete.numero }}
        </span>
      </h6>
    </div>
    <h4 class="text-danger mb-5">
      <span><button class="btn btn-success" @click="volver()">&#8630;</button> <v-tooltip activator="parent"
          location="top">Volver</v-tooltip></span>
      Información del Elemento Activo <b>{{ elemento.codigo }}</b>
    </h4>

    <v-row>
      <v-col>
        <v-btn color="green-darken-2" @click="sesionMostrar('info-principal')">Información Principal</v-btn>
      </v-col>
      <v-col>
        <v-btn color="grey-darken-3" @click="sesionMostrar('mantenimientos')">Ver Mantenimientos</v-btn>
      </v-col>
      <v-col>
        <v-btn color="yellow-lighten-3" @click="sesionMostrar('proyectos')">Ver Proyectos</v-btn>
      </v-col>
    </v-row>


    <v-row class="mt-5 ml-2" v-if="mostrarInfoPrincipal">
      <v-col>
        <v-card class="mx-auto" max-width="100%">

          <div class="contenedor-imagen">
            <span class="icono-actualizar" data-toggle="modal" data-target="#modalActualizarImagen">
              &#x1F504;
              <v-tooltip activator="parent" location="top">Cambiar Imagen</v-tooltip>
            </span>
            <v-img height="300px" :src="rutaImagenVer(elemento.ruta_imagen)" contain></v-img>
          </div>

          <v-card-title>
            Elemento {{ elemento.codigo }}
          </v-card-title>

          <v-card-subtitle>
            <h6 class="mt-3"><b>{{ elemento.tipo_dispositivo }}</b></h6>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn color="red-accent-4" text="Más información" @click="show = !show"></v-btn>

            <v-spacer></v-spacer>

            <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">

              <v-card-text align="center">
                <p class="text-primary"><b>Módelo:</b> {{ elemento.tipo_modelo }} <br>
                  <b>Marca:</b> {{ elemento.tipo_marca }} <br>
                  <b>Referencia:</b> {{ elemento.tipo_referencia }}
                </p>
                <div class="info-secundaria">
                  <span v-if="propiedadTieneValor(elemento.codigo_inventario)"><b>Código de inventario:</b> {{
                    elemento.codigo_inventario }}
                    <br>
                  </span>
                  <span v-if="propiedadTieneValor(elemento.serial)"><b>Serial:</b> {{ elemento.serial }} <br> </span>
                  <span v-if="propiedadTieneValor(elemento.os)"><b>S.O:</b> {{ elemento.os }} <br></span>
                  <span v-if="propiedadTieneValor(elemento.version_os)"><b>Versión S.O:</b> {{ elemento.version_os
                    }}<br></span>
                  <span v-if="propiedadTieneValor(elemento.gateway)"><b>Gateway:</b> {{ elemento.gateway }}<br></span>
                  <span v-if="propiedadTieneValor(elemento.ip_v4)"><b>IPV4:</b> {{ elemento.ip_v4 }}</span> <br>
                  <span v-if="propiedadTieneValor(elemento.ip_v6)"><b>IPV6:</b> {{ elemento.ip_v6 }}</span> <br>
                  <span v-if="propiedadTieneValor(elemento.cantidad_puertos_por_defecto)"><b>Cant. Puertos Default:</b>
                    {{
                      elemento.cantidad_puertos_por_defecto }}</span> <br>
                  <span v-if="propiedadTieneValor(elemento.puerto_logico_por_defecto)"><b></b> {{
                    elemento.puerto_logico_por_defecto }}</span> <br>
                  <span v-if="propiedadTieneValor(elemento.puerto_fisico_por_defecto)">Puerto Fisico Default: {{
                    elemento.puerto_fisico_por_defecto }}</span>
                </div>
              </v-card-text>

              <v-card-text align="left">
                <p v-if="elemento.observacion && elemento.observacion.length > 0">
                  <b>Observación:</b>
                  <br> {{
                    elemento.observacion }}
                </p>
              </v-card-text>

              <div class="botones mb-5">
                <button class="btn btn-warning mr-2" @click="actualizarElemento()">Actualizar</button>
                <button v-if="usuario.rol_id === 1" class="btn btn-danger" data-toggle="modal"
                  data-target="#modaleliminarElemento">Eliminar</button>
              </div>
            </div>
          </v-expand-transition>
        </v-card>
      </v-col>
      <v-col>
        <ArchivoTarjeta :archivos="archivos" :info_tabla="{ nombre_tabla: 'elemento_activo', id: elemento.id }" />
      </v-col>
    </v-row>

    <div v-if="mostrarProyectos">
      <ProyectoTarjeta :proyectos="proyectos" :info_tabla="{ nombre_tabla: 'elemento_activo', id: elemento.id }"
        :info_edificio="info_edificio" :info_centro_cableado="info_centro_cableado" :info_gabinete="info_gabinete"
        :info_elemento="info_elemento" @filtrar="filtrar" />
    </div>


    <div v-if="mostrarMantenimientos">

      <div class="container">
        <div class="row mt-5">
          <div class="form-group col-md-12">
            <label for="select">Forma de busqueda:</label>
            <select id="select" class="form-select form-control" aria-label="Default select example"
              v-model="buscarPorMantenimiento" @change="paginaActualMantenimiento = 1">
              <option :value="buscar.valor" v-for="buscar in tipoBusquedaMantenimiento" :key="buscar.valor"
                class="text-success">
                {{ buscar.descripcion }}
              </option>
            </select>
          </div>
        </div>
        <div class="row" v-if="buscarPorMantenimiento !== 1">
          <div class="form-group col-md-6">
            <label for="fecha">Fecha Inicial:</label>
            <input type="date" class="form-control" id="fecha" v-model="fechaInicialMantenimiento"
              :max="maximaFechaMantenimiento" @change="paginaActualMantenimiento = 1" />
          </div>
          <div class="form-group col-md-6">
            <label for="fecha">Fecha Final:</label>
            <input type="date" class="form-control" id="fecha" v-model="fechaFinalMantenimiento"
              :max="maximaFechaMantenimiento" @change="paginaActualMantenimiento = 1" />
          </div>
          <div class="form-group col-md-12" v-if="buscarPorMantenimiento === 2">
            <button class="btn btn-success" @click="verMantenimientos()">Buscar</button>
          </div>
        </div>
        <div class="row" v-if="buscarPorMantenimiento !== 2">
          <div class="form-group col-md-6">
            <label for="select">Condicion:</label>
            <select id="select" class="form-select form-control" aria-label="Default select example"
              v-model="condicionMantenimiento" @change="paginaActualMantenimiento = 1">
              <option :value="condicion.valor" v-for="condicion in condicionesMantenimiento" :key="condicion.valor"
                class="text-success">
                {{ condicion.descripcion }}
              </option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="select">Buscar:</label>
            <div class="input-buscar">
              <input class="form-control" type="text" v-model="buscarMantenimiento"
                @keypress.enter="verMantenimientos()" @keyup="paginaActual = 1" />
              <button class="btn btn-success" @click="verMantenimientos()">
                &#128269;
                <v-tooltip activator="parent" location="top">Ver</v-tooltip>
              </button>
            </div>
          </div>
        </div>
      </div>

      <MantenimientoTarjeta :mantenimientos="mantenimientos"
        :info_tabla="{ nombre_tabla: 'elemento_activo', id: elemento.id }" :info_edificio="info_edificio"
        :info_centro_cableado="info_centro_cableado" :info_gabinete="info_gabinete" :info_elemento="info_elemento" />

      <div class="paginacion">
        <button :disabled="paginaActualMantenimiento === 1"
          @click="cambiarPaginaMantenimiento(paginaActualMantenimiento - 1)" class="btn btn-success mr-2">
          &laquo;
        </button>

        <button v-for="pagina in paginasVisiblesMantenimiento" :key="pagina" @click="cambiarPaginaMantenimiento(pagina)"
          :class="['mr-2 btn', pagina === paginaActualMantenimiento ? 'btn-success' : 'btn-outline-success']">
          {{ pagina }}
        </button>

        <button
          :disabled="paginaActualMantenimiento === Math.ceil(totalRegistrosMantenimiento / registrosPorPaginaMantenimiento)"
          @click="cambiarPaginaMantenimiento(paginaActualMantenimiento + 1)" class="btn btn-success">
          &raquo;
        </button>
      </div>

    </div>

    <!-- Modal Atualizar Imagen-->
    <div class="modal fade" id="modalActualizarImagen" tabindex="-1" role="dialog"
      aria-labelledby="modalActualizarImagen" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Actualizar Imagen
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="archivo = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>Imagen:</h5>
                <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <input type="file" class="form-control" name="archivo_elemento" id="archivo_elemento"
                      @change="verImagen(elemento.ruta_imagen)" accept="image/*" ref="inputArchivoelemento" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img class="imagen-previsualizacion" alt="imagen" id="imagenPrevisualizacionelemento"
                      ref="imagenPrevisualizacionelemento" :src="rutaImagenVer(elemento.ruta_imagen)">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="Archivo = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar"
                    @click="actualizarImagen()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Eliminar -->
    <div class="modal fade" id="modaleliminarElemento" tabindex="-1" role="dialog"
      aria-labelledby="modaleliminarElemento" aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Eliminar elemento
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>

              <div class="form-group mt-4">
                <h5>¿ Eliminar elemento: {{ elemento.codigo }} ?</h5>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-danger form-control" value="Eliminar"
                    @click="eliminarElemento()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ElementoTarjeta from "@/components/elementos/ElementoTarjeta";
import ArchivoTarjeta from "@/components/archivos/ArchivoTarjeta";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
import TipoGuardar from "@/components/tipo/TipoGuardar.vue";
import ProyectoTarjeta from "@/components/proyectos/ProyectoTarjeta.vue";
import MantenimientoTarjeta from "@/components/mantenimiento/MantenimientoTarjeta.vue";
export default {
  components: { Mensaje, ElementoTarjeta, ArchivoTarjeta, TipoGuardar, ProyectoTarjeta, MantenimientoTarjeta },
  data() {
    return {
      elemento: {},
      elementos: [],
      archivos: [],
      proyectos: [],
      mantenimientos: [],
      mensaje: { ver: false },
      ruta_servidor: this.axios.defaults.baseURL,
      tiposElemento: ['EN OFICINA', 'INDEPENDIENTE'],
      opcionesRespuesta: [{ descripcion: 'SI', valor: 'S' }, { descripcion: 'NO', valor: 'N' }],
      elemento_actualizar: {},
      tiposreferencias: [],
      tiposmodelos: [],
      tiposmarcas: [],
      tiposdispositivo: [],
      urlSinImagenActivo: this.axios.defaults.baseURL + '/archivos/elemento_activo_default.svg',
      urlSinImagenPasivo: this.axios.defaults.baseURL + '/archivos/elemento_pasivo_default.svg',
      tablaTipo: 'tipo_referencia',
      tituloTipo: 'Nueva Referencia',
      guardarTipo: false,
      info_edificio: {},
      info_centro_cableado: {},
      info_gabinete: {},
      info_elemento: {},
      condicionesMantenimiento: [
        { descripcion: "CÓDIGO", valor: "m.codigo" },
        { descripcion: "RESPONSABLE", valor: "m.responsable" },
        { descripcion: "OBSERVACIÓN", valor: "m.observacion" }
      ],
      tipoBusquedaMantenimiento: [
        { descripcion: "BUSCAR POR CONDICIÓN", valor: 1 },
        { descripcion: "BUSCAR ENTRE FECHAS", valor: 2 },
        { descripcion: "BUSCAR ENTRE FECHAS MÁS CONDICIÓN", valor: 3 },
      ],
      buscarPorMantenimiento: 1,
      condicionMantenimiento: "m.codigo",
      buscarMantenimiento: "",
      fechaInicialMantenimiento: null,
      fechaFinalMantenimiento: null,
      maximaFechaMantenimiento: null,
      totalRegistrosMantenimiento: 0,
      paginaActualMantenimiento: 1,
      registrosPorPaginaMantenimiento: 4,
      show: false,
      mostrarInfoPrincipal: true,
      mostrarMantenimientos: false,
      mostrarProyectos: false
    };
  },
  mounted() {
    const registroString = this.$route.query.registro;
    const registroObjeto = JSON.parse(registroString);
    this.elemento = registroObjeto;
    this.info_edificio = registroObjeto.info_edificio
    this.info_centro_cableado = registroObjeto.info_centro_cableado
    this.info_gabinete = registroObjeto.info_gabinete
    this.verInfo()
    this.verArchivos()
    this.verProyectos('p.codigo', '')
    this.cargarFechaActual()
    this.verMantenimientos()
  },
  computed: {
    ...mapGetters(["usuario"]),
    totalPaginasMantenimiento() {
      return Math.ceil(this.totalRegistrosMantenimiento / this.registrosPorPaginaMantenimiento);
    },
    paginasVisiblesMantenimiento() {
      const totalPaginas = Math.ceil(this.totalRegistrosMantenimiento / this.registrosPorPaginaMantenimiento);
      const paginasPorMostrar = 4; // Número de páginas visibles
      const inicio = Math.max(1, this.paginaActualMantenimiento - Math.floor(paginasPorMostrar / 2));
      const fin = Math.min(totalPaginas, inicio + paginasPorMostrar - 1);

      // Asegurarnos de que el rango sea fijo
      const paginas = [];
      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }

      return paginas;
    }
  },
  methods: {
    cambiarPaginaMantenimiento(pagina) {
      if (pagina > 0 && pagina <= this.totalPaginasMantenimiento) {
        this.paginaActualMantenimiento = pagina;
        this.verMantenimientos();
      }
    },
    filtrar(datos) {
      const condicion = datos.condicion
      const buscar = datos.buscar
      this.verProyectos(condicion, buscar)
    },
    cargarFechaActual() {
      let date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const dia = day < 10 ? "0" + day : day;
      const mes = month < 10 ? "0" + month : month;

      const fechaActual = year + "-" + mes + "-" + dia;

      this.fechaInicialMantenimiento = fechaActual;
      this.fechaFinalMantenimiento = fechaActual;
      this.maximaFechaMantenimiento = fechaActual;
    },
    titulosAutocompleteReferencias(item) {
      return `${item.descripcion}`;
    },
    filterAutocompleteReferencias(item, queryText, itemText) {
      return (
        item.descripcion
          .toLocaleLowerCase()
          .indexOf(queryText.toLocaleLowerCase()) > -1
      );
    },
    crearMensaje(contenido, color) {
      this.mensaje.ver = true;
      this.mensaje.contenido = contenido;
      this.mensaje.color = color;
    },
    verArchivos() {
      const idelemento = this.elemento.id
      this.axios.get("archivo/elemento_activo/" + idelemento).then((respuesta) => {
        if (respuesta.status === 200) {
          this.archivos = respuesta.data;
        }
      });
    },
    verProyectos(condicion, buscar) {
      const idelemento = this.elemento.id
      const buscarPor = {
        condicion,
        buscar
      }
      this.axios.post("proyecto/info_principal/elemento_activo/" + idelemento, buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.proyectos = respuesta.data;
        }
      });
    },
    verMantenimientos() {
      const idelemento = this.elemento.id

      let buscarPor = {
        limite: this.registrosPorPaginaMantenimiento,
        pagina: this.paginaActualMantenimiento,
      };

      if (this.buscarPorMantenimiento === 1) {
        // Buscar por condición
        buscarPor = {
          ...buscarPor,
          condicion: this.condicionMantenimiento,
          buscar: this.buscarMantenimiento,
          buscarPor: this.buscarPorMantenimiento
        };
      } else if (this.buscarPorMantenimiento === 2) {
        // Buscar entre fechas
        buscarPor = {
          ...buscarPor,
          fechaInicial: this.fechaInicialMantenimiento,
          fechaFinal: this.fechaFinalMantenimiento,
          buscarPor: this.buscarPorMantenimiento
        };
      } else if (this.buscarPorMantenimiento === 3) {
        // Buscar entre fechas más condición
        buscarPor = {
          ...buscarPor,
          condicion: this.condicionMantenimiento,
          buscar: this.buscarMantenimiento,
          fechaInicial: this.fechaInicialMantenimiento,
          fechaFinal: this.fechaFinalMantenimiento,
          buscarPor: this.buscarPorMantenimiento
        };
      }
      console.log(buscarPor, 'djtitin')
      this.axios.post("mantenimiento/buscarporcondicion/elemento_activo/" + idelemento, buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.mantenimientos = respuesta.data.datos;
          this.totalRegistrosMantenimiento = respuesta.data.total;
        }
      })
        .catch((error) => {
          console.error("Error al obtener logs:", error);
        });
    },
    actualizarImagen() {
      const nombreTabla = 'elemento_activo'
      const id = this.elemento.id
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo_elemento");
      formData.append("archivo", imagefile.files[0]);
      this.axios
        .put("imagen/" + nombreTabla + "/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((respuesta) => {
          if (respuesta.status == 200) {
            console.log(respuesta.data)
            window.location.reload()
          }
        });
    },
    verImagen(urlImagenActual) {
      const archivos = this.$refs.inputArchivoelemento.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacionelemento.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacionelemento.src = urlImagenActual;
      }
    },
    eliminarElemento() {
      const id = this.elemento.id
      this.axios
        .delete("elemento_activo/" + id)
        .then((respuesta) => {
          if (respuesta.status == 200) {
            $("#modalEliminarElemento").modal("hide");
            this.volver()
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    rutaImagenVer(ruta_imagen) {
      const ruta = ruta_imagen != null && ruta_imagen != undefined ? ruta_imagen : 'archivos/elemento_activo_default.svg'
      return this.ruta_servidor + '/' + ruta
    },
    verDatosModal() {
      const dato = this.elemento
      this.elemento_actualizar = { ...dato };
    },
    volver() {
      const id = this.elemento.id_gabinete
      const datosRegistro = {
        id,
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado
      }
      location.href = "/gabinete?registro=" + JSON.stringify(datosRegistro)
    },
    verInfo() {
      const id = this.elemento.id
      this.axios.get("elemento_activo/info/" + id).then((respuesta) => {
        if (respuesta.status === 200) {
          this.elemento = respuesta.data;
          this.info_elemento = {
            id: this.elemento.id,
            codigo: this.elemento.codigo
          }
        }
      });
    },
    propiedadTieneValor(propiedad) {
      return propiedad !== null && propiedad !== undefined && propiedad != ''
    },
    actualizarElemento() {
      let elemento = this.elemento
      const idGabinete = this.elemento.id_gabinete
      const datosRegistro = {
        ...elemento,
        info_edificio: this.info_edificio,
        info_centro_cableado: this.info_centro_cableado,
        info_gabinete: this.info_gabinete
      }
      location.href = "/actualizar-elemento-activo?registro=" + JSON.stringify(datosRegistro)
    },
    sesionMostrar(sesion) {
      switch (sesion) {
        case 'info-principal':
          this.mostrarInfoPrincipal = true
          this.mostrarMantenimientos = false
          this.mostrarProyectos = false
          break;
        case 'mantenimientos':
          this.mostrarInfoPrincipal = false
          this.mostrarMantenimientos = true
          this.mostrarProyectos = false
          break;
        case 'proyectos':
          this.mostrarInfoPrincipal = false
          this.mostrarMantenimientos = false
          this.mostrarProyectos = true
          break;
      }
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
}

.contenedor-principal {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: space-between;
}

.contenedor-tarjeta {
  margin-top: 70px;
}

.imagen-wrapper {
  position: relative;
  display: inline-block;
}

.icono-actualizar {
  position: absolute;
  top: 8px;
  /* Ajusta según tu diseño */
  right: 8px;
  /* Ajusta según tu diseño */
  background-color: rgba(255, 255, 255, 0.8);
  /* Fondo blanco semi-transparente para mejor visibilidad */
  border-radius: 50%;
  /* Para hacer el fondo redondeado */
  padding: 5px;
  /* Espaciado interno */
  cursor: pointer;
  /* Cambia el cursor para indicar que es interactivo */
  font-size: 20px;
  /* Tamaño del ícono */
  z-index: 10;
  /* Asegura que esté por encima de la imagen */
  display: flex;
  justify-content: center;
  align-items: center;
}

.icono-actualizar:hover {
  background-color: rgba(0, 0, 0, 0.8);
  /* Cambia el fondo al pasar el mouse */
  color: white;
  /* Cambia el color del ícono al pasar el mouse */
}

.icono-actualizar {
  font-size: 23px;
  /* Tamaño del ícono */
  color: #212121;
  /* Color del ícono */
}

.imagen-previsualizacion {
  width: 120px;
  height: 120px;
}

.titulo {
  font-weight: 700;
  font-size: 20px;
}

.observacion {
  width: 100%;
  /* Asegura que ocupe todo el ancho disponible */
  display: flex;
  flex-direction: column;
  /* Alinea verticalmente */
  align-items: center;
  /* Centra el contenido dentro del div */
}

.textarea-center {
  width: 100%;
  /* Asegura que el textarea use el ancho total de su contenedor */
  max-width: 500px;
  /* Limita el ancho máximo */
}

.informacion {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
}

.informacion-basica,
.informacion-secundario {
  flex-basis: 100%;
  max-width: 100%;
}

.informacion-secundario {
  margin-bottom: 180px;
}

.numero {
  position: absolute;
  top: 5px;
  /* Mueve el número hacia la parte superior */
  left: 0px;
  /* Mueve el número hacia la izquierda */
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 700;
}

.span-boton_nuevo {
  padding: 3px;
  background-color: #28a745;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.info-secundaria span {
  font-size: 18px;
}

.paginacion {
  margin-top: -20px !important;
}

.contenedor-imagen {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #A5D6A7;
  padding: 4px;
}

@media (min-width: 768px) {

  .informacion-basica,
  .informacion-secundario {
    flex-basis: 50%;
    max-width: 50%;
  }
}
</style>