var Plug = {
    init: function() {
        Plug.setup(),
        API.chatLog(this.customMSG, alert)
    },
    setup: function() { 
        this.$chatLog = $("#chat-messages"),
        this.MaroID = 11591166,
        this.customMSG = "Plugin loaded."
    }
};

!function() {
   Plug.init()
}();
