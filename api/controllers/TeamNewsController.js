/**
 * TeamNewsController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index:function (req, res) {
    var teamNames = [{name:'blackhawks'}, {name:'lightning'}];
    var hawks_fans = sails.sockets.subscribers('blackhawks');
    var lightning_fans = sails.sockets.subscribers('lightning');

    
    res.view({
          teams: teamNames,
          hawksFans: hawks_fans,
          lightningFans: lightning_fans 
        });

  },
  broadcastnews: function (req, res) {
    var data = {};
    data.name = req.param("team");
    data.news = req.param("news");
  
    var rooms = sails.sockets.rooms();
    var hawks = sails.sockets.subscribers("blackhawks");
    var lightning = sails.sockets.subscribers("lightning");

    console.log("Available rooms: " + JSON.stringify(rooms));
    console.log("subscribers hawks: " + JSON.stringify(hawks));
    console.log("subscribers lightning: " + JSON.stringify(lightning));
    
    sails.sockets.broadcast(data.name, "news", data);
  },
  blastnews: function (req, res) {
    var news = req.param("news");
    sails.sockets.blast('news', news);
  },
  //this is how we keep track of how many sockets each team has in their room,
  joinroomfans: function (req,res) {
    console.log("joining room fans socket id" + req.socket.id);
    sails.sockets.join(req.socket, 'blackhawksFans');
    sails.sockets.join(req.socket, 'lightningFans');
    sails.sockets.broadcast('blackhawksFans', 'updatedblackhawks', sails.sockets.subscribers('blackhawks').length);
    sails.sockets.broadcast('lightningFans', 'updatedlightning', sails.sockets.subscribers('lightning').length);
  },
  //this is how a socket joins room to receive news of their team
  joinroom:function (req,res) {
    var teamName = req.param("teamName");
    sails.sockets.join(req.socket,teamName);
    console.log( 'Socket ' + req.socket.id + 'joined room: ' + teamName);
    //teamName+'Fans' is name of the room, 'updated'+teamName is name of event
    sails.sockets.broadcast(teamName+'Fans', 'updated'+teamName, sails.sockets.subscribers(teamName).length);
  },
  //leave room from team news 
  leaveroom:function (req,res) {
    var teamName = req.param("teamName");
    sails.sockets.leave(req.socket,teamName);
    console.log( 'Socket' + req.socket.id + 'left room: ' + teamName);
    //teamName+'Fans' is name of the room, 'updated'+teamName is name of event
    sails.sockets.broadcast(teamName+'Fans', 'updated'+teamName, sails.sockets.subscribers(teamName).length);
  }
};