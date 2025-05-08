# AlternativeFrameworks

Ett skolprojekt för att lära sig om alternativa ramverk.

Jag har valt att bygga "samma" klient i tre olika ramverk.

- Angular
- Vue
- Svelte

Alla tre klienter använder sig av samma BackEnd (JSON-Server).

## Struktur

Detta projekt är uppdelat i följande huvudmappar:

* `angular/`: Innehåller frontend-applikationen byggd med Angular.
* `svelte/`: Innehåller frontend-applikationen byggd med Svelte.
* `vue/`: Innehåller frontend-applikationen byggd med Vue.js.
* `backend/`: Innehåller JSON-servern som används som backend för data.

## Komma igång

Följ instruktionerna nedan för att sätta upp och köra de olika delarna av projektet.

### Backend (JSON-server)

JSON-servern används för att simulera ett backend-API.

1. Navigera till backend-mappen:

   ```bash
   cd backend
   ```
2. Installera beroenden:

   ```bash
   npm install
   ```
3. Starta JSON-servern:

   ```bash
   npm run server
   ```

   JSON-servern kommer att köra på `http://localhost:3000`.

### Angular Frontend

1. Navigera till Angular-mappen:
   ```bash
   cd angular
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Starta Angular-applikationen:
   ```bash
   ng serve 
   ```

### Svelte Frontend

1. Navigera till Svelte-mappen:
   ```bash
   cd svelte
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Starta Svelte-applikationen:
   ```bash
   npm run dev
   ```

### Vue.js Frontend

1. Navigera till Vue-mappen:
   ```bash
   cd vue
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Starta Vue.js-applikationen:
   ```bash
   npm run serve
   ```

## Användning

* Varje frontend-applikation kommunicerar med JSON-servern på `http://localhost:3000` för att hämta och hantera todo-data.
* Du kan lägga till, markera som klara och se aktiva todos i varje applikation.
