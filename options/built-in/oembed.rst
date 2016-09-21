Oembed
------

Generate oembed preview of the inserted link, for more details see `Embeds <https://codex.wordpress.org/Embeds>`__ in WordPress.

.. code-block:: php

    array(
        'type'  => 'oembed',
        'value' => 'https://vimeo.com/113078377',
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'preview' => array(
            'width'  => 300, // optional, if you want to set the fixed width to iframe
            'height' => 300, // optional, if you want to set the fixed height to iframe
            /**
             * if is set to false it will force to fit the dimensions,
             * because some widgets return iframe with aspect ratio and ignore applied dimensions
             */
            'keep_ratio' => true
        )
    )