fetch('https://opendata.brussels.be/api/records/1.0/search/?dataset=bruxelles_parcours_bd&rows=100')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Verwerk de data hier
  })
  .catch(error => console.error('Fout bij het ophalen van de data:', error));
