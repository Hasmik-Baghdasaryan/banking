var PersonalInformationViewModelKO;
function PersonalInformationViewModel() {
    var self = this;
    var server = ServerStub();

    self.showData = HomeViewModelKO.showData;
    self.token = HeaderViewModelKO.authenticationToken;
    self.data = ko.observable((self.token() && server && server.getMemberData ? server.getMemberData(self.token()) : null));
   
    self.personalData = self.data() && self.data().personal ? self.data().personal : null;
    self.showChangeMessage = ko.observable(false);
    self.showCancelledMessage = ko.observable(false);
    self.isPersonalInfoEditMode = ko.observable(false);
    self.temporaryInfo = ko.observable({});

    self.firstName = ko.observable().extend({ required: true, ifOnlyText: self.firstName });
    self.firstName(self.personalData && self.personalData.firstName ? self.personalData.firstName : '');

    self.lastName = ko.observable().extend({ required: true, ifOnlyText: self.lastName });
    self.lastName(self.personalData && self.personalData.lastName ? self.personalData.lastName : '');

    self.phoneNumber = ko.observable().extend({ required: true, ifOnlyDigits: self.phoneNumber, minLength: 4, maxLength: 9 });
    self.phoneNumber(self.personalData && self.personalData.phoneNumber ? self.personalData.phoneNumber : '');

    self.emailAddress = ko.observable().extend({ required: true, emailAddressFormatValidation: self.emailAddress });
    self.emailAddress(self.personalData && self.personalData.emailAddress ? self.personalData.emailAddress : '');

    self.city = ko.observable().extend({ required: true, ifOnlyText: self.city });
    self.city(self.personalData && self.personalData.address.city ? self.personalData.address.city : '');

    self.country = ko.observable().extend({ required: true, ifOnlyText: self.country });
    self.country(self.personalData && self.personalData.address.country ? self.personalData.address.country : '');

    self.street = ko.observable().extend({ required: true });
    self.street(self.personalData && self.personalData.address.street ? self.personalData.address.street : '');

    self.postCode = ko.observable().extend({ required: true, ifOnlyDigits: self.postCode, maxLength: 4 });
    self.postCode((self.personalData && self.personalData.address.postCode ? self.personalData.address.postCode : ''));

    self.personalInformation = function () {
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
                postCode: self.postCode(),
            },
        };
    };
    
    self.createTemporaryInfo = function(information){
        return self.temporaryInfo({
            firstName: information.firstName,
            lastName: information.lastName,
            phoneNumber: information.contactDetails.phoneNumber,
            emailAddress: information.contactDetails.emailAddress,
            city: information.address.city,
            country: information.address.country,
            street: information.address.street,
            postCode: information.address.postCode,
        });
    };
    
    self.cancelInfoUpdate = function(){
            self.firstName(self.temporaryInfo().firstName || ''),
            self.lastName(self.temporaryInfo().lastName || ''),
            self.phoneNumber(self.temporaryInfo().phoneNumber || ''),
            self.emailAddress(self.temporaryInfo().emailAddress || ''),
            self.city(self.temporaryInfo().city || ''),
            self.country(self.temporaryInfo().country || ''),
            self.street(self.temporaryInfo().street || ''),
            self.postCode(self.temporaryInfo().postCode || '')
    };

    self.enableEditPersonalInfo = function () {
        self.createTemporaryInfo(self.personalInformation());
        self.showCancelledMessage(false);
        self.isPersonalInfoEditMode(true);
    };

    self.cancelEditPersonalInfo = function () {
        self.isPersonalInfoEditMode(false);
        self.showChangeMessage(false);
        self.showCancelledMessage(true);
        self.cancelInfoUpdate();
    };

    self.updatePersonalInfo = function () {
        server.updatePersonalInformation(self.personalInformation(), self.token());
        self.isPersonalInfoEditMode(false);
        self.showChangeMessage(true);
    };

    self.errors = ko.validation.group(self, { deep: true, observable: true, live: true });

    self.isSubmitBtnEnabled = function () {
        return !self.errors().length ? true : false;
    };
};

function initPersonalInformationViewModel() {
    var bindingElenent = document.querySelector('[data-bind-id="personal_information"]');
    if (bindingElenent) {
        PersonalInformationViewModelKO = new PersonalInformationViewModel();
        ko.applyBindings(PersonalInformationViewModelKO, bindingElenent);
    }
    rootModelKO.viewModels.push(PersonalInformationViewModelKO);
};