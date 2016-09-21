Popup
-----

Popup with options.

.. code-block:: php

    array(
        'type' => 'popup',
        'value' => array(
            'option_1' => 'value 1',
            'option_2' => 'value 2',
        ),
        'label' => __('Popup', '{domain}'),
        'desc'  => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '{domain}'),
        'popup-title' => __('Popup Title', '{domain}'),
        'button' => __('Edit', '{domain}'),
        'popup-title' => null,
        'size' => 'small', // small, medium, large
        'popup-options' => array(
            'option_1' => array(
                'label' => __('Text', '{domain}'),
                'type' => 'text',
                'value' => 'Demo text value',
                'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '{domain}'),
                'help' => sprintf("%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
                    __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '{domain}'),
                    __('Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', '{domain}')
                ),
            ),
            'option_2' => array(
                'label' => __('Textarea', '{domain}'),
                'type' => 'textarea',
                'value' => 'Demo textarea value',
                'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '{domain}'),
                'help' => sprintf("%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
                    __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '{domain}'),
                    __('Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', '{domain}')
                ),
            ),
        ),
    )