function addPhoto(category) {
  const input = document.getElementById("fileInput");
  input.onchange = e => loadImage(e, category);
  input.click();
}

function loadImage(event, category) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    const img = document.createElement("img");
    img.src = e.target.result;
    document.getElementById(category).appendChild(img);
  };
  reader.readAsDataURL(file);
}

function addAchievement() {
  const input = document.getElementById("achievementInput");
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const img = document.createElement("img");
      img.src = ev.target.result;
      document.getElementById("achievementGrid").appendChild(img);
    };
    reader.readAsDataURL(file);
  };
  input.click();
}
