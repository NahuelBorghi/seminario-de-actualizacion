# ---------------------------------------------------
# --------------------- no anda ---------------------
# ----------- terminar para prox entrega ------------
# ---------------------------------------------------
# Importar librerías
import os
import mysql.connector

# Definir variables de conexión (utilizando variables de entorno)
db_host = os.environ.get('DB_HOST', 'localhost')
db_port = os.environ.get('DB_PORT', 3306)  # Puerto por defecto de MySQL
db_user = os.environ.get('DB_USER', 'root')
db_password = os.environ.get('MYSQL_ROOT_PASSWORD', 'matiasGASTONsantiago')
db_name = os.environ.get('MYSQL_DATABASE', 'seminario')

# Establecer conexión a la base de datos
db = mysql.connector.connect(
    host=db_host,
    port=db_port,
    user=db_user,
    password=db_password,
    database=db_name
)

# Crear cursor para ejecutar queries
cursor = db.cursor()

def ejecutar_archivo_sql(archivo_sql):
    # Leer el archivo SQL
    with open(archivo_sql, 'r') as f:
        sql_data = f.read()

    # Ejecutar las sentencias SQL
    for query in sql_data.split(';'):
        # Eliminar espacios en blanco al inicio y final
        query = query.strip()

        # Omitir líneas vacías
        if not query:
            continue

        try:
            cursor.execute(query)
            db.commit()
        except mysql.connector.errors.ProgrammingError as e:
            print(f"Error al ejecutar query: {e}")
            break

# Ejecutar el archivo schema.sql
ejecutar_archivo_sql('schema.sql')

# Cerrar la conexión a la base de datos
db.close()
