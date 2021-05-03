let socket = io();

socket.on('user count', function(data){
  console.log(data);
  socket.on('disconnect',()=>{
    console.log('A user has disconnected');
    --data;
    socket.emit('user count',data);
  })
})

$(document).ready(function () {
  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    var messageToSend = $('#m').val();

    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
