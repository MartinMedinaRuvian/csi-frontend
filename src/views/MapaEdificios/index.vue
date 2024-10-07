<template>
  <div class="text-center">
    <div class="contenedor-principal">
      <div ref="map" id="map"></div>
      <button id="boton" class="btn btn-success mt-5" @click="verUbicacionActual()">Guardar Edificio con Ubicación
        Actual</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalGuardarEdificio" tabindex="-1" role="dialog" aria-labelledby="modalGuardarEdificio"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Guardar Edificio
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="edificio = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombre" class="requerido">Nombre:</label>
                <input required type="text" placeholder="Ingrese el Nombre" v-model="edificio.nombre"
                  class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo" class="requerido">Código:</label>
                  <input required type="text" placeholder="Ingrese el Código" v-model="edificio.codigo"
                    class="form-control" />
                </div>
              </div>

              <div class="form-group mt-4">
                <h5>Imagen:</h5>
                <div class="row">
                  <div class="col-md-12 col-lg-12">
                    <input type="file" class="form-control" name="archivo" id="archivo" @change="verImagen()"
                      accept="image/*" ref="inputArchivo" required>
                  </div>
                  <div class="col-md-12 col-lg-12 mt-3">
                    <img alt="imagen" id="imagenPrevisualizacion" ref="imagenPrevisualizacion" :src="urlSinImagen">
                  </div>
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="codigo">Observación:</label>
                  <textarea type="text" placeholder="Ingrese una observación" v-model="edificio.observación"
                    class="form-control" />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="edificio = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Guardar"
                    @click="guardarNuevoEdificio()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Ver Info -->
    <div class="modal fade" id="modalVerInfo" tabindex="-1" role="dialog" aria-labelledby="modalVerInfo"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Edificio - {{ edificio.codigo }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="edificio = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">

            <img id="imagenInfo" :src="verImagenServidorPorRuta(edificio.ruta_imagen)" :alt="edificio.ruta_imagen">
            <h6>{{ edificio.nombre }}</h6>


            <div class="row">
              <div class="col-md-6 mt-3">
                <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                  @click="edificio = {}">
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input type="button" class="btn btn-success form-control" value="Guardar"
                  @click="guardarNuevoEdificio()" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'

export default {
  name: 'MapaEdificios',
  data() {
    return {
      edificios: [],
      map: null,
      edificio: {},
      urlSinImagen: this.axios.defaults.baseURL + '/archivos/edificio_default.svg',
      urlImg: ''
    }
  },
  mounted() {
    this.inicializarMapa();
  },
  methods: {
    inicializarMapa() {
      this.map = L.map('map', { zoomControl: true, zoom: 1, zoomAnimation: false, fadeAnimation: true, markerZoomAnimation: true }).setView([7.898226, -72.487687], 17);
      this.map.doubleClickZoom.disable();
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 100,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(this.map);

      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 1000);

      this.map.on('click', async (event) => {
        const coordenadas = event.latlng;
        console.log(coordenadas);
        /*
        let texto = 'lat_' + coordenadas.lat + ' ' + 'lng_' + coordenadas.lng;

        try {
          await navigator.clipboard.writeText(texto);
        } catch (err) {
          console.error('Error al copiar: ', err);
        }
          */
      })

      this.map.on('dblclick', async (event) => {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
        });
        const coordenadas = event.latlng;
        console.log(coordenadas);
        //const nombreEdificio = prompt('Ingrese el nombre del edificio')
        //const codigoEdificio = prompt('Ingrese el código del edificio')
        this.edificio.ubicacionEdificio = 'lat_' + coordenadas.lat + ' ' + 'lng_' + coordenadas.lng;
        $("#modalGuardarEdificio").modal("show");
        //await this.guardarNuevoEdificio(nombreEdificio, codigoEdificio, ubicacionEdificio)
      });

      // Llamada a verEdificios después de inicializar el mapa
      this.verEdificios();
    },
    async verUbicacionActual() {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const coordenadas = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(coordenadas);
        this.edificio.ubicacionEdificio = 'lat_' + coordenadas.lat + ' ' + 'lng_' + coordenadas.lng;
        $("#modalGuardarEdificio").modal("show");
        //await this.guardarNuevoEdificio(nombreEdificio, codigoEdificio, ubicacionEdificio)
        //L.marker(coordenadas, { alt: 'Ubicación Actual' }).addTo(this.map).bindPopup('Ubicación Actual');
      });
    },
    verEdificios() {

      this.axios.get("edificio").then((respuesta) => {
        this.edificios = respuesta.data;
        // Itera sobre los edificios y marca las ubicaciones en el mapa
        this.edificios.forEach(edificio => {
          if (edificio.ubicacion_mapa) {
            const coordenadas = this.parseUbicacion(edificio.ubicacion_mapa);
            if (coordenadas) {
              //const rutaImagen = this.axios.defaults.baseURL + '/' + edificio.ruta_imagen
              const rutaImagen = this.verImagenServidorPorRuta(edificio.ruta_imagen);
              const contenidoBindPopup = `
                <div class="text-center">
                  <h6 class="texto-pequenio">(${edificio.codigo}) - ${edificio.nombre}</h6>
                  <img src="${rutaImagen}" alt="${edificio.nombre}" style="max-width: 100px; height: auto;" />
                  <br>
                  <button id="btn-abrir_modal" class="btn btn-success mt-2 texto-pequenio">Ver Info</button>
                </div>
              `
              const marker = L.marker(coordenadas, { title: edificio.nombre, alt: edificio.nombre }).addTo(this.map)
                .bindPopup(contenidoBindPopup);

              marker.on('popupopen', () => {
                document.querySelector('#btn-abrir_modal').addEventListener('click', () => {
                  this.verDatosModal(edificio);
                });
              });
            }
          }
        });
      });

    },
    parseUbicacion(ubicacion) {
      const regex = /lat_([-?\d.]+)\s+lng_([-?\d.]+)/;
      const match = ubicacion.match(regex);
      if (match) {
        return {
          lat: parseFloat(match[1]),
          lng: parseFloat(match[2])
        };
      } else {
        console.error("Ubicación en formato incorrecto:", ubicacion);
        return null;
      }
    },
    guardarNuevoEdificio() {
      const edificioGuardar = this.edificio
      const edificio = {
        nombre: edificioGuardar.nombre,
        codigo: edificioGuardar.codigo,
        ubicacion_mapa: edificioGuardar.ubicacionEdificio
      }
      console.log(edificio)
      this.axios.post("edificio", edificio).then((respuesta) => {
        if (respuesta.status === 200) {
          const idGuardado = respuesta.data.id
          this.actualizarImagen(idGuardado)
          location.href = '/menu-administrador'
        }
      }).catch(error => console.log(error))
    },
    actualizarImagen(idEdificio) {
      var formData = new FormData();
      var imagefile = document.querySelector("#archivo");
      formData.append("archivo", imagefile.files[0]);
      this.axios
        .put("imagen/edificio/" + idEdificio, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((respuesta) => {
          console.log(respuesta);
        });
    },
    eliminarImagen() {
      this.axios.delete('subir/' + this.nombreImagen)
        .then(respuesta => {
          console.log(respuesta)
          this.urlImg = '';
          const $imagenPrevisualizacion = document.querySelector("#imagenPrevisualizacion");
          const $seleccionArchivos = document.querySelector("#file");
          console.log($seleccionArchivos)
          $imagenPrevisualizacion.src = this.axios.defaults.baseURL + '/imagenes/sin-foto.svg';
          $seleccionArchivos.value = '';

        })
        .catch(error => console.log(error))
    },
    verImagen() {
      const archivos = this.$refs.inputArchivo.files;
      console.log(archivos)

      if ((archivos != null && archivos != undefined) && archivos.length > 0) {
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        this.$refs.imagenPrevisualizacion.src = objectURL;
      } else {
        this.$refs.imagenPrevisualizacion.src = this.urlSinImagen;
      }
    },
    verDatosModal(dato) {
      this.edificio = { ...dato };
      $("#modalVerInfo").modal("show");
    },
    verImagenServidorPorRuta(rutaImagen) {
      const ruta = this.axios.defaults.baseURL + '/' + rutaImagen
      console.log(ruta)
      return ruta
    }
  }
}
</script>

<style>
#map {
  height: 600px;
  width: 80%;
}

.contenedor-principal {
  margin-top: -25px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#imagenPrevisualizacion {
  width: 100px;
  height: 100px;
}

#imagenInfo {
  width: 150px;
  height: 150px;
}

.requerido::before {
  content: "* ";
  /* Agrega el asterisco */
  color: red;
  /* Asterisco de color rojo */
  font-weight: bold;
  /* Opcional, para darle más énfasis */
}

.texto-pequenio{
  font-size: 13px;
}
</style>
