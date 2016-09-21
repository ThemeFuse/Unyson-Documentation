Multi
-----

Group any options database values under a single array key.
This option has no design, inner options will look the same as other options (it's like the ``group`` container).

.. code-block:: php

    // database value structure

    'option_type_multi_id' => array(
        'inner_option_1' => ...
        'inner_option_2' => ...
    )

.. code-block:: php

    array(
        'type'  => 'multi',
        'value' => array(
            'option-1' => 'value 1',
            'option-2' => 'value 2',
        ),
        'attr'  => array(
            'class' => 'custom-class',
            'data-foo' => 'bar',
            /*
            // Add this class to display inner options separators
            'class' => 'fw-option-type-multi-show-borders',
            */
        ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'inner-options' => array(
            'option_1' => array( 'type' => 'text' ),
            'option_2' => array( 'type' => 'textarea' ),
        )
    )

.. important::

    The parameter that contains options is named ``inner-options`` not ``options``
    otherwise this will be treated as a container option.