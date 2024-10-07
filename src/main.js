import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

/**
 * Agregamos la URL base de nuestra API. Para conectarse al backend local:
 */
const ipBackend = '192.168.0.111'
const puertoBackend = '5000'
axios.defaults.baseURL = `http://${ipBackend}:${puertoBackend}`;

// Configurar un interceptor para agregar el token en cada solicitud
axios.interceptors.request.use((config) => {
  const usuario = localStorage.getItem('usuario');
  if (usuario) {
    const token = JSON.parse(usuario).token;  // Ajusta según cómo esté almacenado el token
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Configurar un interceptor para manejar respuestas
axios.interceptors.response.use((response) => {
  // Si la respuesta es exitosa, simplemente retornamos la respuesta
  return response;
}, (error) => {
  // Verificar si la respuesta tiene un estado 401 o 403
  if (error.response.status === 401 || error.response.status === 403) {
    // Redirigir a una ruta específica, por ejemplo, una página de login o acceso denegado
    location.href = '/403' // Ajusta según la ruta de tu página
    return new Promise(() => {}); // Detener la ejecución retornando una promesa vacía
  }
  return Promise.reject(error);
});

/**
 * Agregamos la URL base de nuestra API. Para conectarse al backend de producción heroku:
 */
//axios.defaults.baseURL = 'https://somarufps.herokuapp.com';


import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})



//Vue.config.productionTip = false

createApp(App).use(store).use(router).use(VueAxios, axios).use(vuetify).mount('#app')
