const params = new URLSearchParams(window.location.search);
const formTitle = document.getElementById("form-title");
const form = document.getElementById("form-producto");

let modoEditar = false;
if (params.get("modo") === "editar") {
  formTitle.textContent = "Editar producto";
  modoEditar = true;
}

form.addEventListener("submit", function(e) {
  e.preventDefault();
  if (modoEditar) {
    alert("Producto actualizado correctamente.");
  } else {
    alert("Producto creado correctamente.");
  }
  window.location.href = "producto-crud.html";
});