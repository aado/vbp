var Connection = (function(){

  function Connection(url) {

    this.open = false;

    this.socket = new WebSocket("ws://" + url);
    this.setupConnectionEvents();
  }

  Connection.prototype = {
    setupConnectionEvents : function () {
      var self = this;

      self.socket.onopen = function(evt) { self.connectionOpen(evt); };
      self.socket.onmessage = function(evt) { self.connectionMessage(evt); };
      self.socket.onclose = function(evt) { self.connectionClose(evt); };
    },

    connectionOpen : function(evt){
      this.open = true;
      // this.addSystemMessage('Connected');
    },

    connectionMessage : function(evt){
      var data = JSON.parse(evt.data);
      this.addCommunication(data.msg);
    },

    connectionClose : function(evt){
      this.open = false;
      // this.addSystemMessage("Disconnected");
    },

    sendDataCommunication : function(message){
      try {
        this.socket.send(JSON.stringify({
          msg : message
        }));
      } catch(e) {

      }
    },

    addCommunication : function(data){
      switch(data.broadType){
        case Broadcast.POST : this.addCommunicationPost(data); break;
        default : console.log("nothing to do");
      }
    },

	addCommunicationPost : function(object){
		var commData = object.data;
		console.log(commData);
		var commuContent = '<div class="col-md-12">'+
			'<div class="card">'+
				'<div class="comment-widgets scrollable ps-container ps-theme-default" data-ps-id="f70abb54-f9da-cae4-cdd8-da121024a928">'+
					'<div class="d-flex flex-row comment-row m-t-0">'+
						'<div class="p-2"><img src="http://appinhand.net/images/default-person.png" alt="user" width="50" class="rounded-circle"></div>'+
							'<div class="comment-text w-100">'+
								'<h6 class="font-medium mb-10">'+commData.author+'</h6>'+
								'<span class="m-b-15 d-block">'+commData.message+'</span>'+
							'<div class="comment-footer">'+
							'<span class="text-muted float-right">Created '+commData.author+'</span>'+ 
							'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';
		$("#realtimeCommunication").append(commuContent);
		// window.setTimeout( function () {
		// 	window.location.href = "communicationlist";
		// }, 3000);
	},

  };

  return Connection;

})();
