const contactosTable = document.getElementById("tablaContactos").getElementsByTagName("tbody")[0];
const formularioContacto = document.getElementById("formularioContacto");
const agregarTelefonoBtn = document.getElementById("agregarTelefono");
const contenedorTelefonos = document.getElementById("contenedorTelefonos");

// Function to display contacts in the table
function displayContacts(data) {
    contactosTable.innerHTML = ""; // limpia el contenido de la tabla
    data.forEach((contacto) => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `
        <td>${contacto.id}</td>
        <td>${contacto.nombre}</td>
        <td>${contacto.telefonos.join(", ")}</td>
        <td>
            <button data-contacto-id="${contacto.id}">Editar</button>
            <button data-contacto-id="${contacto.id}">Eliminar</button>
        </td>
        `;
        contactosTable.appendChild(tableRow);
    });
}

// Fetch contacts on page load
fetch("http://localhost:8080/api/contacts")
    .then((response) => {
        if (response.ok) {
            // Try parsing the response as JSON
            return response.text().then((text) => JSON.parse(text));
        } else {
            // Handle non-OK responses (e.g., network error, server error)
            return Promise.reject(
                new Error(`HTTP error! Status: ${response.status}`)
            );
        }
    })
    .then((data) => {
        // Process the parsed JSON data (assuming successful parsing)
        displayContacts(data);
    })
    .catch((error) => {
        console.error("Error fetching contacts:", error);
        // Display an error message to the user (optional)
        alert(
            "An error occurred while fetching contacts. Please try again later."
        );
    });

// Function to add a new phone number input field
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

// Add click event listener to "Agregar Teléfono" button
agregarTelefonoBtn.addEventListener("click", addTelefonoInput);

// Handle form submission for creating a new contact
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
        telefonos,
    };

    fetch("http://localhost:8080/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto),
    })
        .then((response) => response.json())
        .then((data) => {
            // Clear form and display updated contacts
            this.reset();
            contenedorTelefonos.innerHTML = ""; // Reset phone number fields
            fetch("http://localhost:8080/api/contacts")
                .then((response) => response.json())
                .then((data) => displayContacts(data));
        })
        .catch((error) => console.error(error));
});

// Handle table button clicks for editing and deleting contacts (basic implementation)
contactosTable.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        const contactoId = event.target.dataset.contactoId;

        if (event.target.textContent === "Editar") {
            // Implement logic to pre-fill form with contact details for editing
            console.log(`Edit contact with ID: ${contactoId}`);
        } else if (event.target.textContent === "Eliminar") {
            // Implement logic to delete the contact
            console.log(`Delete contact with ID: ${contactoId}`);
        }
    }
});

// Implement logic for "Eliminar Teléfono" buttons within phone number fields (optional)
contenedorTelefonos.addEventListener("click", function (event) {
    if (event.target.className === "eliminarTelefono") {
        // Remove the phone number input field from the DOM
        event.target.parentNode.remove();
    }
});
