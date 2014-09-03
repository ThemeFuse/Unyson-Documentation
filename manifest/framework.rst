Framework
=========

The framework's manifest is located in ``framework/manifest.php`` and can be accessed like this:

.. code-block:: php

    fw()->manifest->get('version');

It supports the following parameters:

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    $manifest = array();

    $manifest['name']         = __('Framework', 'fw');
    $manifest['uri']          = 'http://themefuse.com/framework';
    $manifest['description']  = __('WordPress Framework', 'fw');
    $manifest['version']      = '1.0';
    $manifest['author']       = 'ThemeFuse';
    $manifest['author_uri']   = 'http://themefuse.com/';
    $manifest['requirements'] = array(
        'wordpress' => array(
            'min_version' => '3.9',
            /*'max_version' => '1000.0.0'*/
        ),
    );