document.addEventListener("DOMContentLoaded", function () {
    loadRoles();
    loadUsers();
    loadRoleActions();
});

//------------------------------------roles
document.getElementById("crearRolForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const roleName = document.getElementById("nombreRol").value;
    createRole(roleName);
});

document.getElementById("editarRolForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("editarIdRol").value;
    const roleName = document.getElementById("editarNombreRol").value;
    updateRole(id, roleName);
});

document.getElementById("eliminarRolForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const Roles_id = document.getElementById("eliminarIdRol").value;
    deleteRole(Roles_id);
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const userName = document.getElementById("userName").value;
    const password = document.getElementById("password").value;
    login(userName, password);
});

document.getElementById("logoutButton").addEventListener("click", function () {
    logout();
});

function login(userName, password) {
    fetch("http://localhost:8080/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Inicio de sesión exitoso.");
                document.getElementById("loginForm").reset();
                document.getElementById("loginError").textContent = "";
                loadRoles();
                loadUsers();
                loadRoleActions();
            } else {
                throw new Error("Error al iniciar sesión.");
            }
        })
        .catch((error) => {
            console.error("Error al iniciar sesión:", error);
            document.getElementById("loginError").textContent = "Usuario o contraseña incorrectos.";
        });
}

function logout() {
    fetch("http://localhost:8080/user/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Cierre de sesión exitoso.");
                loadRoles();
                loadUsers();
                loadRoleActions();
            } else {
                throw new Error("Error al cerrar sesión.");
            }
        })
        .catch((error) => console.error("Error al cerrar sesión:", error));
}

function updateRoleForm(id, roleName) {
    document.getElementById("editarIdRol").value = id;
    document.getElementById("editarNombreRol").value = roleName;
}

function deleteRoleForm(Roles_id) {
    document.getElementById("eliminarIdRol").value = Roles_id;
}

function loadRoles() {
    fetch("http://localhost:8080/roles/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then(response => response.json())
        .then(({roles}) => {
        const roleList = document.getElementById("roles-lista");
        roleList.innerHTML = "";
        roles.forEach(role => {
            const listItem = document.createElement("div");
            listItem.textContent = role.roleName;

            const updateButton = document.createElement("button");
            updateButton.textContent = "Editar";
            updateButton.addEventListener("click", function() {
                updateRoleForm(role.id, role.roleName);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", function() {
                deleteRoleForm(role.id);
            });

            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);

            roleList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error al cargar los roles:", error));
}

function createRole(roleName) {
    fetch("http://localhost:8080/roles/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ roleName: roleName }),
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Rol creado exitosamente.");
                loadRoles();
            } else {
                throw new Error("Error al crear el rol.");
            }
        })
        .catch((error) => console.error("Error al crear el rol:", error));
}

function updateRole(id, roleName) {
    fetch(`http://localhost:8080/roles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ roleName: roleName }),
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Rol actualizado exitosamente.");
                loadRoles();
            } else {
                throw new Error("Error al actualizar el rol.");
            }
        })
        .catch((error) => console.error("Error al actualizar el rol:", error));
}

function deleteRole(Roles_id) {
    fetch(`http://localhost:8080/roles/${Roles_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Rol eliminado exitosamente.");
                loadRoles();
            } else {
                throw new Error("Error al eliminar el rol.");
            }
        })
        .catch((error) => console.error("Error al eliminar el rol:", error));
}



//----------------------------------users
document.getElementById("crearUsuarioForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const userName = document.getElementById("nombreUsuario").value;
    const password = document.getElementById("passwordUsuario").value;
    const email = document.getElementById("emailUsuario").value;
    const state = document.getElementById("estadoUsuario").value;
    const userRole = document.getElementById("rolUsuario").value;
    createUser(userName, password, email, state, userRole);
});

document.getElementById("editarUsuarioForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("editarIdUsuario").value;
    const userName = document.getElementById("editarNombreUsuario").value;
    const password = document.getElementById("editarPasswordUsuario").value;
    const email = document.getElementById("editarEmailUsuario").value;
    const state = document.getElementById("editarEstadoUsuario").value;
    const userRole = document.getElementById("editarRolUsuario").value;
    updateUser(id, userName, password, email, state, userRole);
});

document.getElementById("eliminarUsuarioForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("eliminarIdUsuario").value;
    deleteUser(id);
});

function updateUserForm(id, userName, userRole) {
    document.getElementById("editarIdUsuario").value = id;
    document.getElementById("editarNombreUsuario").value = userName;
    document.getElementById("editarRolUsuario").value = userRole;
}

function deleteUserForm(id) {
    document.getElementById("eliminarIdUsuario").value = id;
}

function loadUsers() {
    fetch("http://localhost:8080/user/allUsers", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Permite el envío y recepción de cookies
    })
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById("usuarios-lista");
        userList.innerHTML = "";
        users.forEach(user => {
            const listItem = document.createElement("div");
            listItem.textContent = user.userName;

            const updateButton = document.createElement("button");
            updateButton.textContent = "Editar";
            updateButton.addEventListener("click", function() {
                updateUserForm(user.id, user.userName, user.Roles_id);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", function() {
                deleteUserForm(user.id);
            });

            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);

            userList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error al cargar los usuarios:", error));
}

function createUser(userName, password, email, state, userRole) {
    fetch("http://localhost:8080/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName,
            password,
            email,
            state,
            Roles_id: userRole,
        }),
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Usuario creado exitosamente.");
                loadUsers();
            } else {
                throw new Error("Error al crear el usuario.");
            }
        })
        .catch((error) => console.error("Error al crear el usuario:", error));
}

function updateUser(id, userName, password, email, state, userRole) {
    fetch(`http://localhost:8080/user/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userName,
            password,
            email,
            state,
            Roles_id: userRole,
        }),
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Usuario actualizado exitosamente.");
                loadUsers();
            } else {
                throw new Error("Error al actualizar el usuario.");
            }
        })
        .catch((error) =>
            console.error("Error al actualizar el usuario:", error)
        );
}

function deleteUser(id) {
    fetch(`http://localhost:8080/users/${id}`, {
        method: "DELETE",
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Usuario eliminado exitosamente.");
                loadUsers();
            } else {
                throw new Error("Error al eliminar el usuario.");
            }
        })
        .catch((error) =>
            console.error("Error al eliminar el usuario:", error)
        );
}


//----------------------------------acciones por rol
document.getElementById("crearAccionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const actionName = document.getElementById("nombreAccion").value;
    const Roles_id = document.getElementById("rolAccion").value;
    createRoleAction(actionName, Roles_id);
});

document.getElementById("editarAccionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("editarIdAccion").value;
    const actionName = document.getElementById("editarNombreAccion").value;
    const Roles_id = document.getElementById("editarRolAccion").value;
    updateRoleAction(id, actionName, Roles_id);
});

document.getElementById("eliminarAccionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("eliminarIdAccion").value;
    deleteRoleAction(id);
});

function updateActionForm(id, actionName, Roles_id) {
    document.getElementById("editarIdAccion").value = id;
    document.getElementById("editarNombreAccion").value = actionName;
    document.getElementById("editarRolAccion").value = Roles_id;
}

function deleteActionForm(id) {
    document.getElementById("eliminarIdAccion").value = id;
}

function loadRoleActions() {
    fetch("http://localhost:8080/actions/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => response.json())
        .then(({roleActions}) => {
            const actionList = document.getElementById("acciones-lista");
            actionList.innerHTML = "";
            roleActions.forEach((action) => {
                const listItem = document.createElement("div");
                listItem.textContent = action.actionName;

                const updateButton = document.createElement("button");
                updateButton.textContent = "Editar";
                updateButton.addEventListener("click", function () {
                    updateActionForm(
                        action.id,
                        action.actionName,
                        action.Roles_id
                    );
                });

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", function () {
                    deleteActionForm(action.id);
                });

                listItem.appendChild(updateButton);
                listItem.appendChild(deleteButton);

                actionList.appendChild(listItem);
            });
        })
        .catch((error) =>
            console.error("Error al cargar las acciones por rol:", error)
        );
}

function createRoleAction(actionName, Roles_id) {
    fetch("http://localhost:8080/actions/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ actionName: actionName, Roles_id: Roles_id }),
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Acción por rol creada exitosamente.");
                loadRoleActions();
            } else {
                throw new Error("Error al crear la acción por rol.");
            }
        })
        .catch((error) =>
            console.error("Error al crear la acción por rol:", error)
        );
}

function updateRoleAction(id, actionName, Roles_id) {
    fetch(`http://localhost:8080/actions/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ actionName: actionName, Roles_id: Roles_id }),
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Acción por rol actualizada exitosamente.");
                loadRoleActions();
            } else {
                throw new Error("Error al actualizar la acción por rol.");
            }
        })
        .catch((error) =>
            console.error("Error al actualizar la acción por rol:", error)
        );
}

function deleteRoleAction(id) {
    fetch(`http://localhost:8080/roleActions/${id}`, {
        method: "DELETE",
        credentials: "include", // Permite el envío y recepción de cookies
    })
        .then((response) => {
            if (response.ok) {
                console.log("Acción por rol eliminada exitosamente.");
                loadRoleActions();
            } else {
                throw new Error("Error al eliminar la acción por rol.");
            }
        })
        .catch((error) =>
            console.error("Error al eliminar la acción por rol:", error)
        );
}
