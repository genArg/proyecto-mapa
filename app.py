from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder=".")

# Ruta raíz: servir el archivo HTML
@app.route("/")
def home():
    return send_from_directory(".", "index.html")

# Ruta para el CSS
@app.route("/style.css")
def css():
    return send_from_directory(".", "style.css")

# Ruta para el JS
@app.route("/main.js")
def js():
    return send_from_directory(".", "main.js")

# Ruta para el archivo de datos
@app.route("/datos.json")
def datos():
    return send_from_directory(".", "datos.json")

# Servir la clave de Google Maps si hiciera falta (opcional)
# @app.route("/config.js")
# def config():
#     return send_from_directory(".", "config.js")

if __name__ == "__main__":
    app.run(debug=True)
