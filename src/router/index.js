import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  { path: "/:pathMatch(.*)*", name: '404', component: () => import('@/views/404/index.vue') },
  { path: "/403", name: '403', component: () => import('@/views/403/index.vue') },
  {
    path: '/',
    name: 'Inicio',
    component: () => import('@/views/Usuario/UsuarioInicioSesion.vue')
  },
  {
    path: '/menu-usuario',
    name: 'MenuUsuario',
    component: () => import('@/views/MenuUsuario/MenuUsuario.vue'),
    props:true,
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/menu-administrador',
    name: 'MenuAdministrador',
    component: () => import('@/views/MenuAdministrador/MenuAdministrador.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('@/views/Cliente/Cliente.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: () => import('@/views/Usuario/Usuario.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/reporte',
    name: 'Reporte',
    component: () => import('@/views/Reporte/Reporte.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/edificio',
    name: 'Edificio',
    component: () => import('@/views/Edificio/index.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/centro-cableado',
    name: 'CentroCableado',
    component: () => import('@/views/CentroCableado/index.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/gabinete',
    name: 'Gabinete',
    component: () => import('@/views/Gabinete/index.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/elemento-activo',
    name: 'ElementoActivo',
    component: () => import('@/views/ElementoActivo/index.vue'),
    meta:{requiereAutorizacion:true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  const rutaProtegida = to.matched.some(record=> record.meta.requiereAutorizacion);

  if(rutaProtegida && store.state.usuario === null){
    next({name:'Inicio'})
  }else{
    next();
  }
})

export default router
