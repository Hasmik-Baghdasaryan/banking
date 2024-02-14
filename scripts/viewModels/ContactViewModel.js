var ContactViewModelKO;
function ContactViewModel(){
    var self = this;
    self.isActive = HeaderViewModelKO.isPageActive;
    self.contactDetails = [
        {
            contactTitle: 'General enquiries',
            phone:  '012 22 22 22',
            workingHours: '24 hours a day',
            overseasPhone: '+37412 22 22 24',
            overseasWorkingHours: '24 hours a day',
        },
        {
            contactTitle: 'Lost or damaged card',
            phone:  '012 22 22 26',
            workingHours: '24 hours a day',
            overseasPhone: '+37412 22 22 26',
            overseasWorkingHours: '24 hours a day',
        }
    ]
};

function initContactViewModel(){
    var bindElement = document.querySelector('[data-bind-id="contact_section"]');
    if(bindElement){
        ContactViewModelKO = new ContactViewModel();
        ko.applyBindings(ContactViewModelKO, bindElement);
    }
    rootModelKO.viewModels.push(ContactViewModelKO);
};