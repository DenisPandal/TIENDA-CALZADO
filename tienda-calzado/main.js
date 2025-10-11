const btn = document.getElementById("toggle-theme");
const root = document.documentElement;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'night') {
  root.classList.add('night');
  const img = btn.querySelector("img");
  img.src = "imagenes/logosol.png";
}

btn.addEventListener("click", () => {
  root.classList.toggle("night");

  const img = btn.querySelector("img");
  const isNight = root.classList.contains("night");

  if (isNight) {
    img.src = "imagenes/logosol.png";
    localStorage.setItem('theme', 'night');
  } else {
    img.src = "imagenes/logoluna.png";
    localStorage.setItem('theme', 'light');
  }
});
