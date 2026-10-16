'use strict';
const $ = selector => document.querySelector(selector);
const ART = {
  napoli:'assets/napoli-partenza.png',
  ocean:'assets/atlantico-tempesta.png',
  newyork:'assets/new-york-arrivo.png'
};
const ART_CREDIT='Illustrazione originale generata con IA';
const SOURCES = {
  trailer:['Trailer ufficiale · 01Distribution','https://www.youtube.com/watch?v=jwoI74tpY8I'],
  film:['Film e soggetto','https://it.wikipedia.org/wiki/Napoli_-_New_York'],
  director:['Salvatores sul film','https://cinecittanews.it/gabriele-salvatores-la-fiaba-di-fellini-tra-american-dream-e-cinecitta/'],
  voyage:['Museo dell’emigrazione italiana','https://www.museoemigrazioneitaliana.org/approfondimenti/i-primi-viaggi-transoceanici/'],
  migration:['Storia e Futuro','https://storiaefuturo.eu/viaggio-non-finiva-mai-note-sullemigrazione-italiana-transoceanica/'],
  ellis:['Ellis Island','https://archivesfoundation.org/newsletter/doorway-to-america/'],
  inspection:['Ispezioni a Ellis Island','https://www.lagazzettaitaliana.com/history-culture/9554-early-italians-arriving-at-ellis-island-needed-help']
};
const SLIDES = [
  {layout:'cover',section:'Il viaggio',title:'Napoli, New York',kicker:'IL FILM / LA STORIA / LA VOSTRA MISSIONE',
    heading:'Due bambini.<br>Un oceano.<br><em>Una possibilità.</em>',
    text:'Il viaggio di Celestina e Carmine, dal film di Gabriele Salvatores alla storia dell’emigrazione italiana.',image:ART.napoli,transition:'iris',act:0,
    notes:'Chiedi alla classe: «Che cosa portereste se poteste riempire una sola valigia?». Presenta il percorso e anticipa l’escape room. Le immagini sono illustrazioni originali generate con IA, ispirate al viaggio. Non sono fotografie d’archivio o fotogrammi del film.',sources:['film']},
  {layout:'trailer',transition:'pan',act:0,section:'Il trailer',title:'Napoli – New York',kicker:'IL TRAILER UFFICIALE / 01 DISTRIBUTION',
    video:'jwoI74tpY8I',
    notes:'Guarda il trailer ufficiale pubblicato da 01Distribution. Il video parte solo premendo Play e richiede una connessione Internet. Se il player non è disponibile, usa il collegamento sotto il video. Dopo la visione chiedi quale immagine ha colpito di più. Cambiare slide o chiudere la presentazione interrompe il video.',sources:['trailer']},
  {transition:'wipe',act:0,section:'Gli autori',title:'Fellini e Salvatores',kicker:'UN SOGGETTO, DUE SGUARDI',
    html:'<p><b>Federico Fellini e Tullio Pinelli</b> scrivono il soggetto nel 1948. Al centro c’è una favola: due bambini inseguono l’America.</p><p><b>Gabriele Salvatores</b> porta la storia al cinema nel 2024, intrecciando avventura e realtà sociale.</p><p class="keyline">Il sogno dei bambini incontra la storia degli emigranti.</p>',
    notes:'Il soggetto è il racconto di base da cui nasce un film. Chiedi: «Qual è la differenza tra immaginare un luogo e conoscerlo?». Salvatores dirige il film, Fellini e Pinelli ne firmano il soggetto originale.',sources:['film','director']},
  {layout:'timeline',transition:'wipe',act:0,section:'Il soggetto ritrovato',title:'Una storia rimasta in attesa',kicker:'IL SOGGETTO RITROVATO',
    steps:[['1948','Fellini e Pinelli scrivono il soggetto. Il film resta un progetto.'],['2006','Il testo riemerge. Una storia dimenticata torna a circolare.'],['2024','Salvatores porta Napoli – New York sul grande schermo.']],
    notes:'Le date compaiono a 2, 5 e 8 secondi dall’ingresso nella slide. Commenta una tappa alla volta. Con gli effetti disattivati sono tutte subito visibili. Le date seguono il dossier allegato. L’ambientazione del film è il 1949, la sua uscita è il 2024. Fai distinguere questi due piani temporali.',sources:['film']},
  {layout:'facts',background:ART.napoli,transition:'zoom',act:0,section:'L’emigrazione',title:'Perché si lasciava l’Italia',kicker:'LA STORIA DIETRO IL VIAGGIO',
    facts:[['11 milioni','di italiani attraversano l’Atlantico tra il 1876 e il 1976, secondo il dossier.'],['Lavoro','La possibilità di guadagnare e aiutare la propria famiglia.'],['Una valigia','Pochi oggetti, legami da conservare e un futuro incerto.']],
    foot:'Partire significava cercare possibilità che a casa mancavano. Molti emigranti speravano anche di tornare.',
    notes:'Gli 11 milioni indicano la migrazione transatlantica nel dossier, non tutta l’emigrazione italiana e non soltanto gli arrivi negli Stati Uniti. Chiedi: «Si parte sempre per non tornare?».',sources:['migration']},
  {transition:'pan',act:1,section:'La traversata',title:'La vita in terza classe',kicker:'SETTIMANE IN MARE',image:ART.ocean,caption:'Illustrazione IA ispirata alle traversate atlantiche',archive:'https://commons.wikimedia.org/wiki/Special:FilePath/The%20Steerage%201907%20Stieglitz.jpg',
    html:'<p>Spazi affollati, poca aria e cibo semplice rendono difficile la traversata.</p><p>Le provviste devono durare: <b>gallette e pasta secca</b>. L’acqua deve essere <b>limpida</b>, senza segni di contaminazione.</p><p class="keyline">Nel gioco il sacco ha tre posti. Che cosa scegliete?</p>',
    notes:'Prepara la stanza della cambusa. La pasta secca si conserva e si cuoce a bordo. La pastasciutta già cotta non si conserva per tre settimane. Distingui le provviste dalla pietanza servita. L’immagine è una ricostruzione illustrata generata con IA. La fotografia storica di Stieglitz resta consultabile dal collegamento nelle fonti.',sources:['voyage']},
  {background:ART.ocean,transition:'pan',act:1,section:'La tempesta',title:'Un nome alla radio',kicker:'IL CODICE MORSE',
    html:'<p>Nel gioco la radio trasmette cinque lettere, scritte con punti e linee.</p><p class="morse" aria-label="Tre punti, due punti, punto linea punto, due punti, tre linee">··· &nbsp; ·· &nbsp; ·−· &nbsp; ·· &nbsp; −−−</p><p><b>S / I / R / I / O</b></p><p>Il <b>Sirio</b> naufragò nel <b>1906</b>. Il messaggio dell’enigma richiama questa tragedia della storia dell’emigrazione.</p>',
    notes:'Questo è un messaggio inventato per il gioco, non una registrazione storica del naufragio. Leggete insieme i gruppi di segni. In classe è sufficiente il codice visivo, l’audio è facoltativo.',sources:['migration']},
  {background:ART.newyork,transition:'iris',act:2,section:'Ellis Island',title:'La porta d’ingresso',kicker:'NEW YORK, ELLIS ISLAND',archive:'https://commons.wikimedia.org/wiki/Special:FilePath/Italian%20immigrants%20at%20Ellis%20Island.jpg',
    html:'<p>Ellis Island apre il <b>1° gennaio 1892</b>.</p><p>Milioni di persone passano da qui prima di entrare negli Stati Uniti. Li attendono visite mediche e domande.</p><p class="keyline">La prima stanza chiede un anno di quattro cifre. Tenete a mente la data.</p>',
    notes:'Il 1892 apre il lucchetto della stiva. Ripeti la data e lascia un momento per annotarla. Ellis Island è un capitolo della storia dell’emigrazione, non il riassunto di ogni arrivo negli Stati Uniti.',sources:['ellis','inspection']},
  {layout:'facts',background:ART.newyork,transition:'zoom',act:2,section:'L’ispezione',title:'La visita e la paura del rifiuto',kicker:'DUE INDIZI PER IL PASSAPORTO',
    facts:[['Gli occhi','Il controllo cerca malattie come il tracoma. Il dossier descrive l’uso di un bottone.'],['Le domande','Gli ufficiali chiedono informazioni sulla persona e sul suo viaggio.'],['Meno del 2%','È la quota di respinti riportata nel dossier. Nel gioco bisogna inserire il numero 2.']],
    foot:'La possibilità di essere respinti pesa anche su chi riuscirà a entrare.',
    notes:'Prepara le due prove di Ellis Island: bottone e numero 2. Il bottone è il dettaglio riportato dal dossier didattico. Non simulare manovre sugli occhi. Chiedi come ci si sente quando qualcuno decide se si può entrare.',sources:['inspection','ellis']},
  {background:ART.newyork,transition:'dissolve',act:2,section:'Little Italy',title:'Una comunità in una città nuova',kicker:'L’ARRIVO NON CHIUDE IL VIAGGIO',
    html:'<p>Lingua, lavoro e pregiudizi rendono difficile ricominciare. I legami della comunità possono offrire aiuto.</p><p>Il film mette al centro la <b>solidarietà</b>. La storia racconta anche minacce e sfruttamento.</p><p class="keyline">Le scelte dei singoli non definiscono un intero popolo.</p>',
    notes:'Evita di associare automaticamente povertà, emigrazione e criminalità. Chiedi un esempio concreto di solidarietà visto nel film e collega la risposta al dibattito finale.',sources:['film','director']},
  {layout:'quote',background:ART.napoli,transition:'dissolve',act:2,section:'Il messaggio',title:'Guardare l’altro',kicker:'LE PAROLE DI SALVATORES',
    quote:'«Se guardi bene qualcuno di diverso, puoi amarlo.»',
    text:'Il messaggio che ricomporrete nell’ultima stanza.',
    notes:'Citazione di Gabriele Salvatores dal materiale raccolto nel dossier. Leggi la frase e lascia qualche secondo di silenzio. Chiedi che cosa vuol dire “guardare bene” qualcuno.',sources:['director']},
  {layout:'mission',background:ART.newyork,transition:'iris',act:2,section:'La vostra missione',title:'Il viaggio passa a voi',kicker:'ESCAPE ROOM',
    text:'Squadre da 3–4 persone. Cinque stanze e un passaporto da completare, con 45 minuti a disposizione.',
    notes:'Il timer è indicativo. Gli errori costano 30 punti, ogni indizio costa 50. Il gioco parte da 1000 punti. Fate leggere le consegne a una persona diversa a ogni stanza. I progressi si conservano nello stesso browser quando il salvataggio è disponibile.',sources:[]}
];
let dCur=0, dNotesOn=false, opened=false, touch=null, ghostTimer=null;
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
let effectsOn=!motionPreference.matches;
const overview=$('#dOver');
$('#deck').appendChild(overview);
const indexLabel=i=>String(i+1).padStart(2,'0');
function slideBody(slide){
  const k=`<div class="sl-k">${slide.kicker}</div>`;
  const number=`<span class="sl-number" aria-hidden="true">${indexLabel(dCur)}</span>`;
  if(slide.layout==='trailer')return `<div class="sl-trailer"><header>${k}<h2>${slide.title}</h2></header><div class="trailer-player"><iframe src="https://www.youtube-nocookie.com/embed/${slide.video}?rel=0&amp;playsinline=1" title="Napoli – New York: trailer ufficiale di 01Distribution" width="1280" height="720" referrerpolicy="strict-origin-when-cross-origin" allow="encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div><p class="trailer-caption">Trailer ufficiale di 01Distribution. Richiede Internet. <a href="https://www.youtube.com/watch?v=${slide.video}" target="_blank" rel="noopener">Se il player non si carica, apri su YouTube ↗</a></p></div>`;
  if(slide.layout==='cover')return `<div class="sl-cover"><img class="cinema-image" src="${slide.image}" alt="" fetchpriority="high">${k}<h2>${slide.heading.split('<br>').map(line=>`<span class="title-line"><span>${line}</span></span>`).join('')}</h2><p>${slide.text}</p><span class="art-credit">${ART_CREDIT}</span></div>`;
  if(slide.layout==='timeline')return `<div class="sl-copy">${k}<h2>${slide.title}</h2><div class="timeline">${slide.steps.map(([year,text],i)=>`<section style="--step:${i}"><strong>${year}</strong><p>${text}</p></section>`).join('')}</div></div>${number}`;
  if(slide.layout==='facts')return `<div class="sl-facts">${k}<h2>${slide.title}</h2><div class="fact-row">${slide.facts.map(([value,text])=>`<div><strong>${value}</strong><span>${text}</span></div>`).join('')}</div><p>${slide.foot}</p></div>`;
  if(slide.layout==='quote')return `<div class="sl-quote">${k}<blockquote>${slide.quote}</blockquote><p>${slide.text}</p></div>`;
  if(slide.layout==='mission')return `<div class="sl-mission">${k}<h2>${slide.title}</h2><p>${slide.text}</p><p class="mission-route">01 Stiva &nbsp; / &nbsp; 02 Cambusa &nbsp; / &nbsp; 03 Tempesta<br>04 Ellis Island &nbsp; / &nbsp; 05 Little Italy</p><a class="primary" href="index.html#gioco">Apri l’escape room <span aria-hidden="true">↗</span></a></div>${number}`;
  return `<div class="sl-copy${slide.image?'':' solo'}">${k}<h2>${slide.title}</h2>${slide.html}</div>`+(slide.image?`<figure class="sl-photo"><img class="cinema-image" src="${slide.image}" alt="${slide.caption}" loading="lazy"><figcaption>${slide.caption}</figcaption></figure>`:number);
}
function renderDeck(direction=0){
  const slide=SLIDES[dCur],card=$('#dCard'),viewport=$('#dViewport');
  clearTimeout(ghostTimer);
  viewport.querySelectorAll('.slide-ghost').forEach(el=>el.remove());
  if(direction&&effectsOn&&card.childElementCount&&!card.querySelector('iframe')){
    const outgoing=card.cloneNode(true);
    const originals=card.querySelectorAll('.reveal-item');
    outgoing.querySelectorAll('.reveal-item').forEach((el,i)=>{
      const visual=getComputedStyle(originals[i]);
      el.style.animation='none';el.style.opacity=visual.opacity;
      el.style.transform=visual.transform;el.style.filter=visual.filter;
    });
    outgoing.removeAttribute('id');outgoing.removeAttribute('aria-label');
    outgoing.classList.remove('enter');outgoing.classList.add('slide-ghost');
    outgoing.setAttribute('aria-hidden','true');outgoing.inert=true;
    outgoing.style.setProperty('--direction',direction<0?-1:1);
    viewport.appendChild(outgoing);
    ghostTimer=setTimeout(()=>outgoing.remove(),850);
  }
  const dark=!!slide.background;
  card.className='slide'+(dark?' cinematic':'')+(slide.layout==='quote'?' quote-scene':'');
  card.dataset.transition=slide.transition||'dissolve';
  card.style.setProperty('--direction',direction<0?-1:1);
  card.innerHTML=(dark?`<div class="scene-backdrop" aria-hidden="true"><img class="cinema-image" src="${slide.background}" alt=""></div>`:'')+slideBody(slide)+(dark?`<span class="art-credit">${ART_CREDIT}</span>`:'');
  card.querySelectorAll('.sl-k,h2,.sl-copy>p,.sl-cover>p,.timeline section,.fact-row>div,.sl-facts>p,blockquote,.sl-quote>p,.sl-mission>p,.sl-mission>a').forEach((el,i)=>{
    el.classList.add('reveal-item');el.style.setProperty('--order',Math.min(i,7));
  });
  void card.offsetWidth;
  if(effectsOn)card.classList.add('enter');
  document.querySelectorAll('[data-act]').forEach(el=>el.classList.toggle('active',Number(el.dataset.act)===slide.act));
  card.setAttribute('aria-label',`Slide ${dCur+1} di ${SLIDES.length}: ${slide.title}`);
  $('#dCount').textContent=`${indexLabel(dCur)} / ${SLIDES.length}`;
  $('#dSec').textContent=slide.section;
  $('#dBar').style.width=`${(dCur+1)/SLIDES.length*100}%`;
  $('#dPrev').disabled=dCur===0;
  $('#dNext').disabled=dCur===SLIDES.length-1;
  $('#dNoteTxt').textContent=slide.notes;
  $('#dSources').replaceChildren();
  (slide.sources||[]).forEach(key=>{
    const [title,url]=SOURCES[key],a=document.createElement('a');
    a.href=url;a.textContent=title;a.target='_blank';a.rel='noopener';$('#dSources').appendChild(a);
  });
  if(slide.archive){const link=document.createElement('a');link.href=slide.archive;link.target='_blank';link.rel='noopener';link.textContent='Fotografia d’archivio (online)';$('#dSources').appendChild(link);}
  if(slide.image||slide.background){const credit=document.createElement('span');credit.textContent='Illustrazioni generate con Imagegen. Non sono documenti fotografici.';$('#dSources').appendChild(credit);}
  [...$('#dDots').children].forEach((button,i)=>button.setAttribute('aria-current',String(i===dCur)));
  [...$('#dGrid').children].forEach((button,i)=>button.setAttribute('aria-current',String(i===dCur)));
  $('#dViewport').scrollTop=0;
  $('#deckStatus').textContent=`Slide ${dCur+1} di ${SLIDES.length}. ${slide.title}`;
  try{history.replaceState(null,'',`#slide-${dCur+1}`);}catch{}
}
function goTo(index){
  if(!Number.isInteger(index)||index<0||index>=SLIDES.length||index===dCur)return;
  const direction=index>dCur?1:-1;dCur=index;renderDeck(direction);
}
function move(delta){goTo(dCur+delta);}
function startDeck(){
  $('#landing').hidden=true;$('#deck').hidden=false;$('#deck').setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';opened=true;renderDeck();$('#dViewport').focus({preventScroll:true});
}
function closeDeck(){
  if(overview.open)overview.close();
  $('#dCard').querySelectorAll('iframe').forEach(frame=>frame.remove());
  clearTimeout(ghostTimer);$('#dViewport').querySelectorAll('.slide-ghost').forEach(el=>el.remove());
  if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});
  $('#deck').hidden=true;$('#deck').setAttribute('aria-hidden','true');$('#landing').hidden=false;
  document.body.style.overflow='';opened=false;$('#startDeck').focus({preventScroll:true});
}
function toggleNotes(){
  dNotesOn=!dNotesOn;$('#dNotes').hidden=!dNotesOn;
  $('#deck').classList.toggle('with-notes',dNotesOn);$('#btnDNotes').setAttribute('aria-expanded',String(dNotesOn));
}
function toggleOverview(){
  if(overview.open){overview.close();return;}
  overview.showModal();$('#dGrid').children[dCur].focus();
}
async function toggleFullscreen(){
  try{
    if(document.fullscreenElement)await document.exitFullscreen();
    else if($('#deck').requestFullscreen)await $('#deck').requestFullscreen();
    else $('#deckStatus').textContent='Schermo intero non disponibile in questo browser.';
  }catch{$('#deckStatus').textContent='Schermo intero non disponibile. Puoi proseguire nella pagina.';}
}
SLIDES.forEach((slide,i)=>{
  const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Slide ${i+1}: ${slide.title}`);
  dot.addEventListener('click',()=>goTo(i));$('#dDots').appendChild(dot);
  const thumb=document.createElement('button');thumb.type='button';
  thumb.innerHTML=`<small>${indexLabel(i)} / ${slide.section.toUpperCase()}</small><strong>${slide.title}</strong>`;
  const preview=slide.background||slide.image;if(preview){thumb.style.setProperty('--preview',`url("${preview}")`);thumb.classList.add('has-preview');}
  thumb.addEventListener('click',()=>{goTo(i);overview.close();$('#dViewport').focus();});$('#dGrid').appendChild(thumb);
});
$('#startDeck').addEventListener('click',startDeck);
$('#closeDeck').addEventListener('click',closeDeck);
$('#dPrev').addEventListener('click',()=>move(-1));$('#dNext').addEventListener('click',()=>move(1));
$('#btnDNotes').addEventListener('click',toggleNotes);
$('#btnDOver').addEventListener('click',toggleOverview);
$('#closeOverview').addEventListener('click',()=>overview.close());
$('#btnFS').addEventListener('click',toggleFullscreen);
function updateMotion(){
  if(motionPreference.matches)effectsOn=false;
  document.documentElement.classList.toggle('motion-off',!effectsOn);
  $('#btnMotion').disabled=motionPreference.matches;
  $('#btnMotion').setAttribute('aria-pressed',String(effectsOn));
  $('#btnMotion').setAttribute('aria-label',effectsOn?'Disattiva le animazioni':'Attiva le animazioni');
  $('#btnMotion').title=motionPreference.matches?'Movimento ridotto nelle impostazioni del dispositivo':effectsOn?'Animazioni attive':'Animazioni disattivate';
  if(!effectsOn){clearTimeout(ghostTimer);$('#dViewport').querySelectorAll('.slide-ghost').forEach(el=>el.remove());$('#dCard').classList.remove('enter');}
}
$('#btnMotion').addEventListener('click',()=>{effectsOn=!effectsOn;updateMotion();});
if(motionPreference.addEventListener)motionPreference.addEventListener('change',event=>{effectsOn=!event.matches;updateMotion();});
updateMotion();
// Warm the next scenes in the browser cache without external image services.
Object.values(ART).forEach(src=>{const image=new Image();image.src=src;});
const hash=location.hash.match(/^#slide-(\d+)$/);
if(hash)dCur=Math.max(0,Math.min(SLIDES.length-1,Number(hash[1])-1));
if(hash||new URLSearchParams(location.search).get('start')==='1')startDeck();
document.addEventListener('keydown',event=>{
  if(!opened||overview.open||event.ctrlKey||event.metaKey||event.altKey||event.isComposing)return;
  if(event.target.closest?.('input,textarea,select,[contenteditable=true]'))return;
  const key=event.key.toLowerCase();
  if(key==='escape'){closeDeck();return;}
  if(key==='g'){event.preventDefault();toggleOverview();return;}
  if(key==='n'){event.preventDefault();toggleNotes();return;}
  if(key==='f'){event.preventDefault();toggleFullscreen();return;}
  if(key===' '&&event.target.closest?.('button,a'))return;
  if(['arrowright','pagedown',' '].includes(key)){event.preventDefault();move(1);}
  else if(['arrowleft','pageup'].includes(key)){event.preventDefault();move(-1);}
  else if(key==='home'){event.preventDefault();goTo(0);}
  else if(key==='end'){event.preventDefault();goTo(SLIDES.length-1);}
});
$('#dViewport').addEventListener('touchstart',event=>{touch={x:event.touches[0].clientX,y:event.touches[0].clientY};},{passive:true});
$('#dViewport').addEventListener('touchend',event=>{
  if(!touch)return;
  if(event.target.closest('a,button')){touch=null;return;}
  const dx=event.changedTouches[0].clientX-touch.x,dy=event.changedTouches[0].clientY-touch.y;touch=null;
  if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.3)move(dx<0?1:-1);
},{passive:true});
$('#dViewport').addEventListener('touchcancel',()=>{touch=null;});
document.addEventListener('error',event=>{
  if(event.target.tagName!=='IMG')return;
  event.target.hidden=true;event.target.closest('figure')?.classList.add('image-unavailable');
},true);
document.querySelectorAll('img').forEach(img=>{if(img.complete&&!img.naturalWidth)img.hidden=true;});
