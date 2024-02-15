var HomeViewModelKO;
function HomeViewModel(){
    var self = this;
    var server = ServerStub();
    var data = server.getMemberData(); 

    self.isActive = HeaderViewModelKO.isPageActive; 
    self.activeTab = ko.observable('Accounts');
    self.accounts = ko.observableArray([]);
    self.selectedAccount = ko.observable();
    self.transactions = ko.observableArray([]);

    self.tabActive = function(tab){
        if(tab){
            self.activeTab(tab);
        }
    };

    self.isTabActive = function(tab) {
        if(tab) {
            return self.activeTab() === tab;
        }
    };

    self.getAccountDetails = function(){
        var accounts = [];
        if(data && data.accounts) {
            data.accounts.forEach(function(account){
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
}

function initHomeViewModel(){
    var bindElement = document.querySelector('[data-bind-id="home_section"]');
    if(bindElement){
        HomeViewModelKO = new HomeViewModel();
        ko.applyBindings(HomeViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(HomeViewModelKO);
};