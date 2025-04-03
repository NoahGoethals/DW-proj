// Importeer de functie om stripmuren op te halen
import { fetchComicWalls } from './data/api-helper.mjs';

window.addEventListener('load', async () => {
  const knop = document.getElementById('thema-toggle');
  const huidigeThema = localStorage.getItem('thema') || 'licht';
  document.body.classList.add(huidigeThema);
  knop.textContent = huidigeThema === 'donker' ? '☀️ Licht thema' : '🌙 Donker thema';

  // 🌙 Thema herstellen bij laden

  knop.addEventListener('click', () => {
    document.body.classList.toggle('donker');
    const nieuwThema = document.body.classList.contains('donker') ? 'donker' : 'licht';
    localStorage.setItem('thema', nieuwThema);
    knop.textContent = nieuwThema === 'donker' ? '☀️ Licht thema' : '🌙 Donker thema';
  });

  // Map initialiseren
  const map = L.map('map').setView([50.85, 4.35], 13);

  // Basislaag toevoegen
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  try {
    const muren = await fetchComicWalls();

    muren.forEach(muur => {
      // Gebruik  geometry.coordinates uit API (longitude, latitude)
      const coords = muur.geometry?.coordinates || muur.fields.coordinates;
      if (coords && coords.length === 2) {
        const [lng, lat] = coords;  // omdraaien naar [lat, lng]!
        const marker = L.marker([lat, lng]).addTo(map);

        marker.bindPopup(`
          <strong>${muur.fields.nom_de_la_fresque || muur.fields.nom || 'Onbekend'}</strong><br>
          ${muur.fields.adresse || muur.fields.adres || 'Geen adres bekend'}<br>
          ${muur.fields.commune_gemeente || muur.fields.commune || 'Geen gemeente bekend'}
        `);
      }
    });
  } catch (error) {
    alert('Fout bij laden van markers: ' + error.message);
    console.error(error);
  }
});
