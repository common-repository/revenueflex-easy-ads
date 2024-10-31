(function ($) {
    /**
     * Check Pages
     */
    function revenueflex_checkPages() {
        var rootOfPage = 'revenueflex_page_revenueflex-';
        var requiredRules = [
            {
                'apiKey': [
                    'userSettingsPage',
                    'updateUserSettingsPage',
                    'updateEmailPage',
                    'deleteAccountPage',
                    'projectSelectCreatePage',
                    'dashboardPage',
                    'projectSettingsPage',
                    'subscriptionPage'
                ],
                "projectId": [
                    'dashboardPage',
                    'updateEmailPage',
                    'projectSettingsPage',
                    'subscriptionPage'
                ],
                "removedPages": [
                    'deleteAccountPage',
                    'updateEmailPage',
                    'updateUserSettingsPage'
                ]
            }
        ]
        // Define options and pages will show together
        requiredRules.forEach(element => {
            $.each(element, function (key, value) {
                if (revenueflexData[key]) {
                    value.forEach(element => {
                        $('a[href="' + 'admin.php?page=revenueflex-' + element + '"]').css({'display':'block'});
                    })
                } else {
                    value.forEach(element => {
                        if (rootOfPage + element === revenueflexData.currentScreen.id) {
                            if(!requiredRules[0].removedPages.includes(element))
                            { // Don't redirect if it is removedPages
                                revenueflexGoMainpageGlobal('startPage');
                            }
                        }
                        $('a[href="' + 'admin.php?page=revenueflex-' + element + '"]').hide();
                    })
                }
            })
        })
        // Define options and pages won't show together
        var noRequiredRules = [
            {
                'projectId': [
                    'projectSelectCreatePage',
                ]
            }
        ]
        noRequiredRules.forEach(element => {
            $.each(element, function (key, value) {
                if (revenueflexData[key]) {
                    value.forEach(element => {
                        $('a[href="' + 'admin.php?page=revenueflex-' + element + '"]').hide();
                        $('a[href="' + 'admin.php?page=' + element + '"]').hide();
                        $('a[href="' + revenueflexData.redirectRoot + element + '"]').hide();
                        $('a[href="' + revenueflexData.redirectMainRoot + element + '"]').hide();
                    })
                }
            })
        })
        if(revenueflexData['apiKey'] && revenueflexData['projectId']) {
            $('a[href="' + 'admin.php?page=' + 'revenueflex-dashboardPage' + '"]').hide();
            $('a[href="' + 'admin.php?page=' + revenueflexData.redirectRoot + 'revenueflex-dashboardPage' + '"]').hide();
            $('ul.wp-submenu li a[href="' + 'admin.php?page=' + 'startPage' + '"]').attr('href','admin.php?page=revenueflex-dashboardPage').text(revenueflexData.dashboard);
        }
    }
    /**
     * Add Contact Link
     */
    function revenueflex_add_contact_link() {
        $('li.toplevel_page_startPage ul').append('<li class="contact"><a href="https://www.revenueflex.com/#contact" style="display: block;" target="_blank">'+revenueflexData.contactUs+'</a></li>');
    }
    /**
     * Call Functions
     */
    $(document).ready(function () {
        revenueflex_checkPages();
        revenueflex_add_contact_link();
    });
    /**
     * Helpers
     */
     function revenueflexGoMainpageGlobal(page) {
        location.href = revenueflexData.redirectMainRoot + page
    }
}(jQuery));