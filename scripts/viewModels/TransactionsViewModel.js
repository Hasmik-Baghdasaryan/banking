var TransactionsViewModelKO;
function TransactionsViewModel() {
    var self = this;
    var server = ServerStub();

    var transactionsSteps = {
        firstStep: 1,
        secondStep: 2,
        thirdStep: 3,
    };

    self.data = PersonalInformationViewModelKO.data;
    self.showData = HomeViewModelKO.showData;

    self.doneMessage = ko.observable('');
    self.errorMessage = ko.observable('');
    self.accounts = ko.observableArray([]);
    self.currentStep = ko.observable(1);

    self.transferAccountFrom = ko.observable().extend({ required: true });
    self.transferAccountFrom({});

    self.transferAccountTo = ko.observable().extend({ required: true });
    self.transferAccountTo({});

    self.transferAmount = ko.observable().extend({ required: true, ifOnlyDigits: self.transferAmount });
    self.transferAmount('');

    self.transferDescription = ko.observable().extend({ required: true });
    self.transferDescription('');

    self.errors = ko.validation.group(self, { deep: true, observable: true, live: true });

    self.getAccountDetails = function () {
        var accounts = [];
        if (self.data() && self.data().accounts) {
            self.data().accounts.forEach(function (account) {
                accounts.push(account.summary);
            })
        }
        return accounts;
    };

    self.accounts(self.getAccountDetails());

    self.optionText = function (item) {
        return item.type + ' ' + item.number;
    };

    self.nextButton = function () {
        switch (self.currentStep()) {
            case transactionsSteps.firstStep:
                self.currentStep(transactionsSteps.secondStep);
                break;
            case transactionsSteps.secondStep:
                self.currentStep(transactionsSteps.thirdStep);
                break;
            default:
                self.currentStep(transactionsSteps.firstStep);
        };
    };

    self.stepVisibility = function(step){
        return self.currentStep() === transactionsSteps[step];
    };
    
    self.nextButtonDisabled = function () {
        if((self.currentStep() === transactionsSteps.firstStep && (!self.transferAccountFrom.isValid() || !self.transferAccountTo.isValid())) || 
            (self.currentStep() === transactionsSteps.secondStep && self.errors().length)) {
                return true;
        };
    };

    self.backButton = function () {
        if (self.currentStep() > transactionsSteps.firstStep) {
            self.currentStep(self.currentStep() - 1);
        }
        self.errorMessage('');
    };

    self.formatAccount = function (account) {
        if (account) {
            return account.type + ' ' + account.number;
        }
    };
   
    self.nextAndDonebuttonVisibility = function(){
        var length = Object.keys(transactionsSteps).length;
        return self.currentStep()< length ? true : false;
    };

    self.transfer = function () {
        var transferData = {
            amount: self.transferAmount(),
            toAccount: self.transferAccountTo().number,
            fromAccount: self.transferAccountFrom().number,
            description: self.transferDescription(),
        };
        if (self.transferAccountFrom().balance >= self.transferAmount() && self.transferAccountFrom().number != self.transferAccountTo().number) {
            server.transferFunds(transferData, AuthenticationViewModelKO.authenticationToken());
            var accounts = (server.getAccounts(AuthenticationViewModelKO.authenticationToken()));
            AccountsViewModelKO.accounts(accounts);
            self.doneMessage('Done, Funds transfered');
            self.currentStep(1);
        } else {
            self.errorMessage('Error! Insufficient funds or invalid account!');
        }
        self.transferAccountFrom('');
        self.transferAccountTo('');
        self.transferAmount('');
        self.transferDescription('');
    };

    self.showDoneMessage = function(){
        return self.doneMessage() ? self.doneMessage() : '';
    };

    self.showErrorMessage = function(){
        return self.errorMessage() ? self.errorMessage() : '';
    };
};

function TransactionsViewModelKO() {
    var bindElement = document.querySelector('[data-bind-id="transactions"]');
    if (bindElement) {
        TransactionsViewModelKO = new TransactionsViewModel();
        ko.applyBindings(TransactionsViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(TransactionsViewModelKO);
};