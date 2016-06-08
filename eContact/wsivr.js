'use strict';

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    var wsHost = 'http://gesys-demo.e-contact.cl:8080/WS_IVRNodos/services/';

    app.autentication = function (username, password) {
        var token = username.substring(0, username.length - 1);
        var subtoken = username.substring(username.length - 1, username.length);
        var jsonData = {
            "token": token,
            "subtoken": subtoken,
            "secret": password
        };

        $.ajax({
            url: wsHost + 'authenticate',
            type: 'POST',
            data: jsonData, // or $('#myform').serializeArray()
            success: function (data) {
                //var respuesta = JSON.stringify(data);
                if (data.authenticated) {
                    window.location.href = "main.html";
                } else {
                    navigator.notification.alert("Usuario y/o Contraseña incorrectas.");
                }
            },
            error: function (error) {
                alert(JSON.stringify(error));
                return false;
            }

        });
    }


    app.nodeActionsDSv2 = function () {
        $.ajax({
            url: wsHost + 'getNodeActions',
            type: 'GET',
            data: 'nodeID=10', // or $('#myform').serializeArray()
            success: function (data) {
                var respuesta = JSON.stringify(data);
                navigator.notification.alert(respuesta);

                app.infoView.set('title', 'Información ' + respuesta);
            },
            error: function (error) {
                alert(JSON.stringify(error));
            }

        });
    }

    app.nodeActionsDS = new kendo.data.DataSource({
        transport: {
            read: {
                url: "http://gesys-demo.e-contact.cl:8080/WS_IVRNodos/services/getNodeActions",
                dataType: "json",
                data: "nodeID=10"
            }
        },
        schema: {
            data: function (response) {
                return JSON.stringify(response);
            }
        }
    });
})();
// END_CUSTOM_CODE_settingsView