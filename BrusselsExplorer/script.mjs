import { fetchComicWalls } from './data/api-helper.mjs';

let alleMuren = [];

window.addEventListener('load', async () => {
  try {
    alleMuren = await fetchComicWalls();
    //  Gemeente dropdown vullen
const gemeentes = [...new Set(alleMuren.map(item => item.fields.commune).filter(Boolean))].sort();

const dropdown = document.getElementById('gemeente-filter');
gemeentes.forEach(gemeente => {
  const optie = document.createElement('option');
  optie.value = gemeente;
  optie.textContent = gemeente;
  dropdown.appendChild(optie);
});

    toonMuren(alleMuren);
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
    <button class="favoriet-knop" data-id="${item.recordid}">⭐ Favoriet</button>
  `;
  

    lijst.appendChild(li);
    const knop = li.querySelector('.favoriet-knop');
knop.addEventListener('click', () => toggleFavoriet(item));

  });
}

//  Zoekfunctie
const zoekveld = document.getElementById('zoekveld');
zoekveld.addEventListener('input', () => {
  const zoekterm = zoekveld.value.toLowerCase();

  const gefilterdeMuren = alleMuren.filter(item => {
    const { nom = '', commune = '' } = item.fields;
    return (
      nom.toLowerCase().includes(zoekterm) ||
      commune.toLowerCase().includes(zoekterm)
    );
  });

  toonMuren(gefilterdeMuren);
});
//  Gemeente filter
dropdown.addEventListener('change', () => {
    const geselecteerd = dropdown.value.toLowerCase();
  
    const gefilterd = alleMuren.filter(item => {
      const { commune = '' } = item.fields;
      return commune.toLowerCase().includes(geselecteerd);
    });
  
    toonMuren(geselecteerd ? gefilterd : alleMuren);
  });
  //  Sorteerfunctie
const sorteerveld = document.getElementById('sorteer-optie');
sorteerveld.addEventListener('change', () => {
  const richting = sorteerveld.value;

  let gesorteerdeMuren = [...alleMuren]; // kopie maken

  if (richting === 'az') {
    gesorteerdeMuren.sort((a, b) => {
      const naamA = (a.fields.nom || '').toLowerCase();
      const naamB = (b.fields.nom || '').toLowerCase();
      return naamA.localeCompare(naamB);
    });
  }

  if (richting === 'za') {
    gesorteerdeMuren.sort((a, b) => {
      const naamA = (a.fields.nom || '').toLowerCase();
      const naamB = (b.fields.nom || '').toLowerCase();
      return naamB.localeCompare(naamA);
    });
  }

  toonMuren(gesorteerdeMuren);
});
function toggleFavoriet(item) {
    const favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
  
    const index = favorieten.findIndex(fav => fav.recordid === item.recordid);
  
    if (index === -1) {
      favorieten.push(item);
    } else {
      favorieten.splice(index, 1);
    }
  
    localStorage.setItem('favorieten', JSON.stringify(favorieten));
    alert('Favorieten bijgewerkt!');
  }
  