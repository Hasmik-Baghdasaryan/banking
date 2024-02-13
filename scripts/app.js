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
    if(typeof initHeaderViewModel != 'undefined'){
      initHeaderViewModel();
    }
    if(typeof initHomeViewModel != 'undefined'){
      initHomeViewModel();
    }
  };
  
  window.addEventListener('load', function () {
    //root init
    DocumentRootModelInit();
  });

  var bindElement = document.querySelector('[data-bind-id="span"]');
  if(bindElement){
    ko.applyBindings(rootModelKO, bindElement)
  }