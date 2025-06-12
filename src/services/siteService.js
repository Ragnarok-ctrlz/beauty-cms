import api from './api';

export const siteService = {
  async createSite(siteData) {
    const response = await api.post('/sites', siteData);
    return response.data;
  },

  async getUserSites() {
    const response = await api.get('/sites');
    return response.data;
  },

  async getSite(siteId) {
    const response = await api.get(`/sites/${siteId}`);
    return response.data;
  },

  async updateSite(siteId, updateData) {
    const response = await api.put(`/sites/${siteId}`, updateData);
    return response.data;
  },

  async togglePublish(siteId, published) {
    const response = await api.patch(`/sites/${siteId}/publish`, { published });
    return response.data;
  }
};