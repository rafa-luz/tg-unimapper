from flask import Flask, render_template, request, jsonify, make_response
from pymongo import MongoClient
from datetime import datetime
import uuid

app = Flask(__name__)

MONGO_URI = "mongodb+srv://mcampagnoli:carminha@cluster0.rg6ulqh.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp"
client = MongoClient(MONGO_URI)
db = client['Unimapper']
questions_collection = db['ocorrencias']
historico_collection = db['historico']

@app.route('/')
def index():
    user_id = request.cookies.get('user_id')
    if not user_id:
        user_id = str(uuid.uuid4())  # Gera um UUID
    resp = make_response(render_template('mapa1.html'))
    resp.set_cookie('user_id', user_id, max_age=365 * 24 * 60 * 60)  # Define o cookie por 1 ano
    return resp

@app.route('/submit_question', methods=['POST'])
def submit_question():
    question = request.form.get('question')
    user_id = request.cookies.get('user_id', str(uuid.uuid4()))  # Pega o UUID do cookie ou gera um novo

    # Capturar a data e hora atual
    current_time = datetime.now().strftime('%d-%m-%Y %H:%M:%S')

    questions_collection.insert_one({
        "user_id": user_id,
        "question": question,
        "timestamp": current_time  # Adicionar o timestamp ao banco de dados
    })
    return jsonify(status="success", message="Question stored successfully")


@app.route('/get_image', methods=['POST'])
def get_image():
    choice1 = request.form.get('choice1')
    choice2 = request.form.get('choice2')

    # Armazenando as escolhas do usuário
    store_user_choices(request.cookies.get('user_id', str(uuid.uuid4())), choice1, choice2)

    image_path = determine_image_path(choice1, choice2)
    return jsonify(image_path=image_path)


def store_user_choices(user_id, choice1, choice2):
    """Armazena as escolhas do usuário no banco de dados."""
    current_time = datetime.now().strftime('%d-%m-%Y %H:%M:%S')

    # Inserindo as escolhas na coleção 'historico'
    historico_collection.insert_one({
        "user_id": user_id,
        "choice1": choice1,
        "choice2": choice2,
        "timestamp": current_time
    })


def determine_image_path(choice1, choice2):
    filename = f"{choice1}-{choice2}.png"
    return f"/static/images/{filename}"


if __name__ == '__main__':
    app.run(debug=True)
