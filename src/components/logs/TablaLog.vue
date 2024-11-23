<template>
  <div class="mt-5">
    <table class="table table-responsive-md" v-if="logs.length > 0">
      <thead class="thead-light">
        <tr>
          <th scope="col">Id Usuario</th>
          <th scope="col">Email Usuario</th>
          <th scope="col">Acción</th>
          <th scope="col">Observación</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log.id">
          <td>
            <p>{{ log.id_usuario }}</p>
          </td>
          <td>
            <p>{{ log.email_usuario }}</p>
          </td>
          <td>
            <p>{{ log.accion }}</p>
          </td>
          <td>
            <p>{{ log.observacion }}</p>
          </td>
          <td>
            <p>{{ formatDate(log.timestamp) }}</p>
          </td>
          <td>
            <p>{{ formatTime(log.timestamp) }}</p>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="text-center" v-else>
      <h3>Sin logs</h3>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    logs: [],
  },
  methods: {
    formatDate(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    formatTime(timestamp) {
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
  }
};
</script>
