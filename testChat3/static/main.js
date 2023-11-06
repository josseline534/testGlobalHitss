// var socket = io.connect('http://' + document.domain + ':' + location.port)
const socket = io()

$('#chat, #userCount, #closeSession').hide()

socket.on('new_message', function (data) {
  $('#messages').append(
    $('<li>').html(
      '<div class="containerMessage" ><img src="https://somebooks.es/wp-content/uploads/2018/12/Poner-una-imagen-a-la-cuenta-de-usuario-en-Windows-10-000.png" class="imageUser"/><div class="message"><em>Usuario: ' +
        data.user +
        '</em><p>' +
        data.message +
        '</p></div></div>'
    )
  )
})

socket.on('user_count', function (data) {
  $('#userCount').text('Usuarios conectados: ' + data)
})

function sendMessage() {
  const message = $('#input').val()
  console.log('message: ', message)
  $('#input').val('')
  socket.emit('new_message', message)
}

function newConnection() {
  const user = $('#nameUser').val()
  socket.emit('new_connection', user)
  $('#connection').hide()
  $('#chat, #userCount, #closeSession').show()
}

function closeSession() {
  socket.emit('close_connect')
  $('#connection').show()
  $('#chat, #userCount, #closeSession').hide()
}
