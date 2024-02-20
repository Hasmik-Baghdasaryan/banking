var AccountsViewModelKO;
function AccountsViewModel(){
    var self = this;
    self.data = HeaderViewModelKO.dataFromServer;
    self.showData = HomeViewModelKO.showData;
    self.accounts = ko.observableArray([]);
    self.selectedAccount = ko.observable();
    self.transactions = ko.observableArray([]);
    self.isAuthenticated = AuthenticationViewModelKO.isAuthenticated;
    self.getAccountDetails = function(){
        var accounts = [];
        if(self.data() && self.data().accounts) {
            self.data().accounts.forEach(function(account){
                accounts.push({accountDetails: account.summary, transactions: account.transactions});
            })
        }
        //why don't 'return self.accounts(accounts)' and foreach binding with this function work?
        return accounts;
    };
  
    self.accounts(self.getAccountDetails());

    self.selectAccount = function(data){
        if(data) {
            self.transactions(data.transactions);
            self.selectedAccount(data.accountDetails.number);
        }
    };

    self.isAccountSelected = function(data){
        if(data){
            return data.accountDetails.number ===  self.selectedAccount();
        }
    };
   /*  self.hideErrorMessage = function(){
        return transactions().length && selectedAccount() ? true : false;
    };
    self.showTransactionsMessage = function(){
        return !transactions().length && selectedAccount() ? true : false;
    }; */
};

function initAccountViewModel () {
    var bindElement = document.querySelector('[data-bind-id="accounts_section"]');
    if(bindElement){
        AccountsViewModelKO = new AccountsViewModel();
        ko.applyBindings(AccountsViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(AccountsViewModelKO);
};