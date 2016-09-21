Slider
------

Drag the handle to select a numeric value.

.. code-block:: php

    array(
        'type'  => 'slider',
        'value' => 33,
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