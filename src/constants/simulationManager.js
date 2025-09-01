export const SIMULATION_IN_PROGRESS_KEY = "simulationInProgress";
export const SIMULATION_DATE_KEY = "simulationDate";
export const SIMULATION_ACTIVE_KEY = "simulationActive";

// Salva lo stato nel localStorage
export const setSimulationState = (inProgress, date, active = null) => {
  localStorage.setItem(SIMULATION_IN_PROGRESS_KEY, inProgress ? "true" : "false");
  localStorage.setItem(SIMULATION_ACTIVE_KEY, active ? "true" : "false");
  if (date) {
    localStorage.setItem(SIMULATION_DATE_KEY, date);
  }

  window.dispatchEvent(new CustomEvent('simulationStateChanged', {
    detail: { inProgress, active, date }
  }));
};

// Recupera lo stato dal localStorage
export const getSimulationState = () => {
  const inProgress = localStorage.getItem(SIMULATION_IN_PROGRESS_KEY) === "true";
  const active = localStorage.getItem(SIMULATION_ACTIVE_KEY) === "true";
  const date = localStorage.getItem(SIMULATION_DATE_KEY);
  return { inProgress, date, active };
};

// Resetta lo stato
export const clearSimulationState = () => {
  localStorage.removeItem(SIMULATION_IN_PROGRESS_KEY);
  localStorage.removeItem(SIMULATION_DATE_KEY);
  localStorage.removeItem(SIMULATION_ACTIVE_KEY);
};
