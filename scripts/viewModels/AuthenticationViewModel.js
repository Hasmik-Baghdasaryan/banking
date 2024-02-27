var AuthenticationViewModelKO;

function AuthenticationViewModel() {
    var self = this;
    var server = ServerStub();

    self.userName = ko.observable().extend({ required: true });
    self.userName('');

    self.password = ko.observable().extend({ required: true });
    self.password('');

    self.errorMessage = ko.observable(false);
 
    self.errors = ko.validation.group(self, { deep: true, live: true, observable: true });

    self.authenticationToken = ko.observable(false);

    self.authenticateUser = function () {
        if (server && server.login && server.login(self.userName(), self.password())) {
            var result = server.login(self.userName(), self.password());
            self.authenticationToken(result);
            setItemToSessionStorage('clientToken', self.authenticationToken());
            location.replace(baseUrl+'bankingPortal.html')
        } else {
            self.errorMessage(true);
        }
    };

    self.isBtnDisabled = function () {
        return self.errors().length ? true : false;
    };
};

function initAuthenticationViewModel() {
    var bindElement = document.querySelector('[data-bind-id="login"]');
    if (bindElement) {
        AuthenticationViewModelKO = new AuthenticationViewModel();
        ko.applyBindings(AuthenticationViewModelKO, bindElement);
    };
    rootModelKO.viewModels.push(AuthenticationViewModelKO);
};
