// core.js
// v 1.0.0

'use strict';

//setup Underscore's template library to use a top-level variable
//named TD for 'template data'
  _.templateSettings.variable = "TD";

// Modify Date object to include an addHours and subHours functions
  Date.prototype.addHours= function(h){
    this.setHours(this.getHours()+h);
    return this;
  }
  Date.prototype.subHours= function(h){
    this.setHours(this.getHours()-h);
    return this;
  }
  Date.prototype.addMinutes= function(m){
    this.setMinutes(this.getMinutes()+m);
    return this;
  }
  Date.prototype.subMinutes= function(m){
    this.setMinutes(this.getMinutes()-m);
    return this;
  }
  Date.prototype.addSeconds= function(s){
    this.setSeconds(this.getSeconds()+s);
    return this;
  }
  Date.prototype.subSeconds= function(s){
    this.setSeconds(this.getSeconds()-s);
    return this;
  }
  Date.prototype.toUTC = function(){
    //this requires the Moment.js library to be loaded
    if (moment) { this.setMinutes(this.getMinutes() + moment().utcOffset()); }
    return this;
  }

var meta = {
  keys : {
    parse : {
      ApplicationID : "6EGKiJSZgvWOGpzHdJsxDfTJgLCIwMCFrn9WnLF7",
      JavascriptKey : "OaY803d3UixwhcgxgTFn8Agl7vdLECMXepArLOiv"
    }
  },
  userP : {
  },
  userLastSyncAt : new Date(2000,01,01),
  deviceReady : false,
  deviceOnline : false
};

var touch = {
  addE: function(){
    return $.Deferred(function(f){
      $('.touchable').on('mousedown touchstart',function(){
        $('.touched').removeClass('touched');
        $(this).addClass('touched');
      });
      $('.touchable').on('mouseup touchend touchcancel',function(){
        $('.touched').removeClass('touched');
      });
      f.resolve();
    }).promise();
  },
  remE: function(){
    return $.Deferred(function(f){
      $('.touchable').off('mousedown touchstart');
      $('.touchable').off('mouseup touchend touchcancel');
      f.resolve();
    }).promise();
  },
  initialize: function(){
    touch.remE().done( touch.addE );
  },
  reset: function(){
    touch.remE().done( touch.addE );
  }
};

var app = {
  initialize: function() {
    console.log('App init');
    //Parse INIT
    Parse.initialize(meta.keys.parse.ApplicationID, meta.keys.parse.JavascriptKey);

    //bind events necessary on mobile
    app.bindEvents();
  },
  bindEvents: function() {
    //bind device events
    document.addEventListener('deviceready', this.onDeviceReady, false);
    document.addEventListener('online', function(){
      meta.deviceOnline = true;
    }, false);
    document.addEventListener('offline', function(){
      meta.deviceOnline = false;
    }, false);
  },
  onDeviceReady: function() {
    console.log('Device is ready');
    meta.deviceReady = true;
    if (device.platform.toLowerCase() == "ios"){
      //meta.keys.google.current = meta.keys.google.ios;
    }
    views.initialize();
    touch.initialize();
  },
  l : function(content, type){
    var s = "";
    if (typeof content == "string") {
      s = content;
    } else if (typeof content == "object") {
      s = JSON.stringify(content,null,'');
    }
    if (typeof type == "undefined") {
      console.log(s);
    } else if (type == 1) {
      console.log(s);
    } else if (type == 2) {
      console.warn(s);
    } else if (type == 3) {
      console.error(s);
    }
  }
};

var views = {
  initialize : function(screen) {
    console.log('View init');

    //UI modifiers
      //set black application BG
      $('body').css('background-color','#000');

    // check if there is an active session
    if ( Parse.User.current() ) {
      //refresh the Parse User data
      Parse.User.current().fetch({
        success: function(r){
          console.log('Refreshed local Current User data');
          // init all the in-app views with user data
          if ( typeof Parse.User.current().get('avatar') != "undefined" ) {
            //DEBUG
            console.log('loading avatars');
            $('avatar.user').css('background-image', 'url('+Parse.User.current().get('avatar').url()+')' );
            // show the default view
            views.screens.start.initialize();
          } else {
            // show the default view
            views.screens.start.initialize();
          }
        },
        error: function(e){
          console.error('Could not refresh User object, application aborted.');
          console.error(e);
          Parse.User.logOut();
          views.screens.login.initialize();
          //TODO
          //notification handler for failing to refresh user and load the app
        }
      });

    } else {
      // show the signup or login page
      views.screens.login.initialize();
    }
  },
  screens : {
    login : {
      initialize : function(){},
      getData : function(){},
      render : function(){},
      addE : function(){},
      remE : function(){}
    },
    signup : {
      initialize : function(){},
      getData : function(){},
      render : function(){},
      addE : function(){},
      remE : function(){}
    },
    accounts : {
      initialize : function(){},
      getData : function(){},
      render : function(){},
      addE : function(){},
      remE : function(){}
    },
    accountDetail : {
      initialize : function(){},
      getData : function(){},
      render : function(){},
      addE : function(){},
      remE : function(){}
    },
  }
};

var util = {

};