Addable Option
--------------

Create a list of options.

.. code-block:: php

    array(
        'type'  => 'addable-option',
        'value' => array('Value 1', 'Value 2', 'Value 3'),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'option' => array( 'type' => 'text' ),
        'add-button-text' => __('Add', '{domain}'),
        'sortable' => true,
    )

.. rubric:: Custom Events

``fw:option-type:addable-option:option:init`` - New option was added and initialized.