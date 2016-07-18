'use strict';

app.contactoPublicoView = kendo.observable({
    onShow: function () {
        $("#contactListActions").show();
        $("#contactInputCallback").hide();
        $("#chatbot").hide();

        $("#datetimepicker").kendoDateTimePicker({
            format: "yyyy/MM/dd hh:mm tt",
            value: new Date(),
            interval: 15,
            animation: false
        });


        var actions2 = [
            {
                "ActionType": "CALLBACK",
                "ActionID": "CALLBACK_ECONTACT"
            },
            {
                "ActionType": "CHATBOT",
                "ActionID": "CHATBOT_ECONTACT"
            }
        ];


        var dataSourceActions = new kendo.data.DataSource({
            data: actions2
        });
        app.contactoPublicoView.set('dataSourceActions', dataSourceActions);

    },
    afterShow: function () {

    },
    doVirtualHold: function () {
        var rut = this.rut.substring(0, this.rut.length - 1);
        var dv = this.rut.substring(this.rut.length - 1, this.rut.length);

        var cliente = {
            "rut": rut,
            "dvRut": dv,
            "nombre": this.nombre,
            "apellido": this.apellido,
            "email": this.email,
            "telefono": this.celular,
            "categoria": "",
            "segmento": ""
        }
        sessionStorage.setItem("cliente", JSON.stringify(cliente));

        var telefono = this.celular;
        var numeroTransferencia = "9001";
        app.genesysVirtualHold(telefono, numeroTransferencia);
        $("#contactListActions").fadeIn();
        $("#contactInputCallback").fadeOut();
    },
    close: function () {
        $("#contactListActions").fadeIn();
        $("#contactInputCallback").fadeOut();
    },
    closeChat: function () {
        $("#contactListActions").fadeIn();
        $("#chatbot").fadeOut();

        $("#messages").empty();

    },
    sendMessage: function () {
        $("#messages").append("<p><b>Tu: </b>" + this.mensaje + "</p>");
        app.watsonConversation(this.mensaje);

        var watson_response = JSON.parse(sessionStorage.getItem("watson_response"));
        var message = watson_response.response;
        $("#messages").append("<p><b>AVRI: </b>" + message + "</p>");

        app.contactoPublicoView.set('mensaje', '');
    }
});

// START_CUSTOM_CODE_contactsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.contactoPublicoView.set('title', 'Contacto');

    app.contactoPublicoView.set('contactCenter', function (e) {
        if (e.data.ActionType == 'CALLBACK') {
            $("#contactListActions").fadeOut();
            $("#contactInputCallback").fadeIn();
        }
        if (e.data.ActionType == 'CHATBOT') {
            $("#contactListActions").fadeOut();
            $("#chatbot").fadeIn();

            app.watsonIniciar();

            var watson = JSON.parse(sessionStorage.getItem("watson"));

            var message = watson.response;
            $("#messages").append("<p><b>AVRI: </b>" + message + "</p>");
        }
    });


    $(document).keypress(function (e) {
        if (e.which == 13) {
            var msg = $("#messageToSend").val();
            $("#messages").append("<p><b>Tu: </b>" + msg + "</p>");            
            app.watsonConversation(msg);

            var watson_response = JSON.parse(sessionStorage.getItem("watson_response"));
            var message = watson_response.response;
            $("#messages").append("<p><b>AVRI: </b>" + message + "</p>");
            $("#messageToSend").val('');            
        }
    });


})();
// END_CUSTOM_CODE_contactsView