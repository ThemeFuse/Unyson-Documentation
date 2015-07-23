Theme
=====

The theme's manifest is located in ``framework-customizations/theme/manifest.php`` and can be accessed like this:

.. code-block:: php

    fw()->theme->manifest->get('version');

It supports the following parameters:

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    $manifest = array();

    /**
     * An unique id to identify your theme
     * For e.g. this is used to store Theme Settings in wp_option 'fw_theme_settings_options:{theme_id}'
     */
    $manifest['id'] = get_option( 'stylesheet' );

    /**
     * Specify extensions that you customized, that will look good and work well with your theme.
     * After plugin activation, the user will be redirected to a page to install these extensions.
     */
    $manifest['supported_extensions'] = array(
        // 'extension_name' => array(),

        'page-builder' => array(),
        'breadcrumbs' => array(),
        'slider' => array(),
        // ...

        /**
         * These extensions are visible on Unyson Extensions page only if are specified here.
         * Because they has no sense to be available for a theme that is not configured to support them.
         */
        'styling' => array(),
        'megamenu' => array(),
    );

    $manifest['requirements'] = array(
        'wordpress' => array(
            'min_version' => '4.0',
            /*'max_version' => '4.99.9'*/
        ),
        'framework' => array(
            /*'min_version' => '1.0.0',
            'max_version' => '1.99.9'*/
        ),
        'extensions' => array(
            /*'extension_name' => array(),*/
            /*'extension_name' => array(
                'min_version' => '1.0.0',
                'max_version' => '2.99.9'
            ),*/
        )
    );

    // These keys are automatically fetched from theme styles.css
    //$manifest['name'] = __('Theme Title', 'fw');
    //$manifest['description'] = __('Another awesome wordpress theme', 'fw');
    //$manifest['uri'] = 'http://themefuse.com/wp-themes-shop/theme-name';
    //$manifest['version'] = '1.0';
    //$manifest['author'] = 'ThemeFuse';
    //$manifest['author_uri'] = 'http://themefuse.com/';
