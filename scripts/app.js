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
    
  };
  
  window.addEventListener('load', function () {
    //root init
    DocumentRootModelInit();
  });

  var bindElement = '';
  if(bindElement){
    ko.applyBindings(rootModelKO, bindElement)
  }