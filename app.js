// app.js - Maneja envío y lectura de mensajes
// Modo por defecto: 'local' (LocalStorage). Para usar Firebase: configura firebase-config.js y cambia mode='firebase'.
const mode = 'local'; // Cambia a 'firebase' tras configurar
const localPrefix = 'ngl_messages_v1_';

// helpers
function getUsernameFromPath() {
  // example: /juan or /folder/juan -> take last non-empty segment
  const parts = location.pathname.split('/').filter(Boolean);
  return parts.length ? parts[parts.length-1] : 'invitado';
}

function showToast(text) {
  alert(text);
}

// LocalStorage functions
function saveLocal(username, message) {
  const key = localPrefix + username;
  const arr = JSON.parse(localStorage.getItem(key) || '[]');
  arr.push({message, ts: Date.now()});
  localStorage.setItem(key, JSON.stringify(arr));
}

function loadLocal(username) {
  const key = localPrefix + username;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

// DOM actions for index.html
if (document.getElementById('sendBtn')) {
  const username = getUsernameFromPath();
  document.getElementById('username-display').textContent = username;

  document.getElementById('sendBtn').addEventListener('click', () => {
    const txt = document.getElementById('message').value.trim();
    if (!txt) return showToast('Escribe un mensaje primero.');
    if (mode === 'local') {
      saveLocal(username, txt);
      document.getElementById('message').value = '';
      showToast('Mensaje enviado (demo local).');
    } else {
      // firebase mode - this requires firebase-config.js properly configured
      if (typeof sendMessageFirebase !== 'function') {
        showToast('Firebase no está configurado. Revisa firebase-config.js');
        return;
      }
      sendMessageFirebase(username, txt)
        .then(()=> {
          document.getElementById('message').value = '';
          showToast('Mensaje enviado (Firebase).');
        })
        .catch(err=>{
          console.error(err);
          showToast('Error enviando mensaje. Mira la consola.');
        });
    }
  });

  document.getElementById('copyLinkBtn').addEventListener('click', async ()=>{
    const url = location.origin + '/' + username;
    try {
      await navigator.clipboard.writeText(url);
      showToast('Link copiado: ' + url);
    } catch (e) {
      showToast('No se pudo copiar. Selecciona y copia manualmente: ' + url);
    }
  });
}

// DOM actions for admin.html
if (document.getElementById('loadBtn')) {
  document.getElementById('loadBtn').addEventListener('click', async ()=>{
    const name = document.getElementById('boxName').value.trim();
    if (!name) return showToast('Escribe un nombre de buzón.');
    const container = document.getElementById('messages');
    container.innerHTML = '<p>Cargando...</p>';
    if (mode === 'local') {
      const arr = loadLocal(name);
      if (!arr.length) container.innerHTML = '<p>No hay mensajes (modo local).</p>';
      else {
        container.innerHTML = '';
        arr.slice().reverse().forEach(it=>{
          const d = new Date(it.ts);
          const node = document.createElement('div');
          node.className = 'msg';
          node.innerHTML = '<div class="meta">Enviado: '+d.toLocaleString()+'</div><div>'+escapeHtml(it.message)+'</div>';
          container.appendChild(node);
        });
      }
    } else {
      if (typeof fetchMessagesFirebase !== 'function') {
        showToast('Firebase no está configurado. Revisa firebase-config.js');
        container.innerHTML = '';
        return;
      }
      try {
        const msgs = await fetchMessagesFirebase(name);
        container.innerHTML = '';
        if (!msgs || msgs.length===0) container.innerHTML = '<p>No hay mensajes (Firebase).</p>';
        else {
          msgs.reverse().forEach(it=>{
            const d = it.ts ? new Date(it.ts) : new Date();
            const node = document.createElement('div');
            node.className = 'msg';
            node.innerHTML = '<div class="meta">Enviado: '+d.toLocaleString()+'</div><div>'+escapeHtml(it.message)+'</div>';
            container.appendChild(node);
          });
        }
      } catch(e){
        console.error(e);
        container.innerHTML = '<p>Error al cargar mensajes. Mira la consola.</p>';
      }
    }
  });
}

// small util
function escapeHtml(s){ return (''+s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
