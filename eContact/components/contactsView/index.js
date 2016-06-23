'use strict';

app.contactsView = kendo.observable({
    onShow: function () {
		$("#contactListActions").show();
        $("#contactInputCallback").hide();
        
        $("#datetimepicker").kendoDateTimePicker({
            format: "yyyy/MM/dd hh:mm tt",
            value: new Date(),
            interval: 15,
            animation: false
        });
        
        var tree = JSON.parse(sessionStorage.getItem("tree"));
        var treeID = tree.getPostTreeInfoResult.TreeID;
        var nodoID = tree.getPostTreeInfoResult.StartingNodeID;

        app.buscarNodosYAcciones(treeID, nodoID);

        var node = JSON.parse(sessionStorage.getItem("node_" + nodoID));
        var menu = node.getPostNodeResult;

        var nodeActions = JSON.parse(sessionStorage.getItem("nodeActions_" + nodoID));
        var actions = nodeActions.getPostNodeActionsResult;

        //var respuesta = JSON.parse(sessionStorage.getItem("nodeActions"));
        //var actions = respuesta.actions; 

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

        var dataSourceActions = new kendo.data.DataSource({
            data: actions2
        });
        app.contactsView.set('dataSourceActions', dataSourceActions);

    },
    afterShow: function () {

    },
    acceptCallback: function () {
        app.genesysCallback();
    },
    close: function () {
        $("#contactListActions").fadeIn();
        $("#contactInputCallback").fadeOut();
    }
});

// START_CUSTOM_CODE_contactsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.contactsView.set('title', 'Contacto');

    /*
    var dataSource = new kendo.data.DataSource({
        data: [{
            id: 1,
            name: 'Bob'
        }, {
            id: 2,
            name: 'Mary'
        }, {
            id: 3,
            name: 'John'
        }]
    });
    app.contactsView.set('dataSource', dataSource);
	*/
    app.contactsView.set('contactCenter', function (e) {
        if (e.data.ActionType == 'CALLBACK') {
            $("#contactListActions").fadeOut();
            $("#contactInputCallback").fadeIn();
        } else {
            app.ejecutarAccion(e);
        }
    });

    //app.consultarNodeActions(10);
    //app.nodeActionsDS.read();

})();
// END_CUSTOM_CODE_contactsView