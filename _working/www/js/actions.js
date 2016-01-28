// actions.js
// v1.0.0

// DATA ACTIONS
var act = {
  getAccounts : function(){
    return $.Deferred(function(aGetAcc){
      var Account = Parse.Object.extend("Account");
      var accountsQuery = new Parse.Query(Account);
      accountsQuery.ascending('name');
      accountsQuery.find({
        success: function(results) {
          app.l('Successfully retrieved '+ results.length +' accounts for current user',2);
          //meta.userActions = _.sortBy(results, function(i){ return i.get('updatedAt'); });
          aGetAcc.resolve(results);
        },
        error: function(error){
          aGetAcc.reject(error);
        }
      });
    }).promise();
  },
};

// UI ACTIONS
var ui = {
  tabs : {
    check : function(){
      $('screen .tab-target').addClass('hidden');
      $('screen tab.active').each(function(){
        $('#' + $(this).data('for') + '.tab-target').removeClass('hidden');
      });
    }
  }
};