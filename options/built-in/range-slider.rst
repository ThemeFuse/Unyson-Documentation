Range Slider
------------

Drag the handles to set a numeric value range.

.. code-block:: php

    array(
        'type'  => 'range-slider',
        'value' => array(
            'from' => 10,
            'to'   => 33,
        ),
        'properties' => array(
            /*
            'min' => 0,
            'max' => 100,
            'step' => 1, // Set slider step. Always > 0. Could be fractional.
            */
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )