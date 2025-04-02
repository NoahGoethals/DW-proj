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
        <h3>${muur.nom || 'Naam onbekend'}</h3>
        <p><strong>Adres:</strong> ${muur.adresse || 'Onbekend adres'}</p>
        <p><strong>Gemeente:</strong> ${muur.commune || 'Onbekend'}</p>
        <button class="verwijder-knop" data-id="${item.recordid}">🗑️ Verwijder</button>
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
  