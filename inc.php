<?php
global $preSettingsRevenueflex;
$preSettingsRevenueflex = 'revenueflex_settings';
global $endpoint;
$endpoint = 'https://panel.revenueflex.com/rest/';

add_action('admin_enqueue_scripts', 'revenueflex_scripts');
function revenueflex_scripts($hook)
{
    $pages = ['toplevel_page_startPage'];
    global $menuTitle;
    global $revenueflex_pages;
    global $plugin_dir_uri_revenueFlex;
    foreach ($revenueflex_pages as $pageRevenueflex) {
        $pages[] = sanitize_title($menuTitle) . '_page_revenueflex-' . $pageRevenueflex['id'];
    }

    $messageTemplates = array(
        '1' => esc_html__('The subscription will start now and first period will end on [endDate].', 'revenueflex'),
        '2' => esc_html__('The subscription will start now and first period will end on [endDate]. First price is [firstPrice] [currency], other times are [regularPrice] [currency] .', 'revenueflex'),
        '3' => esc_html__('The subscription will start on [startDate] and first period will end on [endDate] .', 'revenueflex'),
        '4' => esc_html__('This subscription is currently used.', 'revenueflex')
    );
    $userMessages = array(
        '1' => esc_html__('You have a paid subscription and plan for next period.', 'revenueflex'),
        '2' => esc_html__('You have a free subscription.', 'revenueflex')
    );
    $responseMessages = array(
        '23' => esc_html__('You cannot close your account because you have a paid subscription and its current period will end on [endDate].<br>You can edit from [URL]', 'revenueflex'),
        '24' => esc_html__('You cannot close your account because you have another project: [projectNames].<br>You can edit from [URL]', 'revenueflex'),
        '25' => esc_html__('You cannot close your account because you have a project belonging to another service: [serviceNames].<br> You can edit from [URL]', 'revenueflex')
    );
    global $endpoint;
    $revenueFlexLocalizeData = array(
        'nonce' => wp_create_nonce('wp_rest'),
        'ajaxurl' => admin_url('admin-ajax.php'),
        'siteurl' => get_site_url(),
        'resturl' => get_rest_url(),
        'pluginDirUri' => $plugin_dir_uri_revenueFlex,
        'redirectRoot' => admin_url('admin.php?page=revenueflex-'),
        'redirectMainRoot' => admin_url('admin.php?page='),
        'endpoint' => $endpoint,
        'email' => revenueflex_getOption('startPage')['revenueflex_mail_address'],
        'apiKey' => revenueflex_getOption('validateKeyPage')['revenueflex_api_key'],
        'projectId' => revenueflex_getOption('projectSelectCreatePage')['revenueflex_project_id'],
        'projectScript' => revenueflex_getOption('projectSelectCreatePage')['revenueflex_project_script'],
        'noProjects' => esc_html__('There is no project.', 'revenueflex'),
        'invoiceInfo' => esc_html__('Invoice Info', 'revenueflex'),
        'shortName' => esc_html__('Name:', 'revenueflex'),
        'nameOnInvoice' => esc_html__('Name on Invoice:', 'revenueflex'),
        'address' => esc_html__('Address:', 'revenueflex'),
        'city' => esc_html__('City:', 'revenueflex'),
        'country' => esc_html__('Country:', 'revenueflex'),
        'postcode' => esc_html__('Postcode:', 'revenueflex'),
        'vatnumber' => esc_html__('Vat Number:', 'revenueflex'),
        'wrongEmailAddress' => esc_html__('Your email address is wrong.', 'revenueflex'),
        'selectProjectToUse' => esc_html__('Select project to use:', 'revenueflex'),
        'desktopUnfilled' => esc_html__('Desktop Unfilled', 'revenueflex'),
        'pagesAwaiting' => esc_html__('Pages Awaiting', 'revenueflex'),
        'desktopAutoAds' => esc_html__('Desktop Auto Ads', 'revenueflex'),
        'unfilled' => esc_html__('Unfilled', 'revenueflex'),
        'desktopAdsPerPage' => esc_html__('Desktop Ads PerPage', 'revenueflex'),
        'mobileAdsPerPage' => esc_html__('Mobile Ads PerPage', 'revenueflex'),
        'processedPages' => esc_html__('Processed Pages', 'revenueflex'),
        'totalAutoAds' => esc_html__('Total Auto Ads', 'revenueflex'),
        'mobilePageViews' => esc_html__('Mobile Page Views', 'revenueflex'),
        'desktopPageViews' => esc_html__('Desktop Page Views', 'revenueflex'),
        'totalPageViews' => esc_html__('Total Page Views', 'revenueflex'),
        'totalPages' => esc_html__('Total Pages', 'revenueflex'),
        'mobileAutoAds' => esc_html__('Mobile Auto Ads', 'revenueflex'),
        'autoAdsPerPage' => esc_html__('Auto Ads Per Page', 'revenueflex'),
        'mobileUnfilled' => esc_html__('Mobile Unfilled', 'revenueflex'),
        'price' => esc_html__('Price', 'revenueflex'),
        'details' => esc_html__('Details', 'revenueflex'),
        'buynow' => esc_html__('Buy Now', 'revenueflex'),
        'select' => esc_html__('Select', 'revenueflex'),
        'cancel' => esc_html__('Cancel', 'revenueflex'),
        'continue' => esc_html__('Continue', 'revenueflex'),
        'projectCreated' => esc_html__('Project Created', 'revenueflex'),
        'dashboard' => esc_html__('Dashboard', 'revenueflex'),
        'subscription' => esc_html__('Subscription', 'revenueflex'),
        'projectCreatedMessage' => esc_html__('RevenueFlex will analyze and start to place ads to your pages shortly.
        If you see any inappropriate placements please <a href="https://www.revenueflex.com/#contact" target="_blank">contact us</a> immediately. RevenueFlex also supports Google 
        admanager ads and other ad networks. If you need other ads please <a href="https://www.revenueflex.com/#contact" target="_blank">contact us.</a>', 'revenueflex'),
        'currentScreen' => get_current_screen(),
        'contactUs' => esc_html__('Contact Us', 'revenueflex'),
        'nextSubscription' => esc_html__('Next Subscription', 'revenueflex'),
        'currentSubscription' => esc_html__('Current Subscription', 'revenueflex'),
        'startDate' => esc_html__('Start Date', 'revenueflex'),
        'endDate' => esc_html__('End Date', 'revenueflex'),
        'enabled' => revenueflex_getOption('projectSettingsPage')['enabled'],
        'messageTemplates' => $messageTemplates,
        'userMessages' => $userMessages,
        'responseMessages' => $responseMessages,
        'enterUserInfoMessage' => esc_html__('Please enter your user information before subscribing.', 'revenueflex')
    );
    if (!in_array($hook, $pages)) {
        wp_enqueue_style('revenueflex-style-global', plugins_url('/assets/css/revenueflex-global.css', __FILE__));
        wp_enqueue_script('revenueflex-script-global', plugins_url('/assets/js/revenueflex-global.js', __FILE__));
        wp_localize_script('revenueflex-script-global', 'revenueflexData', $revenueFlexLocalizeData);
        return;
    }
    wp_enqueue_script('jquery-validation',  plugins_url('assets/js/jquery.validate.js', __FILE__));
    wp_enqueue_script('jquery-validation-additional-methods', plugins_url('assets/js/additional-methods.js', __FILE__));
    wp_enqueue_script('revenueflex-script', plugins_url('/assets/js/revenueflex.js', __FILE__));
    wp_enqueue_style('revenueflex-style', plugins_url('/assets/css/revenueflex.css', __FILE__));
    wp_enqueue_script('bootstrap', plugins_url('/assets/plugins/bootstrap/js/bootstrap.js', __FILE__));
    wp_enqueue_style('bootstrap', plugins_url('/assets/plugins/bootstrap/css/bootstrap.css', __FILE__));
    wp_localize_script('revenueflex-script', 'revenueflexData', $revenueFlexLocalizeData);
    wp_enqueue_script('revenueflex-script-global', plugins_url('/assets/js/revenueflex-global.js', __FILE__));
    wp_localize_script('revenueflex-script-global', 'revenueflexData', $revenueFlexLocalizeData);
}

// Helpers
function revenueflex_get_top_section()
{
    global $plugin_dir_uri_revenueFlex;
    echo wp_kses('<img src="' . esc_url($plugin_dir_uri_revenueFlex) . 'assets/images/revenueflex.png" class="img-fluid" alt="Revenueflex">', ['img' => [
        'src' => [], 'class' => [], 'alt' => []
    ]]);
    echo wp_kses('<div id="revenueflex-result-top" class="alert" role="alert"></div>', ['div' => ['id' => [], 'class' => []]]);
}

function revenueflex_get_top_email_section()
{
    $email = revenueflex_getOption('startPage')['revenueflex_mail_address'];
    if (str_contains($email, '@')) //If it is a real email
        return;

    $warningText = esc_html__('Please enter your email address for better support.', 'revenueflex');

    $placeholder = esc_html__('Email', 'revenueflex');
    $inputStr = '<input type="text" id="revenueflex-user-email" name="user-email" class="col-3" placeholder="' . $placeholder . '" style="margin-left: 40px; font-size:20px"/>';

    $btnText = esc_html__('Save Email', 'revenueflex');
    $buttonStr = '<input type="submit" name="submit" id="submit" class="button button-primary" value="' . $btnText . '" style="margin-left: 20px"/>';

    $contentDivStr = '<div class="revenueflex-email-div" style="font-size:18px">' . $warningText . $inputStr . $buttonStr . '</div>';
    $formId = esc_attr("revenueflex-top-email-form");
    $formStr = '<form action="options.php" method="post" id="' . $formId . '" class="d-table mx-auto col-12">' . $contentDivStr . '</form>';
    $alertDivStr = '<div class="alert alert-danger" role="alert">' . $formStr . '</div>';

    $allowedForm = ['action' => [], 'method' => [], 'id' => [], 'class' => []];
    $allowedDiv = ['id' => [], 'class' => [], 'role' => [], 'style' => []];
    $allowedInput = ['type' => [], 'id' => [], 'name' => [], 'class' => [], 'placeholder' => [], 'value' => [], 'style' => []];
    $allowedArr = ['div' => $allowedDiv, 'input' => $allowedInput, 'form' => $allowedForm];

    echo wp_kses($alertDivStr, $allowedArr);
}

function revenueflex_get_bottom_section()
{
    echo wp_kses('<div id="revenueflex-result" class="alert" role="alert"></div>', ['div' => ['id' => [], 'class' => []]]);
}

function revenueflex_getPageName($pageNameMain)
{
    return '_' . $pageNameMain;
}

function revenueflex_getSectionName($pageNameMain)
{
    return 'revenueflex_' . $pageNameMain . '_section';
}

function revenueflex_goPage($pageRevenueflex)
{
    wp_redirect(esc_url(admin_url('admin.php?page=revenueflex-' . $pageRevenueflex)));
    exit();
}
function revenueflex_generategoPage($pageRevenueflex)
{
    return esc_url(admin_url('admin.php?page=revenueflex-' . $pageRevenueflex));
}
function revenueflex_generategoMainPage($pageRevenueflex)
{
    return esc_url(admin_url('admin.php?page=' . $pageRevenueflex));
}
function revenueflex_getOption($pageName)
{
    return get_option('revenueflex_settings_' . $pageName);
}

function revenueflex_reset_options()
{
    global $revenueflex_pages;
    update_option('revenueflex_settings_' . 'startPage', []);
    foreach ($revenueflex_pages as $pageRevenueflex) {
        update_option('revenueflex_settings_' . $pageRevenueflex['id'], []);
    }
}

// Rest
add_action('rest_api_init', function () {
    register_rest_route('revenueflex/v1', '/option', array(
        'methods' => 'POST',
        'callback' => 'revenueflex_update_option',
        'permission_callback' => function (WP_REST_Request $request) {
            return (wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest') && current_user_can('edit_others_posts'));
        }
    ));
});

function revenueflex_update_option(WP_REST_Request $request)
{
    $parameters = $request->get_body_params();
    if ($parameters) {
        foreach ($parameters['updates'] as $update) {
            $currentOption = get_option($update['option']);
            $value = (isset($update['decrypted'])) ? base64_decode($update['value']) : $update['value'];
            $key = $update['key'];
            $currentOption[$key] = $value;
            update_option($update['option'], $currentOption);
        }
        $data = ['status' => 'Success'];
        $response = new WP_REST_Response($data);
        $response->set_status(200);
        return $response;
    } else {
        return true;
    }
}

// Include Revenueflex Script
add_action('wp_head', 'revenueflex_inHeader');
function revenueflex_inHeader()
{
    $option = revenueflex_getOption("projectSelectCreatePage");
    $enabled = revenueflex_getOption("projectSettingsPage");
    $script = '';
    if ($enabled) {
        if ($enabled['enabled'] === 'true') {
            if ($option) {
                $script = $option['revenueflex_project_script'];
                if ($script) {
                    $script = $script;
                } else {
                    $script = false;
                }
            } else {
                $script = false;
            }
        } else {
            $script = false;
        }
    }
    if (!$script) {
        $script = '<script id="revenueflex-noscript"></script>';
    }
    echo wp_kses($script, ['script' => ['id' => []]]);
}


if (wp_next_scheduled('rf_cron_hourly')) {
    wp_clear_scheduled_hook("rf_cron_hourly");
}

