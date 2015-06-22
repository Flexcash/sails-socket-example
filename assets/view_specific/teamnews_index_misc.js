//when page loads, register this socket to receive notification of new fans(sockets) subscribed
$(document).ready(function() {
  io.socket.post('/teamnews/subscribeFans/',{});
});

/** event handling for Fan room */
io.socket.on('updatedblackhawks',function(response){
  console.log(" fan response is " + JSON.stringify(response));
  $("#blackhawksFans").html(response);
});
io.socket.on('updatedlightning',function(response){
  console.log(" fan response is " + JSON.stringify(response));
  $("#lightningFans").html(response);
});

//adds listener and what to do once receives event notification
io.socket.on('news',function(response){
      console.log("response is " + JSON.stringify(response));
      //if it is a sails.socket.broadcast
      if(response.name) {
        if(response.name === 'blackhawks'){
             $("#blackhawks").append('<li>' + response.news + '</li>');
        } else {
                if(response.name === 'lightning'){
                  $("#lightning").append('<li>' + response.news + '</li>');
                }
        }
        //if it is sails.socket.blast
      } else {
        $("#blackhawks").append('<li>' + response+ '</li>');
        $("#lightning").append('<li>' + response + '</li>');
      }
 })


//subscribes to Blackhawks messages (code on TeamNewsController.subscribe)
$("#gohawks").click( function() {
  io.socket.post('/teamnews/subscribe/',{teamName:'blackhawks'});
  alert("subscribed to Hawks news!");
});
//unsubscribes to Blackhawks messages (code on TeamNewsController.subscribe)
$("#nohawks").click( function() {
  io.socket.post('/teamnews/unsubscribe/',{teamName:'blackhawks'});
  alert("unsubscribed to Hawks news!");
});

//subscribes to Lightning messages (code on TeamNewsController.subscribe)
$("#gotampa").click( function() {
  io.socket.post('/teamnews/subscribe/',{teamName:'lightning'});
  alert("subscribed to Lightning news!");
});
//unsubscribes to Lightning messages (code on TeamNewsController.subscribe)
$("#notampa").click( function() {
  io.socket.post('/teamnews/unsubscribe/',{teamName:'lightning'});
  alert("unsubscribed to Lightning news!");
});

$("#submit").click( function() {
  if ($("#teamNameSelect").val() != "0") {
    io.socket.post('/teamnews/broadcastnews/',{
                                          team:$("#teamNameSelect").val() ,
                                          news:$("#news").val()
                                        });
  }else {
    alert("please select team!");
  }
});

$("#blast").click( function() {
    io.socket.post('/teamnews/blastnews/',{
                                          news:$("#news").val()
                                        });

});