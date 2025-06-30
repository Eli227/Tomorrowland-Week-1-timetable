const timetableData = {
  'MainStage': [
    { time: '12:00–13:00', artist: 'Agents Of Time' },
    { time: '13:00–14:00', artist: 'Alok' },
    { time: '14:00–15:00', artist: 'ANNA' }
  ],
  'Freedom': [
    { time: '15:00–16:00', artist: 'Vintage Culture' },
    { time: '16:00–17:00', artist: 'CamelPhat' }
  ],
  'Atmosphere': [
    { time: '18:00–19:00', artist: 'Amelie Lens' },
    { time: '19:00–20:00', artist: 'FJAAK' }
  ],
  'CORE': [
    { time: '14:00–15:00', artist: 'Enrico Sangiuliano' },
    { time: '15:00–16:00', artist: 'Charlotte de Witte' }
  ],
  'Crystal Garden': [
    { time: '13:00–14:00', artist: 'Korolova' },
    { time: '14:00–15:00', artist: 'Miss Monique' }
  ],
  'Q-Dance': [
    { time: '20:00–21:00', artist: 'Ran-D' },
    { time: '21:00–22:00', artist: 'D-Sturb' }
  ],
  'Garden of Madness': [
    { time: '16:00–17:00', artist: 'Lost Frequencies' },
    { time: '17:00–18:00', artist: 'Ofenbach' }
  ],
  'Rose Garden (Andromedik Invites)': [
    { time: '15:00–16:00', artist: 'Andromedik' },
    { time: '16:00–17:00', artist: 'Murdock' }
  ],
  'Elixir': [
    { time: '12:00–13:00', artist: 'Tchami' },
    { time: '13:00–14:00', artist: 'Malaa' }
  ],
  'Planaxis': [
    { time: '18:00–19:00', artist: 'Martin Solveig' },
    { time: '19:00–20:00', artist: 'Bob Sinclar' }
  ],
  'Cage': [
    { time: '20:00–21:00', artist: '999999999' },
    { time: '21:00–22:00', artist: 'I Hate Models' }
  ],
  'Harbour House': [
    { time: '17:00–18:00', artist: 'Matisse & Sadko' },
    { time: '18:00–19:00', artist: 'Brooks' }
  ],
  'Kara Savi': [
    { time: '14:00–15:00', artist: 'Apashe' },
    { time: '15:00–16:00', artist: 'Dabin' }
  ],
  'Leaf': [
    { time: '13:00–14:00', artist: 'Yotto' },
    { time: '14:00–15:00', artist: 'Eli & Fur' }
  ],
  'Lotus': [
    { time: '15:00–16:00', artist: 'Black Tiger Sex Machine' },
    { time: '16:00–17:00', artist: 'Rezz' }
  ],
  'L’Orangerie': [
    { time: '14:00–15:00', artist: 'Marsh' },
    { time: '15:00–16:00', artist: 'Franky Wah' }
  ],
  'Rave Cave': [
    { time: '12:00–13:00', artist: 'Local DJs B2B' },
    { time: '13:00–14:00', artist: 'Surprise Guest' }
  ],
  'Youphoria': [
    { time: '19:00–20:00', artist: 'James Hype' },
    { time: '20:00–21:00', artist: 'MEDUZA' }
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
      if (showFavoritesOnly && !favs[artist]) return;

      const setDiv = document.createElement('div');
      setDiv.className = 'set';

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
