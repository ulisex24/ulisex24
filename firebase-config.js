/* firebase-config.js
  Archivo de apoyo para conectar con Firebase Realtime Database.
  INSTRUCCIONES RÁPIDAS:
  1) Crea un proyecto en https://console.firebase.google.com/
  2) Activa Realtime Database y pon reglas públicas solo para pruebas:
     {
       "rules": {
         ".read": true,
         ".write": true
       }
     }
  3) Copia el "Database URL" (p. ej. https://mi-proyecto-default-rtdb.firebaseio.com)
  4) (Opcional) si usas autenticación, añade tokens. Para la REST API básica no necesitas auth si reglas permiten escritura.
  5) Rellena DATABASE_URL abajo.
  6) Sube este archivo al mismo repositorio.

  NOTA: Dejar reglas públicas es inseguro. Usa esto solo para pruebas.
*/

const FIREBASE_CONFIG = {
  // Ejemplo:
  // databaseURL: "https://mi-proyecto-default-rtdb.firebaseio.com"
  databaseURL: "REEMPLAZA_CON_TU_DATABASE_URL"
};

// Funciones usadas por app.js cuando mode === 'firebase'
async function sendMessageFirebase(username, message) {
  if (!FIREBASE_CONFIG.databaseURL) throw new Error('databaseURL no configurada');
  const url = FIREBASE_CONFIG.databaseURL.replace(/\/$/,'') + '/messages/' + encodeURIComponent(username) + '.json';
  const payload = { message, ts: Date.now() };
  const res = await fetch(url, { method:'POST', body: JSON.stringify(payload), headers: {'Content-Type':'application/json'} });
  if (!res.ok) throw new Error('Error enviando a Firebase: ' + res.status);
  return res.json();
}

async function fetchMessagesFirebase(username) {
  if (!FIREBASE_CONFIG.databaseURL) throw new Error('databaseURL no configurada');
  const url = FIREBASE_CONFIG.databaseURL.replace(/\/$/,'') + '/messages/' + encodeURIComponent(username) + '.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error leyendo mensajes: ' + res.status);
  const data = await res.json();
  // Firebase returns object keyed by push id; convert to array
  if (!data) return [];
  return Object.values(data);
}
