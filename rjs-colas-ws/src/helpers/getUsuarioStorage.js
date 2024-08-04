export const getUsuarioStorage = () => ({
  agente: localStorage.getItem("agente"),
  escritorio: localStorage.getItem("escritorio"),
});
