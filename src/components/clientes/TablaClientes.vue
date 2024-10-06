<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="clientes.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Nombre Completo</th>
          <th scope="col">Identificación</th>
          <th scope="col">Telefono</th>
          <th scope="col">Dirección</th>
          <th scope="col">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientes" :key="cliente.codigo">
          <td :class="cliente.estado === '1' ? 'text-danger' : ''">
            <p>{{ cliente.nombre_completo }}</p>
          </td>
          <td>
            <p>{{ cliente.identificacion }}</p>
          </td>
          <td>
            <p>{{ cliente.telefono }}</p>
          </td>
          <td>
            <p>{{ cliente.direccion }}</p>
          </td>
          <td>
            <p>{{ cliente.email }}</p>
          </td>
          <td>
            <button data-toggle="modal" data-target="#modalClienteEditar" class="btn btn-outline-warning"
              @click="verDatosModal(cliente)">
              <span class="icon-Lapiz"></span>
            </button>
          </td>
          <td>
            <button class="btn" :class="cliente.estado === '1'
              ? 'btn-outline-success'
              : 'btn-outline-danger'
              " @click="desactivar(cliente)">
              <span>{{
                cliente.estado === "1" ? "&#10003;" : "&#x2716;"
              }}</span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>Sin clientes, te invitamos a registrar tu primer cliente 🤗</h3>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="modalClienteEditar" tabindex="-1" role="dialog" aria-labelledby="modalClienteEditar"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Editar Cliente
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cliente = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent>
              <div class="form group">
                <label for="nombrecompleto">Nombre completo:</label>
                <input type="text" placeholder="Nombre completo" v-model="cliente.nombre_completo" class="form-control" />
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="identificacion">Identificación:</label>
                  <input type="text" placeholder="Identificación" v-model="cliente.identificacion" class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="numerotelefono">Numero telefono:</label>
                  <input type="text" placeholder="Numero telefono" v-model="cliente.telefono" class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="placa">Dirección:</label>
                  <input type="text" placeholder="Dirección" v-model="cliente.direccion" class="form-control" />
                </div>
              </div>

              <div class="form group mt-3">
                <div class="form-group">
                  <label for="placa">Email:</label>
                  <input type="text" placeholder="Email" v-model="cliente.email" class="form-control" />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6 mt-3">
                  <button type="button" class="btn btn-secondary form-control" data-dismiss="modal" @click="cliente = {}">
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
    <div class="modal fade" id="modalClienteEliminar" tabindex="-1" role="dialog" aria-labelledby="modalClienteEliminar"
      aria-hidden="true" data-backdrop="static" data-keyboard="false">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success">
            <h5 class="modal-title" id="exampleModalLongTitle">
              ¿Estás seguro de que deseas eliminar este registro?
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="cliente = {}">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h5>{{ cliente.nombre_completo }}</h5>
            <div class="row">
              <div class="col-md-6 mt-3">
                <button type="button" class="btn btn-secondary form-control" data-dismiss="modal" @click="cliente = {}">
                  Cancelar
                </button>
              </div>
              <div class="col-md-6 mt-3">
                <input type="button" class="btn btn-danger form-control" value="Eliminar" @click="eliminar(cliente)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    clientes: [],
  },
  data() {
    return {
      cliente: {},
      placas: [],
      placa: ''
    };
  },
  methods: {
    verDatosModal(cliente) {
      this.cliente = { ...cliente };
    },
    actualizar() {
      this.axios
        .put("cliente", this.cliente)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/clientes";
            $("#modalClienteEditar").modal("hide");
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    desactivar(cliente) {
      const datoEnviar = {
        estado: cliente.estado === "1" ? "0" : "1",
        codigo: cliente.codigo,
      };
      this.axios
        .post("cliente/cambiarestado", datoEnviar)
        .then((respuesta) => {
          if (respuesta.status === 200) {
            window.location.href = "/clientes";
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    },
    eliminar(cliente) {
      console.log(cliente);
      this.axios
        .delete("cliente/" + cliente.codigo)
        .then((respuesta) => {
          window.location.href = "/clientes";
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  },
};
</script>