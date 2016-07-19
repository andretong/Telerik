'use strict';

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
/*
VERSION CON RESTful WCF
*/
(function () {
    var wsHost_DATA = 'http://gesys-demo.e-contact.cl:8080/WS_IVRNodos/services/';
    var wsHost = 'https://wcfguimodel.e-contact.cl/Service1.svc/rest/';
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
            async: false,
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null && data.getPosAuthenticateResult != null) {
                    if (data.getPosAuthenticateResult.Authenticated == 1) {
                        sessionStorage.setItem("datosIVR", JSON.stringify(data));

                        var cliente = {
                            "rut": token,
                            "dvRut": subtoken,
                            "nombre": data.getPosAuthenticateResult.Nombres,
                            "apellido": data.getPosAuthenticateResult.Apellidos,
                            "email": data.getPosAuthenticateResult.Email,
                            "telefono": data.getPosAuthenticateResult.Telefono,
                            "categoria": "",
                            "segmento": ""
                        }
                        sessionStorage.setItem("cliente", JSON.stringify(cliente));

                        window.location.href = "main.html";
                    } else {
                        navigator.notification.alert("Usuario y/o Contraseña incorrectas.");
                    }
                } else {
                    navigator.notification.alert("Usuario y/o Contraseña incorrectas.");
                }
            },
            error: function (error) {
                navigator.notification.alert("Estimado usuario, ha ocurrido un error.");
            }

        });
    }

    app.registrarCliente = function (username, password, nombre, apellido, email, telefono) {
        var rut = username.substring(0, username.length - 1);
        var dv = username.substring(username.length - 1, username.length);
        var input = {
            "rut": rut,
            "dv": dv,
            "nombres": nombre,
            "apellidos": apellido,
            "email": email,
            "telefono": telefono,
            "clave": password
        }

        $.ajax({
            url: wsHost + 'updClienteMovil',
            async: false,
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.updClienteMovilResult != null) {
                    if (data.updClienteMovilResult == '0') {
                        navigator.notification.alert("Se ha registrado éxitosamente");
                    } else {
                        navigator.notification.alert("Lo sentimos, en estos momentos no hemos podido registrar su cuenta.");
                    }
                }
            },
            error: function (error) {
                navigator.notification.alert("Estimado usuario, ha ocurrido un error.");
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
            async: false,
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sessionStorage.setItem("tree", JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert("Estimado usuario, ha ocurrido un error.");
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
            async: false,
            type: 'POST',
            //data: jsonData,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sessionStorage.setItem("nodeAttributes_" + nodo, JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert("Estimado usuario, ha ocurrido un error.");
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
                navigator.notification.alert("Estimado usuario, ha ocurrido un error.");
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

    app.consultarNodeActions = function (tree, nodo) {
        var input = {
            "treeID": tree,
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
                navigator.notification.alert("Estimado usuario, ha ocurrido un error.");
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


    app.consultarActionsAttributes = function (tree, action) {
        var input = {
            "treeID": tree,
            "actionID": action
        }

        $.ajax({
            url: wsHost + 'getPostActionAttributes',
            type: 'POST',
            //data: jsonData,
            async: false,
            data: JSON.stringify(input),
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                sessionStorage.setItem("actionAttributes_" + action, JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert("Estimado usuario, ha ocurrido un error.");
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
        values[1] = cliente.nombre + ' ' + cliente.apellido;
        values[2] = cliente.categoria;
        values[3] = cliente.segmento;
        values[4] = "Mobile Telerik";
        values[5] = "1";

        var parametros = {
            "idServiceClient": '1',
            "phoneNumber": '09' + phone,
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

    app.genesysStatistic = function (statisticName, statisticObjectType, statisticObjectName) {

        var parametros = {
            "statisticName": statisticName,
            "statisticObjectType": statisticObjectType,
            "statisticObjectName": statisticObjectName,
            "tenant": "Resources"
        };

        $.ajax({
            url: wsHost_DATA + 'getStatistic',
            async: false,
            type: 'POST',
            traditional: true,
            data: parametros, // or $('#myform').serializeArray()
            success: function (data) {
                if (data.errCode == 0) {
                    //sessionStorage.setItem("statistic_" + statisticName, JSON.stringify(data));
                    sessionStorage.setItem("statistic_" + statisticName, data.statisticValue);
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
        //var phone = datosIVR.Telefono;
        var url2 = url + "?firstName=" + cliente.nombre + "&lastName=" + cliente.apellido + "&mobile=" + phone;
        $('#chatFrame').attr('src', url2);
        window.location.href = "#chat";
    }

    app.genesysCallback = function (actionID, fecha) {

        var tree = JSON.parse(sessionStorage.getItem("tree"));
        var treeID = tree.getPostTreeInfoResult.TreeID;
        app.consultarActionsAttributes(treeID, actionID);

        var actionAttributes = JSON.parse(sessionStorage.getItem("actionAttributes_" + actionID));
        var numeroTransferencia = actionAttributes.getPostActionAttributesResult[0].NumeroTransferencia;

        var datosIVR = JSON.parse(sessionStorage.getItem("datosIVR"));
        var phone = datosIVR.getPosAuthenticateResult.Telefono;

        var beginInterval = fecha + ':00';
        var endInterval = fecha + ':59';

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
        values[1] = cliente.nombre + ' ' + cliente.apellido;
        values[2] = cliente.categoria;
        values[3] = cliente.segmento;
        values[4] = "Mobile Telerik";
        values[5] = "1";

        var parametros = {
            "idServiceClient": '1',
            "phoneNumber": '09' + phone,
            "queue": numeroTransferencia,
            "beginInterval": beginInterval,
            "endInterval": endInterval,
            "key": keys,
            "value": values
        };

        $.ajax({
            url: wsHost_DATA + 'doCallback',
            async: false,
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

    app.genesysTransferencia = function (phone) {
        window.open("tel:" + phone);
    }

    app.logout = function () {
        sessionStorage.clear();
        window.location.href = "index.html";
    }

    app.ejecutarAccion = function (e) {
        var datosIVR = JSON.parse(sessionStorage.getItem("datosIVR"));

        var tree = JSON.parse(sessionStorage.getItem("tree"));
        var treeID = tree.getPostTreeInfoResult.TreeID;
        var actionID = e.data.ActionID;
        app.consultarActionsAttributes(treeID, actionID);

        var actionAttributes = JSON.parse(sessionStorage.getItem("actionAttributes_" + actionID));
        var numeroTransferencia = actionAttributes.getPostActionAttributesResult[0].NumeroTransferencia;

        if (e.data.ActionType == 'TRANSFER') {
            app.genesysTransferencia(numeroTransferencia);
        } else if (e.data.ActionType == 'VIRTUAL_HOLD') {
            app.genesysVirtualHold(datosIVR.getPosAuthenticateResult.Telefono, numeroTransferencia);
        } else if (e.data.ActionType == 'C2C') {
            app.genesysVirtualHold(datosIVR.getPosAuthenticateResult.Telefono, numeroTransferencia);
        } else if (e.data.ActionType == 'CALLBACK') {

        } else if (e.data.ActionType == 'CHAT') {
            var url = actionAttributes.getPostActionAttributesResult[0].Url;
            app.genesysChat(datosIVR.getPosAuthenticateResult.Telefono, url);
        }
    }

    app.buscarNodosYAcciones = function (treeID, nodoID) {
        app.consultarNode(treeID, nodoID);
        app.consultarNodeActions(treeID, nodoID);
    }



    var wsWatson = 'https://gesys-bot.e-contact.cl/proxy/api/v1/dialogs/';
    var dialog_id = '';

    app.watsonIniciar = function () {
        
        app.consultarActionsAttributes('CHATBOT', '18');
        var actionAttributes = JSON.parse(sessionStorage.getItem("actionAttributes_18"));
        
        wsWatson = actionAttributes.getPostActionAttributesResult[0].Dialog_url;
        dialog_id = actionAttributes.getPostActionAttributesResult[0].Dialog_id;

        
        var parametros = {
            "input": "",
        };

        $.ajax({
            url: wsWatson + dialog_id + '/conversation',
            async: false,
            type: 'POST',
            data: parametros, // or $('#myform').serializeArray()
            success: function (data) {
                sessionStorage.setItem("watson", JSON.stringify(data));
            },
            error: function (error) {
                navigator.notification.alert(JSON.stringify(error));
            }

        });
    }

    app.watsonConversation = function (message) {

        var watson = JSON.parse(sessionStorage.getItem("watson"));

        var parametros = {
            "input": message,
            "conversation_id": watson.conversation_id,
            "client_id": watson.client_id
        };

        $.ajax({
            url: wsWatson + dialog_id + '/conversation',
            async: false,
            type: 'POST',
            data: parametros, // or $('#myform').serializeArray()
            success: function (data) {
                sessionStorage.setItem("watson_response", JSON.stringify(data));
            },
            error: function (error) {
                //navigator.notification.alert("La llamada no puede ser agendada, por favor, intente nuevamente.");
                navigator.notification.alert(JSON.stringify(error));
            }

        });
    }
})();
// END_CUSTOM_CODE_settingsView