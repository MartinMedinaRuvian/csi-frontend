<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="productos.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Descripción</th>
          <th scope="col">Código Serie</th>
          <th scope="col">Stock</th>
          <th scope="col">Precio</th>
          <th scope="col">Precio Técnico</th>
          <th scope="col">Fecha Registro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.codigo">
          <td :class="producto.estado === '1' ? 'text-danger' : ''">
            <p>{{ producto.descripcion }}</p>
          </td>
          <td>
            <p>{{ producto.codigo_serie }}</p>
          </td>
          <td>
            <p>{{ producto.stock }}</p>
          </td>
          <td>
            <p>{{ verFormatoMoneda(producto.precio) }}</p>
          </td>
          <td>
            <p>{{ verFormatoMoneda(producto.costo) }}</p>
          </td>
          <td>
            <p>{{ formatearFecha(producto.fecha_registro) }}</p>
          </td>
          <td>
            <button data-toggle="modal" data-target="#modalproductoEditar" class="btn btn-outline-warning"
              @click="verDatosModal(producto)">
              <span class="icon-Lapiz"></span>
            </button>
          </td>
          <td>
            <button class="btn" :class="producto.estado === '1'
                ? 'btn-outline-success'
                : 'btn-outline-danger'
              " @click="desactivar(producto)">
              <span>{{
                producto.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>Sin productos, te invitamos a registrar tu primer producto 🤗</h3>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalproductoEditar" tabindex="-1" role="dialog" aria-labelledby="modalproductoEditar"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Editar Producto
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="producto = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="descripcion">Descripción:</label>
                <input type="text" placeholder="Descripción" v-model="producto.descripcion" class="form-control" />
              </div>

              <div class="form group mt-3">
                  <label for="descripcion">Código Serie:</label>
                  <input type="text" placeholder="Código Serie" v-model="producto.codigo_serie" class="form-control" />
                </div>

                
                <div class="form group mt-3">
                  <label for="stock">Stock:</label>
                  <input type="text" placeholder="Stock" v-model="producto.stock" class="form-control" />
                </div>

                <div class="form group mt-3">
                  <div class="form-group">
                    <label for="precioUnidad">Precio:</label>
                    <input type="number" placeholder="Precio" v-model="producto.precio" class="form-control" />
                  </div>
                  <div class="form-group">
                    <label for="costo">Precio Técnico:</label>
                    <input type="number" placeholder="Precio Técnico" v-model="producto.costo" class="form-control" />
                  </div>
                </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal"
                    @click="producto = {}">
                    Cancelar
                  </button>
                </div>
                <div class="col-md-6 mt-3">
                  <input type="button" class="btn btn-success form-control" value="Actualizar" @click="actualizar()" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal Confirmar Eliminar -->
    <div class="modal fade" id="modalProductoEliminar" tabindex="-1" role="dialog" aria-labelledby="modalProductoEliminar"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Estás seguro de que deseas eliminar este registro?
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="producto = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>{{ producto.descripcion }}</h5>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button type="button" class="btn btn-secondary form-control" data-dismiss="modal" @click="producto = {}">
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input type="button" class="btn btn-danger form-control" value="Eliminar" @click="eliminar(producto)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FechaUtil from '@/util/FechaUtil'
import MonedaUtil from '@/util/MonedaUtil'
export default {
  props: {
    productos: [],
  },
  data() {
    return {
      producto: {unidad:'GLS'},
      unidades: ['GLS', 'LTR']
    };
  },
  methods: {
    formatearFecha(fecha) {
      return FechaUtil.formatearFecha(fecha)
    },
    verFormatoMoneda(numero) {
      return MonedaUtil.verFormatoMoneda(numero)
    },
    verDatosModal(producto) {
      this.producto = { ...producto };
    },
    actualizar() {
      this.axios
        .put("producto", this.producto)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/productos";
            $("#modalproductoEditar").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    desactivar(producto) {
      const datoEnviar = {
        estado: producto.estado === "1" ? "0" : "1",
        codigo: producto.codigo,
      };
      this.axios
        .post("producto/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/productos";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    eliminar(producto) {
      console.log(producto);
      this.axios
        .delete("producto/" + producto.codigo)
        .then((respuesta) => {
          window.location.href = "/productos";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
  },
};
</script>