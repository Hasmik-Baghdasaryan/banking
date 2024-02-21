ko.validation.init({
  errorMessageClass: 'koErrorMessage',
  errorElementClass: 'koErrorField',
  decorateInputElement: true,
});

ko.validation.rules['emailAddressFormatValidation'] = {
  validator: function (email) {
    var regExp = new RegExp(/^[\w\.\-]+@[\w]+\.[a-zA-Z]{2,4}$/gm);
    return regExp.test(email) ? true : false;
  },
  message: 'Invalid format'
};

ko.validation.rules['ifOnlyText'] = {
  validator: function (value) {
    var regExp = new RegExp(/^[A-Za-z ]+$/);
    return regExp.test(value) ? true : false;
  },
  message: 'Only letters allowed'
};

ko.validation.rules['ifOnlyDigits'] = {
  validator: function (value) {
    var regExp = new RegExp(/^[\d]+$/);
    return regExp.test(value) ? true : false;
  },
  message: 'Only digits allowed'
};

ko.validation.registerExtenders();