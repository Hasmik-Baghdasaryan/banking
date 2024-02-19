var TransactionsViewModelKO;
function TransactionsViewModel(){
    var self = this;
    var server = ServerStub();
    self.data = HeaderViewModelKO.dataFromServer;
    self.showData = HomeViewModelKO.showData;

    self.transferAccountFrom = ko.observable().extend({required: true});
    self.transferAccountFrom('');
    self.transferAccountTo = ko.observable().extend({required: true});
    self.transferAccountTo('');
    self.transferAmount = ko.observable().extend({required: true, ifOnlyDigits: self.transferAmount});
    self.transferAmount('');
    self.transferDescription = ko.observable().extend({required: true});
    self.transferDescription('');

    self.showDoneMessage = ko.observable(false);

    self.errors = ko.validation.group(self, {deep: true, observable: true, live: true});
    self.accounts = ko.observableArray([]);

    self.getAccountDetails = function(){
        var accounts = [];
        if(self.data && self.data.accounts) {
            self.data.accounts.forEach(function(account){
                accounts.push(account.summary);
            })
        }
        //why don't 'return self.accounts(accounts)' and foreach binding with this function work?
        return accounts;
    };
   
    self.nextButtonDisabled = function(){
        if(self.currentStep()===1 && self.errors().length >2 || self.currentStep()===2 && self.errors().length){
            return true;
        }
    }
    self.accounts(self.getAccountDetails());
    
    self.step = 0;

    self.optionText = function(item){
        return item.type + ' ' + item.number
    }

    self.currentStep = ko.observable(1);
  
    self.nextButton = function(){
        if(self.currentStep()<3)
        (self.currentStep(self.currentStep()+1));
    };

    self.backButton = function () {
        if(self.currentStep()>1){
            self.currentStep(self.currentStep()-1)
        }
    };

    self.transfer = function(){
        var transferData = {
            amount: self.transferAmount(),
            toAccount: self.transferAccountTo(),
            fromAccount:  self.transferAccountFrom (),
            description:  self.transferDescription(),
        }
        server.transferFunds(transferData);
        var accounts = (server.getAccounts());
        AccountsViewModelKO.accounts.removeAll();
        accounts.forEach(function(account) {
            AccountsViewModelKO.accounts.push({accountDetails: account.summary, transactions: account.transactions});
        });
        self.showDoneMessage(true);
        self.currentStep(1);
        self.transferAccountFrom('');
        self.transferAccountTo('');
    };
};

function TransactionsViewModelKO (){
    var bindElement = document.querySelector('[ data-bind-id="transactions"]');
    if(bindElement) {
        TransactionsViewModelKO = new TransactionsViewModel();
        ko.applyBindings(TransactionsViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(TransactionsViewModelKO);
};