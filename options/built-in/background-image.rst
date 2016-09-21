Background Image
----------------

Choose background image.

.. code-block:: php

    array(
        'type'  => 'background-image',
        'value' => 'bg-1',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'choices' => array(
            'none' => array(
                'icon' => get_template_directory_uri() . '/images/bg/bg-0.jpg',
                'css'  => array(
                    'background-image' => 'none'
                ),
            ),
            'bg-1' => array(
                'icon'  => get_template_directory_uri() . '/images/bg/bg-1.jpg',
                'css'  => array(
                    'background-image'  => 'url("' . get_template_directory_uri() . '/images/bg-1.png' . '")',
                    'background-repeat' => 'repeat',
                ),
            ),
            'bg-2' => array(
                'icon' => get_template_directory_uri() . '/images/bg/bg-2.jpg',
                'css'  => array(
                    'background-image'  => 'url("' . get_template_directory_uri() . '/images/bg-2.png' . '")',
                    'background-repeat' => 'repeat-y'
                ),
            )
        )
    )