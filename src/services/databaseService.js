// src/services/databaseService.js (remplace Firestore)
import api from './api';

export const databaseService = {
  // Équivalent de collection().add()
  async addDocument(collectionName, data) {
    try {
      const response = await api.post(`/${collectionName}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur ajout document');
    }
  },

  // Équivalent de collection().get()
  async getCollection(collectionName, filters = {}) {
    try {
      const response = await api.get(`/${collectionName}`, { params: filters });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur récupération collection');
    }
  },

  // Équivalent de doc().get()
  async getDocument(collectionName, documentId) {
    try {
      const response = await api.get(`/${collectionName}/${documentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur récupération document');
    }
  },

  // Équivalent de doc().update()
  async updateDocument(collectionName, documentId, data) {
    try {
      const response = await api.put(`/${collectionName}/${documentId}`, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur mise à jour document');
    }
  },

  // Équivalent de doc().delete()
  async deleteDocument(collectionName, documentId) {
    try {
      const response = await api.delete(`/${collectionName}/${documentId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur suppression document');
    }
  },

  // Équivalent de where() queries
  async queryCollection(collectionName, queryParams) {
    try {
      const response = await api.get(`/${collectionName}/query`, { params: queryParams });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erreur requête collection');
    }
  }
};