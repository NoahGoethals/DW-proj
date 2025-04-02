export async function fetchComicWalls() {
    const API_URL = 'https://opendata.brussels.be/api/records/1.0/search/?dataset=bruxelles_parcours_bd&rows=100';
  
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP fout: ${response.status}`);
      const data = await response.json();
      return data.records;
    } catch (error) {
      console.error('Fout bij ophalen van data:', error.message);
      throw error;
    }
  }
  