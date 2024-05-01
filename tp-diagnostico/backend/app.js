const express = require("express");
const cors = require("cors");
const {createConnection} = require("mysql2/promise");
const app = express();
const PORT = 8080;

const env = {
    "host": process.env["DATABASE_HOST"] || "db",
    "user": process.env["DATABASE_USER"] || "root",
    "password": process.env["MYSQL_ROOT_PASSWORD"] || "",
    "database": process.env["MYSQL_DATABASE"] || "mydb",
};

console.log(env);

app.use(cors());
app.use(express.json());

app.get("/api/contacts", async (req, res) => {
    try {
        const db = await createConnection(env);
        const [contacts] = await db.execute("SELECT * from Contacts");
        const [phones] = await db.execute("SELECT * from Phones");
        const newContacts = [];

        contacts.forEach((contacto) => {
            const contactPhones = phones.filter((Phone) => {
                return Phone.idContact === contacto.id;
            });
            if (contactPhones.length > 0) {
                newContacts.push({
                    contact: contacto,
                    phones: contactPhones,
                });
            }
        });
        res.status(200).send(newContacts);
        db.end();
    } catch (error) {
        console.log("error", error);
        res.status(409).send({ message: error });
    }
});

app.get("/api/contact/:idContact", async (req, res) => {
    try {
        const db = await createConnection(env);
        const [contact] = await db.execute(
            "SELECT name from Contacts WHERE id = ?",
            [id]
        );
        const [phones] = await db.execute(
            "SELECT * from Phones WHERE idContact = ?",
            [id]
        );
        db.end();
        res.status(200).send({ contact: contact[0], phones: phones });
    } catch (error) {
        console.log("error", error);
        res.status(409).send({ message: error });
    }
});

app.post("/api/contact", async (req, res) => {
    try {
        const { nombre, telefonos } = req.body;
        if (telefonos && telefonos.length === 0) {
            res.status(409).send({ error: "hay que agregar al menos 1 telefono" });
            return;
        }
        console.log(env);
        const db = await createConnection(env);

        const [contacto] = await db.execute(
            "INSERT INTO Contacts (name) VALUES (?)",
            [nombre]
        );
      const { insertId } = { ...contacto };
      telefonos.forEach(async (phone) => {
            await db.execute(
                "INSERT INTO Phones (number, idContact) VALUES (?, ?)",
                [phone, insertId]
            );
        });

        res.status(200).send({});
        db.end();
    } catch (error) {
        console.log("error", error);
        res.status(409).send({ message: error });
    }
});

app.put("/api/contact/:idContact", async (req, res) => {
    try {
        const { name, phones } = req.body;
        const { idContact } = req.params;
        if (phones && phones.length === 0) {
            res.status(409).send({ error: "hay que agregar al menos 1 telefono" });
            return;
        }

        const db = await createConnection(env);
        await db.execute(
            "UPDATE Contacts SET name = ? WHERE id = ?",
            [name, idContact]
        );
        phones.forEach(async ({ number, id }) => {
            await db.execute(
                "UPDATE Phones SET number = ? WHERE idContact = ? AND id = ?",
                [number, idContact, id]
            );
        });

        res.status(200).send({});
        db.end();
    } catch (error) {
        console.log("error", error);
        res.status(409).send({message: error });
    }
});

app.delete("/api/contact/:idContact", async (req, res) => {
    try {
        const { idContact } = req.params;
        console.log(idContact)
        const db = await createConnection(env);

        await db.execute("DELETE FROM Phones WHERE idContact = ?", [idContact]);
        await db.execute("DELETE FROM Contacts WHERE id = ?", [idContact]);

        res.status(200).send({});
        db.end();
    } catch (error) {
        console.log("error", error);
        res.status(409).send({ message: error });
    }
});

app.listen(PORT, () => {
    console.log(`Your app is listening in http://localhost:${PORT}`);
});
