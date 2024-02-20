var TransactionsViewModelKO;
function TransactionsViewModel(){
    var self = this;
    var server = ServerStub();

    self.data = HeaderViewModelKO.dataFromServer;
    self.showData = HomeViewModelKO.showData;
    self.showDoneMessage = ko.observable(false);
    self.errorMessage = ko.observable(false);
    self.accounts = ko.observableArray([]);
    self.step = 0;
    self.currentStep = ko.observable(1);
    self.accoutFrom = ko.observable();
    self.accountTo = ko.observable();

    self.transferAccountFrom = ko.observable().extend({required: true});
    self.transferAccountFrom({});
    self.transferAccountTo = ko.observable().extend({required: true});
    self.transferAccountTo({});
    self.transferAmount = ko.observable().extend({required: true, ifOnlyDigits: self.transferAmount});
    self.transferAmount('');
    self.transferDescription = ko.observable().extend({required: true});
    self.transferDescription('');

    self.errors = ko.validation.group(self, {deep: true, observable: true, live: true});
    
    self.getAccountDetails = function(){
        var accounts = [];
        if(self.data() && self.data().accounts) {
            self.data().accounts.forEach(function(account){
                accounts.push(account.summary);
            })
        }
        return accounts;
    };

    self.accounts(self.getAccountDetails());
   
    self.nextButtonDisabled = function(){
        if(self.currentStep()===1 && self.errors().length > 2 || self.currentStep()===2 && self.errors().length){
            return true;
        }
    }
        
    self.optionText = function(item){
        return item.type + ' ' + item.number;
    }

    self.nextButton = function(){
        if(self.currentStep()<3){
            (self.currentStep(self.currentStep()+1));
        }
        self.accoutFrom(self.transferAccountFrom () ? self.transferAccountFrom ().number : "");
        self.accountTo(self.transferAccountTo() ? self.transferAccountTo().number : '');
    };

    self.backButton = function () {
        if(self.currentStep()>1){
            self.currentStep(self.currentStep()-1);
        }
        self.errorMessage(false);
    };

    self.transfer = function(){
        var transferData = {
            amount: self.transferAmount(),
            toAccount: self.accountTo(),
            fromAccount:  self.accoutFrom(),
            description:  self.transferDescription(),
        }
        if(self.transferAccountFrom().balance >= self.transferAmount() && self.transferAccountFrom().number != self.transferAccountTo().number){
            server.transferFunds(transferData, AuthenticationViewModelKO.authenticationToken());
            var accounts = (server.getAccounts(AuthenticationViewModelKO.authenticationToken()));
            AccountsViewModelKO.accounts.removeAll();
            accounts.forEach(function(account) {
                AccountsViewModelKO.accounts.push({accountDetails: account.summary, transactions: account.transactions});
            });
            self.showDoneMessage(true);
            self.currentStep(1);
        } else {
            self.errorMessage(true);
        }     
        self.transferAccountFrom('');
        self.transferAccountTo('');
        self.transferAmount('');
        self.transferDescription('');
    };
};

function TransactionsViewModelKO (){
    var bindElement = document.querySelector('[data-bind-id="transactions"]');
    if(bindElement) {
        TransactionsViewModelKO = new TransactionsViewModel();
        ko.applyBindings(TransactionsViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(TransactionsViewModelKO);
};