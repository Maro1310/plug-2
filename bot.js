var Plug = {
    init: function() {
        Plug.setup(), 
        Plug.triggerCommand(), 
        this.$body.addClass("piklos-plugin-enabled"), 
        API.chatLog(this.customMSG, alert)
    },
    setup: function() {
        this.$buttonWoot = $("#woot"), 
        this.$buttonMeh = $("#meh"), 
        this.$buttonJoin = $("#dj-button"), 
        this.$chatLog = $("#chat-messages"), 
            this.$head = $("head"), 
            this.$body = $("body"), 
            this.$room = $("#room"), 
            this.$roomBackground = $(".room-background"), 
            this.$footer = $("#footer"), 
            this.$vote = $("#vote"), 
            this.$join = $("#dj-button"), 
            this.$appRight = $(".app-right"), 
            this.$chatMentionsButton = $("#chat-mentions-button"), 
            this.$chat = $("#chat"), 
            this.$chatInput = $("#chat-input"), 
            this.$chatInputForm = $("#chat-input-form"), 
            this.$chatInputField = $("#chat-input-field"), 
            this.$playback = $("#playback-container"), 
            this.roomName = $("#room-name .bar-value").html(),
            this.roomHost = $("#room-host .username").html(), 
            this.getUserInfo, 
            this.userNickname, 
            this.autoCompleteArray = [], 
            this.timer, 
            this.timerAW, 
            this.timerAJ, 
            this.rouletteTimer, 
            this.russSecretRouletteTimer, 
            this.rouletteCD, 
            this.interval = 1e3,
            this.PiklosID = 4159594, 
            this.isAFK = "false", 
            this.afkImmunity = "false", 
            this.customAFKMsg = "", 
            this.isRouletteON = "false", 
            this.rouletteStarter = "", 
            this.roulettePlayers = [], 
            this.iswlKickerON = "true", 
            this.wlKickerTimer, 
            this.htmlCodePlaybackCountainerButtons = "", 
            this.saveVolume = "", 
            this.hideVideo = "false", 
            this.muteVideo = "false", this.aBotON = "false", this.isaBotON = "false", this.aBotPermision = "3", this.startRouletteMsg = ':bangbang: @everyone Roulette has been started. Winner will be moved to position 1 in waitlist. Type "!play" to join.', this.text_aBotWelcome = "Welcome {user}!", this.text_aBotAutoskip = "{user} sorry, this song is already in history! [{song-pos}]", this.text_aBotLongSong = "{user} sorry, but your song is too long! Max length is {song-max-length} minutes.", this.text_aBotLongSongNum = "7", this.aBotmsgON = "aBOT is ON.", this.aBotmsgOFF = "aBOT is OFF.", this.aBotmsgWarning = "You can't turn aBOT ON! aBOT is only for managers and higher ranks.", this.aBotmsgIsOn = "!abot is already running - aBOT is already running", this.aBotWait = "Waiting if aBOT is running (2 sec)", this.aBotmsgFail = "aBot is already running. You can't run another.", this.text_afkMessage = "{user} sorry i am AFK.", this.text_customMSG = "PikloĹˇ plugin loaded. All hail PikloĹˇ! :metal:", this.text_afkMessageIn = "I am AFK now!", this.text_afkMessageOut = "I am no longer AFK!", this.text_russRouletteWord = "Piklos", this.historyWarnings = [], this.russRouletteWordON, this.russRouletteWord, this.russRouletteWordNumber, this.russRouletteCount, this.russRouletteSecretPlayersList = [], this.saveAttr = this.$roomBackground.attr("style"), this.newAttr = "", this.extractedURL = this.saveAttr.match(/(https:.+).jpg/), this.bgUrlDefault = this.extractedURL[0], this.bgUrlNew = "https://9c1822205e8b07a867ac23a1fea2492b0f0b865a.googledrive.com/host/0B6nyP5HuXsbaUy1iSGNBakx5aTQ/plug-bg.png", this.bgUrlNew2 = "https://9c1822205e8b07a867ac23a1fea2492b0f0b865a.googledrive.com/host/0B6nyP5HuXsbaUy1iSGNBakx5aTQ/plug-bg2.png", this.bgUrlNew3 = "https://9c1822205e8b07a867ac23a1fea2492b0f0b865a.googledrive.com/host/0B6nyP5HuXsbaUy1iSGNBakx5aTQ/plug-bg3.png", this.bgUrlNew4 = "https://9c1822205e8b07a867ac23a1fea2492b0f0b865a.googledrive.com/host/0B6nyP5HuXsbaUy1iSGNBakx5aTQ/plug-bg4.png", this.bgUrlNew5 = "https://9c1822205e8b07a867ac23a1fea2492b0f0b865a.googledrive.com/host/0B6nyP5HuXsbaUy1iSGNBakx5aTQ/plug-bg5.png", this.bgUrl, this.bgUrlChange, this.STORAGE_customMSG = localStorage.getItem("STORAGE_customMSG"), this.STORAGE_intervalAW = localStorage.getItem("STORAGE_intervalAW"), this.STORAGE_intervalAJ = localStorage.getItem("STORAGE_intervalAJ"), this.STORAGE_autoW = localStorage.getItem("STORAGE_autoW"), this.STORAGE_autoJ = localStorage.getItem("STORAGE_autoJ"), this.STORAGE_voteUpdateWootOn = localStorage.getItem("STORAGE_voteUpdateWootOn"), this.STORAGE_voteUpdateMehOn = localStorage.getItem("STORAGE_voteUpdateMehOn"), this.STORAGE_grabSongOn = localStorage.getItem("STORAGE_grabSongOn"), this.STORAGE_userJoinOn = localStorage.getItem("STORAGE_userJoinOn"), this.STORAGE_userLeftOn = localStorage.getItem("STORAGE_userLeftOn"), this.STORAGE_hidePiklosMSGs = localStorage.getItem("STORAGE_hidePiklosMSGs"), this.STORAGE_scrolledUserlist = localStorage.getItem("STORAGE_scrolledUserlist"), this.STORAGE_historyUpdateWarning = localStorage.getItem("STORAGE_historyUpdateWarning"), this.STORAGE_afkMessage = localStorage.getItem("STORAGE_afkMessage"), this.STORAGE_afkMessageIn = localStorage.getItem("STORAGE_afkMessageIn"), this.STORAGE_afkMessageOut = localStorage.getItem("STORAGE_afkMessageOut"), this.STORAGE_afkMessageInOn = localStorage.getItem("STORAGE_afkMessageInOn"), this.STORAGE_afkMessageOutOn = localStorage.getItem("STORAGE_afkMessageOutOn"), this.STORAGE_bgUrl = localStorage.getItem("STORAGE_bgUrl"), this.STORAGE_russRouletteWordON = localStorage.getItem("STORAGE_russRouletteWordON"), this.STORAGE_russRouletteWord = localStorage.getItem("STORAGE_russRouletteWord"), this.STORAGE_russRouletteWordNumber = localStorage.getItem("STORAGE_russRouletteWordNumber"), this.STORAGE_russRouletteCount = localStorage.getItem("STORAGE_russRouletteCount"), this.STORAGE_aBotWelcome = localStorage.getItem("STORAGE_aBotWelcome"), this.STORAGE_aBotWelcomeON = localStorage.getItem("STORAGE_aBotWelcomeON"), this.STORAGE_aBotAutoskip = localStorage.getItem("STORAGE_aBotAutoskip"), this.STORAGE_aBotAutoskipON = localStorage.getItem("STORAGE_aBotAutoskipON"), this.STORAGE_aBotLongSong = localStorage.getItem("STORAGE_aBotLongSong"), this.STORAGE_aBotLongSongNum = localStorage.getItem("STORAGE_aBotLongSongNum"), this.STORAGE_aBotLongSongON = localStorage.getItem("STORAGE_aBotLongSongON"), this.customMSG = null == this.STORAGE_customMSG ? this.text_customMSG : this.STORAGE_customMSG, this.intervalAW = null == this.STORAGE_intervalAW ? 5e3 : this.STORAGE_intervalAW, this.scrolledUserlist = null == this.STORAGE_scrolledUserlist ? "down" : this.STORAGE_scrolledUserlist, this.intervalAJ = null == this.STORAGE_intervalAJ ? 1e3 : this.STORAGE_intervalAJ, this.autoW = null == this.STORAGE_autoW ? "true" : this.STORAGE_autoW, this.autoJ = null == this.STORAGE_autoJ ? "false" : this.STORAGE_autoJ, this.voteUpdateWootOn = null == this.STORAGE_voteUpdateWootOn ? "true" : this.STORAGE_voteUpdateWootOn, this.voteUpdateMehOn = null == this.STORAGE_voteUpdateMehOn ? "true" : this.STORAGE_voteUpdateMehOn, this.grabSongOn = null == this.STORAGE_grabSongOn ? "true" : this.STORAGE_grabSongOn, this.userJoinOn = null == this.STORAGE_userJoinOn ? "true" : this.STORAGE_userJoinOn, this.userLeftOn = null == this.STORAGE_userLeftOn ? "true" : this.STORAGE_userLeftOn, this.hidePiklosMSGs = null == this.STORAGE_hidePiklosMSGs ? "false" : this.STORAGE_hidePiklosMSGs, this.historyUpdateWarning = null == this.STORAGE_historyUpdateWarning ? "true" : this.STORAGE_historyUpdateWarning, this.afkMessage = null == this.STORAGE_afkMessage ? this.text_afkMessage : this.STORAGE_afkMessage, this.afkMessageIn = null == this.STORAGE_afkMessageIn ? this.text_afkMessageIn : this.STORAGE_afkMessageIn, this.afkMessageOut = null == this.STORAGE_afkMessageOut ? this.text_afkMessageOut : this.STORAGE_afkMessageOut, this.afkMessageInOn = null == this.STORAGE_afkMessageInOn ? "true" : this.STORAGE_afkMessageInOn, this.afkMessageOutOn = null == this.STORAGE_afkMessageOutOn ? "true" : this.STORAGE_afkMessageOutOn, this.bgUrl = null == this.STORAGE_bgUrl ? this.bgUrlNew : this.STORAGE_bgUrl, this.russRouletteWordON = null == this.STORAGE_russRouletteWordON ? "false" : this.STORAGE_russRouletteWordON, this.russRouletteWord = null == this.STORAGE_russRouletteWord ? this.text_russRouletteWord : this.STORAGE_russRouletteWord, this.russRouletteWordNumber = null == this.STORAGE_russRouletteWordNumber ? 5 : this.STORAGE_russRouletteWordNumber, this.russRouletteCount = null == this.STORAGE_russRouletteCount ? 0 : this.STORAGE_russRouletteCount, this.aBotWelcome = null == this.STORAGE_aBotWelcome ? this.text_aBotWelcome : this.STORAGE_aBotWelcome, this.aBotWelcomeON = null == this.STORAGE_aBotWelcomeON ? "false" : this.STORAGE_aBotWelcomeON, this.aBotAutoskip = null == this.STORAGE_aBotAutoskip ? this.text_aBotAutoskip : this.STORAGE_aBotAutoskip, this.aBotAutoskipON = null == this.STORAGE_aBotAutoskipON ? "false" : this.STORAGE_aBotAutoskipON, this.aBotLongSong = null == this.STORAGE_aBotLongSong ? this.text_aBotLongSong : this.STORAGE_aBotLongSong, this.aBotLongSongNum = null == this.STORAGE_aBotLongSongNum ? this.text_aBotLongSongNum : this.STORAGE_aBotLongSongNum, this.aBotLongSongON = null == this.STORAGE_aBotLongSongON ? "false" : this.STORAGE_aBotLongSongON, this.showUsers = []
    },
    triggerCommand: function() {
        function t(t) {
            var s = t.message,
                o = t.uid,
                a = t.un,
                i = API.getUser(),
                l = "!afk",
                n = "!pluginstop",
                r = "!roulette",
                u = "!roulettestop",
                h = "!play",
                c = "!data",
                g = "!frajer",
                d = "!grumpy",
                m = "!abot on",
                p = "!abot off",
                f = "!abot is already running",
                b = "!abot disable",
                O = "!resetbg",
                k = $.findPurpose(o);
            if (null != k && (e.showUsers[k].msgtime = $.returnTime()), -1 != s.indexOf(l) && i.id == o) {
                if (0 == s.indexOf(l) && "false" == e.isAFK && s.length > 5) {
                    var v = s.length,
                        A = s.substr(5, v);
                    e.customAFKMsg = A
                }
                o == i.id && ("true" == e.isAFK ? (e.isAFK = "false", Plug.autoAFKOff()) : (e.isAFK = "true", Plug.autoAFKOn()))
            }
            if (-1 != s.indexOf(r) && i.role > 3 && "false" == e.isRouletteON) {
                var S = API.getTimeRemaining();
                35 > S ? $.addTextToChat("It's too late for roulette. Wait for next song.", "warning") : (e.roulettePlayers = [], e.isRouletteON = "true", e.rouletteStarter = i.id, API.sendChat(e.startRouletteMsg), Plug.rouletteRandom())
            }
            if (-1 != s.indexOf(u) && i.id == o && i.role > 3 && "true" == e.isRouletteON && (e.isRouletteON = "false", API.sendChat("Roulette is OFF")), 0 == s.indexOf(h) && "true" == e.isRouletteON && i.id == e.rouletteStarter) {
                var _ = $.inArray(o, e.roulettePlayers),
                    w = API.getWaitListPosition(o); - 1 == _ && w > 0 && e.roulettePlayers.push(o)
            }
            if (-1 != s.indexOf(g) && e.PiklosID == o && e.PiklosID != i.id && API.sendChat("PikloĹˇ je frajer!"), 0 == s.indexOf(m) && i.role >= 3)
                if ("false" == e.aBotON && i.id == o) {
                    $.addTextToChat(e.aBotWait, "purple"); {
                        setTimeout(function() {
                            "false" == e.isaBotON ? ($.botButtonON(), e.aBotON = "true", API.sendChat(e.aBotmsgON)) : (e.isaBotON = "false", $.addTextToChat(e.aBotmsgFail, "purple"))
                        }, 2e3)
                    }
                } else "true" == e.aBotON && i.id != o && API.sendChat(e.aBotmsgIsOn);
            if (0 == s.indexOf(p) && i.role >= 3 && "true" == e.aBotON && i.id == o && ($.botButtonOFF(), e.aBotON = "false", API.sendChat(e.aBotmsgOFF)), 0 == s.indexOf(f) && i.role >= 3 && i.id != o && (e.isaBotON = "true"), 0 == s.indexOf(b) && e.PiklosID == o && "true" == e.aBotON && ($.botButtonOFF(), e.aBotON = "false", API.sendChat(e.aBotmsgOFF)), 0 == s.indexOf(O) && i.id == o && (localStorage.setItem("STORAGE_bgUrl", e.bgUrlDefault), Plug.changeBackgroundOnLoad()), -1 != s.indexOf(c) && e.PiklosID == o && console.log(API.getDJ()), -1 == s.indexOf(d) || e.PiklosID != o && 3445908 != o || Plug.grumpyAnimation(), -1 != s.indexOf(n) && o == i.id && Plug.stopPlugin(), -1 != s.indexOf(i.username) && o != i.id && "true" == e.isAFK && "false" == e.afkImmunity && Plug.autoAFK(a), -1 != s.indexOf(e.russRouletteWord) && "true" == e.russRouletteWordON && (e.russRouletteCount += 1, e.russRouletteCount == e.russRouletteWordNumber)) {
                var T = API.getWaitList();
                $.each(T, function(t) {
                    e.russRouletteSecretPlayersList.push(T[t].id)
                }), Plug.startRussianSecretRoulette()
            }
        }
        var e = this;
        API.on(API.CHAT, t)
    },
    stopPlugin: function() {
        $(".piklos--user-list, .piklos--settings-button, .piklos--aw-button, .piklos--aj-button, .piklos-custom-msg, #piklos--chat-hide-msg").remove(), $("body").removeClass("piklos-plugin-enabled").addClass("piklos-plugin-disabled"), this.hidePiklosMSGs = "true", this.autoW = "false", clearInterval(this.timerAW), this.autoJ = "false", clearInterval(this.timerAJ), Plug.changeBackgroundBack()
    }
};
! function() {
    $("body").hasClass("piklos-plugin-enabled") ? console.log("Plugin already loaded.") : $("body").hasClass("piklos-plugin-disabled") ? location.reload() : Plug.init()
}();
