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
    path: '/productos',
    name: 'Productos',
    component: () => import('@/views/Producto/Producto.vue'),
    props:true,
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
    path: '/ventas',
    name: 'Ventas',
    component: () => import('@/views/Venta/Venta.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/dispositivos',
    name: 'Dispositivos',
    component: () => import('@/views/Dispositivo/Dispositivo.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/entradas',
    name: 'Entradas',
    component: () => import('@/views/Entrada/Entrada.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/nueva-entrada',
    name: 'NuevaEntrada',
    component: () => import('@/views/Entrada/NuevaEntrada.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/reparaciones',
    name: 'Reparaciones',
    component: () => import('@/views/Reparacion/Reparacion.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/nueva-reparacion',
    name: 'NuevaReparacion',
    component: () => import('@/views/Reparacion/NuevaReparacion.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/prestamos',
    name: 'Prestamos',
    component: () => import('@/views/Prestamo/Prestamo.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/nuevo-prestamo',
    name: 'NuevoPrestamo',
    component: () => import('@/views/Prestamo/NuevoPrestamo.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/devoluciones',
    name: 'Devoluciones',
    component: () => import('@/views/Devolucion/Devolucion.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/reporte',
    name: 'Reporte',
    component: () => import('@/views/Reporte/Reporte.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/ventas',
    name: 'Ventas',
    component: () => import('@/views/Venta/Venta.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/infoventa',
    name: 'InfoVenta',
    component: () => import('@/views/Venta/InfoVenta.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/nuevaventa',
    name: 'NuevaVenta',
    component: () => import('@/views/Venta/NuevaVenta.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/movimiento_caja',
    name: 'MovimientoCaja',
    component: () => import('@/views/MovimientoCaja/MovimientoCaja.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/movimiento_caja_mayor',
    name: 'MovimientoCajaMayor',
    component: () => import('@/views/MovimientoCajaMayor/MovimientoCajaMayor.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/resumen',
    name: 'Resumen',
    component: () => import('@/views/Resumen/Resumen.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/contador_billetes',
    name: 'ContadorBilletes',
    component: () => import('@/views/ContadorBilletes/ContadorBilletes.vue'),
    meta:{requiereAutorizacion:true}
  },
  {
    path: '/servicios_pendientes',
    name: 'ServiciosPendientes',
    component: () => import('@/views/ServiciosPendientes/ServiciosPendientes.vue'),
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
