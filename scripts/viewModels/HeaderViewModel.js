var HeaderViewModelKO;
function HeaderViewModel() {
    var self = this;
    var server = ServerStub();
    
    self.authenticationToken = ko.observable(getItemFromSessionStorage('clientToken') ? getItemFromSessionStorage('clientToken') : false);
    
    self.user = ko.observable('');
    self.getUserName = ko.computed(function(){
        return self.user(self.authenticationToken() && server && server.validateToken ? server.validateToken(self.authenticationToken()) : '');
    });

    self.logOutMessage = ko.observable(false);
   
    self.activePage = ko.observable("Home");
    self.setActivePage = function (page) {
        if (page && self.authenticationToken()) {
            self.activePage(page);
        }
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
        if(self.authenticationToken()){
            return page ? self.activePage() === page : false;
        }
    };

    self.logOutMode = function () {
        self.logOutMessage(!self.logOutMessage());
    };

    self.logOut = function () {
        removeItemFromSessionStorage('clientToken');
        location.replace(baseUrl+'index.html')
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