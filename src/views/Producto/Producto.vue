<template>
  <div class="text-center">
    <div v-if="usuario !== null && usuario.rol_codigo === 1">
      <h3 class="text-success mb-4 titulo-principal">Productos</h3>
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#modalGuardarProducto"
      >
        Guardar un nuevo producto
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="modalGuardarProducto"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalGuardarProducto"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Guardar Producto
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="producto = {}"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent>
                <div class="form group">
                  <label for="descripcion">Descripción:</label>
                  <input
                    type="text"
                    placeholder="Descripción"
                    v-model="producto.descripcion"
                    class="form-control"
                  />
                </div>

                <div class="form group mt-3">
                  <label for="descripcion">Código Serie:</label>
                  <input
                    type="text"
                    placeholder="Código Serie"
                    v-model="producto.codigo_serie"
                    class="form-control"
                  />
                </div>

                <div class="form group mt-3">
                  <label for="stock">Stock:</label>
                  <input
                    type="text"
                    placeholder="Stock"
                    v-model="producto.stock"
                    class="form-control"
                  />
                </div>

                <div class="form group mt-3">
                  <div class="form-group">
                    <label for="precioUnidad">Precio:</label>
                    <input
                      type="number"
                      placeholder="Precio"
                      v-model="producto.precio"
                      class="form-control"
                    />
                  </div>
                  <div class="form-group">
                    <label for="costo">Precio Técnico:</label>
                    <input
                      type="number"
                      placeholder="Precio Técnico"
                      v-model="producto.costo"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 mt-3">
                    <button
                      type="button"
                      class="btn btn-secondary form-control"
                      data-dismiss="modal"
                      @click="producto = {}"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div class="col-md-6 mt-3">
                    <input
                      type="button"
                      class="btn btn-success form-control"
                      value="Guardar"
                      @click="guardarProducto()"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
              @keypress.enter="verProductos()"
            />
            <button class="btn btn-success" @click="verProductos()">
              &#128269;
            </button>
          </div>
        </div>
      </div>
      <TablaProductos :productos="productos" />
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import TablaProductos from "@/components/productos/TablaProducto";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje },
  data() {
    return {
      producto: { unidad: "GLS" },
      productos: [],
      mensaje: { ver: false },
      condiciones: [
        { descripcion: "DESCRIPCION", valor: "descripcion" },
        { descripcion: "ESTADO", valor: "estado" },
        { descripcion: "CÓDIGO PRODUCTO", valor: "codigo" },
      ],
      condicion: "descripcion",
      buscar: "",
      unidades: ["GLS", "LTR"],
    };
  },
  created() {
    this.verProductos();
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
    guardarProducto() {
      this.axios
        .post("producto", this.producto)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/productos')
            window.location.href = "/productos";
            $("#modalGuardarProducto").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verProductos() {
      const buscarPor = {
        condicion: this.condicion,
        buscar: this.buscar,
      };
      this.axios
        .post("producto/buscarfiltrado", buscarPor)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            this.productos = respuesta.data;
          }
        });
    },
    limpiarDatos() {
      this.producto = {};
    },
  },
  components: {
    TablaProductos,
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