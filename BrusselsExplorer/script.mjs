
import { fetchComicWalls } from './data/api-helper.mjs';

let alleMuren = [];

window.addEventListener('load', async () => {
  //  Thema herstellen bij laden
  const knop = document.getElementById('thema-toggle');
  const huidigeThema = localStorage.getItem('thema') || 'licht';
  document.body.classList.add(huidigeThema);
  if (knop) {
    knop.textContent = huidigeThema === 'donker' ? '☀️ Licht thema' : '🌙 Donker thema';
    knop.addEventListener('click', () => {
      document.body.classList.toggle('donker');
      const nieuwThema = document.body.classList.contains('donker') ? 'donker' : 'licht';
      localStorage.setItem('thema', nieuwThema);
      knop.textContent = nieuwThema === 'donker' ? '☀️ Licht thema' : '🌙 Donker thema';
    });
  }
  

  //  Data ophalen en tonen
  try {
    alleMuren = await fetchComicWalls();

   
    const sorteerveld = document.getElementById('sorteer-optie');

    if (sorteerveld) {
      sorteerveld.addEventListener('change', () => {
        const optie = sorteerveld.value;
        let gesorteerdeMuren = [...alleMuren];
    
        gesorteerdeMuren.sort((a, b) => {
          const naamA = (a.fields.nom_de_la_fresque || a.fields.nom || '').toLowerCase();
          const naamB = (b.fields.nom_de_la_fresque || b.fields.nom || '').toLowerCase();
    
          if (optie === 'az') {
            return naamA.localeCompare(naamB);
          } else if (optie === 'za') {
            return naamB.localeCompare(naamA);
          } else {
            return 0; // geen specifieke sortering
          }
        });
    
        toonMuren(gesorteerdeMuren);
      });
    }
    

    const zoekveld = document.getElementById('zoekveld');
if (zoekveld) {
  zoekveld.addEventListener('input', () => {
    const zoekterm = zoekveld.value.toLowerCase().trim();

    const gefilterd = alleMuren.filter(item => {
      const {
        nom_de_la_fresque = '',
        nom = '',
        commune = '',
        adresse = '',
        dessinateur = '',
        illustrateur = ''
      } = item.fields;

      return (
        nom.toLowerCase().includes(zoekterm) ||
        nom_de_la_fresque.toLowerCase().includes(zoekterm) ||
        commune.toLowerCase().includes(zoekterm) ||
        adresse.toLowerCase().includes(zoekterm) ||
        dessinateur.toLowerCase().includes(zoekterm) ||
        illustrateur.toLowerCase().includes(zoekterm)
      );
    });

    toonMuren(gefilterd);
  });
}

    toonMuren(alleMuren);
  } catch (error) {
    const lijst = document.getElementById('locatie-lijst');
    if (lijst) lijst.textContent = 'Kon de stripmuren niet laden.';
    console.error(error);
  }
});

function toonMuren(muren) {
  const lijst = document.getElementById('locatie-lijst');
  if (!lijst) return;

  lijst.innerHTML = '';
  if (muren.length === 0) {
    lijst.innerHTML = '<li><em>Geen resultaten gevonden...</em></li>';
    return;
  }
  

  if (muren.length === 0) {
    lijst.innerHTML = '<li><em>Geen resultaten gevonden...</em></li>';
    return;
  }

  muren.forEach(item => {
    const muur = item.fields;
    const li = document.createElement('li');

    li.innerHTML = `
    <h3>${muur.nom_de_la_fresque || muur.nom || 'Naam onbekend'}</h3>
    ${muur.image 
      ? `<img src="${muur.image}" alt="${muur.nom || 'Afbeelding'}" width="300"
           onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<p><em>Geen afbeelding beschikbaar</em></p>')">`
      : '<p><em>Geen afbeelding beschikbaar</em></p>'}
    <p><strong>Adres:</strong> ${muur.adresse || muur.adres || 'Onbekend adres'}</p>
    <p><strong>Gemeente:</strong> ${muur.commune_gemeente || muur.commune || 'Onbekend'}</p>
    <p><strong>Maker:</strong> ${muur.dessinateur || muur.illustrateur || 'Onbekend'}</p>
  `;
  



    // Favoriet-knop
    const favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
    const isFavoriet = favorieten.some(fav => fav.recordid === item.recordid);

    const knop = document.createElement('button');
    knop.classList.add('favoriet-knop');
    knop.textContent = isFavoriet ? '💛 Verwijder uit favorieten' : '⭐ Voeg toe aan favorieten';

    if (isFavoriet) {
      knop.classList.add('favoriet');
    }

    knop.addEventListener('click', () => {
      toggleFavoriet(item);
      toonMuren(muren); // herlaad lijst zodat knopstatus mee verandert
    });

    li.appendChild(knop);
    lijst.appendChild(li);
  });
}

function toggleFavoriet(item) {
  const favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
  const index = favorieten.findIndex(fav => fav.recordid === item.recordid);

  if (index === -1) {
    favorieten.push(item);
  } else {
    favorieten.splice(index, 1);
  }

  localStorage.setItem('favorieten', JSON.stringify(favorieten));
}
