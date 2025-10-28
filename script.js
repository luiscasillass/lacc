let m=1,img,d=null,err=null;
function preload(){ loadImage("poster.jpg",i=>img=i,()=>img=null); }
function setup(){ createCanvas(960,540).parent("wrap"); textFont("system-ui"); textWrap(WORD); noLoop();
  fetch("https://air-quality-api.open-meteo.com/v1/air-quality?latitude=20.6597&longitude=-103.3496&hourly=pm2_5,pm10&forecast_days=1&timezone=auto")
    .then(r=>r.json()).then(j=>{d=j; redraw();}).catch(e=>{err=e.toString(); redraw();});
}
function keyPressed(){ if("123".includes(key)){m=int(key); redraw();} }
function draw(){ background(250); fill(16); textSize(14);
  text("1=WWW  2=API  3=Proyecto",16,24);
  if(m==1)a1(); else if(m==2)a2(); else a3();
}
function a1(){
  textSize(18); text("Actividad 1 – WWW",16,54); textSize(14);
  text("¿Cómo imagino el futuro del WWW?\ncon integraciones de AI por el browser incorporado por todas partes, cuando estaba niño todo estaba integrado de manera mas simple y sin tener tantas funcionalidades como hoy en dia.",16,84,560);
  text("Proyecto (tecnología para desarrollo comunitario):\nel tema que elegi es tecnologia para desarrollo para la comunidad y el proyecto incorpora un mapa interactivo para mostrar las zonas de contaminacion y basura en las calles de guadalajara zona metropolitana, asi como las alcantarillas y canales principales que podrian verse afectados",16,210,560);
  if(img) image(img,600,84,320,420); else text("Sube 'poster.jpg' al repo para mostrar la película.",600,84,320);
}
function a2(){
  textSize(18); text("Actividad 2 – API pública (Calidad del aire GDL)",16,54); textSize(14);
  if(err){ fill(180,0,0); text(err,16,84,920); return; }
  if(!d){ text("Cargando…",16,84); return; }
  let i=d.hourly.pm2_5.length-1, pm25=d.hourly.pm2_5[i], pm10=d.hourly.pm10[i], t=new Date(d.hourly.time[i]).toLocaleString();
  text("Fuente: Open-Meteo · Último dato: "+t,16,84);
  let x=160,y=160,w=600,s=v=>map(v,0,100,0,w);
  noStroke(); fill(230); rect(x,y-24,w,18,6); rect(x,y+36,w,18,6);
  fill(30); rect(x,y-24,s(pm25),18,6); rect(x,y+36,s(pm10),18,6);
  fill(0); text("PM2.5: "+pm25.toFixed(1)+" µg/m³",16,y-10); text("PM10: "+pm10.toFixed(1)+" µg/m³",16,y+50);
  stroke(200,0,0); line(x+s(15),y-30,x+s(15),y-6); line(x+s(45),y+30,x+s(45),y+54);
  noStroke(); text("Líneas rojas≈guía OMS (15 y 45).",16,260);
}
function a3(){
  textSize(18); text("Actividad 3 – Proyecto LimpiaGDL",16,54); textSize(14);
  let s=[
    ["¿Para qué?","Identificar, reportar y visualizar puntos con basura/contaminación y priorizar limpieza para evitar inundaciones."],
    ["¿Quién?","Ciudadanos, comités vecinales, voluntarios y cuadrillas de aseo público."],
    ["¿Dónde?","Guadalajara y ZMG."],
    ["Descripción breve","Mapa interactivo; clic para crear reporte con geo/foto/estado (pendiente/en proceso/resuelto). Heatmap por colonia y capas de canales/alcantarillas. APIs públicas + base propia."],
    ["UI","Mapa central, panel lateral con reportes, filtros por colonia y botón “+”. Temas: Visualización de datos, Defensa del Territorio, Desarrollo comunitario, Antirracismo."]
  ];
  let y=84; for(let k of s){ textStyle(BOLD); text(k[0]+":",16,y); textStyle(NORMAL); text(k[1],16,y+20,920); y+=88; }
}
