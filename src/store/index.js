import { createStore } from 'vuex'

export default createStore({
  state: {
    usuario: localStorage.getItem('usuario') !== null ? JSON.parse(localStorage.getItem('usuario')) : null,
    tamanioMaximoArchivo: 2 //Tamanio en Megas
  },
  mutations: {
    obtenerUsuario(state, payload){   
      state.usuario = payload;
    }
  },
  actions: {
    guardarUsuario({commit}, payload){
      const usuarioGuardar = {
        id: payload.id, 
        nombre_completo: payload.nombre_completo,
        rol_id: payload.rol_id,
        estado: payload.estado,
        token: payload.token
      };
      commit('obtenerUsuario', usuarioGuardar);
      localStorage.setItem('usuario', JSON.stringify(usuarioGuardar));
    },
    cerrarSesion({commit}){
      commit('obtenerUsuario', null);
      localStorage.removeItem('usuario');
      window.location.href = "/";
    }
  },
  getters:{
    usuario(state){
      return state.usuario
    },
    tamanioMaximoArchivo(state){
      return state.tamanioMaximoArchivo
    },
    tamanioMaximoArchivoEnBytes(state){
      return state.tamanioMaximoArchivo * 1024 * 1024
    }
  }
})
