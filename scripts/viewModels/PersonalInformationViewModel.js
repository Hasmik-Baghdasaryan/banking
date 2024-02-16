var PersonalInformationViewModelKO;
function PersonalInformationViewModel(){
    var self = this;
    self.data = HeaderViewModelKO.dataFromServer;
    self.showData = HomeViewModelKO.showData;
    self.personalData = self.data && self.data.personal ? self.data.personal : null;
    self.personalInformation = {
        firstName: ko.observable(self.personalData && self.personalData.firstName ? self.personalData.firstName : ''),
        lastName: ko.observable(self.personalData && self.personalData.lastName ? self.personalData.lastName : ''),
        phoneNumber: ko.observable(self.personalData && self.personalData.phoneNumber ? self.personalData.phoneNumber : ''),
        emailAddress: ko.observable(self.personalData && self.personalData.emailAddress ? self.personalData.emailAddress : ''),
        address: 
            {
                city: ko.observable(self.personalData && self.personalData.address.city ? self.personalData.address.city : ''),
                country: ko.observable(self.personalData && self.personalData.address.country ? self.personalData.address.country : ''),
                street: ko.observable(self.personalData && self.personalData.address.street ? self.personalData.address.street : ''),
                postCode: ko.observable(self.personalData && self.personalData.address.postCode ? self.personalData.address.postCode : '')
            }
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