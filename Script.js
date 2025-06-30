const timetableData = {
  'MainStage': [
    { time: '12:00–13:00', artist: 'Agents Of Time' },
    { time: '13:00–14:00', artist: 'Alok' },
    { time: '14:00–15:00', artist: 'ANNA' },
  ],
  'CORE': [
    { time: '14:00–15:00', artist: 'Enrico Sangiuliano' },
    { time: '15:00–16:00', artist: 'Charlotte de Witte' },
  ]
};

const timetableEl = document.getElementById('timetable');

function loadFavorites() {
  return JSON.parse(localStorage.getItem('favorites') || '{}');
}

function saveFavorites(favs) {
  localStorage.setItem('favorites', JSON.stringify(favs));
}

let showFavoritesOnly = false;

function toggleFavorites() {
  showFavoritesOnly = !showFavoritesOnly;
  renderTimetable();
}

function renderTimetable() {
  const favs = loadFavorites();
  timetableEl.innerHTML = '';
  for (const stage in timetableData) {
    const stageDiv = document.createElement('div');
    stageDiv.className = 'stage';
    const title = document.createElement('h2');
    title.textContent = stage;
    stageDiv.appendChild(title);

    timetableData[stage].forEach(({ time, artist }) => {
      const setDiv = document.createElement('div');
      setDiv.className = 'set';
      if (showFavoritesOnly && !favs[artist]) return;

      const text = document.createElement('span');
      text.textContent = `${time} — ${artist}`;

      const star = document.createElement('span');
      star.textContent = '⭐';
      star.className = 'favorite ' + (favs[artist] ? '' : 'inactive');
      star.onclick = () => {
        favs[artist] = !favs[artist];
        saveFavorites(favs);
        renderTimetable();
      };

      setDiv.appendChild(text);
      setDiv.appendChild(star);
      stageDiv.appendChild(setDiv);
    });

    timetableEl.appendChild(stageDiv);
  }
}

renderTimetable();
