/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  subscribe:function (req,res) {
    // subscribe client to model changes 
    User.watch(req.socket);
    console.log( 'User subscribed to ' + req.socket.id );
  },
  createpub:function (req,res) {
    var data_from_client = req.params.all();

    if(req.isSocket && req.method === 'POST'){
      User.create(data_from_client)
          .then(function(data_from_client){
            console.log(data_from_client);
            User.publishCreate({id: data_from_client.id, name:data_from_client.name});
          })
          .catch(function(err){
            console.log('Error creating new User. Error: ' + err);
            return res.serverError('Server encountered a problem. Please contact administrator.');
          }); 
    } else {
      return res.badRequest('Sorry, this endpoint only accessible via sockets.');
    }
  },
  teamsubscribe:function (req, res) {
    console.log(JSON.stringify(req.params.all()));
    var team = req.param("team");
    console.log("team is " + team);
    sails.socket.subscribe(req.socket, team);
    console.log("Congratulations, socket " + req.socket.id + ' subscribed to ' + team);
  },
  generatenews: function (req,res) {
    var teamNews = ['Hawks win!', 'Tampa loses!', 'Stanley cup in Chicago!', 'Tampa played great game...', 'Let\'s do better next year, Tampa!', 'At least Tampa has better weather!'];

    var random = Math.floor(Math.random() * teamNews.length);
    var team = 'blackhawks';
    if ((random % 2) == 0) {
      team = 'lightning';
    }
    sails.sockets.broadcast(team, 'news', teamNews[random]);
  },
  hockey: function(req, res) {
    res.view();
  },
  index:function (req, res) {
    res.view({
          welcomeMessage: 'Welcome to Sails + socket.io simple test. Please refrain from adding client logic on the server!'
        });
  }
	
};

