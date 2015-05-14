 //sends this socket id so it can be subscribed at the controller
io.socket.get('/user/subscribe', function(resData, jwres) {
                                      console.log(resData);
                                    });

//adds listener and what to do once receives event notification
io.socket.on('user',function(obj){
  //if(obj.verb === 'created'){
    console.log('chat event is '+ JSON.stringify(obj));
    $("#user-list").append('<li>' + obj.data.name + '</li>');
});

$("#go-data").click( function() {
  io.socket.post('/user/createpub/',{name:$("#name").val()});
  $("#name").val("");
});