'use strict';

app.homeView = kendo.observable({
    onShow: function () {
        var cliente = JSON.parse(sessionStorage.getItem("cliente"));
        app.homeView.set('title', 'Bienvenido ' + cliente.nombre);

        var tree = JSON.parse(sessionStorage.getItem("tree"));
        var treeID = tree.getPostTreeInfoResult.TreeID;
        var nodoID = tree.getPostTreeInfoResult.StartingNodeID;
        
        app.consultarNode(treeID, nodoID);
    	app.consultarNodeActions(nodoID);
        
        var node = JSON.parse(sessionStorage.getItem("node_" + nodoID));
        var menu = node.getPostNodeResult;

        var nodeActions = JSON.parse(sessionStorage.getItem("nodeActions"));
        var actions = nodeActions.getPostNodeActionsResult;

        /*var menu = tree.startingNode.nodeMenuAttributes.options;
        var optionsMenu = new kendo.data.DataSource({
            data: menu
        });
        app.homeView.set('menu', optionsMenu);
        
        var nodeActions = JSON.parse(sessionStorage.getItem("nodeActions"));
*/
        
        var optionsMenu = new kendo.data.DataSource({
            data: menu
        });
        app.homeView.set('menu', optionsMenu);

        var dataSourceActions = new kendo.data.DataSource({
            data: actions
        });
        app.homeView.set('dataActionsHome', dataSourceActions);

        $("#images").kendoMobileListView({
            dataSource: ["images/01.jpg", "images/02.jpg", "images/03.jpg", "images/04.jpg", "images/05.jpg", "images/06.jpg", "images/07.jpg"],
            template: "<img src='#: data #'>"
        });

    },
    afterShow: function () {        
    },
    logout: function () {
        app.logout();
    },
    close: function () {
        $("#contact").data("kendoMobileModalView").close();
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
        alert(e.data.NodeName);
        window.location.href = "#info";
    });
})();
// END_CUSTOM_CODE_homeView