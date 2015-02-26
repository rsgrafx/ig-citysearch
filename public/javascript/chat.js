window.onload = function(){
  (function(){
    var show = function(el){
      return function(msg){ el.innerHTML = msg + '<br />' + el.innerHTML; }
    }(document.getElementById('msgs'));

    var disable_form = function(el) {
      $('#chat-form input').prop('disabled', true);
    }

    var ws       = new WebSocket('ws://' + window.location.host + window.location.pathname);
    ws.onopen    = function()  { console.log('websocket opened'); };
    ws.onclose   = function()  { //console.log('Shout Outs closed'); 
      disable_form()
    }
    ws.onmessage = function(m) { show('YO From#: ' +  m.data); };

    var sender = function(f){
      var input     = document.getElementById('input');
      input.onclick = function(){ input.value = "" };
      f.onsubmit    = function(){
        ws.send(input.value);
        input.value = "send a message";
        return false;
      }
    }(document.getElementById('chat-form'));
  })();
}
