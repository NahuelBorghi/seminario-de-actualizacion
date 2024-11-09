import mysql.connector
import os
from pathlib import Path
from dotenv import load_dotenv

# Carga el archivo .env un nivel más arriba del directorio del script
env_path = Path('../') / '.env'
load_dotenv(dotenv_path=env_path)

# Obtiene las variables de entorno
host = os.getenv('MYSQL_HOST')
user = os.getenv('DATABASE_USER')
password = os.getenv('DATABASE_PASSWORD')

print(host)
print(user)
print(password)

# Conexión a la base de datos usando las variables de entorno
conexion = mysql.connector.connect(
    host="localhost",
    user=user,
    password=password
)

query_path = './users.sql'

# Lee el archivo SQL y ejecuta las consultas
with open(query_path, 'r', encoding="utf-8") as file:
    query = file.read()

conexion.connect()
cursor = conexion.cursor()

cursor.execute("CREATE DATABASE IF NOT EXISTS users")
conexion.commit()
cursor.execute("USE users")

try:
    # Ejecuta el contenido del archivo SQL
    for result in cursor.execute(query, multi=True):
        if result.with_rows:
            print(f"Resultado: {result.fetchall()}")
    conexion.commit()
    cursor.execute("INSERT INTO Roles (id, roleName) VALUES (1, 'admin')")
    cursor.execute("INSERT INTO Roles (id, roleName) VALUES (2, 'user')")
    cursor.execute("INSERT INTO Roles (id, roleName) VALUES (3, 'guest')")
    conexion.commit()
except mysql.connector.Error as error:
    print(f"Error al insertar la publicación '{id}': {error}")
    conexion.rollback()


conexion.close()