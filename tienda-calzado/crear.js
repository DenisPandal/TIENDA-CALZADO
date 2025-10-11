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

const selectCat = document.getElementById("categoria");
const btnNuevaCat = document.getElementById("btn-nueva-cat");
const btnEditarCat = document.getElementById("btn-editar-cat");
const btnEliminarCat = document.getElementById("btn-eliminar-cat");

let categorias = ["Running", "Casual", "Formal", "Trekking"];

function actualizarSelect() {
  selectCat.innerHTML = ""; 
  for (let i = 0; i < categorias.length; i++) {
    let opcion = document.createElement("option");
    opcion.text = categorias[i];
    selectCat.add(opcion);
  }
}
actualizarSelect();

btnNuevaCat.onclick = function() {
  let nueva = prompt("Ingrese el nombre de la nueva categoría:");
  if (nueva && nueva.trim() !== "") {
    categorias.push(nueva.trim());
    actualizarSelect();
    alert("Categoría agregada correctamente.");
  } else {
    alert("Debe escribir un nombre válido.");
  }
};

btnEditarCat.onclick = function() {
  let actual = selectCat.value;
  if (!actual) {
    alert("Seleccione una categoría primero.");
    return;
  }
  let nuevo = prompt("Nuevo nombre para la categoría:", actual);
  if (nuevo && nuevo.trim() !== "") {
    for (let i = 0; i < categorias.length; i++) {
      if (categorias[i] === actual) {
        categorias[i] = nuevo.trim();
      }
    }
    actualizarSelect();
    alert("Categoría modificada correctamente.");
  } else {
    alert("Debe escribir un nombre válido.");
  }
};

btnEliminarCat.onclick = function() {
  let seleccion = selectCat.value;
  if (!seleccion) {
    alert("Seleccione una categoría para eliminar.");
    return;
  }
  let confirmar = confirm("¿Seguro que desea eliminar la categoría '" + seleccion + "'?");
  if (confirmar) {
    let nuevas = [];
    for (let i = 0; i < categorias.length; i++) {
      if (categorias[i] !== seleccion) {
        nuevas.push(categorias[i]);
      }
    }
    categorias = nuevas;
    actualizarSelect();
    alert("Categoría eliminada correctamente.");
  }
};
