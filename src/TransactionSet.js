/**
 * Created by Tom on 2017-05-01.
 */
"use strict";


var TransactionType = {'INTEREST': 'INTEREST', 'CARRY_CHARGE': 'CARRY_CHARGE', 'DIVIDEND': 'DIVIDEND', 'ORDERS': 'ORDER'};

/**
 * Object to hold transactions by category
 */
function TransactionSet() {
  this.transactionsList = {'INTEREST': [], 'CARRY_CHARGE': [], 'DIVIDEND': [], 'ORDER': [], 'OPTION_ORDER': []};
}


/**
 * @param transaction - Transaction object to add to list
 */
TransactionSet.prototype.addTransaction = function(transaction) {
  this.transactionsList[transaction.getTransactionType()].push(transaction);
};


/**
 * @returns array of transactions objects of type dividend
 */
TransactionSet.prototype.getDividendTransactions = function() {
  return this.transactionsList['DIVIDEND'];
};


/**
 * @returns array of transactions objects of type interest
 */
TransactionSet.prototype.getInterestTransactions = function() {
  return this.transactionsList['INTEREST'];
};


/**
 *@returns array of transactions objects of type carry charge
 */
TransactionSet.prototype.getCarryChargeTransactions = function() {
  return this.transactionsList['CARRY_CHARGE'];
};


/**
 * @returns array of transactions objects of type order
 */
TransactionSet.prototype.getOrderTransactions = function(security) {
  var orders = [];

  if (typeof security === 'undefined')
    return this.transactionsList[TransactionType.ORDERS];
  else {
    for (var i = 0; i < this.transactionsList[TransactionType.ORDERS].length; i++) {
      if (security === this.transactionsList[TransactionType.ORDERS][i].getSecurity().getUID())
        orders.push(this.transactionsList[TransactionType.ORDERS][i]);
    };
  }

  return orders;
};


/**
 * @returns array of transactions objects of type option order
 */
TransactionSet.prototype.getOptionOrderTransaction = function(transaction) {
  return this.transactionsList[TransactionType.OPTION_ORDER];
};


/**
 * @param type - string of transaction type (INTEREST, CARRY_CHARGE, DIVIDEND, ORDER, OPTION_ORDER)
 * @returns json object {'ACCOUNT CURRENT', 'SECURITY_ID'} of unqiue indenitifers matching the transaction type specified
 */
TransactionSet.prototype.getUniqueSecurities = function (type) {
  var list = [], UID;

  for (var i = 0; i < this.transactionsList[type].length; i++) {
    UID = null;
    UID = this.transactionsList[type][i].getSecurity().getUID();

    if (list.indexOf(UID) === -1)
      list.push(UID);
  }

  return list;
};


module.exports = TransactionSet;