'use strict';



app.infoView = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    register: function () {
        app.registrarCliente(this.rut, this.password, this.nombre, this.apellido, this.email, this.celular);

        app.infoView.set('rut', '');
        app.infoView.set('password', '');
        app.infoView.set('nombre', '');
        app.infoView.set('apellido', '');
        app.infoView.set('email', '');
        app.infoView.set('celular', '');

    }
});

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.infoView.set('title', 'Ingrese sus Datos');


})();
// END_CUSTOM_CODE_settingsView