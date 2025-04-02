window.addEventListener('load', () => {
    const lijst = document.getElementById('favorieten-lijst');
    lijst.innerHTML = '';
  
    const favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
  
    if (favorieten.length === 0) {
      lijst.textContent = 'Je hebt nog geen favorieten opgeslagen.';
      return;
    }
  
    favorieten.forEach(item => {
      const muur = item.fields;
      const li = document.createElement('li');
  
      li.innerHTML = `
      <div class="favoriet-kaart">
        <h3>${muur.nom_de_la_fresque || muur.nom || 'Naam onbekend'}</h3>
        ${muur.image 
          ? `<img src="${muur.image}" alt="${muur.nom || 'Afbeelding'}" width="250"
             onerror="this.style.display='none'; this.insertAdjacentHTML('afterend', '<p><em>Geen afbeelding beschikbaar</em></p>')">`
          : '<p><em>Geen afbeelding beschikbaar</em></p>'}
        <p><strong>Adres:</strong> ${muur.adresse || muur.adres || 'Onbekend adres'}</p>
        <p><strong>Gemeente:</strong> ${muur.commune_gemeente || muur.commune || 'Onbekend'}</p>
        <p><strong>Maker:</strong> ${muur.dessinateur || muur.illustrateur || 'Onbekend'}</p>
        <button class="verwijder-knop" data-id="${item.recordid}">🗑️ Verwijder</button>
      </div>
    `;
    
  
      const knop = li.querySelector('.verwijder-knop');
      knop.addEventListener('click', () => {
        verwijderFavoriet(item.recordid);
        li.remove();
      });
  
      lijst.appendChild(li);
    });
  });
  
  function verwijderFavoriet(recordid) {
    const favorieten = JSON.parse(localStorage.getItem('favorieten')) || [];
    const nieuw = favorieten.filter(fav => fav.recordid !== recordid);
    localStorage.setItem('favorieten', JSON.stringify(nieuw));
  }
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

  