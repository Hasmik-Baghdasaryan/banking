var HeaderViewModelKO;
function HeaderViewModel() {
    var self = this;
    self.activePage = ko.observable("Home");
    
    self.setActivePage = function(page){
        if(page){
            self.activePage(page);
        }
        //Is checking necessary?
        if(HomeViewModelKO && HomeViewModelKO.selectedAccount() && HomeViewModelKO.transactions()){
            HomeViewModelKO.selectedAccount(0);
            HomeViewModelKO.transactions([]);
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