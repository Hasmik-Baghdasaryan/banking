var AuthenticationViewModelKO;

function AuthenticationViewModel() {
    var self = this;
    var server = ServerStub();

    self.dataFromServer = ko.observable({});
    self.user = ko.observable('');

    self.userName = ko.observable().extend({ required: true });
    self.userName('');

    self.password = ko.observable().extend({ required: true });
    self.password('');

    self.errorMessage = ko.observable(false);
    self.logOutMessage = ko.observable(false);

    self.errors = ko.validation.group(self, { deep: true, live: true, observable: true });

    self.authenticationToken = ko.observable(sessionStorage.getItem('clientToken') ? sessionStorage.getItem('clientToken') : false);

    self.isAuthenticated = ko.pureComputed(function () {
        return self.authenticationToken() ? true : false;
    });

    self.authenticateUser = function () {
        if (server && server.login && server.login(self.userName(), self.password())) {
            var result = server.login(self.userName(), self.password());
            self.authenticationToken(result);
            sessionStorage.setItem('clientToken', self.authenticationToken());
            location.reload();
        } else {
            self.errorMessage(true);
        }
    };

    self.dataFromServer(self.authenticationToken() && server && server.getMemberData ? server.getMemberData(self.authenticationToken()) : null);
    self.user(self.authenticationToken() && server && server.validateToken ? server.validateToken(self.authenticationToken()) : null);

    self.logOutMode = function () {
        self.logOutMessage(!self.logOutMessage());
    };

    self.logOut = function () {
        sessionStorage.clear();
        location.reload();
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
