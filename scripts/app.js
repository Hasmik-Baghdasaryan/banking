var rootModelKO;
function DocumentRootModelKO(){
    var self = this;
    self.viewModels = ko.observableArray([]);
};

function DocumentRootModelInit() {
    if (typeof rootModelKO == 'undefined') {
        rootModelKO = new DocumentRootModelKO();
        initModules();
    }
};
  
function initModules() {
    if(typeof initAuthenticationViewModel != 'undefined'){
      initAuthenticationViewModel();
    };
    if(typeof initHeaderViewModel != 'undefined'){
      initHeaderViewModel();
    };
    if(typeof initHomeViewModel != 'undefined'){
      initHomeViewModel();
    };
    if(typeof initAccountViewModel != 'undefined'){
      initAccountViewModel();
    };
    if(typeof initPersonalInformationViewModel != 'undefined'){
      initPersonalInformationViewModel();
    };
    if(typeof initContactViewModel != 'undefined') {
      initContactViewModel();
    };
    if(typeof initAboutViewModel != 'undefined'){
      initAboutViewModel();
    };
    if(typeof TransactionsViewModelKO != 'undefined'){
      TransactionsViewModelKO();
    }
};
  
window.addEventListener('load', function () {
    //root init
    DocumentRootModelInit();
});

//is it right? There isn't any real element to bind
var bindElement = document.querySelector('[data-bind-id="span"]');
  if(bindElement){
    ko.applyBindings(rootModelKO, bindElement);
}