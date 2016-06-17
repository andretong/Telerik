'use strict';

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
/*
VERSION CON RESTful WCF
*/
(function () {
    var wsHost_DATA = 'http://gesys-demo.e-contact.cl:8080/WS_IVRNodos/services/';
    var wsHost = 'http://10.33.66.30:8090/Service1.svc/rest/';
    var wsInput = {};

    app.autentication = function (username, password) {
        var token = username.substring(0, username.length - 1);
        var subtoken = username.substring(username.length - 1, username.length);
        var input = {
            "rut": token,
            "clave": password
        }

        var jsonCliente = {
            "rutCliente": token,
            "dv": subtoken,
        };
        sessionStorage.setItem("inputCliente", JSON.stringify(jsonCliente));

        $.ajax({
            url: wsHost + 'getPostAuthenticate',
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {
                    if (data.getPosAuthenticateResult.Authenticated == 1) {
                        sessionStorage.setItem("datosIVR", JSON.stringify(data));
                        window.location.href = "main.html";
                    } else {
                        navigator.notification.alert("Usuario y/o Contraseña incorrectas.");
                    }
                } else {
                    navigator.notification.alert("Usuario y/o Contraseña incorrectas.");
                }
            },
            error: function (error) {
                navigator.notification.alert(JSON.stringify(error));
            }

        });
    }


    app.consultarDatosCliente = function () {
        wsInput = JSON.parse(sessionStorage.getItem("inputCliente"));
        app.clienteDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: wsHost_DATA + "getInformacionCliente",
                    dataType: "json",
                    data: wsInput
                }
            },
            schema: {
                data: function (response) {
                    sessionStorage.setItem("cliente", JSON.stringify(response));
                }
            }
        });
    }

    app.consultarTreeIVR = function (treeID) {
        var input = {
            "treeID": treeID
        }

        $.ajax({
            url: wsHost + 'getPostTreeInfo',
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sessionStorage.setItem("tree", JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert(JSON.stringify(error));
            }

        });
        /*
        app.treeDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: wsHost + "getPostTreeInfo",
                    type: "POST",
                    dataType: "json",
                    data: input
                }
            },
            schema: {
                data: function (response) {
                    sessionStorage.setItem("tree", JSON.stringify(response));
                }
            }
        });
        */
    }


    app.consultarNodeAttributes = function (tree, nodo) {
        var input = {
            "treeID": tree,
            "nodeID": nodo
        }

        $.ajax({
            url: wsHost + 'getPostNodeAttributes',
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sessionStorage.setItem("nodeAttributes_" + nodo, JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert(JSON.stringify(error));
            }

        });

        /*
        app.nodeAttributesDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: wsHost + "getPostNodeAttributes",
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(input)
                }
            },
            schema: {
                data: function (response) {
                    sessionStorage.setItem("nodeActions", JSON.stringify(response));
                }
            }
        });
        */
    }

    app.consultarNode = function (tree, nodo) {
        var input = {
            "treeID": tree,
            "nodeID": nodo
        }

        $.ajax({
            url: wsHost + 'getPostNode',
            async: false,
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sessionStorage.setItem("node_" + nodo, JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert(JSON.stringify(error));
            }

        });
        /*
        app.nodeDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: wsHost + "getPostNode",
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(input)
                }
            },
            schema: {
                data: function (response) {
                    sessionStorage.setItem("nodeActions", JSON.stringify(response));
                }
            }
        });
        */
    }

    app.consultarNodeActions = function (nodo) {
        var input = {
            "nodeID": nodo
        }

        $.ajax({
            url: wsHost + 'getPostNodeActions',
            async: false,
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sessionStorage.setItem("nodeActions_" + nodo, JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert(JSON.stringify(error));
            }

        });
        /*
        app.nodeActionsDS = new kendo.data.DataSource({
            transport: {
                read: {
                    url: wsHost + "getPostNodeActions",
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(input)
                }
            },
            schema: {
                data: function (response) {
                    sessionStorage.setItem("nodeActions", JSON.stringify(response));
                }
            }
        });
        */
    }


    app.genesysVirtualHold = function (phone, queue) {

        var cliente = JSON.parse(sessionStorage.getItem("cliente"));

        var keys = new Array();
        keys[0] = "RUT";
        keys[1] = "Nombre";
        keys[2] = "Categoria";
        keys[3] = "Segmento";
        keys[4] = "Aplicacion";
        keys[5] = "Opcion";

        var values = new Array();
        values[0] = cliente.rut + '-' + cliente.dvRut;
        values[1] = cliente.nombre;
        values[2] = cliente.categoria;
        values[3] = cliente.segmento;
        values[4] = "Mobile Telerik";
        values[5] = "1";

        var parametros = {
            "idServiceClient": '1',
            "phoneNumber": phone,
            "queue": queue,
            "key": keys,
            "value": values
        };

        $.ajax({
            url: wsHost_DATA + 'doVirtualHold',
            type: 'POST',
            traditional: true,
            data: parametros, // or $('#myform').serializeArray()
            success: function (data) {
                if (data.errCode == 0)
                    navigator.notification.alert("Se ha agendado la llamada, nuestros agentes lo van a contactar a la brevedad");
                else {
                    navigator.notification.alert("La llamada no puede ser agendada, por favor, intente nuevamente.");
                }
                //navigator.notification.alert(JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert("La llamada no puede ser agendada, por favor, intente nuevamente.");
                //navigator.notification.alert(JSON.stringify(error));
            }

        });
    }

    app.genesysChat = function (phone, url) {
        var cliente = JSON.parse(sessionStorage.getItem("cliente"));
        var url2 = "https://c2chat.e-contact.cl/MobileChat/Home/index?firstName=" + cliente.nombre + "&lastName=" + cliente.categoria + "&mobile=" + phone;
        $('#chatFrame').attr('src', url2);
        window.location.href = "#chat";
    }

    app.genesysTransferencia = function (phone) {
        window.open("tel:" + phone);
    }

    app.logout = function () {
        sessionStorage.clear();
        window.location.href = "index.html";
    }

})();
// END_CUSTOM_CODE_settingsView