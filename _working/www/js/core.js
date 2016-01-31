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
// Modify Number object for extended formatting
  Number.prototype.format = function(n, x, s, c) {
    // n = number of decimals
    // x = number of characters in groups
    // s = separator character
    // c = decimal separator character

    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
      num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
  };

var t = {
  d1 : new Date(1430456400000), //May 1, 2015
  d2 : new Date(1427346000000)  //Mar 26, 2015
};

var meta = {
  userP : {
  },
  userLastSyncAt : new Date(2000,01,01),
  userAccounts : [],
  userAccountsLastSyncAt : new Date(2000,01,01),
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
    Parse.initialize(c.keys.parse.ApplicationID, c.keys.parse.JavascriptKey);

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
          // init all the in-app views with user data
          // show the default view
          views.screens.accounts.initialize();
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
      initialize : function(){
        app.l("Login screen INIT");
        views.screens.login.remE().done(views.screens.login.addE().done(views.screens.login.render));
      },
      getData : function(){
        return $.Deferred(function(f){
          f.resolve();
        }).promise();
      },
      render : function(){
        return $.Deferred(function(f){
          $('screen#login').removeClass('hidden');
          f.resolve();
        }).promise();
      },
      addE : function(){
        return $.Deferred(function(f){
          $('screen#login form#login').on('submit', function(e){
            $('screen#login #btn_login').prop('disabled',true);
            //Parse Login code
            Parse.User.logIn($('screen#login form#login #txt_username').val(),$('screen#login form#login #txt_password').val(), {
              success : function(user){
                //YAY, now do stuff
                app.l('Parse.User.logIn Success',2);
                views.initialize();
                setTimeout(function(){
                  $('screen#login #btn_login').prop('disabled',false);
                  $('screen#login form#login')[0].reset();
                },500);
              },
              error : function(error){
                //BOO, fail it
                app.l('Parse.User.logIn Error',3);
                switch(error.code){
                  case 101:
                    $('screen#login #feedback_login').html(strings.loginFail);
                  default:
                    console.error(error);
                }
                setTimeout(function(){
                  $('screen#login #feedback_login').html('');
                  $('screen#login #btn_login').prop('disabled',false);
                },3000);
              }
            });
            $('input, select, textarea, button').blur();
            e.preventDefault();
          });
          f.resolve();
        }).promise();
      },
      remE : function(){
        return $.Deferred(function(f){
          $('screen#login form#login').off('submit');
          f.resolve();
        }).promise();
      }
    },
    signup : {
      initialize : function(){},
      getData : function(){},
      render : function(){},
      addE : function(){},
      remE : function(){}
    },
    accounts : {
      initialize : function(){
        views.screens.accounts.getData(true).done(views.screens.accounts.render);
      },
      getData : function(forceDataUpdate){
        if (typeof forceDataUpdate == "unknown") {
          forceDataUpdate = false;
        }
        return $.Deferred(function(f){
          if (meta.userAccountsLastSyncAt <= new Date().subHours(2) || forceDataUpdate) {
            app.l('Fetching accounts remotely',2);
            act.getAccounts().done(function(d){
              meta.userAccounts = d;
              meta.userAccountsLastSyncAt = new Date();
              f.resolve(d);
            }).fail(function(e){
              app.l(e,3);
              f.reject(e);
            });
          } else {
            app.l('Fetching accounts from cache',2);
            f.resolve(meta.userAccounts);
          }
        }).promise();
      },
      render : function(){
        return $.Deferred(function(f){
          var accountListItemTempalte = _.template($('#tpl_accountListItem').html());
          $('screen#accounts list').html('');
          _.each(meta.userAccounts, function(o,i,a){
            $('screen#accounts list#accountsByBalance').append(accountListItemTempalte(o));
          });
          _.each(_.sortBy(meta.userAccounts, function(i){ return -i.get('whatsLeft'); }), function(o,i,a){
            $('screen#accounts list#accountsByWhatsLeft').append(accountListItemTempalte(o));
          });
          ui.tabs.check();
          views.screens.accounts.remE().done(views.screens.accounts.addE);
          $('screen#accounts').removeClass('hidden');
          f.resolve();
        }).promise();
      },
      addE : function(){
        return $.Deferred(function(f){
          touch.reset();
          $('screen#accounts tab').hammer().on('tap',function(){
            $('screen#accounts tab').removeClass('active')
            $(this).addClass('active');
            ui.tabs.check();
          });
          f.resolve();
        }).promise();
      },
      remE : function(){
        return $.Deferred(function(f){
          $('screen#accounts tab').hammer().off('tap');
          f.resolve();
        }).promise();
      }
    },
    accountDetail : {
      initialize : function(){
        views.screens.accountDetail.getData(true).done(views.screens.accountDetail.render);
      },
      getData : function(forceDataUpdate){
        if (typeof forceDataUpdate == "unknown") {
          forceDataUpdate = false;
        }
        return $.Deferred(function(f){
          act.getAccountDetails(forceDataUpdate).done(function(d){
            //DEBUG
            console.log(d);
            meta.userAccounts = d;
            meta.userAccountsLastSyncAt = new Date();
            f.resolve();
          }).fail(function(e){
            app.l(e,3);
            f.reject(e);
          });
          f.resolve();
        }).promise();
      },
      render : function(){
        return $.Deferred(function(f){
          f.resolve();
        }).promise();
      },
      addE : function(){
        return $.Deferred(function(f){
          f.resolve();
        }).promise();
      },
      remE : function(){
        return $.Deferred(function(f){
          f.resolve();
        }).promise();
      }
    },
  }
};

var temp = {};

var util = {
  buildFrequencyArray : function(firstDate, frequency, startMoment, endMoment){
    // returns an array of date object frequencies within the given range
    // firstDate and frequency are mandatory
    // if no startMoment specified, assume now
    // if no endMoment specified, assume 2 years
    /* frequency:
      1 = annually,
      2 = semi-anually,
      4 = quarterly,
      6 = bi-monthly,
      12 = monthly,
      24 = semi-monthly,
      26 = bi-weekly,
      52 = weekly,
      365 = daily
    */
    if (typeof startMoment === "unknown") {
      app.l('No startMoment, setting default.',2);
      var startMoment = moment();
    }
    if (typeof endMoment === "unknown") {
      app.l('No endMoment, setting default.',2);
      var endMoment = startMoment.add(2,'y');
    }
    if( moment.isDate(firstDate) ){
      firstDate = moment(firstDate);
    }
    console.log(startMoment);
    console.log(endMoment);
    switch (frequency) {
      case 1:
        var recurrence = moment()
                      .recur({
                        start: startMoment,
                        end: endMoment
                      })
                      .every(firstDate.date()).daysOfMonth()
                      .every(firstDate.month()).monthsOfYear();
        console.log(recurrence.endDate(moment().add(2,'y')).all());
        temp.r = recurrence;
        break;
      case 2:
        break;
      case 4:
        break;
      case 6:
        break;
      case 12:
        break;
      case 24:
        break;
      case 26:
        break;
      case 52:
        break;
      case 365:
        break;
      default:
        break;
    }
  },
  nextOccurrence : function(date, frequency){
    // returns a moment of the next occurence of the bill/deposit
    /* frequency:
      1 = annually,
      2 = semi-anually,
      4 = quarterly,
      6 = bi-monthly,
      12 = monthly,
      24 = semi-monthly,
      26 = bi-weekly,
      52 = weekly,
      365 = daily
    */
    var now = moment();
    var then = moment(date);
    var next = moment({
      'year': 1999,
      'month': 11,
      'date': 31,
      'hour': 23,
      'minute': 59,
      'second': 59,
      'millisecond': 0
    });
    switch(frequency) {
      case 1:
        if ( (now.date() > then.month()) || ((now.month() == then.month()) && (now.date() > then.date()) ) ){
          next = moment({
            'year': now.year(),
            'month': then.month(),
            'date': then.date(),
            'hour': 23,
            'minute': 59,
            'second': 59,
            'millisecond': 0
          }).add(1,'y');
        } else {
          next = moment({
            'year': now.year(),
            'month': then.month(),
            'date': then.date(),
            'hour': 23,
            'minute': 59,
            'second': 59,
            'millisecond': 0
          });
        }
        break;
      case 2:
        var month1 = 0;
        if (then.month() >= 6) {
          month1 = then.month() - 6;
        } else {
          month1 = then.month();
        }
        var month2 = month1 + 6;
        var oc1 = moment({
          'year': now.year(),
          'month': month1,
          'date': then.date(),
          'hour': 23,
          'minute': 59,
          'second': 59,
          'millisecond': 0
        });
        var oc2 = moment({
          'year': now.year(),
          'month': month2,
          'date': then.date(),
          'hour': 23,
          'minute': 59,
          'second': 59,
          'millisecond': 0
        });
        if ( moment(now).isAfter(oc1) ){
          next = oc2;
        } else {
          next = oc1;
        }
        break;
      case 4:
        var month1 = 0;
        if (then.month() >= 3) {
          month1 = then.month() - 3;
        } else {
          month1 = then.month();
        }
        var month2 = month1 + 3;
        var month3 = month2 + 3;
        var month4 = month3 + 3;
        var oc1 = moment({
          'year': now.year(),
          'month': month1,
          'date': then.date(),
          'hour': 23,
          'minute': 59,
          'second': 59,
          'millisecond': 0
        });
        var oc2 = moment({
          'year': now.year(),
          'month': month2,
          'date': then.date(),
          'hour': 23,
          'minute': 59,
          'second': 59,
          'millisecond': 0
        });
        var oc3 = moment({
          'year': now.year(),
          'month': month3,
          'date': then.date(),
          'hour': 23,
          'minute': 59,
          'second': 59,
          'millisecond': 0
        });
        var oc4 = moment({
          'year': now.year(),
          'month': month4,
          'date': then.date(),
          'hour': 23,
          'minute': 59,
          'second': 59,
          'millisecond': 0
        });
        if ( moment(now).isAfter(oc1) ){
          next = oc2;
        } else {
          next = oc1;
        }
        break;
      case 12:
        var delta = moment();
        if (then.date() >= now.date()) {
          next = moment({
            'year': now.year(),
            'month': now.month(),
            'date': then.date(),
            'hour': 23,
            'minute': 59,
            'second': 59,
            'millisecond': 0
          });
          console.log(next.fromNow());
          console.log(next.format('llll'));
        } else {
          next = moment({
            'year': now.year(),
            'month': now.month(),
            'date': then.date(),
            'hour': 23,
            'minute': 59,
            'second': 59,
            'millisecond': 0
          }).add(1, 'M');
          console.log(next.fromNow());
          console.log(next.format('llll'));
        }
        break;
      default:
        break;
    }
    return next;
  }
};