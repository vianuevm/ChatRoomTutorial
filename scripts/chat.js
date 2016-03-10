$(document).ready(function() {
  

  // ***********  ABOUT *******************

  // JavaScript is an EVENT based programming language, which means it
  // is often reactionary.  So someone does something, something reacts to it.
  // The $('classname or id name') syntax grabs that element in the DOM (html)
  // and you can have functions that react to events

  // For example, $('#messageInput').keypress(function( ... )
  // listens for any key press on the "messageInput" id (you can see in the html)
  // $('.sendButton').click(function( ... ) listens for a click on the sendButton class 


  // myDataRef in this code is a "handle" on the database.
  // All function on myDataRef interact with the database.
  // I highly recommend opening developer tools and setting breakpoints to see 
  // how these things happen

  // **************************************

  // Acquire a handle to the database
  
  var myDataRef = new Firebase('https://zhacks.firebaseio.com/');
  var dbData = "";

  // Every time someone adds a new message PUSH to the database

  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });

  // This is the same as above, only using a nice button

  $('.sendButton').click(function() {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
  });

  // This simply removes all the data in the database -- clear chatroom!

  $('.clearChatroom').click(function() {
      myDataRef.remove();
      var obj = document.getElementById("chatroom");
      obj.defaultValue = "";
  });

  //This is super important.  This listener checks for any new data in the database
  // If there is a change, it pushes it to the user so they can see it.
  // This function "listens" for any change and gives you all the data.

  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    dbData = snapshot.val();
    displayChatMessage(message.name, message.text);
  });


  // This is a simple auxillary function to add data to the text area / chat room

  function displayChatMessage(name, text) {
    var obj = document.getElementById("chatroom");
    var txt = document.createTextNode(name + " : " + text + "\n");
    obj.appendChild(txt);
    obj.scrollTop = obj.scrollHeight;
  };
  
});