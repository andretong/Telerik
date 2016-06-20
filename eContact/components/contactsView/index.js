'use strict';

app.contactsView = kendo.observable({
    onShow: function () {
        
        var tree = JSON.parse(sessionStorage.getItem("tree"));                
        var treeID = tree.getPostTreeInfoResult.TreeID;
        var nodoID = tree.getPostTreeInfoResult.StartingNodeID;
        
        app.buscarNodosYAcciones(treeID, nodoID);
        
        var node = JSON.parse(sessionStorage.getItem("node_" + nodoID));
        var menu = node.getPostNodeResult;

        var nodeActions = JSON.parse(sessionStorage.getItem("nodeActions_"+nodoID));
        var actions = nodeActions.getPostNodeActionsResult;
        
        //var respuesta = JSON.parse(sessionStorage.getItem("nodeActions"));
        //var actions = respuesta.actions; 
        
        var dataSourceActions = new kendo.data.DataSource({
            data: actions
        });
        app.contactsView.set('dataSource', dataSourceActions);

    },
    afterShow: function () {

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
        app.ejecutarAccion(e);
    });

    //app.consultarNodeActions(10);
    //app.nodeActionsDS.read();

})();
// END_CUSTOM_CODE_contactsView