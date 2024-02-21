var HeaderViewModelKO;
function HeaderViewModel() {
    var self = this;
    self.isAuthenticated = AuthenticationViewModelKO.isAuthenticated;
    self.user = AuthenticationViewModelKO.user;
    self.logOut = AuthenticationViewModelKO.logOut;
    self.logOutMessage = AuthenticationViewModelKO.logOutMessage;
    self.logOutMode = AuthenticationViewModelKO.logOutMode;

    self.activePage = ko.observable("Home");

    self.setActivePage = function (page) {
        if (page) {
            self.activePage(page);
        }
        //Is checking necessary?
        if (AccountsViewModelKO && AccountsViewModelKO.selectedAccount() && AccountsViewModelKO.transactions()) {
            AccountsViewModelKO.selectedAccount(0);
            AccountsViewModelKO.transactions([]);
        }
        if ((PersonalInformationViewModelKO && PersonalInformationViewModelKO.showChangeMessage()) ||
            (PersonalInformationViewModelKO && PersonalInformationViewModelKO.showCancelledMessage())) {
            PersonalInformationViewModelKO.showChangeMessage(false);
            PersonalInformationViewModelKO.showCancelledMessage(false);
        }
        if ((TransactionsViewModelKO && TransactionsViewModelKO.showDoneMessage()) ||
            (TransactionsViewModelKO && TransactionsViewModelKO.transferAmount())) {
            TransactionsViewModelKO.showDoneMessage(false);
            TransactionsViewModelKO.transferAmount('');
        }
    };

    self.isPageActive = function (page) {
        if (page) {
            return self.activePage() === page;
        }
    };
}

function initHeaderViewModel() {
    var bindElement = document.querySelector('[data-bind-id="header"]');
    if (bindElement) {
        HeaderViewModelKO = new HeaderViewModel();
        ko.applyBindings(HeaderViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(HeaderViewModelKO);
};