Color Picker
------------

Pick a color.

.. code-block:: php

    array(
        'type'  => 'color-picker',
        'value' => '#FF0000',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        // palette colors array
        'palettes' => array( '#ba4e4e', '#0ce9ed', '#941940' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )