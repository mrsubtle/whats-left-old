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
          _.each(results,function(o,i,a){
            var Bill = Parse.Object.extend("Bill");
            var billsQuery = new Parse.Query(Bill);
            billsQuery.equalTo("Account",o);
            billsQuery.find({
              success: function(bills){
                o.bills = bills;
              },
              error: function(error){
                app.l('Error retrieving Bills',3);
                aGetAcc.reject(error);
              }
            });
            var Deposit = Parse.Object.extend("Deposit");
            var depositsQuery = new Parse.Query(Deposit);
            depositsQuery.equalTo("Account",o);
            depositsQuery.find({
              success: function(deposits){
                o.deposits = deposits;
              },
              error: function(error){
                app.l('Error retrieving Deposits',3);
                aGetAcc.reject(error);
              }
            });
          });
          aGetAcc.resolve(results);
        },
        error: function(error){
          aGetAcc.reject(error);
        }
      });
    }).promise();
  },
  getAccountDetails : function(){
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

// BUSINESS CALCULATIONS
var calc = {
  wl : function(accountID){
    var updateAll = false;
    if (typeof accountID == "unknown") {
      updateAll = true;
    }
    _.each(meta.userAccounts, function(o,i,a){
      if ( (!updateAll && accountID == o.id) || updateAll ) {

      }
    });
  },
};




