class MonedaUtil {
  static verFormatoMoneda(numero) {
    const formatoMoneda = new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    });
    return formatoMoneda.format(numero);
  }
}
export default MonedaUtil