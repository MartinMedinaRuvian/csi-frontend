import moment from 'moment';
class FechaUtil {
  static formatearFecha(fecha) {
    return moment(fecha).format('YYYY-MM-DD');
  }

  calcularPascua(year) {
    const f = Math.floor;
    const G = year % 19;
    const C = f(year / 100);
    const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
    const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
    const day = I - ((year + f(year / 4) + I + 2 - C + f(C / 4)) % 7) + 28;
    const month = 3;

    if (day > 31) {
      return new Date(year, month, day - 31);
    } else {
      return new Date(year, month - 1, day);
    }
  }

  calcularSemanaSanta(year) {
    const instancia = new FechaUtil()
    const pascua = instancia.calcularPascua(year);
    const juevesSanto = new Date(pascua);
    juevesSanto.setDate(pascua.getDate() - 3);
    const viernesSanto = new Date(pascua);
    viernesSanto.setDate(pascua.getDate() - 2);
    return [juevesSanto, viernesSanto];
  }

  moverALunes(fecha) {
    const diaSemana = fecha.getDay();
    if (diaSemana === 0) { // domingo
      fecha.setDate(fecha.getDate() + 1);
    } else if (diaSemana !== 1) { // no es lunes
      fecha.setDate(fecha.getDate() + (8 - diaSemana));
    }
    return fecha;
  }

  obtenerDiasFestivos(year) {
    const instancia = new FechaUtil()
    const festivos = [
      new Date(year, 0, 1), // Año Nuevo
      instancia.moverALunes(new Date(year, 0, 6)), // Reyes Magos
      instancia.moverALunes(new Date(year, 2, 19)), // San José
      new Date(year, 4, 1), // Día del Trabajo
      instancia.moverALunes(new Date(year, 5, 29)), // San Pedro y San Pablo
      new Date(year, 6, 20), // Día de la Independencia
      new Date(year, 7, 7), // Batalla de Boyacá
      instancia.moverALunes(new Date(year, 7, 15)), // Asunción de la Virgen
      instancia.moverALunes(new Date(year, 9, 12)), // Día de la Raza
      instancia.moverALunes(new Date(year, 10, 1)), // Todos los Santos
      instancia.moverALunes(new Date(year, 10, 11)), // Independencia de Cartagena
      new Date(year, 11, 8), // Inmaculada Concepción
      new Date(year, 11, 25) // Navidad
    ];

    const semanaSanta = instancia.calcularSemanaSanta(year);
    festivos.push(...semanaSanta);

    const ascension = new Date(semanaSanta[1]);
    ascension.setDate(ascension.getDate() + 43); // 39 días después del Domingo de Pascua
    festivos.push(instancia.moverALunes(ascension));

    const corpusChristi = new Date(semanaSanta[1]);
    corpusChristi.setDate(corpusChristi.getDate() + 64); // 60 días después del Domingo de Pascua
    festivos.push(instancia.moverALunes(corpusChristi));

    const sagradoCorazon = new Date(semanaSanta[1]);
    sagradoCorazon.setDate(sagradoCorazon.getDate() + 71); // 68 días después del Domingo de Pascua
    festivos.push(instancia.moverALunes(sagradoCorazon));

    return festivos;
  }

  esDiaFestivo(fecha, festivos) {
    const fechaStr = fecha.toISOString().split('T')[0];
    return festivos.some(f => f.toISOString().split('T')[0] === fechaStr);
  }

  esDiaHabil(fecha) {
    const diaSemana = fecha.getDay();
    // El método getDay() devuelve 0 para domingo y 6 para sábado.
    return diaSemana !== 0;
  }

  verificarSiMananaEsDiaHabilYNoFestivo() {
    const hoy = new Date();
    const manana = new Date(hoy);
    manana.setDate(hoy.getDate() + 1);

    const year = manana.getFullYear();
    const diasFestivos = obtenerDiasFestivos(year);

    return esDiaHabil(manana) && !esDiaFestivo(manana, diasFestivos);
  }


  verificarSiElSiguienteDiaEsDiaHabilYNoFestivo(fecha) {
    const instancia = new FechaUtil()
    const diaSiguiente = new Date(fecha);

    const year = diaSiguiente.getFullYear();
    const diasFestivos = instancia.obtenerDiasFestivos(year);

    return instancia.esDiaHabil(diaSiguiente) && !instancia.esDiaFestivo(diaSiguiente, diasFestivos);
  }

  verificarSiFechaEsFestivo(fechaVerificar) {
    const instancia = new FechaUtil()
    const fecha = new Date(fechaVerificar)
    const year = fecha.getFullYear();
    const diasFestivos = instancia.obtenerDiasFestivos(year);

    return instancia.esDiaFestivo(fecha, diasFestivos);
  }

  static proximoDiaHabil(fechaActual) {
    const instancia = new FechaUtil()
    let fecha = new Date(fechaActual)
    let diaSiguiente = new Date(fecha)
    diaSiguiente.setDate(fecha.getDate() + 1)

    if (diaSiguiente.getDay() === 0 || (diaSiguiente.getDay() === 6 && instancia.verificarSiFechaEsFestivo(diaSiguiente))) {
      diaSiguiente.setDate(diaSiguiente.getDate() + 1)
    }

    if (!instancia.verificarSiElSiguienteDiaEsDiaHabilYNoFestivo(diaSiguiente)) {
      diaSiguiente.setDate(diaSiguiente.getDate() + 1)
      if (instancia.verificarSiFechaEsFestivo(diaSiguiente)) {
        diaSiguiente.setDate(diaSiguiente.getDate() + 1)
      }
    }

    return diaSiguiente
  }

  static verFormatoYYMMDD(date){
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() es base 0
    const day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day 
  }

  static fechaActual() {
    let date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    const dia = day < 10 ? '0' + day : day
    const mes = month < 10 ? '0' + month : month

    return year + '-' + mes + '-' + dia

  }

  static horaActual() {
    let fechaActual = new Date();
    let hora = fechaActual.getHours();
    let minutos = fechaActual.getMinutes();

    // Asegúrate de agregar un 0 al frente si los minutos son menores a 10
    if (minutos < 10) {
      minutos = "0" + minutos;
    }

    return hora + ":" + minutos;
  }

}
export default FechaUtil 