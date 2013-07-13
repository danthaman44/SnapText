Pusher.log = function(message) {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};

var pusher = new Pusher('7fea0eabc0d01de77eff');
var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function(data) {
  message = data.message;
  alert(message);
});

setTimeout(function(){
	var button = document.getElementById("button");
	button.value = "Send";
},3000)

