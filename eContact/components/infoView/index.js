'use strict';



app.infoView = kendo.observable({
    onShow: function () {
    },
    afterShow: function () {}
});

// START_CUSTOM_CODE_settingsView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.infoView.set('title', 'Información');


})();
// END_CUSTOM_CODE_settingsView