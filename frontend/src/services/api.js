const API_URL = 'http://localhost:8000/api';

// Récupérer le token du localStorage
const getToken = () => localStorage.getItem('auth_token');

// Fonctions d'authentification
export const auth = {
  async login(matricule, motDePasse) {
    try {
      console.log('Attempting login with:', { matricule });
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matricule, mot_de_passe: motDePasse }),
      });
      
      const data = await response.json();
      console.log('Login response:', data);
      
      if (!response.ok) {
        return {
          error: true,
          message: data.message || data.error || 'Login failed',
          status: response.status
        };
      }
      
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('Login successful');
      }
      
      return data;
    } catch (error) {
      console.error('Login error:', error);
      return {
        error: true,
        message: 'Connection error. Please try again.'
      };
    }
  },

  async register(nom, prenom, email, matricule, motDePasse) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nom,
        prenom,
        email,
        matricule,
        mot_de_passe: motDePasse,
        mot_de_passe_confirmation: motDePasse,
      }),
    });
    return response.json();
  },

  async logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

// Fonctions pour les activités
export const activites = {
  async getAll() {
    try {
      const response = await fetch(`${API_URL}/activites`);
      const data = await response.json();
      // Handle Laravel response format
      return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
      console.error('getAll error:', error);
      return [];
    }
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/activites/${id}`);
    return response.json();
  },

  async getBySlug(slug) {
    const response = await fetch(`${API_URL}/activites/slug/${slug}`);
    return response.json();
  },
};

// Fonctions pour les inscriptions
export const inscriptions = {
  async create(idActivite) {
    const token = getToken();
    const response = await fetch(`${API_URL}/inscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ id_activite: idActivite }),
    });
    return response.json();
  },

  async getUserInscriptions(userId) {
    const token = getToken();
    const response = await fetch(`${API_URL}/inscriptions/utilisateur/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async confirmer(id) {
    const token = getToken();
    const response = await fetch(`${API_URL}/inscriptions/${id}/confirmer`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};

// Fonctions pour le dashboard
export const dashboard = {
  async getStats() {
    const token = getToken();
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async getParticipationHistory() {
    const token = getToken();
    const response = await fetch(`${API_URL}/dashboard/participation-history`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async getDocumentsStatus() {
    const token = getToken();
    const response = await fetch(`${API_URL}/dashboard/documents-status`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async getSurveys() {
    const token = getToken();
    const response = await fetch(`${API_URL}/dashboard/surveys`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async getIdeas() {
    const token = getToken();
    const response = await fetch(`${API_URL}/dashboard/ideas`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async submitIdea(contenu, categorie) {
    const token = getToken();
    const response = await fetch(`${API_URL}/dashboard/ideas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ contenu, categorie }),
    });
    return response.json();
  },

  async getAnnouncements() {
    const token = getToken();
    const response = await fetch(`${API_URL}/dashboard/announcements`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};

// Fonctions pour les documents
export const documents = {
  async uploadDocument(formData) {
    const token = getToken();
    const response = await fetch(`${API_URL}/documents`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData,
    });
    return response.json();
  },

  async getByActivite(activiteId) {
    const token = getToken();
    const response = await fetch(`${API_URL}/documents/activite/${activiteId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};

export default { auth, activites, inscriptions, dashboard, documents };
