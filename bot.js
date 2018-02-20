var Plug = {
    init: function() {
        Plug.setup(), 
        Plug.triggerCommand(), 
        this.$body.addClass("maro-plugin-enabled"), 
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
                n = "!pluginstop";
            
           
           
           
            if (0 == s.indexOf(n) && o == i.id) {
                Plug.stopPlugin()
            }
        }
        var e = this;
        API.on(API.CHAT, t)
    },
    stopPlugin: function() {
        $("body").removeClass("maro-plugin-enabled").addClass("maro-plugin-disabled")
    }
};
! function() {
    $("body").hasClass("maro-plugin-enabled") ? console.log("Plugin already loaded.") : $("body").hasClass("maro-plugin-disabled") ? location.reload() : Plug.init()
}();
