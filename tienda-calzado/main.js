const btn = document.getElementById("toggle-theme");
const root = document.documentElement;

if (localStorage.getItem("theme")==="night") {
  root.classList.add("night");
}

btn.addEventListener("click", () => {
  root.classList.toggle("night");

  const img = btn.querySelector("img");
  if (root.classList.contains("night")) {
    img.src = "imagenes/logosol.png";
    localStorage.setItem("theme", "night"); 
  } else {
    img.src = "imagenes/logoluna.png";
    localStorage.setItem("theme", "day"); 
  }
});
