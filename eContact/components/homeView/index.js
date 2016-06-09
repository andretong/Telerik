'use strict';

app.homeView = kendo.observable({
    onShow: function () {
        var cliente = JSON.parse(sessionStorage.getItem("cliente"));
		app.homeView.set('title', 'Bienvenido '+cliente.nombre);
                
        var tree = JSON.parse(sessionStorage.getItem("tree"));          
        var menu = tree.startingNode.nodeMenuAttributes.options;        
        
        var optionsMenu = new kendo.data.DataSource({
            data: menu
        });
        app.homeView.set('menu', optionsMenu);
        
        //for (int i=0; i < tree.)
        
        /*
        $("#images").kendoMobileListView({
            dataSource: ["images/01.jpg", "images/02.jpg", "images/03.jpg", "images/04.jpg", "images/05.jpg", "images/06.jpg", "images/07.jpg"],
            template: "<img src='#: data #'>"
        });
        */
    },
    afterShow: function () {

    },
    logout: function () {
        app.logout();
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

    if (sessionStorage.getItem("tree") == null || sessionStorage.getItem("tree") == '') {
        var datosIVR = JSON.parse(sessionStorage.getItem("datosIVR"));
        app.consultarTreeIVR(datosIVR.treeID);
        app.treeDS.read();
    }

    
    app.homeView.set('alert', function (e) {
        alert(e.data.optionName);        
    });
})();
// END_CUSTOM_CODE_homeView