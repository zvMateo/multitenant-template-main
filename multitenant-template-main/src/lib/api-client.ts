// Simula latencia de red (300ms - 1500ms) para realismo
export const delay = (ms?: number) =>
  new Promise((resolve) =>
    setTimeout(resolve, ms || Math.random() * 1000 + 300)
  );

// Helper para generar respuestas estandarizadas
export function mockResponse<T>(data: T, meta?: any) {
  return {
    data,
    success: true,
    meta,
  };
}

// Aquí podrías configurar tu instancia de Axios real para el futuro
// export const api = axios.create({ ... });
