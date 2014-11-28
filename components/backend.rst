Backend
=======

Admin side functionality:

.. _backend-option-type:

* ``option_type($type)`` - get instance of a registered option type.

    .. code-block:: php

        $option_type_text = fw()->backend->option_type('text');

        echo $option_type_text->render('demo', array( 'value' => 'Demo Value' ));

.. _backend-render-option:

* ``render_option($id, $option, $data = array(), $design = 'default')`` - render option html together with ``label``, ``desc`` and ``help``.

    .. attention::

        Does not accept container options.

    .. code-block:: php

        // simple usage
        echo fw()->backend->render_option('demo', array( 'type' => 'text' ));

        // advanced usage
        echo fw()->backend->render_option(
            'demo',
            array(
                'type'  => 'text',
                'label' => __('Demo Label', 'fw'),
                'desc'  => __('Demo Description', 'fw'),
                'html'  => __('Demo Help Tip', 'fw'),
                'value' => 'default value',
            ),
            array(
                'id_prefix'   => 'custom-id-prefix-',
                'name_prefix' => 'custom_name_prefix',
                'value'       => 'overwrite default value'
            ),
            'taxonomy'
        );

.. _backend-render-options:

* ``render_options(&$options, &$values = array(), $options_data = array(), $design = 'default')`` - generate html from any array of options.

    .. code-block:: php

        $options = array(
            'option-1' => array( 'type' => 'text',     'value' => 'default value 1' ),
            'option-2' => array( 'type' => 'textarea', 'value' => 'default value 2' ),
        );

        // simple usage
        echo fw()->backend->render_options($options);

        $values = array(
            'option-1' => 'Some value', // this overwrites default value
            // 'option-2' value is not specified, so it will have default value
        );

        // advanced usage
        echo fw()->backend->render_options(
            $options,
            $values,
            array(
                'id_prefix'   => 'custom-id-prefix-',
                'name_prefix' => 'custom_name_prefix',
                'value'       => 'overwrite default value'
            ),
            'taxonomy'
        );

.. _backend-render-box:

* ``render_box($id, $title, $content, $other = array())`` - render WordPres metabox.

    .. code-block:: php

        // simple usage
        echo fw()->backend->render_box('some-html-id', 'Title', 'Some <strong>Content</strong>');

        // advanced usage
        echo fw()->backend->render_box(
            'some-html-id',
            'Title',
            'Some <strong>Content</strong>',
            array(
                'html_before_title' => '&lt;',
                'html_after_title'  => '&gt;',
                'attr' => array(
                    'class' => 'custom-class'
                ),
            )
        );


.. _backend-enqueue-options-static-:

* ``enqueue_options_static($options)`` - enqueue options scripts and styles

    .. code-block:: php

        $options = array(
            'option-1' => array( 'type' => 'text',     'value' => 'default value 1' ),
            'option-2' => array( 'type' => 'textarea', 'value' => 'default value 2' ),
        );

        fw()->backend->enqueue_options_static($options);