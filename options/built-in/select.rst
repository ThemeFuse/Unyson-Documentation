Select
------

Regular select.

.. code-block:: php

    array(
        'type'  => 'select',
        'value' => 'choice-3',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'choices' => array(
            '' => '---',
            'choice-1' => __('Choice 1', '{domain}'),
            'choice-2' => array(
                'text' => __('Choice 2', '{domain}'),
                'attr' => array('data-foo' => 'bar'),
            ),
            array( // optgroup
                'attr'    => array('label' => __('Group 1', '{domain}')),
                'choices' => array(
                    'choice-3' => __('Choice 3', '{domain}'),
                    // ...
                ),
            ),
        ),
        /**
         * Allow save not existing choices
         * Useful when you use the select to populate it dynamically from js
         */
        'no-validate' => false,
    )