(function ($) {
    /**
     * Init Functions
     */
    function revenueflex_init() {
        $('body').addClass('revenueflex');
    }
    /**
     * Start Page
     */
    function revenueflex_startPage() {
        $('#continue').click(function () {
            $.ajax({
                url: revenueflexData.endpoint + 'users',
                type: 'POST',
                data: window.location.href,
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    // response = response
                    if (response.statusCode == 0) {
                        var options = [];
                        options.push({ option: "revenueflex_settings_startPage", key: 'revenueflex_mail_address', value: response.content.email });
                        options.push({ option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: response.content.apiKey });
                        options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_id', value: response.content.projectId });
                        options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_script', value: response.content.script, decrypted: true });
                        saveOptionsAndGoPage(options, "projectSettingsPage");
                    }
                    else
                        revenueflexResponse('alert-danger', response.message);
                },
                error: function (error) {
                    console.log(error);
                    revenueflexResponse('alert-danger', error.statusText);
                }
            });
        });

    }

    /**
     * Validate Key Page
     */
    function revenueflex_validateKeyPage() {
        var validateKeyPage = $('#validateKeyPage');
        if (validateKeyPage.length > 0) {
            $('#validateKeyPage').validate(
                {
                    rules: {
                        'revenueflex_settings_validateKeyPage[revenueflex_api_key]': {
                            required: true,
                        }
                    }
                }
            )
            validateKeyPage.on('submit', function (e) {
                if ($(this).valid()) {
                    e.preventDefault();
                    var apiKey = $('#revenueflex-api-key').val(); // Current API Key
                    var adsensePublisherId = $('#revenueflex-adsense-publisher-id').val();
                    var adsenseSlotId = $('#revenueflex-adsense-slot-id').val();
                    $.ajax({
                        url: revenueflexData.endpoint + 'user/get',
                        type: 'POST',
                        data: JSON.stringify(
                            /* TODO: Set true prop names */
                            {
                                email: decodeURIComponent(getParameterByName('email')),
                                apiKey: apiKey,
                                adsensePublisherId: adsensePublisherId,
                                adsenseSlotId: adsenseSlotId
                            }
                        ),
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            response = response
                            if (response.statusCode !== 0) {
                                revenueflexResponse('alert-danger', response.statusMessage);
                            } else {
                                var options = [
                                    { option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: apiKey },
                                    { option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_adsense_publisher_id', value: adsensePublisherId },
                                    { option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_adsense_slot_id', value: adsenseSlotId },
                                    { option: "revenueflex_settings_startPage", key: 'revenueflex_mail_address', value: decodeURIComponent(getParameterByName('email')) }
                                ];
                                var nextPage = 'projectSelectCreatePage';
                                $.ajax({
                                    url: revenueflexData.resturl + 'revenueflex/v1/option',
                                    type: 'POST',
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
                                    },
                                    data: jQuery.param(
                                        {
                                            updates: options
                                        }
                                    ),
                                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                    success: function (response) {
                                        revenueflexGopage(nextPage);
                                    },
                                    error: function (error) {
                                        console.log(error);
                                        revenueflexResponse('alert-danger', 'Can not updated!');
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            console.log(error);
                            if (error.statusText) {
                                error = error.statusText;
                            }
                            revenueflexResponse('alert-danger', error);
                        }
                    });
                }
            })
            if (getParameterByName('email') == null) {
                revenueflexGoMainpage('startPage');
            }
        }
    }
    /**
     * User Settings Page
     */
    function revenueflex_userSettingsPage() {

        var userSettingsPage = $('#userSettingsInfoList');
        if (userSettingsPage.length > 0) {
            if (!isRealEmail())
                $('#deleteAccount').hide();

            $.ajax({
                url: revenueflexData.endpoint + 'user/get',
                type: 'POST',
                data: JSON.stringify(
                    {
                        email: revenueflexData.email,
                        apiKey: revenueflexData.apiKey
                    }
                ),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    response = response
                    if (response.statusCode !== 0) {
                        revenueflexResponse('alert-danger', response.statusMessage);
                    } else {
                        $("#userSettingsInfoList #email-address").text(isRealEmail() ? revenueflexData.email : '-');
                        $("#userSettingsInfoList #full-name").text((response.fullName) ? response.fullName : '-');
                        $("#userSettingsInfoList #company-name").text((response.companyName) ? response.companyName : '-');
                        if (response.invoiceInfo) {
                            var invoiceInfo = response.invoiceInfo;
                            var countryName = invoiceInfo.country ? invoiceInfo.country.name : "";
                            $("#userSettingsInfoList").append(
                                '<h4>' + revenueflexData.invoiceInfo + '</h4>\
                                <li class= "billing-address" >\
                                <span id="billing-address">\
                                ' + revenueflexData.nameOnInvoice + " " + invoiceInfo.nameOnInvoice + '<br>\
                                ' + revenueflexData.address + " " + invoiceInfo.addressLine1 + '\
                                ' + invoiceInfo.addressLine2 + '<br>\
                                ' + revenueflexData.city + " " + invoiceInfo.city + '<br>\
                                ' + revenueflexData.country + " " + countryName + '<br>\
                                ' + revenueflexData.postcode + " " + invoiceInfo.postCode + '<br>\
                                ' + revenueflexData.vatnumber + " " + invoiceInfo.vatNumber + '<br>\
                                </span></li>'
                            );
                        }
                    }
                },
                error: function (error) {
                    revenueflexResponse('alert-danger', error);
                }
            });

        }
    }
    /**
     * Update User Settings Page
     */
    function revenueflex_updateUserSettingsPage() {
        var updateUserSettingsPage = $('#updateUserSettingsPage');

        if (updateUserSettingsPage.length > 0) {
            var emailInput = updateUserSettingsPage.find('#email');
            emailInput.val(isRealEmail() ? revenueflexData.email : '');
            emailInput.prop('disabled', isRealEmail());
            $.ajax({
                url: revenueflexData.endpoint + 'user/get',
                type: 'POST',
                data: JSON.stringify(
                    {
                        email: revenueflexData.email,
                        apiKey: revenueflexData.apiKey
                    }
                ),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    response = response
                    if (response.statusCode !== 0) {
                        revenueflexResponse('alert-danger', response.statusMessage);
                    } else {
                        var invoiceInfo = response.invoiceInfo;
                        if (invoiceInfo) {
                            updateUserSettingsPage.find('#company-name').val(response.companyName);
                            updateUserSettingsPage.find('#full-name').val(response.fullName);
                            $('#business').prop('checked', invoiceInfo.business);
                            updateUserSettingsPage.find('#name-on-invoice').val(invoiceInfo.nameOnInvoice);
                            updateUserSettingsPage.find('#address-line-1').val(invoiceInfo.addressLine1);
                            updateUserSettingsPage.find('#address-line-2').val(invoiceInfo.addressLine2);
                            updateUserSettingsPage.find('#city').val(invoiceInfo.city);
                            updateUserSettingsPage.find('#postcode').val(invoiceInfo.postCode);
                            updateUserSettingsPage.find('#vatnumber').val(invoiceInfo.vatNumber);
                            updateUserSettingsPage.find('#id').val(invoiceInfo.id);
                            updateUserSettingsPage.find('#userId').val(invoiceInfo.userId);

                            if (invoiceInfo.country !== undefined) {
                                var selectedCountryOption = new Option(invoiceInfo.country.name, invoiceInfo.country.id, true, true);
                                $('#countries').prop('options').add(selectedCountryOption);
                                $('#countries').prop('options')[0].style.display = 'none';
                            }
                            if (invoiceInfo.nameOnInvoice === "" || invoiceInfo.addressLine1 === "" || invoiceInfo.city === "" || invoiceInfo.country === undefined) {
                                revenueflexResponseTop('alert-danger', revenueflexData.enterUserInfoMessage);
                            }
                        }
                    }
                },
                error: function (error) {
                    revenueflexResponse('alert-danger', error);
                }
            });

            /*$("#business").change(function() {  
                $('#company-name').prop('disabled', this.checked);
            });*/

            $("#countries").focusin(function (e) {
                e.preventDefault();

                var countriesBoxOptions = $('#countries').prop('options');
                if (countriesBoxOptions.length > 2) return;
                $.ajax({
                    url: revenueflexData.endpoint + 'countries',
                    type: 'POST',
                    data: JSON.stringify(
                        {
                            email: revenueflexData.email,
                            apiKey: revenueflexData.apiKey
                        }
                    ),
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        if (response.statusCode === 0) {
                            var selectedOption = countriesBoxOptions[1];
                            // if (selectedOption !== undefined)
                            //countriesBoxOptions[0].style.display = 'none';
                            response.countries.forEach(country => {
                                if (selectedOption === undefined || country.id != selectedOption.value)
                                    countriesBoxOptions.add(new Option(country.name, country.id));
                            });
                        } else {
                            revenueflexResponse('alert-danger', response.statusMessage);
                        }
                    },
                    error: function (error) {
                        revenueflexResponse('alert-danger', error);
                    }
                });
            });

            updateUserSettingsPage.validate(
                {
                    rules: {
                        'email': {
                            required: true
                        },
                        'full-name': {
                            required: true
                        },
                        'name-on-invoice': {
                            required: true
                        },
                        'address-line-1': {
                            required: true
                        },
                        'city': {
                            required: true
                        },
                        'country': {
                            required: true
                        }
                    }
                });
            updateUserSettingsPage.on('submit', function (e) {
                if ($(this).valid()) {
                    e.preventDefault();

                    var updatedEmail = emailInput.val().trim();
                    var invoiceInfo = {
                        id: updateUserSettingsPage.find('#id').val(),
                        business: ($('#business').prop("checked")),
                        nameOnInvoice: updateUserSettingsPage.find('#name-on-invoice').val().trim(),
                        addressLine1: updateUserSettingsPage.find('#address-line-1').val().trim(),
                        addressLine2: updateUserSettingsPage.find('#address-line-2').val().trim(),
                        city: updateUserSettingsPage.find('#city').val().trim(),
                        country: { id: Number(updateUserSettingsPage.find('#countries').val()) },
                        postCode: updateUserSettingsPage.find('#postcode').val().trim(),
                        vatNumber: updateUserSettingsPage.find('#vatnumber').val().trim()
                    }

                    $.ajax({
                        url: revenueflexData.endpoint + 'user/update',
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                email: revenueflexData.email,
                                apiKey: revenueflexData.apiKey,
                                updatedEmail: isRealEmail() ? null : updatedEmail,
                                companyName: updateUserSettingsPage.find('#company-name').val().trim(),
                                fullName: updateUserSettingsPage.find('#full-name').val().trim(),
                                invoiceInfo: invoiceInfo
                            }
                        ),
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            response = response
                            if (response.statusCode !== 0) {
                                revenueflexResponse('alert-danger', response.statusMessage);
                            } else {
                                if (isRealEmail())
                                    revenueflexGopage('userSettingsPage');
                                else {
                                    var options = [];
                                    options.push({ option: "revenueflex_settings_startPage", key: 'revenueflex_mail_address', value: updatedEmail });
                                    options.push({ option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: response.apiKey });
                                    saveOptionsAndGoPage(options, "userSettingsPage");
                                }
                            }
                        },
                        error: function (error) {
                            revenueflexResponse('alert-danger', error);
                        }
                    });
                }
            })
        }
    }
    /**
     * Update Email Page
     */
    function revenueflex_updateEmailPage() {
        var updateEmailPage = $("#updateEmailPage");
        if (updateEmailPage.length > 0) {
            updateEmailPage.validate(
                {
                    rules: {
                        'new-email': {
                            required: true,
                            email: true
                        }
                    }
                });
            updateEmailPage.on('submit', function (e) {
                if ($(this).valid()) {
                    e.preventDefault();
                    var updatedEmail = $('#revenueflex-new-mail-address').val();
                    $.ajax({
                        url: revenueflexData.endpoint + 'user/updateemail',
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                email: revenueflexData.email,
                                apiKey: revenueflexData.apiKey,
                                updatedEmail: updatedEmail
                            }
                        ),
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            response = response
                            if (response.statusCode !== 7 && response.statusCode !== 0) {
                                revenueflexResponse('alert-danger', response.statusMessage);
                            } else {
                                var options = [];
                                var nextPage = '';
                                if (response.statusCode === 7) {
                                    nextPage = 'updateEmailValidateKeyPage&email=' + updatedEmail;
                                } else if (response.statusCode === 0) {
                                    nextPage = 'userSettingsPage';
                                    options.push({ option: "revenueflex_settings_startPage", key: 'revenueflex_mail_address', value: updatedEmail })
                                    options.push({ option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: response.apiKey })
                                }
                                $.ajax({
                                    url: revenueflexData.resturl + 'revenueflex/v1/option',
                                    type: 'POST',
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
                                    },
                                    data: jQuery.param(
                                        {
                                            updates: options
                                        }
                                    ),
                                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                    success: function (response) {
                                        // revenueflexResponse('alert-success', response.statusMessage);
                                        revenueflexGopage(nextPage);
                                    },
                                    error: function (error) {
                                        console.log(error);
                                        if (error.responseText) {
                                            error = error.responseText;
                                        }
                                        revenueflexResponse('alert-danger', error);
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            revenueflexResponse('alert-danger', error);
                            console.log(error);
                        }
                    });
                }
            })
        }
    }
    /**
     * Update Email Validate Key Page
     */
    function revenueflex_updateEmailValidateKeyPage() {
        var updateEmailValidateKeyPage = $("#updateEmailValidateKeyPage");
        if (updateEmailValidateKeyPage.length > 0) {
            updateEmailValidateKeyPage.validate(
                {
                    rules: {
                        'new-apikey': {
                            required: true,
                        }
                    }
                });
            updateEmailValidateKeyPage.on('submit', function (e) {
                if ($(this).valid()) {
                    e.preventDefault();
                    var updatedKey = $('#new-apikey').val();
                    var updatedEmail = decodeURIComponent(getParameterByName('email'));
                    $.ajax({
                        url: revenueflexData.endpoint + 'user/updateemail',
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                email: revenueflexData.email,
                                apiKey: revenueflexData.apiKey,
                                updatedEmail: updatedEmail,
                                updatedKey: updatedKey,
                            }
                        ),
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            response = response
                            if (response.statusCode !== 7 && response.statusCode !== 0) {
                                revenueflexResponse('alert-danger', response.statusMessage);
                            } else {
                                var options = [];
                                var nextPage = '';
                                if (response.statusCode === 7) {
                                    nextPage = 'updateEmailValidateKeyPage&email=' + updatedEmail;
                                } else if (response.statusCode === 0) {
                                    nextPage = 'dashboardPage';
                                    options.push({ option: "revenueflex_settings_startPage", key: 'revenueflex_mail_address', value: updatedEmail })
                                    options.push({ option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: updatedKey })
                                }
                                $.ajax({
                                    url: revenueflexData.resturl + 'revenueflex/v1/option',
                                    type: 'POST',
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
                                    },
                                    data: jQuery.param(
                                        {
                                            updates: options
                                        }
                                    ),
                                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                    success: function (response) {
                                        // revenueflexResponse('alert-success', response.statusMessage);
                                        revenueflexGopage(nextPage);
                                    },
                                    error: function (error) {
                                        console.log(error);
                                        if (error.responseText) {
                                            error = error.responseText;
                                        }
                                        revenueflexResponse('alert-danger', error);
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            revenueflexResponse('alert-danger', error);
                            console.log(error);
                        }
                    });
                }
            })
        }
    }
    /**
     * Delete Account Page
     */
    function revenueflex_deleteAccountPage() {
        var deleteAccountPage = $("#deleteAccountPage");
        if (deleteAccountPage.length > 0) {
            deleteAccountPage.validate(
                {
                    rules: {
                        'email-address': {
                            required: true,
                            email: true,
                            equalTo: '#email-address-validate'
                        }
                    },
                    messages: {
                        'email-address': {
                            equalTo: revenueflexData.wrongEmailAddress
                        }
                    }
                }
            );
        }
        deleteAccountPage.on('submit', function (e) {
            if ($(this).valid()) {
                e.preventDefault();
                var email = $('#email-address').val();
                $.ajax({
                    url: revenueflexData.endpoint + 'user/delete',
                    type: 'POST',
                    data: JSON.stringify(
                        {
                            email: email,
                            apiKey: revenueflexData.apiKey,
                            projectId: revenueflexData.projectId
                        }
                    ),
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        response = response
                        let userMessage = revenueflexData.responseMessages[response.statusCode];
                        if (userMessage)
                            userMessage = revenueflex_convert_message(userMessage, response);

                        if (response.statusCode === 0) {
                            var options = [];
                            options.push({ option: "revenueflex_settings_startPage", key: 'revenueflex_mail_address', value: '' })
                            options.push({ option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: '' })
                            options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_id', value: '' })
                            //options.push( { option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_name', value: ''})
                            options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_script', value: '' })
                            var nextPage = 'startPage';
                            $.ajax({
                                url: revenueflexData.resturl + 'revenueflex/v1/option',
                                type: 'POST',
                                beforeSend: function (xhr) {
                                    xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
                                },
                                data: jQuery.param(
                                    {
                                        updates: options
                                    }
                                ),
                                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                success: function (response) {
                                    revenueflexGoMainpage(nextPage);
                                },
                                error: function (error) {
                                    console.log(error);
                                    if (error.responseText) {
                                        error = error.responseText;
                                    }
                                    revenueflexResponse('alert-danger', error);
                                }
                            });
                        } else if (response.statusCode === 23) {
                            let url = revenueflexReturnpage('subscriptionPage');
                            revenueflexResponse('alert-warning', userMessage, url, revenueflexData.subscription);
                        } else if (response.statusCode === 24 || response.statusCode === 25) {
                            //revenueflexResponse('alert-warning', userMessage);
                            let url = revenueflexData.endpoint.replace('/rest', '');
                            let hostName = revenueflexData.endpoint.split('/')[2];
                            revenueflexResponse('alert-warning', userMessage, url, hostName);
                        } else {
                            revenueflexResponse('alert-danger', response.statusMessage);
                        }
                    },
                    error: function (error) {
                        revenueflexResponse('alert-danger', error);
                        console.log(error);
                    }
                });
            }
        })
    }
    /**
     * Project Select Create page 
     */
    function revenueflex_projectSelectCreatePage() {
        var projectSelectCreatePage = $("#projectSelectCreatePage");
        if (projectSelectCreatePage.length > 0) {
            $('.revenueflex-container').hide();
            $('#project-name').val(revenueflexData.siteurl.replace('http://', '').replace('https://', ''));
            $.ajax({
                url: revenueflexData.endpoint + 'user/get',
                type: 'POST',
                data: JSON.stringify(
                    {
                        email: revenueflexData.email,
                        apiKey: revenueflexData.apiKey
                    }
                ),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    response = response
                    if (response.statusCode !== 0) { // Error from Rest
                        if (response.statusCode === 3) { // Delete API Key
                            var options = [{ option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: '' }];
                            deleteOptionsGoStart(options, 'startPage');
                        } else {
                            revenueflexResponse('alert-danger', response.statusMessage);
                        }
                    } else {
                        if (response.projects.length > 0) { // There's at least one project at API
                            let checkProject = response.projects.filter(function (item) {
                                return item.id === Number(revenueflexData.projectId);
                            })
                            if (checkProject.length > 0) { // Matched Project Redirect
                                revenueflexGopage('dashboardPage');
                            } else {
                                $('.revenueflex-container').show();
                                $("#projectList").html('');
                                $("#projectList").append('<li>' + revenueflexData.selectProjectToUse + '</li>');
                                response.projects.forEach(element => {
                                    $("#projectList").append('<li><button data-id="' + element.id + '" class="button button-primary select-project">' + element.name + '</button></li>');
                                });
                            }
                        } else {
                            if (revenueflexData.projectId) { //There is a project but not active. 
                                var options = [];
                                options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_id', value: '' })
                                options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_script', value: '' })
                                deleteOptionsGoStart(options, 'revenueflex-projectSelectCreatePage');
                            }
                            else {// No Project, Let Create one
                                $('.revenueflex-container').show();
                                $(".projectList").remove();
                            }
                        }
                    }
                },
                error: function (error) {
                    revenueflexResponse('alert-danger', error);
                    console.log(error);
                }
            });
            $('body').on('click', '.select-project', function () {
                revenueflex_saveProjectId($(this).data("id"), 'dashboardPage');
            })
            projectSelectCreatePage.on('submit', function (e) {
                if ($(this).valid()) {
                    e.preventDefault();
                    var projectName = $('#project-name').val();
                    $.ajax({
                        url: revenueflexData.endpoint + 'project/create',
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                email: revenueflexData.email,
                                apiKey: revenueflexData.apiKey,
                                domainName: projectName
                            }
                        ),
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            response = response
                            if (response.statusCode === 0 || response.statusCode === 5) { //5: ERR_WEB_SITE_ALREADY_EXISTS
                                var options = [];
                                var nextPage = '';
                                nextPage = 'dashboardPage';
                                options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_id', value: response.projectId })
                                options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_script', value: response.script, decrypted: true })
                                $.ajax({
                                    url: revenueflexData.resturl + 'revenueflex/v1/option',
                                    type: 'POST',
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
                                    },
                                    data: jQuery.param(
                                        {
                                            updates: options
                                        }
                                    ),
                                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                    success: function (response2) {
                                        if (response.statusCode === 0) {
                                            let continueLink = revenueflexReturnpage('projectSettingsPage');
                                            revenueflexResponse('alert-success', `<h4>${revenueflexData.projectCreated}</h4><p>${revenueflexData.projectCreatedMessage}
                                                                </p><a href="${continueLink}" class="btn btn-primary">${revenueflexData.continue}</a>`);
                                            $('form').remove();
                                            $('#project-list').remove();
                                        }
                                        else if (response.statusCode === 5) {
                                            revenueflexGopage("projectSettingsPage");
                                        }
                                    },
                                    error: function (error) {
                                        console.log(error);
                                        if (error.responseText) {
                                            error = error.responseText;
                                        }
                                        revenueflexResponse('alert-danger', error);
                                    }
                                });
                            } else {
                                revenueflexResponse('alert-danger', response.statusMessage);
                            }
                        },
                        error: function (error) {
                            revenueflexResponse('alert-danger', error);
                            console.log(error);
                        }
                    });
                }
            })
        }
    }
    /**
     * Dashboard Page
     */
    function revenueflex_dashboardPage() {
        var dashboardPage = $('#dashboardPage');
        if (dashboardPage.length > 0) {
            $.ajax({
                url: revenueflexData.endpoint + 'project/get',
                type: 'POST',
                data: JSON.stringify(
                    {
                        email: revenueflexData.email,
                        apiKey: revenueflexData.apiKey,
                        project: Number(revenueflexData.projectId)
                    }
                ),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    response = response
                    // if(response.userMessage) {
                    //     let responseUserMessage = revenueflexData.userMessages[response.userMessage.messageId];
                    //     responseUserMessage = (responseUserMessage) ? responseUserMessage : response.userMessage.messageContent+'!';
                    //     revenueflexResponseTop('alert-danger', responseUserMessage);
                    // }
                    var orderedStats = {};
                    if (response.statusCode === 0) {
                        var stats = response.stats;
                        if (stats) {
                            statsOutput = '';
                            $.each(stats.displayOrder, function (key, value) {
                                orderedStats[value] = stats[value];
                            })
                            $.each(orderedStats, function (key, value) {
                                statsOutput += `<div class="col-lg-4 my-2">
                                <div class="stat-box d-flex flex-column flex-wrap">
                                <span class="key">${revenueflexData[key]}</span><span class="value">${value}</span></div></div>`;
                            });
                            dashboardPage.find('.row').html(statsOutput);
                        }
                    } else {
                        revenueflexResponse('alert-danger', response.statusMessage);
                        if (response.statusCode === 3) {
                            // var x = document.getElementById("logout");
                            // x.style.visibility = "visible";
                            // $('#logout').style.visibility = "visible";
                            $('#logout').show();
                        }
                    }
                },
                error: function (error) {
                    revenueflexResponse('alert-danger', error);
                    console.log(error);
                }
            });
            $("#logout").click(function () {
                var options = [];
                options.push({ option: "revenueflex_settings_startPage", key: 'revenueflex_mail_address', value: '' });
                options.push({ option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: '' });
                options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_id', value: '' });
                options.push({ option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_script', value: '' });
                deleteOptionsGoStart(options, 'startPage');
            });
        }
    }
    /**
     * Project Settings Page
     */
    function revenueflex_projectSettingsPage() {
        var projectSettingsPage = $("#projectSettingsPage");
        if (projectSettingsPage.length > 0) {
            projectSettingsPage.validate(
                {
                    rules: {
                        'mobileAdDensity': {
                            required: true,
                            min: 1,
                            max: 10
                        },
                        'desktopAdDensity': {
                            required: true,
                            min: 1,
                            max: 10
                        }
                    }
                }
            );
            /* $('#mobileAdDensity').on('change', function () {
                var currentValue = $(this).val();
                $('#mobileAdDensity-image').attr('src', revenueflexData.pluginDirUri + 'assets/images/mobile-ad-density-' + currentValue + '.png');
            }) */
            $.ajax({
                url: revenueflexData.endpoint + 'project/get',
                type: 'POST',
                data: JSON.stringify(
                    {
                        email: revenueflexData.email,
                        apiKey: revenueflexData.apiKey,
                        project: Number(revenueflexData.projectId)
                    }
                ),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    response = response
                    initialConfig = response.config;
                    if (String(initialConfig.enabled) != revenueflexData.enabled) {
                        revenueflex_updateEnabled(initialConfig.enabled, 'projectSettingsPage');
                    }
                    $('#adsensePublisherId').val(response.config.adsensePublisherId);
                    $('#mobileAdDensity' + response.config.mobileAdDensity).prop('checked', true);
                    $('#desktopAdDensity' + response.config.desktopAdDensity).prop('checked', true);
                    // $('#mobileAdDensity').val(response.config.mobileAdDensity).trigger('change');
                    $('#enabled').prop('checked', response.config.enabled);
                    $('#monetizeUnfilledImpressions').prop('checked', response.config.monetizeUnfilledImpressions);

                    var excludePagesExact = response.config.excludePagesExact;
                    if (excludePagesExact.length) {
                        excludePagesExact = excludePagesExact.join("\n");
                        $('#excludePagesExact').val(excludePagesExact);
                    }

                    var excludePagesStartsWith = response.config.excludePagesStartsWith;
                    if (excludePagesStartsWith.length) {
                        excludePagesStartsWith = excludePagesStartsWith.join("\n");
                        $('#excludePagesStartsWith').val(excludePagesStartsWith);
                    }

                    var whiteListDomains = response.config.whiteListDomains;
                    if (whiteListDomains.length) {
                        whiteListDomains = whiteListDomains.join("\n");
                        $('#revenueflexWhiteListDomains').val(whiteListDomains);
                    }

                    const emailInput = `<input type="hidden" name="email" value="${revenueflexData.email}">`;
                    const apikeyInput = `<input type="hidden" name="apiKey" value="${revenueflexData.apiKey}">`;
                    const projectIdInput = `<input type="hidden" name="projectId" value="${revenueflexData.projectId}">`;
                    $('#adstxt_form').append(emailInput).append(apikeyInput).append(projectIdInput);
                },
                error: function (error) {
                    revenueflexResponse('alert-danger', error);
                    console.log(error);
                }
            });
            projectSettingsPage.on('submit', function (e) {
                if ($(this).valid()) {
                    e.preventDefault();
                    var excludePagesExact = $('#excludePagesExact').val().trim().split(/[\s\n, ]+/);
                    var excludePagesStartsWith = $('#excludePagesStartsWith').val().trim().split(/[\s\n, ]+/);
                    var whiteListDomains = $('#revenueflexWhiteListDomains').val().trim().split(/[\s\n, ]+/);
                    $.ajax({
                        url: revenueflexData.endpoint + 'project/config',
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                email: revenueflexData.email,
                                apiKey: revenueflexData.apiKey,
                                project: Number(revenueflexData.projectId),
                                enabled: ($('#enabled').prop("checked")),
                                monetizeUnfilledImpressions: ($('#monetizeUnfilledImpressions').prop("checked")),
                                adsensePublisherId: $('#adsensePublisherId').val(),
                                mobileAdDensity: $('input[name="mobileAdDensity"]:checked').val(),
                                desktopAdDensity: $('input[name="desktopAdDensity"]:checked').val(),
                                whiteListDomains: (whiteListDomains) ? whiteListDomains : [],
                                excludePagesExact: (excludePagesExact) ? excludePagesExact : [],
                                excludePagesStartsWith: (excludePagesStartsWith) ? excludePagesStartsWith : [],
                            }
                        ),
                        contentType: "application/json; charset=utf-8",
                        success: async function (response) {
                            response = response
                            revenueflex_updateEnabled(response.config.enabled, 'dashboardPage');
                        },
                        error: function (error) {
                            console.log(error);
                            revenueflexResponse('alert-danger', error);
                        }
                    });
                }
            })
        }
    }
    /**
     * Subscription Page
     */
    function revenueflex_subscriptionPage() {
        var subscriptionPage = $("#subscriptionPage");
        if (subscriptionPage.length > 0) {
            var initialSubscription;
            $.ajax({
                url: revenueflexData.endpoint + 'project/get',
                type: 'POST',
                data: JSON.stringify(
                    {
                        email: revenueflexData.email,
                        apiKey: revenueflexData.apiKey,
                        project: Number(revenueflexData.projectId),
                    }
                ),
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    response = response
                    initialSubscription = response.subscription;
                    $.ajax({
                        url: revenueflexData.endpoint + 'package/list',
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                email: revenueflexData.email,
                                apiKey: revenueflexData.apiKey,
                                project: Number(revenueflexData.projectId),
                            }
                        ),
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            response = response
                            if (response.statusCode !== 0) {
                                revenueflexResponse('alert-danger', response.statusMessage);
                            } else {
                                var packages = response.packages;
                                if (packages.length) {
                                    let nextPackage = packages.filter(item => item.id == initialSubscription.nextTypeId)[0];
                                    packages.forEach(element => {
                                        buyButtonClass = (element.enabled) ? 'revenueflex-buy-button' : 'bg-gray';
                                        element.buyLink = generate_buylink(element.buyLink, element.id);
                                        if (element.externalInfoLink) {
                                            element.accordionLink = element.externalInfoLink;
                                            element.accordionLinkClass = ' external ';
                                        } else {
                                            element.accordionLink = 'javascript:;';
                                            element.accordionLinkClass = ' no-external ';
                                        }
                                        let priceDisplay = (element.price > 0) ? 'block' : 'none';
                                        let detailsText = (element.price > 0) ? revenueflexData.details : revenueflexData.select;
                                        // let buyNowText = (element.price > 0) ? revenueflexData.buynow : revenueflexData.select;
                                        let message = revenueflexData.messageTemplates[element.infoForRequest.msgTemplateId];
                                        if (message) {
                                            message = revenueflex_convert_message(message, element.infoForRequest);
                                        }
                                        let titleCurrentPackage = (initialSubscription.typeId === element.id) ? `${revenueflexData.currentSubscription}:` : '';
                                        let messageCurrentPackage = (initialSubscription.typeId === element.id) ? `
                                        <p class="date-info">${revenueflexData.startDate}: ${initialSubscription.start}</p>
                                        <p class="date-info">${revenueflexData.endDate}: ${initialSubscription.end}</p>
                                        ` : '';
                                        let messageNextPackage = (initialSubscription.typeId === element.id) ? `
                                        <p class="date-info">${revenueflexData.startDate}: ${initialSubscription.nextPeriodStart}</p>
                                        <p class="date-info">${revenueflexData.endDate}: ${initialSubscription.nextPeriodEnd}</p>
                                        ` : '';
                                        let columnSize = (initialSubscription.typeId === element.id) ? '9' : '9';
                                        let packageoutput = `
                                        <div class="col-lg-12 my-3 package-item">
                                            <div class="p-4 package-wrapper row align-items-center text-center text-lg-start">
                                                <div class="col-lg-${columnSize}">
                                                    <h5><span class="date-info">${titleCurrentPackage} </span>${element.name}</h5>
                                                    <p>${element.description}</p>
                                                    <span class="d-${priceDisplay} price-label ${element.accordionLinkClass}">${revenueflexData.price}: <b>${element.price} ${element.currency}</b></span>
                                                    ${messageCurrentPackage}
                                                </div>
                                                <div class="col-lg-3 text-center text-lg-end">
                                                    <a href="${element.accordionLink}" class="btn w-100 btn-primary bg-revenueflex border-0 ${buyButtonClass} ${element.accordionLinkClass}">${detailsText}</a>
                                                </div>
                                                <div class="col-lg-12 my-2 revenueflex-info-box">
                                                    <p class="text-danger font-weight-bold">${message}</p>
                                                    <div class="d-flex justify-content-between">
                                                        <button class="btn btn-danger revenueflex-cancel-button">${revenueflexData.cancel}</button>
                                                        <a class="btn btn-primary" href="${element.buyLink}">${revenueflexData.buynow}</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`;
                                        if (initialSubscription.nextTypeId !== element.id && element.selectable == true) {
                                            $('#revenueflex-packages-list').append(packageoutput);
                                        }
                                        if (initialSubscription.typeId === element.id) {
                                            $('#revenueflex-current-package').append(packageoutput).find('a.btn').remove();
                                            if (nextPackage) {
                                                let description = (nextPackage.description) ? `<p class="d-block">${nextPackage.description}</p>` : '';
                                                $('#revenueflex-current-package > div > div').append(`
                                                <div class="col-lg-12 my-2" id="revenueflex-next-package">
                                                <h5>${revenueflexData.nextSubscription}: ${nextPackage.name}</h5>
                                                ${description}
                                                ${messageNextPackage}
                                                <span class="d-block">${revenueflexData.price}: <b>${nextPackage.price} ${nextPackage.currency}</b></span>
                                                </div>
                                                `);
                                            }
                                        }
                                    })
                                }
                            }
                        },
                        error: function (error) {
                            revenueflexResponse('alert-danger', error);
                            console.log(error);
                        }
                    });
                },
                error: function (error) {
                    revenueflexResponse('alert-danger', error);
                    console.log(error);
                }
            });

            $('body').on('click', '.revenueflex-buy-button:not(.bg-gray, .external)', function () {
                var targetElement = $(this);
                targetElement.fadeOut();
                targetElement.parent().parent().find('.revenueflex-info-box').fadeIn();
            })
            $('body').on('click', '.revenueflex-cancel-button', function () {
                var targetElement = $(this);
                targetElement.parent().parent().fadeOut();
                targetElement.parent().parent().parent().find('.revenueflex-buy-button').fadeIn();
            })
        }
    }

    function revenueflex_updateEmailForm() {
        var updateEmailForm = $("#revenueflex-top-email-form");
        if (updateEmailForm.length > 0) {
            updateEmailForm.validate({ rules: { 'user-email': { required: true, email: true } } });
            updateEmailForm.on('submit', function (e) {
                if ($(this).valid()) {
                    e.preventDefault();
                    var updatedEmail = $('#revenueflex-user-email').val();
                    $.ajax({
                        url: revenueflexData.endpoint + 'user/updateemail',
                        type: 'POST',
                        data: JSON.stringify(
                            {
                                email: revenueflexData.email,
                                apiKey: revenueflexData.apiKey,
                                updatedEmail: updatedEmail
                            }
                        ),
                        contentType: "application/json; charset=utf-8",
                        success: function (response) {
                            response = response
                            if (response.statusCode !== 7 && response.statusCode !== 0) {
                                revenueflexResponse('alert-danger', response.statusMessage);
                            } else {
                                var options = [];
                                var nextPage = '';
                                if (response.statusCode === 7) {
                                    nextPage = 'updateEmailValidateKeyPage&email=' + updatedEmail;
                                } else if (response.statusCode === 0) {
                                    // nextPage = 'userSettingsPage';
                                    options.push({ option: "revenueflex_settings_startPage", key: 'revenueflex_mail_address', value: updatedEmail })
                                    options.push({ option: "revenueflex_settings_validateKeyPage", key: 'revenueflex_api_key', value: response.apiKey })
                                }
                                $.ajax({
                                    url: revenueflexData.resturl + 'revenueflex/v1/option',
                                    type: 'POST',
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
                                    },
                                    data: jQuery.param(
                                        {
                                            updates: options
                                        }
                                    ),
                                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                    success: function (response) {
                                        if (nextPage)
                                            revenueflexGopage(nextPage);
                                        else
                                            location.reload();
                                    },
                                    error: function (error) {
                                        console.log(error);
                                        if (error.responseText) {
                                            error = error.responseText;
                                        }
                                        revenueflexResponse('alert-danger', error);
                                    }
                                });
                            }
                        },
                        error: function (error) {
                            revenueflexResponse('alert-danger', error);
                            console.log(error);
                        }
                    });
                }
            });
        }
    }



    /**
     * Call Functions
     */
    $(document).ready(function () {
        revenueflex_init();
        revenueflex_startPage();
        revenueflex_userSettingsPage();
        revenueflex_updateUserSettingsPage();
        revenueflex_validateKeyPage();
        revenueflex_updateEmailPage();
        revenueflex_updateEmailValidateKeyPage();
        revenueflex_deleteAccountPage();
        revenueflex_projectSelectCreatePage();
        revenueflex_dashboardPage();
        revenueflex_projectSettingsPage();
        revenueflex_subscriptionPage();
        revenueflex_updateEmailForm();
    });

    // Helpers
    function revenueflexResponse($class, message, url, urlText) {
        if (url && urlText) {
            htmlUrl = '<a href ="' + url + '">' + urlText + '</a>';
            message = message.replace('[URL]', htmlUrl);
            message = message.replace('&lt;', '<').replace('&gt;', '>');
        }
        $('#revenueflex-result').removeClass().addClass('alert ' + $class + '').html(message);
    }
    function revenueflexResponseTop($class, $message) {
        $('#revenueflex-result-top').removeClass().addClass('alert ' + $class + '').html($message);
    }
    function revenueflexGopage(page) {
        location.href = revenueflexData.redirectRoot + page
    }
    function revenueflexReturnpage(page) {
        return revenueflexData.redirectRoot + page
    }
    function revenueflexGoMainpage(page) {
        location.href = revenueflexData.redirectMainRoot + page
    }
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    function deleteOptionsGoStart(options, page) {
        $.ajax({
            url: revenueflexData.resturl + 'revenueflex/v1/option',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
            },
            data: jQuery.param(
                {
                    updates: options
                }
            ),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                revenueflexGoMainpage(page);
            },
            error: function (error) {
                console.log(error);
                if (error.responseText) {
                    error = error.responseText;
                }
                revenueflexResponse('alert-danger', error);
            }
        });
    }
    function saveOptions(options) {
        return $.ajax({
            url: revenueflexData.resturl + 'revenueflex/v1/option',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
            },
            data: jQuery.param({ updates: options }),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        });
    }

    function saveOptionsAndGoPage(options, page) {
        $.ajax({
            url: revenueflexData.resturl + 'revenueflex/v1/option',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
            },
            data: jQuery.param({ updates: options }),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                revenueflexGopage(page);
            },
            error: function (error) {
                console.log(error);
                if (error.responseText) {
                    error = error.responseText;
                }
                revenueflexResponse('alert-danger', error);
            }
        });
    }

    function revenueflex_saveProjectIdAndName(projectId, projectName, nextPage) {
        $.ajax({
            url: revenueflexData.resturl + 'revenueflex/v1/option',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
            },
            data: jQuery.param(
                {
                    updates: [
                        { option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_id', value: projectId },
                        { option: "revenueflex_settings_projectSelectCreatePage", key: 'revenueflex_project_name', value: projectName }
                    ]
                }
            ),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                revenueflexGopage(nextPage);
            },
            error: function (error) {
                console.log(error);
                if (error.responseText) {
                    error = error.responseText;
                }
                revenueflexResponse('alert-danger', error);
            }
        });
    }
    function revenueflex_saveProjectId(projectId, nextPage) {
        $.ajax({
            url: revenueflexData.resturl + 'revenueflex/v1/option',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
            },
            data: jQuery.param(
                {
                    updates:
                        [
                            {
                                option: "revenueflex_settings_projectSelectCreatePage",
                                key: 'revenueflex_project_id',
                                value: projectId
                            }
                        ]
                }
            ),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                revenueflexGopage(nextPage);
            },
            error: function (error) {
                console.log(error);
                if (error.responseText) {
                    error = error.responseText;
                }
                revenueflexResponse('alert-danger', error);
            }
        });
    }
    function revenueflex_saveProjectName(projectName, nextPage) {
        $.ajax({
            url: revenueflexData.resturl + 'revenueflex/v1/option',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
            },
            data: jQuery.param(
                {
                    updates: [
                        {
                            option: "revenueflex_settings_projectSelectCreatePage",
                            key: 'revenueflex_project_name',
                            value: projectName
                        }
                    ]
                }
            ),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                revenueflexGopage(nextPage);
            },
            error: function (error) {
                console.log(error);
                if (error.responseText) {
                    error = error.responseText;
                }
                revenueflexResponse('alert-danger', error);
            }
        });
    }
    function generate_buylink(buylink, id) {
        return buylink
            .replace("[RETURN_ADDRESS]", revenueflexData.redirectRoot + 'subscriptionPage')
            .replace("[EMAIL]", revenueflexData.email)
            .replace("id", id);
    }
    function revenueflex_updateEnabled(value, page) {
        var options = [
            { option: "revenueflex_settings_projectSettingsPage", key: 'enabled', value: value },
        ];
        $.ajax({
            url: revenueflexData.resturl + 'revenueflex/v1/option',
            type: 'POST',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('X-WP-Nonce', revenueflexData.nonce);
            },
            data: jQuery.param(
                {
                    updates: options
                }
            ),
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function (response) {
                // revenueflexGopage(page);
            },
            error: function (error) {
                console.log(error);
                if (error.responseText) {
                    error = error.responseText;
                }
                revenueflexResponse('alert-danger', error);
            }
        });
    }

    // function revenueflex_convert_message(message,element) {
    //     let brackets = message.match(/\[(.*?)\]/);
    //     if(brackets) {
    //         message = message.replace(brackets[0], element.infoForRequest[brackets[1]]);
    //         return revenueflex_convert_message(message,element);
    //     } 
    //     return message;        
    // }
    function revenueflex_convert_message(message, response) {
        let brackets = message.match(/\[(.*?)\]/);
        if (brackets && response[brackets[1]]) {
            message = message.replace(brackets[0], response[brackets[1]]);
            return revenueflex_convert_message(message, response);
        }
        return message;
    }
    function isRealEmail() {
        return revenueflexData.email.includes("@");
    }
}(jQuery));

