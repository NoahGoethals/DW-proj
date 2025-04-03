# BrusselsExplorer

BrusselsExplorer is een interactieve webapplicatie die je helpt de **stripmuren van Brussel** te ontdekken. De app gebruikt data van [opendata.brussels](https://opendata.brussels.be) om een lijst van muurschilderingen (parcours BD) weer te geven. Gebruikers kunnen deze filteren, sorteren, doorzoeken én opslaan als favorieten. Alle data wordt client-side verwerkt met moderne JavaScript-technieken.

## Projectbeschrijving

Deze applicatie werd gemaakt als opdracht voor het vak **Dynamic Web**. Het doel was om een dynamische, visueel aantrekkelijke én responsive applicatie te bouwen met echte data.

Tijdens de ontwikkeling liep ik tegen een paar zaken aan:

- **Data ophalen van de API** verliep moeizaam door de structuur van de records (niet alle velden waren altijd aanwezig).
- **Zoekfunctionaliteit** gaf in eerste instantie foute of geen resultaten, omdat sommige waarden `null` waren of onverwachte datatypes hadden.

Door de data goed te filteren en fallbackwaarden of conditional rendering te gebruiken, konden deze problemen opgelost worden.

## Functionaliteiten

- **Lijst van stripmuren**
- **Zoekfunctie**
- **Filteren op gemeente**
- **Sorteren A-Z en Z-A**
- **Favorieten opslaan in localStorage**
- **Donker/licht thema toggle**
- **Responsive design voor mobiel**
- **Knoppen voor verwijderen en toevoegen van favorieten**

## Gebruikte API

**API**: [Comic books route of the City of Brussels](https://opendata.brussels.be/explore/dataset/bruxelles_parcours_bd/information/)

**Endpoint**:  
`https://opendata.brussels.be/api/records/1.0/search/?dataset=bruxelles_parcours_bd&rows=100`

## Gebruikte technieken per vereiste

**DOM Manipulatie**

- `document.getElementById()` → lijnen `14`, `83` (`script.mjs`)
- `appendChild`, `innerHTML`, event listeners → lijnen `30`, `64`, `95`, `127`

**Modern JavaScript**

- `const`, `let` → overal gebruikt
- Template literals → lijn `42`, `120`
- Iteratie over arrays → `forEach`, `map`, `filter`, `sort` op lijnen `33`, `71`, `101`, `122`
- Arrow functions → op bijna elke event handler zoals `addEventListener`
- Ternary operator → bij favoriet-knop rendering `favoriet ? '💛' : '⭐'`
- Callback functions → `.forEach(...)`, event callbacks
- Promises → `fetch()` (`api-helper.mjs`)
- Async/Await → `await fetchComicWalls()` (`script.mjs` lijn `11`)
- Observer API → `IntersectionObserver` gebruikt voor detectie van zichtbaarheid (optioneel; in `leaflet.mjs` of apart bestand)

**Data & API**

- `fetch()` om data op te halen (`api-helper.mjs`)
- JSON verwerken met `.json()` en `JSON.stringify` / `parse`

**Opslag & Validatie**

- Favorieten opgeslagen in `localStorage` (`script.mjs` en `favorites.mjs`)
- Fallbackwaarden zoals `'Naam onbekend'` bij ontbrekende velden
- Formulier (input) validatie op basis van `.value.length`

**Styling & Layout**

- CSS met flexbox voor layout (`style.css`)
- Thema-switcher met `body.donker`
- Duidelijke knoppen, hover-effecten en mobile responsiveness

## Screenshots

### Lijstweergave met filter en zoekfunctie

![Lijst](./img/lijst.png)

### Favorietenpagina

![Favorieten](./img/favorieten.png)

### Kaart met stripmuren

![Kaart](./img/kaart.png)

### Donker thema

![Donker Thema](./img/donker.png)

## Installatiehandleiding

1. **Clone dit project**

   git clone https://github.com/NoahGoethals/DW-proj.git
