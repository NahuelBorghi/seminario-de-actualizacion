document.addEventListener("DOMContentLoaded", function () {
    loadRoles();
    loadUsers();
});

//------------------------------------roles
document.getElementById("crearRolForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const roleName = document.getElementById("nombreRol").value;
    createRole(roleName);
});

document.getElementById("editarRolForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const roleId = document.getElementById("editarIdRol").value;
    const roleName = document.getElementById("editarNombreRol").value;
    updateRole(roleId, roleName);
});

document.getElementById("eliminarRolForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const roleId = document.getElementById("eliminarIdRol").value;
    deleteRole(roleId);
});

function updateRoleForm(roleId, roleName) {
    document.getElementById("editarIdRol").value = roleId;
    document.getElementById("editarNombreRol").value = roleName;
}

function deleteRoleForm(roleId) {
    document.getElementById("eliminarIdRol").value = roleId;
}

function loadRoles() {
    fetch("http://localhost:8080/AccountList/roles")
    .then(response => response.json())
    .then(roles => {
        const roleList = document.getElementById("roles-lista");
        roleList.innerHTML = "";
        roles.forEach(role => {
            const listItem = document.createElement("div");
            listItem.textContent = role.rolename;

            const updateButton = document.createElement("button");
            updateButton.textContent = "Editar";
            updateButton.addEventListener("click", function() {
                updateRoleForm(role.ID, role.rolename);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", function() {
                deleteRoleForm(role.ID);
            });

            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);

            roleList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error al cargar los roles:", error));
}

function createRole(roleName) {
    fetch("http://localhost:8080/AccountList/roles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ rolename: roleName })
    })
    .then(response => {
        if (response.ok) {
            console.log("Rol creado exitosamente.");
            loadRoles();
        } else {
            throw new Error("Error al crear el rol.");
        }
    })
    .catch(error => console.error("Error al crear el rol:", error));
}

function updateRole(roleId, roleName) {
    fetch(`http://localhost:8080/AccountList/roles/${roleId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ rolename: roleName })
    })
    .then(response => {
        if (response.ok) {
            console.log("Rol actualizado exitosamente.");
            loadRoles();
        } else {
            throw new Error("Error al actualizar el rol.");
        }
    })
    .catch(error => console.error("Error al actualizar el rol:", error));
}

function deleteRole(roleId) {
    fetch(`http://localhost:8080/AccountList/roles/${roleId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            console.log("Rol eliminado exitosamente.");
            loadRoles();
        } else {
            throw new Error("Error al eliminar el rol.");
        }
    })
    .catch(error => console.error("Error al eliminar el rol:", error));
}



//----------------------------------users
document.getElementById("crearUsuarioForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const userName = document.getElementById("nombreUsuario").value;
    const userRole = document.getElementById("rolUsuario").value;
    createUser(userName, userRole);
});

document.getElementById("editarUsuarioForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const userId = document.getElementById("editarIdUsuario").value;
    const userName = document.getElementById("editarNombreUsuario").value;
    const userRole = document.getElementById("editarRolUsuario").value;
    updateUser(userId, userName, userRole);
});

document.getElementById("eliminarUsuarioForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const userId = document.getElementById("eliminarIdUsuario").value;
    deleteUser(userId);
});

function updateUserForm(userId, userName, userRole) {
    document.getElementById("editarIdUsuario").value = userId;
    document.getElementById("editarNombreUsuario").value = userName;
    document.getElementById("editarRolUsuario").value = userRole;
}

function deleteUserForm(userId) {
    document.getElementById("eliminarIdUsuario").value = userId;
}

function loadUsers() {
    fetch("http://localhost:8080/AccountList/users")
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById("usuarios-lista");
        userList.innerHTML = "";
        users.forEach(user => {
            const listItem = document.createElement("div");
            listItem.textContent = user.username;

            const updateButton = document.createElement("button");
            updateButton.textContent = "Editar";
            updateButton.addEventListener("click", function() {
                updateUserForm(user.ID, user.username, user.roleID);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", function() {
                deleteUserForm(user.ID);
            });

            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);

            userList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error al cargar los usuarios:", error));
}

function createUser(userName, userRole) {
    fetch("http://localhost:8080/AccountList/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: userName, roleID: userRole })
    })
    .then(response => {
        if (response.ok) {
            console.log("Usuario creado exitosamente.");
            loadUsers();
        } else {
            throw new Error("Error al crear el usuario.");
        }
    })
    .catch(error => console.error("Error al crear el usuario:", error));
}

function updateUser(userId, userName, userRole) {
    fetch(`http://localhost:8080/AccountList/users/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username: userName, roleID: userRole })
    })
    .then(response => {
        if (response.ok) {
            console.log("Usuario actualizado exitosamente.");
            loadUsers();
        } else {
            throw new Error("Error al actualizar el usuario.");
        }
    })
    .catch(error => console.error("Error al actualizar el usuario:", error));
}

function deleteUser(userId) {
    fetch(`http://localhost:8080/AccountList/users/${userId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            console.log("Usuario eliminado exitosamente.");
            loadUsers();
        } else {
            throw new Error("Error al eliminar el usuario.");
        }
    })
    .catch(error => console.error("Error al eliminar el usuario:", error));
}


//----------------------------------acciones por rol
document.getElementById("crearAccionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const actionName = document.getElementById("nombreAccion").value;
    const roleId = document.getElementById("rolAccion").value;
    createRoleAction(actionName, roleId);
});

document.getElementById("editarAccionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const actionId = document.getElementById("editarIdAccion").value;
    const actionName = document.getElementById("editarNombreAccion").value;
    const roleId = document.getElementById("editarRolAccion").value;
    updateRoleAction(actionId, actionName, roleId);
});

document.getElementById("eliminarAccionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const actionId = document.getElementById("eliminarIdAccion").value;
    deleteRoleAction(actionId);
});

function updateActionForm(actionId, actionName, roleId) {
    document.getElementById("editarIdAccion").value = actionId;
    document.getElementById("editarNombreAccion").value = actionName;
    document.getElementById("editarRolAccion").value = roleId;
}

function deleteActionForm(actionId) {
    document.getElementById("eliminarIdAccion").value = actionId;
}

function loadRoleActions() {
    fetch("http://localhost:8080/AccountList/roleActions")
    .then(response => response.json())
    .then(actions => {
        const actionList = document.getElementById("acciones-lista");
        actionList.innerHTML = "";
        actions.forEach(action => {
            const listItem = document.createElement("div");
            listItem.textContent = action.actionname;

            const updateButton = document.createElement("button");
            updateButton.textContent = "Editar";
            updateButton.addEventListener("click", function() {
                updateActionForm(action.ID, action.actionname, action.roleID);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", function() {
                deleteActionForm(action.ID);
            });

            listItem.appendChild(updateButton);
            listItem.appendChild(deleteButton);

            actionList.appendChild(listItem);
        });
    })
    .catch(error => console.error("Error al cargar las acciones por rol:", error));
}

function createRoleAction(actionName, roleId) {
    fetch("http://localhost:8080/AccountList/roleActions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ actionname: actionName, roleID: roleId })
    })
    .then(response => {
        if (response.ok) {
            console.log("Acción por rol creada exitosamente.");
            loadRoleActions();
        } else {
            throw new Error("Error al crear la acción por rol.");
        }
    })
    .catch(error => console.error("Error al crear la acción por rol:", error));
}

function updateRoleAction(actionId, actionName, roleId) {
    fetch(`http://localhost:8080/AccountList/roleActions/${actionId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ actionname: actionName, roleID: roleId })
    })
    .then(response => {
        if (response.ok) {
            console.log("Acción por rol actualizada exitosamente.");
            loadRoleActions();
        } else {
            throw new Error("Error al actualizar la acción por rol.");
        }
    })
    .catch(error => console.error("Error al actualizar la acción por rol:", error));
}

function deleteRoleAction(actionId) {
    fetch(`http://localhost:8080/AccountList/roleActions/${actionId}`, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            console.log("Acción por rol eliminada exitosamente.");
            loadRoleActions();
        } else {
            throw new Error("Error al eliminar la acción por rol.");
        }
    })
    .catch(error => console.error("Error al eliminar la acción por rol:", error));
}
