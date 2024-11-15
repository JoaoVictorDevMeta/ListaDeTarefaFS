//import config from "config";
import moment from "moment-timezone";

const defaultTimezone = "America/Sao_Paulo"; // Função para formatar a data/hora
function formatDateTime(date) {
  return moment(date).tz(defaultTimezone).toISOString();
}

export default {
  formatDateTime
};
