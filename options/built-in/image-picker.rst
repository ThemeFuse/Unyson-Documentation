Image Picker
------------

Pick an image.

.. code-block:: php

    array(
        'type'  => 'image-picker',
        'value' => 'image-2',
        'attr'  => array(
            'class'    => 'custom-class',
            'data-foo' => 'bar',
        ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'choices' => array(
            'value-1' => get_template_directory_uri() .'/images/thumbnail.png',
            'value-2' => array(
                // (required) url for thumbnail
                'small' => get_template_directory_uri() .'/images/thumbnail.png',
                // (optional) url for large image that will appear in tooltip
                'large' => get_template_directory_uri() .'/images/preview.png',
                // (optional) choice extra data for js, available in custom events
                'data' => array(...)
            ),
            'value-3' => array(
                // (required) url for thumbnail
                'small' => array(
                    'src' => get_template_directory_uri() .'/images/thumbnail.png',
                    'height' => 70
                ),
                // (optional) url for large image that will appear in tooltip
                'large' => array(
                    'src' => get_template_directory_uri() .'/images/preview.png',
                    'height' => 400
                ),
                // (optional) choice extra data for js, available in custom events
                'data' => array(...)
            ),
        ),
        'blank' => true, // (optional) if true, images can be deselected
    )

.. rubric:: Custom Events

``fw:option-type:image-picker:clicked`` - A thumbnail was clicked.

``fw:option-type:image-picker:changed`` - Value was changed.