window.onload = function(){
  (function(){
    var show = function(el){
      return function(msg){ el.innerHTML = msg + '<br />' + el.innerHTML; }
    }(document.getElementById('msgs'));

    var disable_form = function(el) {
      $('#chat-form input').prop('disabled', true);
    }

    var ws       = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onopen    = function()  { 
      console.log('websocket opened'); 
    };
    ws.onclose   = function()  { 
    //console.log('Shout Outs closed'); 
      disable_form()
    }
    ws.onmessage = function(m) { 
      var msg = JSON.parse(m.data);
      console.log(msg); 
      show(msg.sender+":> "+msg.message); 
    };

    var sender = function(f){
      var input     = document.getElementById('input');
      input.onclick = function(){ input.value = "" };
      f.onsubmit    = function(){
        console.log(document.ChatLocation)
        ws.send(input.value);
        input.value = "send a message";
        return false;
      }
    };

    var msg = '';
    // var location = $('location-data-id').val()
    var msgObj = {
      sender: '',
      location: '',
      message: msg
    }

    var send_chat_msg = function(f, msgObj) {
      var input     = document.getElementById('input');
      input.onclick = function(){ input.value = "" };
      f.onsubmit    = function() {

        msgObj.sender   = document.ChatLocation.short_name
        msgObj.location = document.ChatLocation.location.address
        msgObj.message = input.value

        ws.send(JSON.stringify(msgObj));
        input.value = 'Where ya At?!'
      }
    }(document.getElementById('chat-form'), msgObj)

  })();
}
