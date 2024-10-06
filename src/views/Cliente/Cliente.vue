<template>
  <div class="text-center">
    <div v-if="usuario !== null && usuario.rol_codigo === 1">
      <h3 class="text-success mb-4 titulo-principal">Clientes</h3>
      <button
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#modalGuardarCliente"
      >
        Guardar un nuevo Cliente
      </button>

      <!-- Modal -->
      <div
        class="modal fade"
        id="modalGuardarCliente"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalGuardarCliente"
        aria-hidden="true"
        data-backdrop="static"
        data-keyboard="false"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header bg-success">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Guardar Cliente
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="cliente = {}"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form @submit.prevent>
                <div class="form group">
                  <label for="nombrecompleto">Nombre completo:</label>
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    v-model="cliente.nombre_completo"
                    class="form-control"
                  />
                </div>

                <div class="form group mt-3">
                  <div class="form-group">
                    <label for="identificacion">Identificación:</label>
                    <input
                      type="text"
                      placeholder="Identificación"
                      v-model="cliente.identificacion"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form group mt-3">
                  <div class="form-group">
                    <label for="numerotelefono">Numero telefono:</label>
                    <input
                      type="text"
                      placeholder="Numero telefono"
                      v-model="cliente.telefono"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form group mt-3">
                  <div class="form-group">
                    <label for="placa">Dirección:</label>
                    <input
                      type="text"
                      placeholder="Dirección"
                      v-model="cliente.direccion"
                      class="form-control"
                    />
                  </div>
                </div>

                <div class="form group mt-3">
                  <div class="form-group">
                    <label for="placa">Email:</label>
                    <input
                      type="text"
                      placeholder="Email"
                      v-model="cliente.email"
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
                      @click="cliente = {}"
                    >
                      Cancelar
                    </button>
                  </div>
                  <div class="col-md-6 mt-3">
                    <input
                      type="button"
                      class="btn btn-success form-control"
                      value="Guardar"
                      @click="guardarCliente()"
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
              @keypress.enter="verClientes()"
            />
            <button class="btn btn-success" @click="verClientes()">
              &#128269;
            </button>
          </div>
        </div>
      </div>
      <TablaClientes :clientes="clientes" />
    </div>
    <div v-else>
      <h4>Su rol no tiene permisos para ver esta información</h4>
    </div>
  </div>
</template>
<script>
import TablaClientes from "@/components/clientes/TablaClientes";
import { mapGetters } from "vuex";
import Mensaje from "@/components/Mensaje.vue";
export default {
  components: { Mensaje },
  data() {
    return {
      cliente: {},
      clientes: [],
      mensaje: { ver: false },
      condiciones: [
        { descripcion: "NOMBRE", valor: "nombre_completo" },
        { descripcion: "IDENTIFICACIÓN", valor: "identificacion" },
        { descripcion: "ESTADO", valor: "estado" },
        { descripcion: "CÓDIGO CLIENTE", valor: "codigo" },
      ],
      condicion: "nombre_completo",
      buscar: "",
    };
  },
  created() {
    this.verClientes();
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
    guardarCliente() {
      this.axios
        .post("cliente", this.cliente)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            //this.$router.push('/clientes')
            window.location.href = "/clientes";
            $("#modalGuardarCliente").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    verClientes() {
      const buscarPor = {
        condicion: this.condicion,
        buscar: this.buscar,
      };
      this.axios.post("cliente/buscarfiltrado", buscarPor).then((respuesta) => {
        if (respuesta.status === 200) {
          this.clientes = respuesta.data;
        }
      });
    },
  },
  components: {
    TablaClientes,
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