var HeaderViewModelKO;
function HeaderViewModel() {
    var self = this;
    self.activePage = ko.observable("Home");
    self.setActivePage = function(page){
        self.activePage(page);
    };
    self.isPageActive = function(page){
        return self.activePage()=== page;
    }
}

function initHeaderViewModel () {
    var bindElement = document.querySelector('[data-bind-id="header"]');
    if(bindElement){
        HeaderViewModelKO = new HeaderViewModel();
        ko.applyBindings(HeaderViewModelKO, bindElement)
    }
    rootModelKO.viewModels.push(HeaderViewModelKO);
};