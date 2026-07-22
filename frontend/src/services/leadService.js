import api from '../api/axios';

export const sendCustomAppProposal = async (leadData) => {
  try {
    const response = await api.post('/custom-app', leadData);
    return response;
  } catch (error) {
    console.error('[leadService] Error enviando cotización:', error);
    throw error;
  }
};