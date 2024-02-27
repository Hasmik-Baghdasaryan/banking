var HomeViewModelKO;
function HomeViewModel() {
    var self = this;

    self.isActive = HeaderViewModelKO.isPageActive;
    self.authenticationToken = HeaderViewModelKO.authenticationToken;
    self.activeTab = ko.observable('Accounts');

    self.tabActive = function (tab) {
        if (AccountsViewModelKO && (AccountsViewModelKO.selectedAccount() || AccountsViewModelKO.transactions())) {
            AccountsViewModelKO.selectedAccount('');
            AccountsViewModelKO.transactions([]);
        }
        if (PersonalInformationViewModelKO && PersonalInformationViewModelKO.editPersonalInformation) {
            PersonalInformationViewModelKO.editPersonalInformation(false);
        }
        if (TransactionsViewModelKO && (TransactionsViewModelKO.transferAccountFrom() ||
            TransactionsViewModelKO.transferAccountTo() || TransactionsViewModelKO.transferAmount()) ||
            TransactionsViewModelKO.transferDescription() || TransactionsViewModelKO.showDoneMessage()) {
            TransactionsViewModelKO.transferAccountFrom('');
            TransactionsViewModelKO.transferAccountTo('');
            TransactionsViewModelKO.transferAmount('');
            TransactionsViewModelKO.transferDescription('');
            TransactionsViewModelKO.transferAmount('');
            TransactionsViewModelKO.showDoneMessage(false);
        }
        if (tab) {
            self.activeTab(tab);
        }
    };

    self.isTabActive = function (tab) {
        return tab ? self.activeTab() === tab : null;
    };

    self.showData = function (tab) {
        if (self.isActive("Home") && self.authenticationToken()) {
            return self.isTabActive(tab);
        }
    };
};

function initHomeViewModel() {
    var bindElement = document.querySelector('[data-bind-id="home_section"]');
    if (bindElement) {
        HomeViewModelKO = new HomeViewModel();
        ko.applyBindings(HomeViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(HomeViewModelKO);
};