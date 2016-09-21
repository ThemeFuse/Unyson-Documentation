Typography v2
-------------

Choose font family, style, weight, size, line-height, letter-spacing and color.

.. code-block:: php

    array(
        'type' => 'typography-v2',
        'value' => array(
            'family' => 'Amarante',
            // For standard fonts, instead of subset and variation you should set 'style' and 'weight'.
            // 'style' => 'italic',
            // 'weight' => 700,
            'subset' => 'latin-ext',
            'variation' => 'regular',
            'size' => 14,
            'line-height' => 13,
            'letter-spacing' => -2,
            'color' => '#0000ff'
        ),
        'components' => array(
            'family'         => true,
            // 'style', 'weight', 'subset', 'variation' will appear and disappear along with 'family'
            'size'           => true,
            'line-height'    => true,
            'letter-spacing' => true,
            'color'          => true
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )