Upload
------

Single file upload.

.. code-block:: php

    array(
        'type'  => 'upload',
        'value' => array(
            /*
            'attachment_id' => '9',
            'url' => '//site.com/wp-content/uploads/2014/02/whatever.jpg'
            */
            // if value is set in code, it is not considered and not used
            // because there is no sense to set hardcode attachment_id
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        /**
         * If set to `true`, the option will allow to upload only images, and display a thumb of the selected one.
         * If set to `false`, the option will allow to upload any file from the media library.
         */
        'images_only' => true,
        /**
         * An array with allowed files extensions what will filter the media library and the upload files.
         */
        'files_ext' => array( 'doc', 'pdf', 'zip' ),
        /**
         * An array with extra mime types that is not in the default array with mime types from the javascript Plupload library.
         * The format is: array( '<mime-type>, <ext1> <ext2> <ext2>' ).
         * For example: you set rar format to filter, but the filter ignore it , than you must set
         * the array with the next structure array( '.rar, rar' ) and it will solve the problem.
         */
        'extra_mime_types' => array( 'audio/x-aiff, aif aiff' )
    )

.. rubric:: Custom Events

``fw:option-type:upload:change`` - The value was changed.

``fw:option-type:upload:clear`` - The value was cleared (the selected item is removed).