'use strict';



app.infoView = kendo.observable({
    onShow: function () {
        /*
        app.nodeActionsDS.read();
        var json = app.nodeActionsDS.data().toJSON();
        navigator.notification.alert(json);
        //app.infoView.set('title', 'Información ' + json);
        */
        app.nodeActionsDSv2();


    },
    afterShow: function () {}
});

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.infoView.set('title', 'Información');  
})();
// END_CUSTOM_CODE_settingsView