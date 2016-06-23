'use strict';

app.homeView = kendo.observable({
    onShow: function () {
        $("#listActions").show();
        $("#inputCallback").hide();

        $("#datetimepicker").kendoDateTimePicker({
            format: "yyyy/MM/dd hh:mm tt",
            value: new Date(),
            interval: 15,
            animation: false
        });

        var cliente = JSON.parse(sessionStorage.getItem("cliente"));
        app.homeView.set('title', 'Bienvenido ' + cliente.nombre);

        var tree = JSON.parse(sessionStorage.getItem("tree"));
        var treeID = tree.getPostTreeInfoResult.TreeID;
        var nodoID = tree.getPostTreeInfoResult.StartingNodeID;

        app.buscarNodosYAcciones(treeID, nodoID);

        var node = JSON.parse(sessionStorage.getItem("node_" + nodoID));
        var menu = node.getPostNodeResult;

        var nodeActions = JSON.parse(sessionStorage.getItem("nodeActions_" + nodoID));
        var actions = nodeActions.getPostNodeActionsResult;

        var actions2 = [];
        var i = 0;
        for (; i < actions.length; i++) {
            var actionID = nodeActions.getPostNodeActionsResult[i].ActionID;
            var actionType = nodeActions.getPostNodeActionsResult[i].ActionType;
            app.consultarActionsAttributes(treeID, actionID);

            var actionAttributes = JSON.parse(sessionStorage.getItem("actionAttributes_" + actionID));
            var numeroTransferencia = actionAttributes.getPostActionAttributesResult[0].NumeroTransferencia;

            //app.genesysStatistic("CurrNumberWaitingCalls", "QUEUE", "A002_C2C@SIP_Switch");
            app.genesysStatistic("CurrNumberWaitingCalls", "QUEUE", "VQ_eBank_Mobile@eServices_Switch");
            app.genesysStatistic("ExpectedWaitTime", "QUEUE", "A002_C2C@SIP_Switch");
            app.genesysStatistic("CurrentReadyAgents", "GROUPAGENTS", "VG_eBank");

            var cantCola = sessionStorage.getItem("statistic_CurrNumberWaitingCalls");

            var tiempoEspera = sessionStorage.getItem("statistic_ExpectedWaitTime");
            tiempoEspera = tiempoEspera / 60;
            tiempoEspera = tiempoEspera.toFixed(0);

            var cantAgentes = sessionStorage.getItem("statistic_CurrentReadyAgents");

            var msj = actionType + '\n Tiempo de Espera: ' + tiempoEspera + ' minutos.';

            if (actionType == 'CHAT') {
                msj = 'Cola: ' + cantCola + ' personas.';
            } else if (actionType == 'C2C' || actionType == 'CALLBACK') {
                msj = 'Tiempo de Espera: ' + tiempoEspera + ' minutos.';
            } else {
                msj = 'Agentes Disponibles: ' + cantAgentes;
            }

            actions2.push({
                "ActionType": actionType,
                "ActionID": actionID
            });

            actions2.push({
                "ActionType": msj,
                "ActionID": actionID
            });

        }

        var optionsMenu = new kendo.data.DataSource({
            data: menu
        });
        app.homeView.set('menu', optionsMenu);

        var dataSourceActions = new kendo.data.DataSource({
            data: actions2
        });
        app.homeView.set('dataSourceActions', dataSourceActions);
    },
    afterShow: function () {

    },
    logout: function () {
        app.logout();
    },
    back: function () {
        window.location.href = "#home";
    },
    acceptCallback: function () {
        var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
        var fecha = datetimepicker.value();        
        var day = (fecha.getDate() < 10) ? '0'+fecha.getDate() : fecha.getDate();
        var month = (fecha.getMonth() < 10) ? '0'+fecha.getMonth() : fecha.getMonth();        
        var hour = (fecha.getHours() < 10) ? '0'+fecha.getHours() : fecha.getHours();
        var minutes = (fecha.getMinutes() < 10) ? '0'+fecha.getMinutes() : fecha.getMinutes();        
        var strFecha = fecha.getFullYear() + '-' + month+ '-' +day+' '+hour+':'+minutes;   
        var actionID = sessionStorage.getItem("CALLBACK_ID");
        
        app.genesysCallback(actionID, strFecha);
    },
    close: function () {
        $("#listActions").show();
        $("#inputCallback").hide();
        $("#contact").data("kendoMobileModalView").close();
    },
    onShowInfo: function () {
        $("#listActions").show();
        $("#inputCallback").hide();

        $("#datetimepicker").kendoDateTimePicker({
            format: "yyyy/MM/dd hh:mm tt",
            value: new Date(),
            min: new Date(),
            interval: 15,
            animation: false
        });
        
        var tree = JSON.parse(sessionStorage.getItem("tree"));
        var treeID = tree.getPostTreeInfoResult.TreeID;
        var nodoID = sessionStorage.getItem("NODO_ACTUAL");

        app.buscarNodosYAcciones(treeID, nodoID);

        var node = JSON.parse(sessionStorage.getItem("node_" + nodoID));
        var menu = node.getPostNodeResult;

        var nodeActions = JSON.parse(sessionStorage.getItem("nodeActions_" + nodoID));
        var actions = nodeActions.getPostNodeActionsResult;

        var actions2 = [];
        var i = 0;
        for (; i < actions.length; i++) {
            var actionID = nodeActions.getPostNodeActionsResult[i].ActionID;
            var actionType = nodeActions.getPostNodeActionsResult[i].ActionType;

            app.consultarActionsAttributes(treeID, actionID);

            var actionAttributes = JSON.parse(sessionStorage.getItem("actionAttributes_" + actionID));
            var numeroTransferencia = actionAttributes.getPostActionAttributesResult[0].NumeroTransferencia;

            //app.genesysStatistic("CurrNumberWaitingCalls", "QUEUE", "A002_C2C@SIP_Switch");
            app.genesysStatistic("CurrNumberWaitingCalls", "QUEUE", "VQ_eBank_Mobile@eServices_Switch");
            app.genesysStatistic("ExpectedWaitTime", "QUEUE", "A002_C2C@SIP_Switch");
            app.genesysStatistic("CurrentReadyAgents", "GROUPAGENTS", "VG_eBank");

            var cantCola = sessionStorage.getItem("statistic_CurrNumberWaitingCalls");

            var tiempoEspera = sessionStorage.getItem("statistic_ExpectedWaitTime");
            tiempoEspera = tiempoEspera / 60;
            tiempoEspera = tiempoEspera.toFixed(0);

            var cantAgentes = sessionStorage.getItem("statistic_CurrentReadyAgents");

            var msj = actionType + '\n Tiempo de Espera: ' + tiempoEspera + ' minutos.';

            if (actionType == 'CHAT') {
                msj = 'Cola: ' + cantCola + ' personas.';
            } else if (actionType == 'C2C' || actionType == 'CALLBACK') {
                msj = 'Tiempo de Espera: ' + tiempoEspera + ' minutos.';
            } else {
                msj = 'Agentes Disponibles: ' + cantAgentes;
            }

            actions2.push({
                "ActionType": actionType,
                "ActionID": actionID
            });

            actions2.push({
                "ActionType": msj,
                "ActionID": actionID
            });
        }

        var optionsMenu = new kendo.data.DataSource({
            data: menu
        });
        app.homeView.set('submenu', optionsMenu);

        var dataSourceActions = new kendo.data.DataSource({
            data: actions2
        });
        app.homeView.set('dataSourceActions', dataSourceActions);
    }
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.homeView.set('title', 'E-Contact');

    if (sessionStorage.getItem("cliente") == null || sessionStorage.getItem("cliente") == '') {
        app.consultarDatosCliente();
        app.clienteDS.read();
    }

    //if (sessionStorage.getItem("tree") == null || sessionStorage.getItem("tree") == '') {
    var datosIVR = JSON.parse(sessionStorage.getItem("datosIVR"));
    app.consultarTreeIVR(datosIVR.getPosAuthenticateResult.TreeID);
    //app.treeDS.read();                       
    //}

    //app.consultarNodeActions(10);
    //app.nodeActionsDS.read();

    app.homeView.set('alert', function (e) {
        app.homeView.set('titleInfo', e.data.NodeName);
        sessionStorage.setItem("NODO_ACTUAL", e.data.NodeID);
        app.homeView.onShowInfo();
        window.location.href = "#info";
    });

    app.homeView.set('contactCenter', function (e) {

        if (e.data.ActionType == 'CALLBACK') {
            $("#listActions").fadeOut();
            $("#inputCallback").fadeIn(); 
            sessionStorage.setItem("CALLBACK_ID", e.data.ActionID);
        } else {
            app.ejecutarAccion(e);
        }

    });
})();

// END_CUSTOM_CODE_homeView