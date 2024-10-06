<template>
  <div class="text-center">
    <div class="contenedor-principal">
      <div ref="map" id="map"></div>
      <button id="boton" class="btn btn-success mt-5" @click="verUbicacionActual()">Guardar Edificio con Ubicación Actual</button>
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
      map: null
    }
  },
  mounted() {
    this.inicializarMapa();
  },
  methods: {
    inicializarMapa() {
      this.map = L.map('map', {zoomControl: true,zoom:1,zoomAnimation:false,fadeAnimation:true,markerZoomAnimation:true}).setView([7.898226, -72.487687], 17);
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
        let texto = 'lat_' + coordenadas.lat + ' ' + 'lng_' + coordenadas.lng;

        try {
          await navigator.clipboard.writeText(texto);
          console.log('Contenido copiado al portapapeles');
        } catch (err) {
          console.error('Error al copiar: ', err);
        }
      })

      this.map.on('dblclick', async(event) => {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
        });
        const coordenadas = event.latlng;
        console.log(coordenadas);
        const nombreEdificio = prompt('Ingrese el nombre del edificio')
        const codigoEdificio = prompt('Ingrese el código del edificio')
        const ubicacionEdificio = 'lat_' + coordenadas.lat + ' ' + 'lng_' + coordenadas.lng;
        await this.guardarNuevoEdificio(nombreEdificio, codigoEdificio, ubicacionEdificio)
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
        const nombreEdificio = prompt('Ingrese el nombre del edificio')
        const codigoEdificio = prompt('Ingrese el código del edificio')
        const ubicacionEdificio = 'lat_' + coordenadas.lat + ' ' + 'lng_' + coordenadas.lng;
        await this.guardarNuevoEdificio(nombreEdificio, codigoEdificio, ubicacionEdificio)
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
              L.marker(coordenadas).addTo(this.map)
                .bindPopup(edificio.nombre || 'Edificio sin nombre');
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
    guardarNuevoEdificio(nombre, codigo, ubicacion_mapa){
      const edificio = {
        nombre,
        codigo,
        ubicacion_mapa
      }
      console.log(edificio)
      this.axios.post("edificio", edificio).then((respuesta) => {
        if (respuesta.status === 200){
          location.href = '/menu-administrador'
        }
      }).catch(error => console.log(error))
    }
  }
}
</script>

<style>
#map {
  height: 600px;
  width: 600px;
}
.contenedor-principal {
  margin-top: -25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* O ajusta la altura según lo que necesites */
}
</style>
