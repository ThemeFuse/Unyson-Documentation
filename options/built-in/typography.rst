Typography
----------

Choose font family, size, style and color.

.. code-block:: php

    array(
        'type'  => 'typography',
        'value' => array(
            'family' => 'Arial',
            'size'   => 12,
            'style'  => '400',
            'color'  => '#000000'
        ),
       'components' => array(
            'family' => true,
            'size'   => true,
            'color'  => true
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )