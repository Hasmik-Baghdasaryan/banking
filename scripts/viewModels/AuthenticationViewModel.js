var AuthenticationViewModelKO;
function AuthenticationViewModel(){
    var self = this;
    var server = ServerStub();
    self.user = ko.observable('');
    self.userName = ko.observable().extend({required: true});
    self.userName ('');

    self.password = ko.observable().extend({required: true});
    self.password('');

    self.errorMessage = ko.observable(false);
    self.logOutMessage= ko.observable(false);

    self.errors = ko.validation.group(self, {deep: true, live: true, observable: true})

    self.authenticationToken = ko.observable(sessionStorage.getItem('clientToken') ? sessionStorage.getItem('clientToken') : false);
    self.authenticateUser = function(){
            var result = server.login(self.userName(), self.password());
            if(result) {
                self.authenticationToken(result);
                sessionStorage.setItem('clientToken', self.authenticationToken());
                location.reload();
            } else {
                self.errorMessage(true);
            }      
    };
    
    self.logoutMod = function(){
        self.logOutMessage(!self.logOutMessage());
    };

    self.logout = function(){
        server.logout(self.authenticationToken());
        sessionStorage.clear();
        location.reload();
    }
    if(self.authenticationToken()){
        self.user(server.validateToken(self.authenticationToken()));
    }
    
    self.isBtnDisabled = function(){
        return self.errors().length ? true : false;
    }

    self.isAuthenticated = ko.pureComputed(function(){
        return self.authenticationToken() ? true : false;
    });
};

function initAuthenticationViewModel(){
    var bindElement = document.querySelector('[data-bind-id="login"]');  
    if(bindElement){
        AuthenticationViewModelKO = new AuthenticationViewModel();
        ko.applyBindings(AuthenticationViewModelKO, bindElement);
    };
    rootModelKO.viewModels.push(AuthenticationViewModelKO);
};
