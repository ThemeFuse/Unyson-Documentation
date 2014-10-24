Built-in Option Types
=====================

Here is a complete list of all built-in option types with all available parameters for each option.

.. contents::
    :local:
    :backlinks: top

Some option types have custom javascript events. The events are triggered on elements with ``.fw-option-type-{type}`` class. Some events send data that can be accessed this way:

.. code-block:: php

    jQuery('.fw-option-type-demo#fw-option-demo')
        .on('fw:option-type:demo:custom-event', function(event, data){
            console.log(data);
        });

Text
----

Regular text input.

.. code-block:: php

    array(
        'type'  => 'text',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )

Password
--------

Regular password input.

.. code-block:: php

    array(
        'type'  => 'password',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )

Textarea
--------

Regular textarea.

.. code-block:: php

    array(
        'type'  => 'textarea',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )

Hidden
------

Simple hidden input.

.. code-block:: php

    array(
        'type'  => 'hidden',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
    )

.. tip::

   The hidden input is not visible, so parameters like ``label``, ``desc`` and ``help`` have no sense here.



HTML
----

If you want to display a custom piece of html, use this option type.

.. note::

    This option type has a value stored in a hidden input. Advanced users can create some javascript functionality in html and store the value in that hidden input.

.. code-block:: php

    array(
        'type'  => 'html',
        'value' => 'default hidden value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'html'  => 'My <b>custom</b> <em>HTML</em>',
    )

.. note::

    There are ``html-fixed`` and ``html-full`` option types as well. They are the same as ``html`` but has **fixed** and **full** :doc:`option width <option-width>`.



Checkbox
--------

Single checkbox.

.. code-block:: php

    array(
        'type'  => 'checkbox',
        'value' => true, // checked/unchecked
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'text'  => __('Yes', 'fw'),
    )



Checkboxes
----------

A list of checkboxes.

.. code-block:: php

    array(
        'type'  => 'checkboxes',
        'value' => array(
            'choice-1' => false,
            'choice-2' => true,
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'choices' => array(
            'choice-1' => __('Choice 1', 'fw'),
            'choice-2' => __('Choice 2', 'fw'),
            'choice-3' => __('Choice 3', 'fw'),
        ),
    )



Radio
-----

A list of radio buttons.

.. code-block:: php

    array(
        'type'  => 'radio',
        'value' => 'choice-3',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'choices' => array(
            'choice-1' => __('Choice 1', 'fw'),
            'choice-2' => __('Choice 2', 'fw'),
            'choice-3' => __('Choice 3', 'fw'),
        ),
    )



Select
------

Regular select.

.. code-block:: php

    array(
        'type'  => 'select',
        'value' => 'choice-3',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'choices' => array(
            '' => '---',
            'choice-1' => __('Choice 1', 'fw'),
            'choice-2' => array(
                'text' => __('Choice 2', 'fw'),
                'attr' => array('data-foo' => 'bar'),
            ),
            array( // optgroup
                'attr'    => array('label' => __('Group 1', 'fw')),
                'choices' => array(
                    'choice-3' => __('Choice 3', 'fw'),
                    // ...
                ),
            ),
        ),
        /**
         * Allow not existing choices
         * Used when select is used in another option types and populated dynamically
         */
        'no-validate' => false,
    )



Select Multiple
---------------

Select with multiple values.

.. code-block:: php

    array(
        'type'  => 'select-multiple',
        'value' => array( 'choice-1', 'choice-3' ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'choices' => array(
            '' => '---',
            'choice-1' => __('Choice 1', 'fw'),
            'choice-2' => array(
                'text' => __('Choice 2', 'fw'),
                'attr' => array('data-foo' => 'bar'),
            ),
            array( // optgroup
                'attr'    => array('label' => __('Group 1', 'fw')),
                'choices' => array(
                    'choice-3' => __('Choice 3', 'fw'),
                    // ...
                ),
            ),
        ),
    )



Multi-Select
------------

Select multiple choices from different sources: posts, taxonomies, users or a custom array.

.. code-block:: php

    array(
        'type'  => 'multi-select',
        'value' => array( 'choice-1', 'choice-3' ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        /**
         * Set population method
         * Are available: 'posts', 'taxonomy', 'users', 'array'
         */
        'population' => 'array',
        /**
         * Set post types, taxonomies, user roles to search for
         *
         * 'population' => 'posts'
         * 'source' => 'page',
         *
         * 'population' => 'taxonomy'
         * 'source' => 'category',
         *
         * 'population' => 'users'
         * 'source' => array( 'editor', 'subscriber', 'author' ),
         *
         * 'population' => 'array'
         * 'source' => '' // will populate with 'choices' array
         */
        'source' => '',
        /**
         * An array with the available choices
         * Used only when 'population' => 'array'
         */
        'choices' => array(
            'choice-1' => __('Choice 1', 'fw'),
            'choice-2' => __('Choice 2', 'fw'),
            'choice-3' => __('Choice 3', 'fw'),
        ),
        /**
         * Set maximum items number that can be selected
         */
        'limit' => 100,
    )


Multi
-----

Option with another options in it.

.. code-block:: php

    array(
        'type'  => 'multi',
        'value' => array(
            'option-1' => 'value 1',
            'option-2' => 'value 2',
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'inner-options' => array(
            'option-1' => array( 'type' => 'text' ),
            'option-2' => array( 'type' => 'textarea' ),
        )
    )

.. important::

    The parameter that contains options is named ``inner-options`` not ``options``
    otherwise this will be treated as a container option.

Switch
------

Switch between two choices.

.. code-block:: php

    array(
        'type'  => 'switch',
        'value' => 'hello',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'left-choice' => array(
            'value' => 'goodbye',
            'label' => __('Goodbye', 'fw'),
        ),
        'right-choice' => array(
            'value' => 'hello',
            'label' => __('Hello', 'fw'),
        ),
    )

.. rubric:: Custom Events

``fw:option-type:switch:change`` - Value was changed.



Color Picker
------------

Pick a color.

.. code-block:: php

    array(
        'type'  => 'color-picker',
        'value' => '#FF0000',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )



Gradient
--------

Pick gradient colors.

.. code-block:: php

    array(
        'type'  => 'gradient',
        'value' => array(
            'primary'   => '#FF0000',
            'secondary' => '#0000FF',
        )
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )



Background Image
----------------

Choose background image.

.. code-block:: php

    array(
        'type'  => 'background-image',
        'value' => 'bg-1',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
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



Date Picker
-----------

Pick a date in calendar.

.. code-block:: php

    array(
        'type'  => 'date-picker',
        'value' => '',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'monday-first' => true, // The week will begin with Monday; for Sunday, set to false
        'min-date' => date('d-m-Y'), // By default minimum date will be current day. Set a date in format d-m-Y as a start date
        'max-date' => null, // By default there is not maximum date. Set a date in format d-m-Y as a start date
    )



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
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
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



Icon
----

Choose a `FontAwesome <http://fontawesome.io/>`_ icon.

.. code-block:: php

    array(
        'type'  => 'icon',
        'value' => 'fa-smile-o',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )



Upload
------

Single file upload.

.. code-block:: php

    array(
        'type'  => 'upload',
        'value' => array(
             'attachment_id' => '9',
             'url' => '//site.com/wp-content/uploads/2014/02/whatever.jpg'
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        /**
         * If set to `true`, the option will allow to upload only images, and display a thumb of the selected one.
         * If set to `false`, the option will allow to upload any file from the media library.
         */
        'images_only' => true,
    )

.. rubric:: Custom Events

``fw:option-type:upload:change`` - The value was changed.

``fw:option-type:upload:clear`` - The value was cleared (the selected item is removed).



Multi-Upload
------------

Upload multiple files.

.. code-block:: php

    array(
        'type'  => 'multi-upload',
        'value' => array(
            array(
                 'attachment_id' => '9',
                 'url' => '//site.com/wp-content/uploads/2014/02/whatever.jpg'
            ),
            array(
                 'attachment_id' => '10',
                 'url' => '//site.com/wp-content/uploads/2014/02/random.jpg'
            ),
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        /**
         * If set to `true`, the option will allow to upload only images, and display a thumb of the selected one.
         * If set to `false`, the option will allow to upload any file from the media library.
         */
        'images_only' => true,
    )

.. rubric:: Custom Events

``fw:option-type:multi-upload:change`` - The value was changed.

``fw:option-type:multi-upload:clear`` - The value is cleared (all the selected items are removed).

``fw:option-type:multi-upload:remove`` - A thumb (selected item) is removed. Triggered only when ``images_only`` is set to ``true``.



Addable Option
--------------

Create a list of options.

.. code-block:: php

    array(
        'type'  => 'addable-option',
        'value' => array('Value 1', 'Value 2', 'Value 3'),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'option' => array( 'type' => 'text' ),
    )

.. rubric:: Custom Events

``fw:option-type:addable-option:option:init`` - New option was added and initialized.



Addable Box
-----------

Addable box with options.

.. code-block:: php

    array(
        'type'  => 'addable-box',
        'value' => array(
            array(
                'option-1' => 'value 1',
                'option-2' => 'value 2',
            )
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'box-options' => array(
            'option-1' => array( 'type' => 'text' ),
            'option-2' => array( 'type' => 'textarea' ),
        ),
        'box-controls' => array( // buttons next to (x) remove box button
            'control-id' => '<small class="dashicons dashicons-smiley"></small>',
        ),
    )

.. rubric:: Custom Events

``fw:option-type:addable-box:box:init`` - Box was initialized. Triggered for each existing box after page load, or when a box was added.

``fw:option-type:addable-box:control:click`` - A custom control was clicked.



Addable Popup
-------------

Addable popup with options.

.. code-block:: php

    array(
        'type' => 'addable-popup',
        'label' => __('Addable Popup', 'fw'),
        'desc'  => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
        'template' => '{{=demo_text}}',
        'popup-options' => array(
            'demo_text' => array(
                'label' => __('Text', 'fw'),
                'type' => 'text',
                'value' => 'Demo text value',
                'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
                'help' => sprintf("%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
                    __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
                    __('Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'fw')
                ),
            ),
            'demo_textarea' => array(
                'label' => __('Textarea', 'fw'),
                'type' => 'textarea',
                'value' => 'Demo textarea value',
                'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
                'help' => sprintf("%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
                    __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
                    __('Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'fw')
                ),
            ),
        ),
    )


Typography
----------

Choose font family, size, style and color.

.. code-block:: php

    array(
        'type'  => 'typography',
        'value' => array(
            'family' => 'Arial',
            'size'   => 12,
            'style'  => '400',
            'color'  => '#000000'
        )
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )

WP Editor
---------

Textarea with the WordPress Editor like the one you use on the blog posts edit pages.

.. code-block:: php

    array(
        'type'  => 'wp-editor',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )


Multi-Picker
------------

Pick a choice, then complete options related to that choice.

The ``picker`` parameter holds a valid option type with choices. Supported option types are ``select``, ``radio``, ``image-picker`` and ``switch``.

.. code-block:: php

    array(
        'type'  => 'multi-picker',
        'label' => false,
        'desc'  => false,
        'value' => array(
            /**
             * '<custom-key>' => 'default-choice'
             */
            'gadget' => 'phone',

            /**
             * These are the choices and their values,
             * they are available after option was saved to database
             */
            'laptop' => array(
                'price' => '123',
                'webcam' => false
            ),
            'phone' => array(
                'price' => '456',
                'memory' => '32'
            )
        ),
        'picker' => array(
            // '<custom-key>' => option
            'gadget' => array(
                'label'   => __('Choose device', 'fw'),
                'type'    => 'select',
                'choices' => array(
                    'phone'  => __('Phone', 'fw'),
                    'laptop' => __('Laptop', 'fw')
                ),
                'desc'    => __('Description', 'fw'),
                'help'    => __('Help tip', 'fw'),
            )
        ),
        /*
        'picker' => array(
            // '<custom-key>' => option
            'gadget' => array(
                'label'   => __('Choose device', 'fw'),
                'type'    => 'radio',
                'choices' => array(
                    'phone'  => __('Phone', 'fw'),
                    'laptop' => __('Laptop', 'fw')
                ),
                'desc'    => __('Description', 'fw'),
                'help'    => __('Help tip', 'fw'),
            )
        ),
        */
        /*
        'picker' => array(
            // '<custom-key>' => option
            'gadget' => array(
                'label'   => __('Choose device', 'fw'),
                'type'    => 'image-picker',
                'choices' => array(
                    'phone'  => 'http://placekitten.com/70/70',
                    'laptop' => 'http://placekitten.com/71/70'
                ),
                'desc'    => __('Description', 'fw'),
                'help'    => __('Help tip', 'fw'),
            )
        ),
        */
        /*
        picker => array(
            // '<custom-key>' => option
            'gadget' => array(
                'label' => __('Choose device', 'fw'),
                'type'  => 'switch',
                'right-choice' => array(
                    'value' => 'laptop',
                    'label' => __('Laptop', 'fw')
                ),
                'left-choice' => array(
                    'value' => 'phone',
                    'label' => __('Phone', 'fw')
                ),
                'desc' => __('Description', 'fw'),
                'help' => __('Help tip', 'fw'),
            )
        ),
        */
        'choices' => array(
            'phone' => array(
                'price' => array(
                    'type'  => 'text',
                    'label' => __('Price', 'fw'),
                ),
                'memory' => array(
                    'type'  => 'select',
                    'label' => __('Memory', 'fw'),
                    'choices' => array(
                        '16' => __('16Gb', 'fw'),
                        '32' => __('32Gb', 'fw'),
                        '64' => __('64Gb', 'fw'),
                    )
                )
            ),
            'laptop' => array(
                'price' => array(
                    'type'  => 'text',
                    'label' => __('Price', 'fw'),
                ),
                'webcam' => array(
                    'type'  => 'switch',
                    'label' => __('Webcam', 'fw'),
                )
            ),
        ),
        /**
         * (optional) if is true, the borders between choice options will be shown
         */
        'show_borders' => false,
    )

Map
---

Google maps location.

.. code-block:: php

    array(
        'type'  => 'map',
        'value' => array(
            'coordinates' => array(
                'lat'   => -34,
                'lng'   => 150,
            )
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )
