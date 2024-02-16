var HomeViewModelKO;
function HomeViewModel(){
    var self = this;
 
    self.isActive = HeaderViewModelKO.isPageActive; 
    self.activeTab = ko.observable('Accounts');
       
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