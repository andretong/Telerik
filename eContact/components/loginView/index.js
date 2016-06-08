'use strict';


app.loginView = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    submit: function () {
        if (!this.username) {
            navigator.notification.alert("Introduzca su RUT.");
            return;
        }
        if (!this.password) {
            navigator.notification.alert("Introduzca su contraseña.");
            return;
        }
        app.autentication(this.username, this.password);                   
    }
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    
})();
// END_CUSTOM_CODE_homeView