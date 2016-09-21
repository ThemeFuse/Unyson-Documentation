Switch
------

Switch between two choices.

.. code-block:: php

    array(
        'type'  => 'switch',
        'value' => 'hello',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'left-choice' => array(
            'value' => 'goodbye',
            'label' => __('Goodbye', '{domain}'),
        ),
        'right-choice' => array(
            'value' => 'hello',
            'label' => __('Hello', '{domain}'),
        ),
    )

.. rubric:: Custom Events

``fw:option-type:switch:change`` - Value was changed.

.. note::

        Switch value in html is json encoded to prevent issues with boolean values,
        so before using the html value in javascript do ``value = JSON.parse(value);``