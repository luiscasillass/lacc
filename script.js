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

// Puntos
reports.forEach(r=>{
  L.circleMarker([r.lat,r.lng], {
    radius: 10, color:'#00000022', weight:1, fillColor:color(r.level), fillOpacity:0.9
  }).addTo(map).bindPopup(`<b>${r.label}</b><br>Nivel: ${r.level}`);
});

// (Extensión futura) – ejemplo de cómo agregar un reporte con click
map.on('click', e=>{
  // Aquí iría tu modal/form. Para demo, solo coloca un marcador verde.
  L.circleMarker(e.latlng,{radius:8,fillColor:'#2ecc71',fillOpacity:0.9,color:'#00000022',weight:1})
    .addTo(map).bindPopup('Reporte añadido (demo)').openPopup();
});
