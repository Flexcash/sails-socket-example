# sails-socket-example

a [Sails](http://sailsjs.org) application

## From original Sails js install, files changed:

1. added jQuery to assets/js/dependencies
2. ran sails generate api user
3. created views/user/index.ejs
4. created assets/view_specific/user_index_misc.js

## To run
1. on terminal, type 'sails lift'
2. select option '2'
3. on the browser, go to http://localhost:1337/user
4. enjoy adding users without needing to refresh browser window!

## Tutorial
Check a walk through of the code on http://impacta.us/blog

## Exercise
Think you understand what's happening? Try to implement the logic for the other CRUD events, Read, Update, Delete.

## Advanced
1. For more advanced features with socket.io on Sails, check http://socket.io/docs/rooms-and-namespaces/
2. To keep track of models on the client side (jQuery can become cumbersome if complex application), check out RivetsJs http://rivetsjs.com/

## Additional Sails Js information:
http://www.slideshare.net/stenio123/sails-js-intro-impactaus






