from flask import Flask, render_template, request
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'testGlobalHits'
socketio = SocketIO(app)

users = set()

@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('new_connection')
def handle_connect(data):
    print('Usuario conectado', request.sid)
    user_info = {"user_id": request.sid, "name": data}
    users.add(tuple(user_info.items()))
    emit('user_count', len(users), broadcast=True)


@socketio.on('close_connect')
def handle_disconnect():
    print('Usuario desconectado')
    user_to_remove = (('user_id', request.sid),)
    users.discard(user_to_remove)
    print('users', users)
    emit('user_count', len(users), broadcast=True)


@socketio.on('new_message')
def handle_new_message(data):
    print(f'Nuevo mensaje: {data}')
    name = get_name_by_user_id(request.sid)
    print('Usuario conectado', name)
    emit('new_message',{ "user": name, "message": data }, broadcast=True)


def get_name_by_user_id(user_id_to_find):
    user_list = [dict([(k, v) for k, v in user_info]) for user_info in users]
    for user_info in user_list:
        if user_info['user_id'] == user_id_to_find:
            return user_info['name']
    return None


if __name__ == '__main__':
    socketio.run(app, debug=True)
