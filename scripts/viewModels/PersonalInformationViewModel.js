var PersonalInformationViewModelKO;
function PersonalInformationViewModel(){
    var self = this;
    var server = ServerStub();
    self.info = HeaderViewModelKO.dataFromServer;
    self.data = ko.observable(self.info);
    self.showData = HomeViewModelKO.showData;
    self.personalData = self.data() && self.data().personal ? self.data().personal : null;
    self.showChangeMessage = ko.observable(false);
    self.showCancelledMessage = ko.observable(false);
    self.editPersonalInformation = ko.observable(false);

    self.firstName = ko.observable().extend({required: true, ifOnlyText: self.firstName});
    self.firstName(self.personalData && self.personalData.firstName ? self.personalData.firstName : '');

    self.lastName =  ko.observable().extend({required: true, ifOnlyText: self.lastName});
    self.lastName(self.personalData && self.personalData.lastName ? self.personalData.lastName : '');

    self.phoneNumber = ko.observable().extend({required: true, ifOnlyDigits: self.phoneNumber,  minLength: 4, maxLength: 9});
    self.phoneNumber(self.personalData && self.personalData.phoneNumber ? self.personalData.phoneNumber : '');

    self.emailAddress = ko.observable().extend({required: true, emailAddressFormatValidation: self.emailAddress});
    self.emailAddress(self.personalData && self.personalData.emailAddress ? self.personalData.emailAddress : '');

    self.city = ko.observable().extend({required: true, ifOnlyText: self.city});
    self.city(self.personalData && self.personalData.address.city ? self.personalData.address.city : '');

    self.country = ko.observable().extend({required: true, ifOnlyText: self.country});
    self.country(self.personalData && self.personalData.address.country ? self.personalData.address.country : '');

    self.street = ko.observable().extend({required: true});
    self.street(self.personalData && self.personalData.address.street ? self.personalData.address.street : '');

    self.postCode = ko.observable().extend({required: true, ifOnlyDigits: self.postCode, maxLength: 4});
    self.postCode((self.personalData && self.personalData.address.postCode ? self.personalData.address.postCode : ''));

    //any better way ?
    self.temporaryInformation = {
        firstNameTemp: '',
        lastNameTemp: '',
        phoneNumberTemp: '',
        emailAddressTemp: '',
        cityTemp: '',
        countryTemp: '',
        streetTemp: '',
        postCodeTemp: '',
    };

    self.personalInformation = function(){
        return {
            firstName: self.firstName(),
            lastName: self.lastName(),
            contactDetails: {
                phoneNumber: self.phoneNumber(),
                emailAddress: self.emailAddress(),
            },
            address: {
                city: self.city(),
                country: self.country(),
                street: self.street(),
                postCode: self.postCode()
            },
        };
    };
 
    self.enableEditPersonalInfo = function(){
        //any better way?
        self.temporaryInformation.firstNameTemp = self.firstName();
        self.temporaryInformation.lastNameTemp = self.lastName();
        self.temporaryInformation.phoneNumberTemp = self.phoneNumber();
        self.temporaryInformation.emailAddressTemp = self.emailAddress();
        self.temporaryInformation.cityTemp = self.city();
        self.temporaryInformation.countryTemp = self.country();
        self.temporaryInformation.streetTemp = self.street();
        self.temporaryInformation.postCodeTemp = self.postCode();
        self.showCancelledMessage(false);
        self.editPersonalInformation(true);
    };
    
    self.disableEditPersonalInfo = function(){
        self.editPersonalInformation(false);
        self.showChangeMessage(false);
        self.showCancelledMessage(true);
        //any better way?
        self.firstName(self.temporaryInformation.firstNameTemp || '');
        self.lastName(self.temporaryInformation.lastNameTemp || '');
        self.phoneNumber(self.temporaryInformation.phoneNumberTemp || '');
        self.emailAddress(self.temporaryInformation.emailAddressTemp || ''),
        self.city(self.temporaryInformation.cityTemp || '');
        self.country(self.temporaryInformation.countryTemp || '');
        self.street(self.temporaryInformation.streetTemp || '');
        self.postCode(self.temporaryInformation.postCodeTemp || '');
    };

    self.updatePersonalInfo = function(){
        server.updatePersonalInformation((self.personalInformation()));
        self.editPersonalInformation(false);
        self.showChangeMessage(true);
    };

    self.errors = ko.validation.group(self, {deep: true, observable: true, live: true});
    self.isSubmitBtnEnabled = function(){
        return !self.errors().length ? true : false;
    };
};

function initPersonalInformationViewModel(){
    var bindingElenent = document.querySelector('[data-bind-id="personal_information"]');
    if(bindingElenent){
        PersonalInformationViewModelKO = new PersonalInformationViewModel();
        ko.applyBindings(PersonalInformationViewModelKO, bindingElenent);
    }
    rootModelKO.viewModels.push(PersonalInformationViewModelKO);
};