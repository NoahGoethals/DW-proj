import { fetchComicWalls } from './data/api-helper.mjs';

window.addEventListener('load', async () => {
  try {
    const stripmuren = await fetchComicWalls();
    toonMuren(stripmuren);
  } catch (error) {
    document.getElementById('locatie-lijst').textContent = 'Kon de stripmuren niet laden.';
  }
});

function toonMuren(muren) {
  const lijst = document.getElementById('locatie-lijst');
  lijst.innerHTML = '';

  muren.forEach(item => {
    const muur = item.fields;
    const li = document.createElement('li');

    li.innerHTML = `
      <h3>${muur.nom || 'Naam onbekend'}</h3>
      <p><strong>Adres:</strong> ${muur.adresse || 'Onbekend adres'}</p>
      <p><strong>Gemeente:</strong> ${muur.commune || 'Onbekend'}</p>
    `;

    lijst.appendChild(li);
  });
}
