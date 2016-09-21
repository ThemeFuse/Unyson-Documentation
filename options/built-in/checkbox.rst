Checkbox
--------

Single checkbox.

.. code-block:: php

    array(
        'type'  => 'checkbox',
        'value' => true, // checked/unchecked
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'text'  => __('Yes', '{domain}'),
    )