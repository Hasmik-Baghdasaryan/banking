var HeaderViewModelKO;
function HeaderViewModel() {
    var self = this;
    var server = ServerStub();
    self.dataFromServer = server.getMemberData();
    self.activePage = ko.observable("Home");
    
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