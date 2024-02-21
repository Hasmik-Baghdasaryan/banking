var AboutViewModelKO;
function AboutViewModel() {
    var self = this;
    self.isActive = HeaderViewModelKO.isPageActive;
    self.isAuthenticated = AuthenticationViewModelKO.isAuthenticated;
};

function initAboutViewModel() {
    var bindElement = document.querySelector('[ data-bind-id="about_section"]');
    if (bindElement) {
        AboutViewModelKO = new AboutViewModel();
        ko.applyBindings(AboutViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(AboutViewModelKO);
};