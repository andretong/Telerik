'use strict';

app.homeView = kendo.observable({
    onShow: function () {
        $("#images").kendoMobileListView({
            dataSource: ["images/01.jpg", "images/02.jpg", "images/03.jpg", "images/04.jpg", "images/05.jpg", "images/06.jpg", "images/07.jpg"],
            template: "<img src='#: data #'>"
        });
    },
    afterShow: function () {},
    logout: function () {
        window.location.href = "index.html";
    }
});

// START_CUSTOM_CODE_homeView
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes
(function () {
    app.homeView.set('title', 'eContact');

})();
// END_CUSTOM_CODE_homeView