'use strict';

app.contactsView = kendo.observable({
    onShow: function () {
        var respuesta = JSON.parse(sessionStorage.getItem("nodeActions"));
        var actions = respuesta.actions; 
        
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
    app.contactsView.set('alert', function (e) {
        
        if (e.data.actionType == 'TRANSFERENCIA'){
            app.genesysTransferencia(e.data.numeroTransferencia);
        }else if (e.data.actionType == 'VIRTUAL_HOLD'){            
            app.genesysVirtualHold('0990856037', e.data.numeroTransferencia);
        }else if (e.data.actionType == 'CHAT'){
            //alert('ES UN CHAT ' + e.data.url);
            app.genesysChat();
        }
        
    });

    app.consultarNodeActions(10);
    app.nodeActionsDS.read();

})();
// END_CUSTOM_CODE_contactsView