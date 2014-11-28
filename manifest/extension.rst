Extension
=========

The extension's manifest is located in ``{extension-name}/manifest.php`` and can be accessed like this:

.. code-block:: php

    fw()->extensions->get('extension-name')->manifest->get('version');

It supports the following parameters:

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    $manifest = array();

    $manifest['name']         = __('Extension Title', 'fw');
    $manifest['uri']          = 'http://extension-homepage.com/';
    $manifest['description']  = __('Another awesome framework extension', 'fw');
    $manifest['version']      = '1.0';
    $manifest['author']       = 'ThemeFuse';
    $manifest['author_uri']   = 'http://themefuse.com/';
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
    /**
     * @type bool Display on the Extensions page or it's a hidden extension
     */
    $manifest['display'] = false;
    /**
     * @type bool If extension can exist alone
     * false - There is no sense for it to exist alone, it exists only when is required by some other extension.
     * true  - Can exist alone without bothering about other extensions.
     */
    $manifest['standalone'] = false;
    /**
     * @type string Thumbnail used on the Extensions page
     * All framework extensions has thumbnails set in the available extensions list
     * but if your extension is not in that list and id located in the theme, you can set the thumbnail via this parameter
     */
    $manifest['thumbnail'] = null;
