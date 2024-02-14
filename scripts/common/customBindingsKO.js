ko.bindingHandlers.formatBalanceCurrency={
    update: function(element, valueAccessor){
        var value = ko.utils.unwrapObservable(valueAccessor()) ||  0;
        var formattedText = "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        $(element).text(formattedText);
    }
}