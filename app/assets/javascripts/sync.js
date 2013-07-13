var dispatcher = new WebSocketRails('localhost:3000/websocket');

dispatcher.bind('connected', function(data) {
  console.log(data.message)
});

dispatcher.trigger('sync.client_connected');
