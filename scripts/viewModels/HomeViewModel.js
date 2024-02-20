var HomeViewModelKO;
function HomeViewModel(){
    var self = this;
 
    self.isActive = HeaderViewModelKO.isPageActive; 
    self.activeTab = ko.observable('Accounts');
    self.isAuthenticated = AuthenticationViewModelKO.isAuthenticated;
           
    self.tabActive = function(tab){
        AccountsViewModelKO.selectedAccount('');
        AccountsViewModelKO.transactions([]);
        PersonalInformationViewModelKO.editPersonalInformation(false);
        TransactionsViewModelKO.transferAccountFrom('');
        TransactionsViewModelKO.transferAccountTo('');
        TransactionsViewModelKO.transferAmount('');
        TransactionsViewModelKO.transferDescription('');
        TransactionsViewModelKO.transferAmount('');
        TransactionsViewModelKO.showDoneMessage(false);
        if(tab){
            self.activeTab(tab);
        }
    };

    self.isTabActive = function(tab) {
        if(tab) {
            return self.activeTab() === tab;
        }
    };

    self.showData = function(tab, page){
        return (self.isTabActive(tab) && self.isActive(page)) ? true : false
    }
};

function initHomeViewModel(){
    var bindElement = document.querySelector('[data-bind-id="home_section"]');
    if(bindElement){
        HomeViewModelKO = new HomeViewModel();
        ko.applyBindings(HomeViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(HomeViewModelKO);
};