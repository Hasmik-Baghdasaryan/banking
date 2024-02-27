var AccountsViewModelKO;
function AccountsViewModel() {
    var self = this;
    var server = ServerStub();
    
    self.authenticationToken = HeaderViewModelKO.authenticationToken;
    self.showData = HomeViewModelKO.showData;

    self.accounts = ko.observableArray([]);
    self.accountsInformation = ko.computed(function(){
        var accountsArray = [];
        if(self.authenticationToken() && server && server.getMemberData) {
            accountsArray = (server.getMemberData(self.authenticationToken())).accounts;
        }
        return self.accounts(accountsArray);
    });
    
    self.selectedAccount = ko.observable('');
    self.transactions = ko.observableArray([]);

    self.selectAccount = function (data) {
        if (data && data.transactions && data.summary.number) {
            self.transactions(data.transactions);
            self.selectedAccount(data.summary.number);
        }
    };

    self.isAccountSelected = function (data) {
        return data && data.summary && data.summary.number ? data.summary.number === self.selectedAccount() : false;
    };

    self.showTransactionsMessage = function () {
        if( !self.transactions().length && self.selectedAccount()){
            return "There isn't any transaction for this account"
        }
    };
};

function initAccountViewModel() {
    var bindElement = document.querySelector('[data-bind-id="accounts_section"]');
    if (bindElement) {
        AccountsViewModelKO = new AccountsViewModel();
        ko.applyBindings(AccountsViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(AccountsViewModelKO);
};