import { fetchComicWalls } from './data/api-helper.mjs';

window.addEventListener('load', async () => {
  const knop = document.getElementById('thema-toggle');
  const huidigeThema = localStorage.getItem('thema') || 'licht';
  document.body.classList.add(huidigeThema);
  knop.textContent = huidigeThema === 'donker' ? '☀️ Licht thema' : '🌙 Donker thema';

  knop.addEventListener('click', () => {
    document.body.classList.toggle('donker');
    const nieuwThema = document.body.classList.contains('donker') ? 'donker' : 'licht';
    localStorage.setItem('thema', nieuwThema);
    knop.textContent = nieuwThema === 'donker' ? '☀️ Licht thema' : '🌙 Donker thema';
  });

  const map = L.map('map').setView([50.85, 4.35], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  try {
    const muren = await fetchComicWalls();

    muren.forEach(muur => {
      const coords = muur.fields.coordinates;
      if (coords && coords.length === 2) {
        const marker = L.marker([coords[0], coords[1]]).addTo(map);
        marker.bindPopup(`
          <strong>${muur.fields.nom_de_la_fresque || muur.fields.nom || 'Onbekend'}</strong><br>
          ${muur.fields.adresse || 'Geen adres bekend'}<br>
          ${muur.fields.commune || 'Geen gemeente bekend'}
        `);
      }
    });
  } catch (error) {
    alert('Kon locaties niet laden op de kaart.');
    console.error(error);
  }
});
