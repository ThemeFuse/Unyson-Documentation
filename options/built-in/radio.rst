Radio
-----

A list of radio buttons.

.. code-block:: php

    array(
        'type'  => 'radio',
        'value' => 'choice-3',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'choices' => array( // Note: Avoid bool or int keys http://bit.ly/1cQgVzk
            'choice-1' => __('Choice 1', '{domain}'),
            'choice-2' => __('Choice 2', '{domain}'),
            'choice-3' => __('Choice 3', '{domain}'),
        ),
        // Display choices inline instead of list
        'inline' => false,
    )