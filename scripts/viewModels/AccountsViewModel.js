var AccountsViewModelKO;
function AccountsViewModel() {
    var self = this;
    self.data = AuthenticationViewModelKO.dataFromServer;
    self.isAuthenticated = AuthenticationViewModelKO.isAuthenticated;
    self.showData = HomeViewModelKO.showData;

    self.accounts = ko.observableArray(self.data() && self.data().accounts ? self.data().accounts : []);
    self.selectedAccount = ko.observable();
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
        return !self.transactions().length && self.selectedAccount();
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