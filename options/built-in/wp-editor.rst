WP Editor
---------

Textarea with the WordPress Editor like the one you use on the blog posts edit pages.

.. code-block:: php

    array(
        'type'  => 'wp-editor',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'size' => 'small', // small, large
        'editor_height' => 400,
        'wpautop' => true,
        'editor_type' => false, // tinymce, html

        /**
         * By default, you don't have any shortcodes into the editor.
         *
         * You have two possible values:
         *   - false:   You will not have a shortcodes button at all
         *   - true:    the default values you provide in wp-shortcodes
         *              extension filter will be used
         *
         *   - An array of shortcodes
         */
        'shortcodes' => false // true, array('button', map')

        /**
         * Also available
         * https://github.com/WordPress/WordPress/blob/4.4.2/wp-includes/class-wp-editor.php#L80-L94
         */
    )