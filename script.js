// Centro GDL
const CENTER = [20.6736, -103.344];
const map = L.map('map', { zoomControl: true }).setView(CENTER, 12);

// Base OSM
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap'
}).addTo(map);

// Datos de ejemplo (podrás reemplazarlos por tu API)
const reports = [
  { lat:20.677, lng:-103.347, level:'alto',  label:'Mercado Felipe Ángeles' },
  { lat:20.666, lng:-103.330, level:'medio', label:'Parque Morelos' },
  { lat:20.687, lng:-103.372, level:'bajo',  label:'Col. Americana' },
  { lat:20.640, lng:-103.347, level:'alto',  label:'Toluquilla' },
  { lat:20.708, lng:-103.394, level:'medio', label:'Zapopan centro' }
];

// Capa canales/alcantarillas (demo)
const canal = L.polyline(
  [[20.72,-103.40],[20.70,-103.39],[20.69,-103.37],[20.67,-103.35],[20.65,-103.34]],
  { color:'#9ca3af', weight:5, opacity:0.7 }
).addTo(map).bindTooltip('Canal/alcantarilla');

// Color por nivel
const color = l => l==='alto' ? '#e74c3c' : l==='medio' ? '#f1c40f' : '#2ecc71';

// Puntos iniciales
reports.forEach(r=>{
  L.circleMarker([r.lat,r.lng], {
    radius: 10, color:'#00000022', weight:1, fillColor:color(r.level), fillOpacity:0.9
  }).addTo(map).bindPopup(`<b>${r.label}</b><br>Nivel: ${r.level}`);
});

// --- NUEVO: Control para elegir color de reporte ---
let selectedLevel = 'bajo'; // por defecto: verde

const LevelControl = L.Control.extend({
  options: { position: 'topright' },
  onAdd: function() {
    const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    container.style.background = '#fff';
    container.style.padding = '8px';
    container.style.borderRadius = '8px';
    container.style.boxShadow = '0 1px 3px rgba(0,0,0,0.15)';

    container.innerHTML = `
      <div style="font:14px/1.2 system-ui; min-width:140px;">
        <div style="font-weight:600; margin-bottom:6px;">Color del punto</div>
        <label style="display:flex;align-items:center;gap:6px;margin:4px 0;cursor:pointer;">
          <input type="radio" name="lvl" value="bajo" checked>
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#2ecc71;border:1px solid #d1d5db;"></span>
          <span>Verde (bajo)</span>
        </label>
        <label style="display:flex;align-items:center;gap:6px;margin:4px 0;cursor:pointer;">
          <input type="radio" name="lvl" value="medio">
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#f1c40f;border:1px solid #d1d5db;"></span>
          <span>Amarillo (medio)</span>
        </label>
        <label style="display:flex;align-items:center;gap:6px;margin:4px 0;cursor:pointer;">
          <input type="radio" name="lvl" value="alto">
          <span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#e74c3c;border:1px solid #d1d5db;"></span>
          <span>Rojo (alto)</span>
        </label>
        <div style="font-size:12px;color:#6b7280;margin-top:6px;">Haz clic en el mapa para colocar el punto.</div>
      </div>
    `;

    // Evitar que el control “robe” el scroll/drag del mapa
    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    // Escuchar cambios
    container.querySelectorAll('input[name="lvl"]').forEach(radio=>{
      radio.addEventListener('change', e => { selectedLevel = e.target.value; });
    });

    return container;
  }
});

map.addControl(new LevelControl());

// Click en el mapa: coloca marcador con el color elegido
map.on('click', e=>{
  const marker = L.circleMarker(e.latlng, {
    radius: 9,
    color:'#00000022',
    weight:1,
    fillColor: color(selectedLevel),
    fillOpacity: 0.9
  }).addTo(map);

  marker.bindPopup(`Reporte añadido<br>Nivel: <b>${selectedLevel}</b>`).openPopup();
});
