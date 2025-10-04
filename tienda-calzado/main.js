const btn = document.getElementById("toggle-theme");
const root = document.documentElement; // referencia a <html>

btn.addEventListener("click", () => {
  root.classList.toggle("night");

  const img = btn.querySelector("img");
  if (root.classList.contains("night")) {
    img.src = "imagenes/logosol.png"; 
  } else {
    img.src = "imagenes/logoluna.png"; 
  }
});
