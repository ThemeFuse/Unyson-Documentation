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
            /*'max_version' => '1000.0.0'*/
        ),
        'framework' => array(
            /*'min_version' => '0.0.0',
            'max_version' => '1000.0.0'*/
        ),
        'extensions' => array(
            /*'extension_name' => array(
                'min_version' => '0.0.0',
                'max_version' => '1000.0.0'
            )*/
        )
    );
