var HomeViewModelKO;
function HomeViewModel(){
    var self = this;
    var server = ServerStub();
    var data = server.getMemberData();
    self.isActive = HeaderViewModelKO.isPageActive;
    self.activeTab = ko.observable('Accounts');
    self.tabActive = function(tab){
        self.activeTab(tab);
    }
    self.isTabActive = function(tab){
        return self.activeTab()===tab;
    }
    self.accounts = ko.observableArray([]);
    self.getAccountDetails = function(){
        var accounts = [];
         data.accounts.forEach(function(account){
            accounts.push({accountDetails: account.summary, transactions: account.transactions})
        })
        return accounts;
    };

    self.accountTransactions = ko.observableArray([]);
    self.accounts(self.getAccountDetails());
}

function initHomeViewModel(){
    var bindElement = document.querySelector('[data-bind-id="home_section"]');
    if(bindElement){
        HomeViewModelKO = new HomeViewModel();
        ko.applyBindings(HomeViewModelKO, bindElement)
    }
    rootModelKO.viewModels.push(HomeViewModelKO);
}