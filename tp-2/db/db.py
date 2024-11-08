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

query = open(query_path, 'r', encoding="utf-8").read()

conexion.connect()

try:
    conexion.cmd_query_iter(query)
    conexion.commit()
except mysql.connector.Error as error:
    print(f"Error al insertar la publicación '{id}': {error}")
    conexion.rollback()

conexion.close()