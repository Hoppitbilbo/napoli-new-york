const $ = s => document.querySelector(s);
// reveal
const io = new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// chapters
document.querySelectorAll('.chap-head').forEach(b=>{b.setAttribute('aria-expanded', b.parentElement.classList.contains('open'));b.addEventListener('click',()=>{b.parentElement.classList.toggle('open');b.setAttribute('aria-expanded',b.parentElement.classList.contains('open'));});});

// ---- GAME ----
const levels = [
 {
  title:"Il lucchetto della stiva",
  sub:"Siete nascosti tra i bagagli. Sul cancello un lucchetto a 4 cifre. Il marinaio buono sussurra: «È l’anno in cui l’Isola ha acceso le lampade per la prima volta… il primo di gennaio… cercalo nel Quaderno, capitolo 4.»",
  scene:"🌑 <b>Stiva della Victory, notte.</b> Buio, puzza di carbone, meno di due metri sopra la testa. Celestina stringe la lettera della Agnese. Senti cantare piano: <i></i> — è la canzone delle tempeste. Il lucchetto aspetta 4 cifre.",
  hints:["Capitolo 4 del Quaderno: cerca “Ellis Island apre il…”. È una data famosa, il 1° gennaio…","Finisce con <b>92</b>, è alla fine dell’Ottocento."],
  render(){
    return `<div class="scene"><span class="lamp"></span>${this.scene}</div>
    <div class="puzzle"><h4>🔒 Apri il lucchetto</h4><p>Inserisci l’anno a 4 cifre. <span class="dossier-link">📖 Aiuto: Quaderno cap. 4 “Ellis Island”.</span></p>
    <div class="row"><input aria-label="Anno di apertura di Ellis Island" type="text" id="a1" inputmode="numeric" placeholder="····" maxlength="4" style="max-width:160px; text-align:center"><button class="btn btn-ink" onclick="check1()">Prova la chiave</button></div>
    <div role="status" aria-live="polite" class="feedback" id="f1"></div><div class="hint-box" id="h1"></div></div>`;
  }
 },
 {
  title:"La cambusa: le provviste di George",
  sub:"George non ti dice cosa prendere: ti dà 3 regole e un sacco con 3 posti. Ragiona, o resti a stomaco vuoto.",
  scene:"🍲 <b>Cambusa, ore 6.</b> George incrocia le braccia: «Ho un sacco con <b>3 posti soli</b> e la traversata dura <b>3 settimane</b>. Non dirmi cosa ti piace — dimmi cosa <b>sopravvive</b>. Le mie regole sono appese al muro. Leggile, tocca il tavolo… e attento alle brocche: una viene dalla botte buona, l’altra dai serbatoi.»",
  hints:["Le 3 regole bastano: 1) cosa dura 3 settimane senza ghiaccio? 2) cosa mangia chi è povero, non chi è ricco? 3) quale acqua sa di ferro e ruggine?","Soluzione: gallette dure · pasta secca · acqua limpida. Formaggio e uova marciscono senza ghiaccio, l’acqua rossa viene dai serbatoi."],
  render(){
    const foods=[
      {id:'pane',e:'🍞',n:'Gallette di bordo',d:'Dure come sassi, da inzuppare. Sanno di poco, ma durano mesi.'},
      {id:'pasta',e:'🍝',n:'Pasta secca',d:'Si conserva senza ghiaccio. George la cuoce ogni giorno in cambusa.'},
      {id:'limpida',e:'💧',n:'Brocca chiara',d:'Acqua limpida, senza odore. Il mozzo l’ha presa dalla botte buona.'},
      {id:'formaggio',e:'🧀',n:'Formaggio fresco',d:'Morbido e profumato, il preferito di tutti. Ma quanto dura senza ghiaccio?'},
      {id:'uovo',e:'🥚',n:'Uova fresche',d:'Nutrienti e compatte. Ma col rollio si rompono… e dopo una settimana?'},
      {id:'rossa',e:'🟥',n:'Brocca rossastra',d:'Acqua di uno strano colore rosso. Il mozzo giura che “è sempre stata così”.'},
    ];
    return `<div class="scene"><span class="lamp"></span>${this.scene}</div>
    <div class="puzzle"><h4>🍲 Riempi il sacco: 3 posti, 3 regole</h4>
    <div class="quote" style="margin:0 0 10px">📜 <b>Le 3 regole di George:</b> 1) deve conservarsi <b>3 settimane senza ghiaccio</b> · 2) <b>niente lussi</b>, qui si mangia da poveri · 3) attento all’acqua: <b>una botte è sicura, l’altra sa di ferro</b>.</div>
    <p>Tocca una carta per metterla nel sacco, ritoccala per toglierla. Il sacco ha solo 3 posti: per cambiare idea devi prima liberarne uno! <span class="dossier-link">📖 Aiuto: Quaderno cap. 2.</span></p>
    <div class="type" id="sackCount" style="font-size:14px; background:#101f30; color:#e8c872; display:inline-block; padding:6px 14px; border-radius:8px; margin-bottom:4px">🎒 Nel sacco: 0/3</div>
    <div class="food-grid">${foods.map(f=>`<button type="button" class="food" aria-pressed="false" data-id="${f.id}" onclick="toggleFood(this)"><span class="e">${f.e}</span><b>${f.n}</b><small>${f.d}</small></button>`).join('')}</div>
    <div class="row"><button class="btn btn-paper" onclick="emptySack()">↺ Svuota il sacco</button><button class="btn btn-ink" onclick="check2()">Consegna il sacco</button></div>
    <div role="status" aria-live="polite" class="feedback" id="f2"></div><div class="hint-box" id="h2"></div></div>`;
  }
 },
 {
  title:"Tempesta! La radio gracchia in Morse",
  sub:"Onde alte così. Dalla radio un SOS con un nome di nave. Decodificalo: è una tragedia vera del 1906.",
  scene:"⛈️ <b>Oceano, tempesta.</b> La nave balla, tutti cantano per la paura. La radio del marconista ripete un nome in codice Morse, ancora e ancora. È il nome di una nave perduta — la stessa che studiate nel Quaderno cap. 3.",
  hints:["Usa l’alfabeto qui sotto. ··· = S, ·· = I… la parola ha 5 lettere, inizia per S.","È la nave affondata nel <b>1906 con 292 morti</b>. La soluzione è <b>SIRIO</b>."],
  render(){
    return `<div class="scene"><span class="lamp"></span>${this.scene}</div>
    <div class="puzzle"><h4>📻 Decodifica il messaggio</h4>
    <div class="morse-box" id="morseVisual">··· &nbsp; ·· &nbsp; ·−· &nbsp; ·· &nbsp; −−−</div>
    <div class="row" style="margin-bottom:10px"><button class="btn btn-paper" onclick="playMorse()">🔊 Ascolta il Morse</button><span style="font-size:13px; color:#6b5f4a">se l’audio non va, usa il testo sopra</span></div>
    <div class="alpha"><span>S ···</span><span>I ··</span><span>R ·−·</span><span>O −−−</span><span>V ···−</span><span>E ·</span><span>C −·−·</span><span>M −−</span></div>
    <p>Quale nave affondò nel <b>1906</b>? Scrivi il nome (5 lettere).</p>
    <div class="row"><input aria-label="Nome della nave in codice Morse" maxlength="20" autocomplete="off" type="text" id="a3" placeholder="·····" style="max-width:200px; text-transform:uppercase"><button class="btn btn-ink" onclick="check3()">Trasmetti →</button></div>
    <div role="status" aria-live="polite" class="feedback" id="f3"></div><div class="hint-box" id="h3"></div></div>`;
  }
 },
 {
  title:"Ellis Island: la visita che fa paura",
  sub:"Statua della Libertà in vista! Ma prima: fila, occhi, domande. Dimostra di poter entrare.",
  scene:"🗽 <b>Ellis Island, sala d’ispezione.</b> Scale, urla, timbri. Il medico solleva le palpebre con qualcosa di piccolo e tondo — fa male e spaventa tutti. Poi l’ufficiale chiede: «Quanti vengono respinti, secondo te?» La paura è tanta, ma i numeri dicono altro…",
  hints:["Quaderno cap. 4: lo strumento è minuscolo, si trova su una giacca… inizia per B.","Sempre cap. 4: i respinti sono pochissimi, <b>meno del 2%</b>. E fino al 1907 niente passaporto!"],
  render(){
    return `<div class="scene"><span class="lamp"></span>${this.scene}</div>
    <div class="puzzle"><h4>👁️ Prova 1 — lo strumento del tracoma</h4><p>Con cosa il medico rovesciava la palpebra per cercare il tracoma?</p>
    <div class="row" id="eyeRow"><button class="opt-btn" onclick="eyePick(this,1)">🔘 Un bottone</button><button class="opt-btn" onclick="eyePick(this,0)">✂️ Una forbice</button><button class="opt-btn" onclick="eyePick(this,0)">🌡️ Un termometro</button></div>
    <h4 style="margin-top:14px">📋 Prova 2 — quanti respinti?</h4><p>Completa: “Veniva respinto <b>meno del ___%</b>”. Scrivi solo il numero.</p>
    <div class="row"><input aria-label="Percentuale: meno del" type="text" id="a4" placeholder="?" inputmode="numeric" maxlength="2" style="max-width:100px; text-align:center"><button class="btn btn-ink" onclick="check4()">Consegna i documenti</button></div>
    <div role="status" aria-live="polite" class="feedback" id="f4"></div><div class="hint-box" id="h4"></div></div>`;
  }
 },
 {
  title:"Little Italy: la lettera di Agnese",
  sub:"Ce l’hai fatta! Ora trova la zia. La sua lettera è in napoletano… e nasconde la parola che salva tutto.",
  scene:"🏙️ <b>Little Italy, sera.</b> Odore di cannoli, insegne, fisarmoniche. Ma su un muro una <b>mano nera</b> disegnata: la minaccia della Black Hand di Morello. La lettera della zia dice: <i>«Carmì, nun avé paura… cerca addò ‘a gente s’aiuta…»</i> Riordina la frase di Salvatores e avrai la chiave finale.",
  hints:["È la frase del regista che hai letto nel Capitolo zero e nel cap. 5: parla di guardare e amare.","Tocca le parole nell’ordine giusto: <b>Se – guardi – bene – qualcuno – di – diverso – puoi – amarlo</b>."],
  render(){
    return `<div class="scene"><span class="lamp"></span>${this.scene}</div>
    <div class="puzzle"><h4>✉️ Ricomponi la frase-chiave</h4><p>Tocca le parole nell’ordine giusto. È il messaggio del film sulla <b>solidarietà</b>.</p>
    <div class="sentence" id="sent"><span class="slot-empty">— tocca le parole qui sotto, nell’ordine giusto —</span></div>
    <div class="word-bank" id="bank">
      <button onclick="pushWord(this,'amarlo.')">amarlo.</button>
      <button onclick="pushWord(this,'bene')">bene</button>
      <button onclick="pushWord(this,'diverso')">diverso</button>
      <button onclick="pushWord(this,'Se')">Se</button>
      <button onclick="pushWord(this,'puoi')">puoi</button>
      <button onclick="pushWord(this,'qualcuno')">qualcuno</button>
      <button onclick="pushWord(this,'guardi')">guardi</button>
      <button onclick="pushWord(this,'di')">di</button>
    </div>
    <div class="row"><button class="btn btn-paper" onclick="resetWords()">↺ Ricomincia</button><button class="btn btn-ink" onclick="check5()">Bussa alla porta →</button></div>
    <div role="status" aria-live="polite" class="feedback" id="f5"></div><div class="hint-box" id="h5"></div></div>`;
  }
 }
];

let cur=0, score=1000, hintsUsed=0, errors=0, solved=[false,false,false,false,false];
let secs=45*60, timerOn=false, timerId=null, elapsed=0;
let eyeOK=false, sentArr=[], transitioning=false, finished=false, deadline=null;
let roomState=Array.from({length:5},()=>({hints:0,found:[]}));
const SAVE_KEY='napoli-new-york-game-v1';
const WORDS=['Se','guardi','bene','qualcuno','di','diverso','puoi','amarlo.'];
let storageAvailable=true;

function fmt(s){return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function updScore(){ $('#score').textContent='⭐ punti: '+score; }
function updJourney(){
  const count=solved.filter(Boolean).length;
  const first=solved.indexOf(false);
  document.querySelectorAll('.j-step').forEach((el,i)=>{
    el.classList.toggle('active',i===cur);
    el.classList.toggle('done',solved[i]);
    el.disabled=transitioning||finished||(first!==-1&&i>first);
    el.setAttribute('aria-current',i===cur?'step':'false');
    el.setAttribute('aria-label',`${levels[i].title}: ${solved[i]?'completata':i===cur?'stanza attuale':el.disabled?'da sbloccare':'disponibile'}`);
  });
  document.querySelectorAll('#pmini .p-stamp').forEach((el,i)=>{
    el.classList.toggle('on',solved[i]);el.textContent=solved[i]?'★':String(i+1);
    el.setAttribute('aria-label',`Timbro ${i+1}: ${solved[i]?'ottenuto':'da ottenere'}`);
  });
  $('#pbar').style.width=(count/5*100)+'%';
  $('#pbar').parentElement.setAttribute('aria-valuenow',count);
  $('#progressText').textContent=`${count} di 5 timbri`;
  $('#btnBack').disabled=cur===0||transitioning||finished;
  $('#btnNext').disabled=!solved[cur]||transitioning||finished;
  $('#btnNext').textContent=cur===4?'Completa il viaggio →':'Prossima stanza →';
  $('#btnHint').disabled=solved[cur]||finished||roomState[cur].hints>=levels[cur].hints.length;
  $('#btnHint').textContent=roomState[cur].hints>=levels[cur].hints.length?'Indizi esauriti':'💡 Indizio (−50)';
}
function render(){
  const L=levels[cur];
  $('#lvlLabel').textContent=`STANZA ${cur+1} / 5`;
  $('#lvlTitle').textContent=L.title;
  $('#lvlSub').textContent=L.sub;
  $('#lvlBody').innerHTML=L.render();
  const saved=roomState[cur];
  eyeOK=!!saved.eyeOK;sentArr=[...(saved.words||[])];
  const answer=$('#a'+(cur+1));if(answer)answer.value=saved.answer||'';
  document.querySelectorAll('.food').forEach(el=>{const selected=(saved.foods||[]).includes(el.dataset.id);el.classList.toggle('sel',selected);el.setAttribute('aria-pressed',String(selected));});
  if(cur===1)updSack();
  if(cur===3&&eyeOK)$('#eyeRow .opt-btn').classList.add('right');
  if(cur===4){document.querySelectorAll('#bank button').forEach(b=>b.classList.toggle('used',sentArr.includes(b.textContent)));drawSent();}
  const hints=$('.hint-box');
  for(let i=0;i<saved.hints;i++){const item=document.createElement('div');item.className='h-item';item.innerHTML='💡 '+L.hints[i];hints.appendChild(item);}
  hints.classList.toggle('show',saved.hints>0);
  if(solved[cur])lockPuzzle();
  updJourney();
}
function lockPuzzle(){
  document.querySelectorAll('#lvlBody .puzzle button,#lvlBody .puzzle input').forEach(el=>el.disabled=true);
  const banner=document.createElement('p');banner.className='solved-banner';banner.setAttribute('role','status');banner.textContent='✓ Timbro ottenuto. Puoi esplorare la scena o proseguire.';
  $('#lvlBody').prepend(banner);
}
function ok(msg){
  if(solved[cur]||finished||transitioning)return;
  captureRoom();solved[cur]=true;
  const f=$('.feedback');if(f){f.className='feedback ok';f.textContent='✓ '+msg;}
  lockPuzzle();updJourney();saveGame();stampAnim();
  $('#gameStatus').textContent=`Stanza ${cur+1} completata. ${cur===4?'Completa il viaggio per ricevere il diploma.':'Il prossimo passaggio è sbloccato.'}`;
}
function ko(msg){
  if(solved[cur]||finished||transitioning)return;
  errors++;score=Math.max(0,score-30);updScore();saveGame();
  const f=$('.feedback');if(f){f.className='feedback ko';f.textContent='✖ '+msg;}
}
function stampAnim(){
  const el=document.createElement('div');
  el.textContent='★ TIMBRO!';
  el.style.cssText='position:fixed;top:40%;left:50%;transform:translate(-50%,-50%) rotate(-10deg);font-family:Special Elite,monospace;font-size:42px;color:#1b6b3a;border:5px double #1b6b3a;padding:10px 26px;border-radius:12px;background:#f2e7cdee;z-index:99;';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(),1100);
}
window.check1=function(){
  if(solved[cur]||finished||transitioning)return;
  const v=($('#a1').value||'').trim();
  if(v==='1892') ok('Cancello aperto! Era l’anno di Ellis Island. Correte in cambusa…');
  else ko('Non gira… rileggi il Quaderno cap. 4: 1° gennaio di quale anno aprì Ellis Island?');
};
window.toggleFood=function(el){
  if(solved[cur]||finished||transitioning)return;
  if(el.classList.contains('sel')){ el.classList.remove('sel'); }
  else{
    const n=document.querySelectorAll('.food.sel').length;
    if(n>=3){
      const f=$('#f2');
      if(f){f.className='feedback ko'; f.textContent='⚠️ Il sacco ha solo 3 posti! Per cambiare idea ritocca una carta già scelta (si deseleziona) e poi prendine un’altra.';}
      return;
    }
    el.classList.add('sel');
  }
  el.setAttribute('aria-pressed',String(el.classList.contains('sel')));
  updSack();captureRoom();saveGame();
};
function updSack(){
  const n=document.querySelectorAll('.food.sel').length;
  const c=$('#sackCount'); if(c) c.textContent='🎒 Nel sacco: '+n+'/3';
}
window.emptySack=function(){
  if(solved[cur]||finished||transitioning)return;
  document.querySelectorAll('.food.sel').forEach(e=>{e.classList.remove('sel');e.setAttribute('aria-pressed','false');});
  updSack();
  const f=$('#f2'); if(f){f.className='feedback'; f.textContent='';}
  captureRoom();saveGame();
};
window.check2=function(){
  if(solved[cur]||finished||transitioning)return;
  const sel=[...document.querySelectorAll('.food.sel')].map(e=>e.dataset.id);
  const good=['pane','pasta','limpida'];
  if(sel.length!==3){ ko('George conta le cose nel sacco: «Devono essere 3, né una di più né una di meno!» (ora: '+sel.length+'/3)'); return; }
  if(sel.includes('rossa')){ ko('George rovescia la brocca per terra: «Rossa come la ruggine! Quella viene dai serbatoi di ferro — fa ammalare. Regola n.3!»'); return; }
  if(sel.includes('formaggio')||sel.includes('uovo')){
    const cosa=sel.includes('formaggio')?'Questo formaggio':'Queste uova';
    ko('George annusa e storce il naso: «'+cosa+' tra tre giorni senza ghiaccio cammina da solo! Regola n.1, ricordi?»'); return;
  }
  if(sel.every(id=>good.includes(id))) ok('George annuisce e vi nasconde sotto il tavolo: «Con la testa si mangia, non con la gola. Pancia quasi piena… via verso la tempesta!»');
  else ko('George scuote la testa: «Rileggi le 3 regole appese al muro e guarda bene il tavolo…»');
};
let audioCtx=null;
window.playMorse=function(){
  try{
    audioCtx=audioCtx||new (window.AudioContext||window.webkitAudioContext)();
    let t=audioCtx.currentTime;
    [...'... .. .-. .. ---'].forEach(ch=>{
      if(ch==='.'){beep(t,.12); t+=.2;} else if(ch==='-'){beep(t,.36); t+=.44;} else if(ch===' '){t+=.35;}
    });
    function beep(t,d){const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.connect(g);g.connect(audioCtx.destination);o.frequency.value=650;g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(.5,t+.02);g.gain.exponentialRampToValueAtTime(.001,t+d);o.start(t);o.stop(t+d+.05);}
  }catch(e){ alert('Audio non disponibile: usa il testo Morse visivo.'); }
};
window.check3=function(){
  if(solved[cur]||finished||transitioning)return;
  const v=(($('#a3').value||'').trim().toUpperCase());
  if(v==='SIRIO') ok('“Sirio ricevuto…” Il marconista vi fa cenno: avete capito il mare. Rotta su Ellis Island!');
  else ko('Non è la nave giusta. Cerca nel Quaderno cap. 3: quale nave affondò nel 1906? (5 lettere, inizia per S).');
};
window.eyePick=function(btn,good){
  if(solved[cur]||finished||transitioning)return;
  document.querySelectorAll('#eyeRow .opt-btn').forEach(b=>b.classList.remove('right','wrong'));
  if(good){btn.classList.add('right'); eyeOK=true; const f=$('#f4'); f.className='feedback ok'; f.textContent='👁️ Esatto: un semplice bottone. Ora rispondi alla seconda prova.';}
  else{btn.classList.add('wrong'); eyeOK=false; ko2('No: con forbici o termometri non si rovesciano palpebre…');}
  captureRoom();saveGame();
};
function ko2(m){ko(m);}
window.check4=function(){
  if(solved[cur]||finished||transitioning)return;
  if(!eyeOK){ko2('Prima supera la prova dell’occhio (il bottone)!'); return;}
  const v=(($('#a4').value||'').trim());
  if(v==='2') ok('Timbro verde! “Wheat, not chaff” — grano, non pula. Siete AMMESSI. Ora: Little Italy vi aspetta.');
  else ko2('Numero sbagliato. Rileggi cap. 4: i respinti erano pochissimi, “meno del… %”?');
};
window.pushWord=function(btn,word){
  if(solved[cur]||finished||transitioning)return;
  if(sentArr.includes(word)) return;
  sentArr.push(word); btn.classList.add('used'); drawSent();
};
function drawSent(){
  const s=$('#sent'); if(!s) return;
  if(!sentArr.length){s.innerHTML='<span class="slot-empty">Tocca le parole per comporre la frase. Tocca una parola inserita per rimuoverla.</span>';captureRoom();saveGame();return;}
  s.innerHTML=sentArr.map((w,i)=>`<button class="wchip" type="button" onclick="removeWord(${i})" aria-label="Rimuovi ${w}">${w}</button>`).join('');
  captureRoom();saveGame();
}
window.removeWord=function(i){if(solved[cur]||finished||transitioning)return;const word=sentArr.splice(i,1)[0];document.querySelectorAll('#bank button').forEach(b=>{if(b.textContent===word)b.classList.remove('used');});drawSent();};
window.resetWords=function(){
  if(solved[cur]||finished||transitioning)return; sentArr=[]; document.querySelectorAll('#bank button').forEach(b=>b.classList.remove('used')); drawSent(); };
window.check5=function(){
  if(solved[cur]||finished||transitioning)return;
  if(sentArr.join(' ')==='Se guardi bene qualcuno di diverso puoi amarlo.'){
    ok('La porta si apre! Agnese vi abbraccia. La parola era SOLIDARIETÀ.');
  } else ko('La frase non suona giusta… rileggila ad alta voce. Inizia con “Se guardi bene…”.');
};
$('#btnHint').addEventListener('click',()=>{
  if(solved[cur]||finished||transitioning)return;
  const n=roomState[cur].hints,hs=levels[cur].hints;
  if(n>=hs.length)return;
  const box=$('.hint-box'),d=document.createElement('div');d.className='h-item';d.innerHTML='💡 '+hs[n];
  box.appendChild(d);box.classList.add('show');roomState[cur].hints++;
  hintsUsed++;score=Math.max(0,score-50);updScore();updJourney();saveGame();
});
function finish(){
  if(finished||!solved.every(Boolean))return;
  syncTimer();clearInterval(timerId);timerOn=false;deadline=null;finished=true;
  updateTimerUI();updJourney();saveGame();showDiploma();confetti();
}
async function showDiploma(){
  if(document.fullscreenElement){try{await document.exitFullscreen();}catch{}}
  $('#finale').style.display='block';
  $('#statTime').textContent=fmt(elapsed);$('#statScore').textContent=score;$('#statHints').textContent=hintsUsed;
  $('#teamNameOut').textContent=$('#teamName').value.trim()||'Squadra Victory';
  $('#gameStatus').textContent='Viaggio completato. Il diploma è pronto da stampare.';
  $('#finale').scrollIntoView({behavior:'smooth'});
}
function confetti(){
  const colors=['#7a1e1e','#b88a2e','#1a324f','#1b6b3a','#e8c872'];
  for(let i=0;i<80;i++){
    const c=document.createElement('div'); c.className='confetti';
    c.style.left=Math.random()*100+'vw';
    c.style.background=colors[i%colors.length];
    c.style.width=(6+Math.random()*8)+'px'; c.style.height=(8+Math.random()*8)+'px';
    c.style.animationDuration=(2.5+Math.random()*2.5)+'s';
    document.body.appendChild(c); setTimeout(()=>c.remove(),5500);
  }
}
function updateTimerUI(){
  $('#timer').textContent=fmt(secs);
  $('#btnTimer').textContent=finished?'✓ Concluso':secs===0?'Tempo scaduto':timerOn?'⏸ Pausa':elapsed?'▶ Riprendi':'▶ Avvia 45:00';
  $('#btnTimer').disabled=finished||secs===0;
  $('#teamName').disabled=finished;
}
function syncTimer(){
  if(!timerOn||!deadline)return;
  const next=Math.max(0,Math.min(secs,Math.ceil((deadline-Date.now())/1000)));
  const previous=secs;elapsed+=secs-next;secs=next;
  if(previous>600&&secs<=600&&secs>0)$('#gameStatus').textContent='Restano 10 minuti. Potete tornare al Quaderno per cercare le risposte.';
  if(secs===0){timerOn=false;deadline=null;clearInterval(timerId);$('#gameStatus').textContent='Tempo scaduto. Il timer è indicativo: potete continuare gli enigmi o avviare una nuova partita.';}
  updateTimerUI();if(previous!==secs)saveGame();
}
$('#btnTimer').addEventListener('click',()=>{
  if(finished||secs===0)return;
  if(timerOn){syncTimer();clearInterval(timerId);timerOn=false;deadline=null;$('#gameStatus').textContent='Timer in pausa. Gli enigmi restano disponibili.';}
  else{timerOn=true;deadline=Date.now()+secs*1000;timerId=setInterval(syncTimer,250);$('#gameStatus').textContent='Timer avviato. Esplorate gli oggetti e risolvete l’enigma della stanza.';}
  updateTimerUI();saveGame();
});
/* ===== SCENE PUNTA-E-CLICCA 2D + CINEMA + FULLSCREEN ===== */
const IMG = {
  stiva:'https://commons.wikimedia.org/wiki/Special:FilePath/Steerage%20passengers%20on%20SS%20Friedrich%20der%20Grosse.jpg?width=1200',
  ponte:'https://commons.wikimedia.org/wiki/Special:FilePath/Steerage%20passengers%20on%20SS%20Friedrich%20der%20Grosse.jpg?width=1000',
  nave:'https://commons.wikimedia.org/wiki/Special:FilePath/SS%20Olympia.jpg?width=1000',
  ellis:'https://commons.wikimedia.org/wiki/Special:FilePath/Italian%20immigrants%20at%20Ellis%20Island.jpg?width=1000',
  hall:'https://commons.wikimedia.org/wiki/Special:FilePath/Ellis%20Island%20arrivals.jpg?width=1000'
};
const SCENES = [
  {img:IMG.stiva, spots:[
    {x:'22%',y:'52%',icon:'🧳',label:'il baule',item:'🗝️ mappa bruciata',text:'<b>Nel baule:</b> una mappa parzialmente bruciata… si legge solo “Little Italy — cerca la signora dei cannoli”. Conservala nell’inventario!'},
    {x:'58%',y:'42%',icon:'🔒',label:'il lucchetto',text:'<b>Il lucchetto</b> aspetta 4 cifre qui sotto. Il marinaio ripete: “l’anno dell’Isola… il primo di gennaio…” (Quaderno cap. 4).'},
    {x:'82%',y:'60%',icon:'✉️',label:'la lettera',item:'✉️ lettera di Agnese',text:'<b>Lettera della Agnese</b> in napoletano: ti servirà all’ultima stanza. Intanto il lucchetto va aperto!'}]},
  {img:IMG.ponte, spots:[
    {x:'20%',y:'55%',icon:'🍞',label:'le gallette',text:'«Vedi queste gallette?» dice George battendone una sul tavolo. «Dure come sassi, ma tra un mese sono ancora qui. Il formaggio, invece… torna ad annusarlo tra tre giorni.»'},
    {x:'50%',y:'45%',icon:'🍝',label:'la gavetta',text:'«Qui non siamo al ristorante,» borbotta George mescolando. «Qui si mangia da poveri: ciò che riempie la pancia, non ciò che fa gola.»'},
    {x:'78%',y:'58%',icon:'💧',label:'le brocche',item:'📜 le 3 regole di George',text:'Due brocche identiche. «Una viene dalla botte buona, l’altra dai serbatoi di ferro,» sussurra George. «Quella buona non sa di niente. L’altra… annusa e capirai.» (Regole salvate nell’inventario!)'}]},
  {img:IMG.nave, spots:[
    {x:'25%',y:'50%',icon:'📻',label:'la radio',text:'<b>La radio gracchia</b> il nome di una nave in Morse: decodificalo qui sotto con l’alfabeto. Indizio: affondò nel 1906 (Quaderno cap. 3).'},
    {x:'60%',y:'62%',icon:'🌊',label:'le onde',text:'<b>Onde alte così!</b> Tutti cantano  per farsi coraggio durante la tempesta.'},
    {x:'84%',y:'40%',icon:'📡',label:'il marconista',text:'<b>Il marconista</b> ripete: “··· ·· ·−· ·· −−−”… cinque lettere, inizia per S. Usa il bottone 🔊 per ascoltarlo!'}]},
  {img:IMG.ellis, spots:[
    {x:'22%',y:'52%',icon:'👁️',label:'l’ambulatorio',text:'<b>L’ambulatorio del terrore:</b> qui il medico rovescia le palpebre per cercare il tracoma. Con cosa? (Quaderno cap. 4). Rispondi qui sotto!'},
    {x:'55%',y:'45%',icon:'📋',label:'lo sportello',text:'<b>Lo sportello documenti:</b> fino al 1907 niente passaporto né visto — bastava dichiarare a voce chi eri. Ma i respinti erano pochissimi: meno del…?'},
    {x:'82%',y:'60%',icon:'🗽',label:'la Libertà',text:'<b>La Statua della Libertà!</b> La vedi dal ponte: l’America è vicina. Supera le due prove e avrai il timbro verde.'}]},
  {img:IMG.hall, spots:[
    {x:'22%',y:'52%',icon:'🤚',label:'la mano nera',text:'<b>Una mano nera disegnata sul muro:</b> la minaccia della Black Hand di Morello ai negozianti. Ma la comunità sa anche aiutarsi…'},
    {x:'55%',y:'45%',icon:'✉️',label:'la lettera',item:'✉️ frase della zia',text:'<b>La lettera della zia</b> nasconde la frase di Salvatores sulla solidarietà: riordinala qui sotto e la porta si aprirà.'},
    {x:'82%',y:'60%',icon:'🥮',label:'i cannoli',text:'<b>Il banco dei cannoli:</b> “cerca la signora dei cannoli” diceva la mappa bruciata della Stanza 1. Hai chiuso il cerchio: ora ricomponi la frase!'}]}
];
const CINE = [
  {day:'GIORNO 1 — NAPOLI · LA STIVA', title:'“Persino morire di fame è illegale”', sub:'Celestina e Carmine si nascondono tra i bagagli della Victory…', img:IMG.stiva},
  {day:'GIORNO 9 — OCEANO · LA CAMBUSA', title:'Il cuoco George vi aiuta', sub:'Tre posti nel sacco. Quali provviste sceglierete?', img:IMG.ponte},
  {day:'GIORNO 14 — TEMPESTA', title:'La radio gracchia un SOS', sub:'Il marconista ha bisogno del vostro aiuto.', img:IMG.nave},
  {day:'GIORNO 21 — ELLIS ISLAND', title:'La Statua della Libertà!', sub:'Ma prima: fila, occhi, domande. “Wheat, not chaff”…', img:IMG.ellis},
  {day:'GIORNO 22 — LITTLE ITALY', title:'La lettera di Agnese', sub:'Tra solidarietà e Mano Nera, l’ultima porta…', img:IMG.hall}
];
const inv = [];
function addInv(item){
  if(inv.includes(item)) return;
  inv.push(item);saveGame();
  const box=$('#invItems'); if(!box) return;
  const ph=box.querySelector('i'); if(ph) ph.remove();
  const s=document.createElement('span'); s.className='inv-item'; s.textContent=item;
  box.appendChild(s);
}
function mountStage(){
  const S=SCENES[cur]; if(!S) return;
  const body=$('#lvlBody'); if(!body) return;
  const st=document.createElement('div');
  st.className='pnc-stage'; st.id='pncStage';
  st.innerHTML=`<img class="bg" loading="lazy" src="${S.img}" alt="Scena d'epoca">`+
    `<div class="vignette"></div><div class="pnc-sea"></div>`+
    `<div class="kids" id="kids">👧🏻🧒🏻</div>`+
    `<div class="clue-bubble" id="clue"></div>`+
    S.spots.map((h,i)=>`<button class="hotspot" data-i="${i}" data-label="${h.label}" aria-label="Esplora ${h.label}" style="left:${h.x};top:${h.y}">${h.icon}</button>`).join('');
  body.prepend(st);
  const kids=st.querySelector('#kids'), clue=st.querySelector('#clue');
  clue.setAttribute('role','status');
  st.querySelectorAll('.hotspot').forEach((b,i)=>b.classList.toggle('found',roomState[cur].found.includes(i)));
  const help=document.createElement('p');help.className='explore-help';help.textContent='Tocca gli oggetti per raccogliere informazioni. Poi risolvi l’enigma qui sotto.';st.after(help);
  st.addEventListener('click',e=>{
    const r=st.getBoundingClientRect();
    const x=Math.min(88,Math.max(4,(e.clientX-r.left)/r.width*100));
    if(e.target.closest('.hotspot')) return;
    kids.style.left=x+'%';
  });
  st.querySelectorAll('.hotspot').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    const h=S.spots[+b.dataset.i];
    kids.style.left=Math.min(86,Math.max(4,((+h.x.replace('%',''))-6)))+'%';
    clue.innerHTML=h.text+`<div style="margin-top:8px"><button class="btn btn-paper" style="padding:6px 12px; font-size:13px" onclick="document.getElementById('clue').classList.remove('show')">Chiudi ✕</button></div>`;
    clue.classList.add('show');
    b.classList.add('found');
    const index=+b.dataset.i;if(!roomState[cur].found.includes(index))roomState[cur].found.push(index);
    if(h.item)addInv(h.item);saveGame();
  }));
}
let cineTimer=null,cineDone=null;
function endCine(){
  if(!cineDone)return;
  const done=cineDone;cineDone=null;clearTimeout(cineTimer);
  $('#cine').classList.remove('show');$('#cine').setAttribute('aria-hidden','true');done();
}
function playCine(i,cb){
  const c=$('#cine'),d=CINE[i];
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){cb();return;}
  $('#cineImg').src=d.img;$('#cineDay').textContent=d.day;$('#cineTitle').textContent=d.title;$('#cineSub').textContent=d.sub;
  c.classList.add('show');c.setAttribute('aria-hidden','false');cineDone=cb;cineTimer=setTimeout(endCine,2200);$('#skipCine').focus({preventScroll:true});
}
$('#skipCine').addEventListener('click',endCine);
const _render=render;
render=function(){_render();mountStage();};
function goRoom(index){
  if(transitioning||finished||index<0||index>=5)return;
  const first=solved.indexOf(false);if(first!==-1&&index>first)return;
  captureRoom();cur=index;render();saveGame();$('#lvlTitle').focus({preventScroll:true});$('#gioco').scrollIntoView({behavior:'smooth',block:'start'});
}
$('#btnNext').addEventListener('click',()=>{
  if(transitioning||finished||!solved[cur])return;
  if(cur===4){finish();return;}
  captureRoom();const next=cur+1;transitioning=true;updJourney();
  playCine(next,()=>{transitioning=false;goRoom(next);});
});
$('#btnBack').addEventListener('click',()=>goRoom(cur-1));
document.querySelectorAll('.j-step').forEach((b,i)=>b.addEventListener('click',()=>goRoom(i)));
$('#btnFS').addEventListener('click',()=>{
  const shell=document.querySelector('.game-shell');
  if(document.fullscreenElement){document.exitFullscreen();}
  else if(shell.requestFullscreen){shell.requestFullscreen().catch(()=>{$('#gameStatus').textContent='Schermo intero non disponibile. Puoi continuare nella pagina.';});}
  else{alert('Il tuo browser non supporta il tutto-schermo: usa F11!');}
});
document.addEventListener('fullscreenchange',()=>{
  $('#btnFS').textContent=document.fullscreenElement?'✕ Esci da tutto schermo':'⛶ Tutto schermo';
});

function captureRoom(){
  const state=roomState[cur];
  const input=$('#a'+(cur+1));
  if(input)state.answer=input.value.slice(0,30);
  if(cur===1)state.foods=[...document.querySelectorAll('.food.sel')].map(el=>el.dataset.id);
  if(cur===3)state.eyeOK=eyeOK;
  if(cur===4)state.words=[...sentArr];
}
function saveGame(){
  if(!storageAvailable)return;
  try{
    localStorage.setItem(SAVE_KEY,JSON.stringify({
      version:1,cur,score,hintsUsed,errors,solved,secs,elapsed,timerOn,deadline,
      finished,rooms:roomState,inventory:inv,team:$('#teamName').value.slice(0,60)
    }));
  }catch{
    storageAvailable=false;
    $('#gameStatus').textContent='Il salvataggio non è disponibile. Mantieni aperta questa pagina per conservare la partita.';
  }
}
function restoreGame(){
  try{
    const raw=localStorage.getItem(SAVE_KEY);if(!raw)return false;
    let saved;
    try{saved=JSON.parse(raw);}catch{return false;}
    if(!saved||typeof saved!=='object')return false;
    const integer=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
    if(saved.version!==1||!integer(saved.cur,0,4)||!integer(saved.score,0,1000)||
      !integer(saved.secs,0,2700)||!integer(saved.elapsed,0,2700)||saved.secs+saved.elapsed!==2700||
      !integer(saved.hintsUsed,0,10)||!integer(saved.errors,0,100000)||
      !Array.isArray(saved.solved)||saved.solved.length!==5||saved.solved.some(v=>typeof v!=='boolean')||
      !Array.isArray(saved.rooms)||saved.rooms.length!==5)return false;
    const first=saved.solved.indexOf(false);
    if(first!==-1&&(saved.solved.slice(first).some(Boolean)||saved.cur>first))return false;
    const foods=['pane','pasta','limpida','formaggio','uovo','rossa'];
    for(const r of saved.rooms){
      if(!r||!integer(r.hints,0,2)||!Array.isArray(r.found)||r.found.some(v=>!integer(v,0,2))||
        (r.answer!==undefined&&typeof r.answer!=='string')||
        (r.eyeOK!==undefined&&typeof r.eyeOK!=='boolean')||
        (r.foods!==undefined&&(!Array.isArray(r.foods)||r.foods.length>3||new Set(r.foods).size!==r.foods.length||r.foods.some(v=>!foods.includes(v))))||
        (r.words!==undefined&&(!Array.isArray(r.words)||r.words.length>8||new Set(r.words).size!==r.words.length||r.words.some(v=>!WORDS.includes(v)))))return false;
    }
    if(saved.rooms.reduce((sum,r)=>sum+r.hints,0)!==saved.hintsUsed)return false;
    cur=saved.cur;score=saved.score;hintsUsed=saved.hintsUsed;errors=saved.errors;
    solved=saved.solved;secs=saved.secs;elapsed=saved.elapsed;roomState=saved.rooms;
    finished=saved.finished===true&&solved.every(Boolean);
    $('#teamName').value=typeof saved.team==='string'?saved.team.slice(0,60):'';
    const allowed=SCENES.flatMap(scene=>scene.spots.map(spot=>spot.item)).filter(Boolean);
    if(Array.isArray(saved.inventory))saved.inventory.filter(item=>allowed.includes(item)).forEach(item=>addInv(item));
    if(saved.timerOn===true&&!finished&&secs>0&&Number.isFinite(saved.deadline)&&saved.deadline<=Date.now()+2700000){
      timerOn=true;deadline=saved.deadline;syncTimer();
      if(timerOn)timerId=setInterval(syncTimer,250);
    }
    return true;
  }catch{storageAvailable=false;return false;}
}
$('#lvlBody').addEventListener('input',()=>{captureRoom();saveGame();});
$('#lvlBody').addEventListener('keydown',event=>{
  if(event.key!=='Enter'||event.isComposing||event.target.tagName!=='INPUT')return;
  const check=[check1,check2,check3,check4,check5][cur];event.preventDefault();check();
});
$('#teamName').addEventListener('input',saveGame);
$('#btnReset').addEventListener('click',()=>{
  if(!confirm('Iniziare una nuova partita? I progressi di questa squadra verranno azzerati.'))return;
  clearInterval(timerId);clearTimeout(cineTimer);cineDone=null;transitioning=false;
  $('#cine').classList.remove('show');$('#cine').setAttribute('aria-hidden','true');
  cur=0;score=1000;hintsUsed=0;errors=0;solved=Array(5).fill(false);
  secs=2700;elapsed=0;timerOn=false;deadline=null;finished=false;eyeOK=false;sentArr=[];
  roomState=Array.from({length:5},()=>({hints:0,found:[]}));inv.length=0;
  $('#teamName').value='';$('#invItems').innerHTML='<i>Esplora gli oggetti nelle scene…</i>';
  $('#finale').style.display='none';
  render();updScore();updateTimerUI();saveGame();
  $('#gameStatus').textContent='Nuova partita pronta. Avvia il timer quando la squadra è pronta.';
  $('#lvlTitle').focus({preventScroll:true});
});
document.addEventListener('visibilitychange',()=>{syncTimer();captureRoom();saveGame();});
window.addEventListener('pagehide',()=>{syncTimer();captureRoom();saveGame();});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&cineDone){event.preventDefault();endCine();}
});
// Keep the transition inside the fullscreen game element.
$('#gioco').appendChild($('#cine'));
const restored=restoreGame();
updScore();render();updateTimerUI();
if(restored)$('#gameStatus').textContent=finished?'Viaggio completato. Il diploma è pronto.':secs===0?'Partita recuperata. Tempo scaduto: potete continuare gli enigmi.':timerOn?'Partita recuperata. Il timer è in corso.':'Partita recuperata. Riprendi il timer quando la squadra è pronta.';
if(!storageAvailable)$('#gameStatus').textContent='Il salvataggio non è disponibile in questo browser. Mantieni aperta questa pagina per conservare la partita.';
if(finished)showDiploma();
saveGame();
