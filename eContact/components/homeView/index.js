'use strict';

app.homeView = kendo.observable({
    onShow: function () {
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

        var optionsMenu = new kendo.data.DataSource({
            data: menu
        });
        app.homeView.set('menu', optionsMenu);

        var dataSourceActions = new kendo.data.DataSource({
            data: actions
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
    close: function () {
        $("#contact").data("kendoMobileModalView").close();
    },
    onShowInfo: function () {
        var tree = JSON.parse(sessionStorage.getItem("tree"));
        var treeID = tree.getPostTreeInfoResult.TreeID;
        var nodoID = sessionStorage.getItem("NODO_ACTUAL");

        app.buscarNodosYAcciones(treeID, nodoID);

        var node = JSON.parse(sessionStorage.getItem("node_" + nodoID));
        var menu = node.getPostNodeResult;

        var nodeActions = JSON.parse(sessionStorage.getItem("nodeActions_" + nodoID));
        var actions = nodeActions.getPostNodeActionsResult;

        var optionsMenu = new kendo.data.DataSource({
            data: menu
        });
        app.homeView.set('submenu', optionsMenu);

        var dataSourceActions = new kendo.data.DataSource({
            data: actions
        });
        app.homeView.set('dataSourceActions', dataSourceActions);
    }
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.homeView.set('title', 'eContact');

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
        sessionStorage.setItem("NODO_ACTUAL", e.data.NodeID);
        app.homeView.onShowInfo();
        window.location.href = "#info";
    });

    app.homeView.set('contactCenter', function (e) {
        app.ejecutarAccion(e);

    });

})();
// END_CUSTOM_CODE_homeView