var Plug = {
    init: function() {
        Plug.setup(), 
        Plug.triggerCommand(), 
        this.$body.addClass("maro-plugin"), 
        API.chatLog(this.customMSG, alert)
    },
    setup: function() { 
        this.$chatLog = $("#chat-messages"),
        this.$head = $("head"),
        this.$body = $("body"),
        this.customMSG = "Plugin loaded."
    },
    triggerCommand: function() {
        function t(t) {
            var s = t.message,
                o = t.uid,
                a = t.un,
                i = API.getUser(),
                m = "!magical";
        }
        
        var e = this;
        API.on(API.CHAT, t)
    }
};
! function() {
    $("body").hasClass("maro-plugin") ? API.sendChat("Plugin already loaded.", alert) ? Plug.init()
}();
