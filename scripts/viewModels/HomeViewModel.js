var HomeViewModelKO;
function HomeViewModel(){
    var self = this;
    self.isActive = HeaderViewModelKO.isPageActive;
    self.activeTab = ko.observable('Accounts');
    self.tabActive = function(tab){
        self.activeTab(tab);
    }
    self.isTabActive = function(tab){
        return self.activeTab()===tab;
    }
}

function initHomeViewModel(){
    var bindElement = document.querySelector('[data-bind-id="home_section"]');
    if(bindElement){
        HomeViewModelKO = new HomeViewModel();
        ko.applyBindings(HomeViewModelKO, bindElement)
    }
    rootModelKO.viewModels.push(HomeViewModelKO);
}