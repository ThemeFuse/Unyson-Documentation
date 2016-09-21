Addable Box
-----------

Addable box with options.

.. code-block:: php

    array(
        'type'  => 'addable-box',
        'value' => array(
            array(
                'option_1' => 'value 1',
                'option_2' => 'value 2',
            ),
            // ...
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'box-options' => array(
            'option_1' => array( 'type' => 'text' ),
            'option_2' => array( 'type' => 'textarea' ),
        ),
        'template' => 'Hello {{- option_1 }}', // box title
        'box-controls' => array( // buttons next to (x) remove box button
            'control-id' => '<small class="dashicons dashicons-smiley"></small>',
        ),
        'limit' => 0, // limit the number of boxes that can be added
        'add-button-text' => __('Add', '{domain}'),
        'sortable' => true,
    )

.. rubric:: Custom Events

``fw:option-type:addable-box:box:init`` - Box was initialized. Triggered for each existing box after page load, or when a box was added.

``fw:option-type:addable-box:control:click`` - A custom control was clicked.
