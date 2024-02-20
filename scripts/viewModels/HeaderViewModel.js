var HeaderViewModelKO;
function HeaderViewModel() {
    var self = this;
    var server = ServerStub();
    self.token = AuthenticationViewModelKO.authenticationToken;
    self.dataFromServer = ko.observable();
    self.isAuthenticated = AuthenticationViewModelKO.isAuthenticated;
    self.user = AuthenticationViewModelKO.user;
    if(self.token()){
        self.dataFromServer(server.getMemberData((self.token())));
    };
    self.activePage = ko.observable("Home");
    self.logout = AuthenticationViewModelKO.logout;
    self.logOutMessage = AuthenticationViewModelKO.logOutMessage;
    self.logOutMod = AuthenticationViewModelKO.logoutMod;
    
    self.setActivePage = function(page){
        if(page){
            self.activePage(page);        
        }
        //Is checking necessary?
        if(AccountsViewModelKO && AccountsViewModelKO.selectedAccount() && AccountsViewModelKO.transactions()){
            AccountsViewModelKO.selectedAccount(0);
            AccountsViewModelKO.transactions([]);
        }
        if((PersonalInformationViewModelKO && PersonalInformationViewModelKO.showChangeMessage())||
           (PersonalInformationViewModelKO && PersonalInformationViewModelKO.showCancelledMessage())){
            PersonalInformationViewModelKO.showChangeMessage(false);
            PersonalInformationViewModelKO.showCancelledMessage(false);
        }
        TransactionsViewModelKO.showDoneMessage(false);
        TransactionsViewModelKO.transferAmount('');
    };

    self.isPageActive = function(page){
        return self.activePage()=== page;
    };
}

function initHeaderViewModel () {
    var bindElement = document.querySelector('[data-bind-id="header"]');
    if(bindElement){
        HeaderViewModelKO = new HeaderViewModel();
        ko.applyBindings(HeaderViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(HeaderViewModelKO);
};