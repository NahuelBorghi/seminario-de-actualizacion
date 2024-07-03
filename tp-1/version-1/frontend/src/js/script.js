const contactosTable = document
    .getElementById("tablaContactos")
    .getElementsByTagName("tbody")[0];
const formularioContacto = document.getElementById("formularioContacto");
const agregarTelefonoBtn = document.getElementById("agregarTelefono");
const contenedorTelefonos = document.getElementById("contenedorTelefonos");

function displayContacts(data) {
    contactosTable.innerHTML = "";
    console.log(data);
    data.forEach((obj) => {
        const tableRow = document.createElement("tr");
        const phoneNumbersHTML = obj.phones
            .map((phone) => `<span>${phone.number}</span>`)
            .join(", ");
        tableRow.innerHTML = `
      <td>${obj.contact.id}</td>
      <td>${obj.contact.name}</td>
      <td>${phoneNumbersHTML}</td>
      <td>
        <button data-contacto-id="${obj.contact.id}">Editar</button>
        <button data-contacto-id="${obj.contact.id}">Eliminar</button>
      </td>
    `;
        contactosTable.appendChild(tableRow);
    });
}

fetch("http://localhost:8080/api/contacts")
    .then((response) => {
        if (response.ok) {
            return response.text().then((text) => JSON.parse(text));
        } else {
            return Promise.reject(
                new Error(`HTTP error! Status: ${response.status}`)
            );
        }
    })
    .then((data) => {
        displayContacts(data);
    })
    .catch((error) => {
        console.error("Error fetching contacts:", error);
        alert(
            "An error occurred while fetching contacts. Please try again later."
        );
    });

function addTelefonoInput() {
    const telefonoDiv = document.createElement("div");
    telefonoDiv.className = "telefono";
    telefonoDiv.innerHTML = `
    <label for="telefono">Número:</label>
    <input type="number" id="telefono" name="telefono" required>
    <button type="button" class="eliminarTelefono">Eliminar Teléfono</button>
  `;
    contenedorTelefonos.appendChild(telefonoDiv);
}

agregarTelefonoBtn.addEventListener("click", addTelefonoInput);
//crear contacto
formularioContacto.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const telefonos = [];

    for (const pair of formData.entries()) {
        if (pair[0].startsWith("telefono")) {
            telefonos.push(pair[1]);
        }
    }

    const contacto = {
        nombre: formData.get("nombre"),
        telefonos: telefonos,
    };

    fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto),
    })
        .then((response) => response.json())
        .then((data) => {
            this.reset();
            contenedorTelefonos.innerHTML = ""; 
            fetch("http://localhost:8080/api/contacts")
                .then((response) => response.json())
                .then((data) => displayContacts(data));
        })
        .catch((error) => console.error(error));
});

contactosTable.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        const contactoId = event.target.dataset.contactoId;

        if (event.target.textContent === "Editar") {
            console.log(`Edit contact with ID: ${contactoId}`);
        } else if (event.target.textContent === "Eliminar") {
            console.log(`Delete contact with ID: ${contactoId}`);
        }
    }
});

contenedorTelefonos.addEventListener("click", function (event) {
    if (event.target.className === "eliminarTelefono") {
        event.target.parentNode.remove();
    }
});
//borrar contacto
function eliminarContacto(contactoId) {
    fetch(`http://localhost:8080/api/contact/${contactoId}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.ok) {
                console.log(
                    `Contacto con ID ${contactoId} eliminado correctamente.`
                );
                fetch("http://localhost:8080/api/contacts")
                    .then((response) => response.json())
                    .then((data) => displayContacts(data));
            } else {
                console.error(`Error al eliminar contacto: ${response.status}`);
                alert(
                    "An error occurred while deleting the contact. Please try again later."
                );
            }
        })
        .catch((error) => console.error(error));
}

contactosTable.addEventListener("click", function (event) {
  if (event.target.tagName === "BUTTON") {
      const contactId = event.target.dataset.contactoId;
    if (event.target.textContent === "Editar") {
      console.log(`Edit contact with ID: ${contactId}`);
    } else if (event.target.textContent === "Eliminar") {
      if (confirm(`¿Estás seguro de que quieres eliminar el contacto con ID ${contactId}?`)) {
        eliminarContacto(contactId);
      }
    }
  }
});
//editar contacto