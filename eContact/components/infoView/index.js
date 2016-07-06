'use strict';



app.infoView = kendo.observable({
    onShow: function () {},
    afterShow: function () {},
    register: function () {
         if (!this.rut || this.rut.length < 8) {
            navigator.notification.alert("Introduzca su RUT.");
            return;
        }
        if (!this.password) {
            navigator.notification.alert("Introduzca su contraseña.");
            return;
        }else if (this.password.length < 4){
            navigator.notification.alert("Introduzca una contraseña de al menos 4 digitos.");
            return;
        }
        if (!this.nombre) {
            navigator.notification.alert("Introduzca su nombre.");
            return;
        }
        if (!this.apellido) {
            navigator.notification.alert("Introduzca su apellido.");
            return;
        }
        if (!this.email) {
            navigator.notification.alert("Introduzca su email.");
            return;
        }
        if (!this.celular) {
            navigator.notification.alert("Introduzca su celular.");
            return;
        }
        
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