import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";

/* 🔐 LOGIN */
window.checkPassword = function () {
  const pass = document.getElementById("password").value;
  if (pass === "NEWWOMAN") {
    document.getElementById("login").style.display = "none";
    document.getElementById("content").style.display = "block";
  } else {
    alert("Contraseña incorrecta :P");
  }
};

/* 🔥 FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyBzcxSPLO6oqeY2_nbzemFhEjNEDLBbsJs",
  authDomain: "vision-board-2026-2d04e.firebaseapp.com",
  projectId: "vision-board-2026-2d04e",
  storageBucket: "vision-board-2026-2d04e.firebasestorage.app",
  messagingSenderId: "737892135160",
  appId: "1:737892135160:web:80d08fff34f3f9be850b0d"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

let currentCategory = "";

/* 📂 SUBIR */
window.selectCategory = function (category) {
  currentCategory = category;
  document.getElementById("fileInput").click();
};

document.getElementById("fileInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const path = `${currentCategory}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  addImage(currentCategory, url, path);
  e.target.value = "";
});

/* 🖼️ MOSTRAR */
function addImage(category, url, path) {
  const card = document.createElement("div");
  card.className = "photo-card";

  const img = document.createElement("img");
  img.src = url;

  const del = document.createElement("button");
  del.innerText = "✖";
  del.className = "delete-btn";
  del.onclick = async () => {
    await deleteObject(ref(storage, path));
    card.remove();
  };

  card.appendChild(img);
  card.appendChild(del);
  document.getElementById(category).appendChild(card);
}

/* 🔁 CARGAR TODO */
async function load(category) {
  const listRef = ref(storage, category);
  const res = await listAll(listRef);

  for (const item of res.items) {
    const url = await getDownloadURL(item);
    addImage(category, url, item.fullPath);
  }
}

["academic", "moments", "wannaget", "habits"].forEach(load);

/* 💖 EFECTOS */
setInterval(() => {
  const el = document.createElement("div");
  el.className = "heart";
  el.innerText = Math.random() > 0.5 ? "💖" : "✨";
  el.style.left = Math.random() * 100 + "vw";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}, 800);

