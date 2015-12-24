Built-in Option Types
=====================

.. raw:: html

        <iframe src="https://player.vimeo.com/video/105002864?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

        <br><br>

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

    There are ``html-fixed`` and ``html-full`` option types as well. They are the same as ``html`` but has **fixed** and **full** :doc:`option width <create-option-type>`.



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
        'choices' => array( // Note: Avoid bool or int keys http://bit.ly/1cQgVzk
            'choice-1' => __('Choice 1', 'fw'),
            'choice-2' => __('Choice 2', 'fw'),
            'choice-3' => __('Choice 3', 'fw'),
        ),
        // Display choices inline instead of list
        'inline' => false,
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
        'choices' => array( // Note: Avoid bool or int keys http://bit.ly/1cQgVzk
            'choice-1' => __('Choice 1', 'fw'),
            'choice-2' => __('Choice 2', 'fw'),
            'choice-3' => __('Choice 3', 'fw'),
        ),
        // Display choices inline instead of list
        'inline' => false,
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
         * Allow save not existing choices
         * Useful when you use the select to populate it dynamically from js
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
         * Set the number of posts/users/taxonomies that multi-select will be prepopulated
         * Or set the value to false in order to disable this functionality.
         */
        'prepopulation' => 10,
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

Group any options database values under a single array key.
This option has no design, inner options will look the same as other options (it's like the ``group`` container).

.. code-block:: php

    // database value structure

    'option_type_multi_id' => array(
        'inner_option_1' => ...
        'inner_option_2' => ...
    )

.. code-block:: php

    array(
        'type'  => 'multi',
        'value' => array(
            'option-1' => 'value 1',
            'option-2' => 'value 2',
        ),
        'attr'  => array(
            'class' => 'custom-class',
            'data-foo' => 'bar',
            /*
            // Add this class to display inner options separators
            'class' => 'fw-option-type-multi-show-borders',
            */
        ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'inner-options' => array(
            'option_1' => array( 'type' => 'text' ),
            'option_2' => array( 'type' => 'textarea' ),
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
        // palette colors array
        'palettes' => array( '#ba4e4e', '#0ce9ed', '#941940' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )



RGBA Color Picker
-----------------

Pick a ``rgba()`` color.

.. code-block:: php

    array(
        'type'  => 'rgba-color-picker',
        'value' => 'rgba(255,0,0,0.5)',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        // palette colors array
        'palettes' => array( '#ba4e4e', '#0ce9ed', '#941940' ),
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



Datetime Picker
---------------

Pick a datetime in calendar.

.. code-block:: php

    array(
        'type'  => 'datetime-picker',
        'value' => '',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'datetime-picker' => array(
            'format'        => 'Y/m/d H:i', // Format datetime.
            'maxDate'       => false,  // By default there is not maximum date , set a date in the datetime format.
            'minDate'       => false,  // By default minimum date will be current day, set a date in the datetime format.
            'timepicker'    => true,   // Show timepicker.
            'datepicker'    => true,   // Show datepicker.
            'defaultTime'   => '12:00' // If the input value is empty, timepicker will set time use defaultTime.
        ),
    )



Datetime Range
--------------

Set a datetime range.

.. code-block:: php

    array(
        'type'  => 'datetime-range',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'datetime-pickers' => array(
        'from' => array(
            'minDate' => '1970/01/01', // By default minimum date will be current day, set a date in the datetime format.
            'maxDate' => '2038/01/19', // By default there is not maximum date , set a date in the datetime format.
            'format'  => 'Y/m/d H:i',  // Format datetime.
            'timepicker'  => true,     // Show timepicker.
            'datepicker'  => true,     // Show datepicker.
            ),
        'to' => array(
            'minDate' => '1970/01/01', // By default minimum date will be current day, set a date in the datetime format.
            'maxDate' => '2038/01/19', // By default there is not maximum date , set a date in the datetime format.
            'format'  => 'Y/m/d H:i',  // Format datetime.
            'timepicker'  => true,     // Show timepicker.
            'datepicker'  => true,     // Show datepicker.
            )
        ),
        'value' => array(
            'from' => '',
            'to' => ''
        )
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
            /*
            'attachment_id' => '9',
            'url' => '//site.com/wp-content/uploads/2014/02/whatever.jpg'
            */
            // if value is set in code, it is not considered and not used
            // because there is no sense to set hardcode attachment_id
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



Multi-Upload
------------

Upload multiple files.

.. code-block:: php

    array(
        'type'  => 'multi-upload',
        'value' => array(
            /*
            array(
                'attachment_id' => '9',
                'url' => '//site.com/wp-content/uploads/2014/02/whatever.jpg'
            ),
            ...
            */
            // if value is set in code, it is not considered and not used
            // because there is no sense to set hardcode attachment_id
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

``fw:option-type:multi-upload:change`` - The value was changed.

``fw:option-type:multi-upload:clear`` - The value is cleared (all the selected items are removed).

``fw:option-type:multi-upload:remove`` - A thumb (selected item) is removed. Triggered only when ``images_only`` is set to ``true``.



Slider
------

Drag the handle to select a numeric value.

.. code-block:: php

    array(
        'type'  => 'slider',
        'value' => 33,
        'properties' => array(
            /*
            'min' => 0,
            'max' => 100,
            'step' => 1, // Set slider step. Always > 0. Could be fractional.
            */
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )


Range Slider
------------

Drag the handles to set a numeric value range.

.. code-block:: php

    array(
        'type'  => 'range-slider',
        'value' => array(
            'from' => 10,
            'to'   => 33,
        ),
        'properties' => array(
            /*
            'min' => 0,
            'max' => 100,
            'step' => 1, // Set slider step. Always > 0. Could be fractional.
            */
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )



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
        'add-button-text' => __('Add', 'fw'),
        'sortable' => true,
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
                'option_1' => 'value 1',
                'option_2' => 'value 2',
            ),
            // ...
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
        'box-options' => array(
            'option_1' => array( 'type' => 'text' ),
            'option_2' => array( 'type' => 'textarea' ),
        ),
        'template' => 'Hello {{- option_1 }}', // box title
        'box-controls' => array( // buttons next to (x) remove box button
            'control-id' => '<small class="dashicons dashicons-smiley"></small>',
        ),
        'limit' => 0, // limit the number of boxes that can be added
        'add-button-text' => __('Add', 'fw'),
        'sortable' => true,
    )

.. rubric:: Custom Events

``fw:option-type:addable-box:box:init`` - Box was initialized. Triggered for each existing box after page load, or when a box was added.

``fw:option-type:addable-box:control:click`` - A custom control was clicked.


Popup
-------------

Popup with options.

.. code-block:: php

    array(
        'type' => 'popup',
        'value' => array(
            'option_1' => 'value 1',
            'option_2' => 'value 2',
        ),
        'label' => __('Popup', 'fw'),
        'desc'  => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
        'popup-title' => __('Popup Title', 'fw'),
        'button' => __('Edit', 'fw'),
        'popup-title' => null,
        'size' => 'small', // small, medium, large
        'popup-options' => array(
            'option_1' => array(
                'label' => __('Text', 'fw'),
                'type' => 'text',
                'value' => 'Demo text value',
                'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
                'help' => sprintf("%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
                    __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
                    __('Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'fw')
                ),
            ),
            'option_2' => array(
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


Addable Popup
-------------

Addable popup with options.

.. code-block:: php

    array(
        'type' => 'addable-popup',
        'value' => array(
            array(
                'option_1' => 'value 1',
                'option_2' => 'value 2',
            ),
            // ...
        ),
        'label' => __('Addable Popup', 'fw'),
        'desc'  => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
        'template' => '{{- demo_text }}',
        'popup-title' => null,
        'size' => 'small', // small, medium, large
        'limit' => 0, // limit the number of popup`s that can be added
        'add-button-text' => __('Add', 'fw'),
        'sortable' => true,
        'popup-options' => array(
            'option_1' => array(
                'label' => __('Text', 'fw'),
                'type' => 'text',
                'value' => 'Demo text value',
                'desc' => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
                'help' => sprintf("%s \n\n'\"<br/><br/>\n\n <b>%s</b>",
                    __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'fw'),
                    __('Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium', 'fw')
                ),
            ),
            'option_2' => array(
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
        ),
       'components' => array(
            'family' => true,
            'size'   => true,
            'color'  => true
        ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', 'fw'),
        'desc'  => __('Description', 'fw'),
        'help'  => __('Help tip', 'fw'),
    )


Typography v2
-------------

Choose font family, style, weight, size, line-height, letter-spacing and color.

.. code-block:: php

    array(
        'type' => 'typography-v2',
        'value' => array(
            'family' => 'Amarante',
            // For standard fonts, instead of subset and variation you should set 'style' and 'weight'.
            // 'style' => 'italic',
            // 'weight' => 700,
            'subset' => 'latin-ext',
            'variation' => 'regular',
            'size' => 14,
            'line-height' => 13,
            'letter-spacing' => -2,
            'color' => '#0000ff'
        ),
        'components' => array(
            'family'         => true,
            // 'style', 'weight', 'subset', 'variation' will appear and disappear along with 'family'
            'size'           => true,
            'line-height'    => true,
            'letter-spacing' => true,
            'color'          => true
        ),
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
        /**
         * Load TinyMCE, can be used to pass settings directly to TinyMCE using an array
         * bool|array
         */
        'tinymce' => true,
        /**
         * Whether to display media insert/upload buttons
         * boolean
         */
        'media_buttons' => true,
        /**
         * Whether to output the minimal editor configuration used in PressThis
         * boolean
         */
        'teeny' => false,
        /**
         * Whether to use wpautop for adding in paragraphs
         * boolean
         */
        'wpautop' => true,
        /**
         * Additional CSS styling applied for both visual and HTML editors buttons, needs to include <style> tags, can use "scoped"
         * string
         */
        'editor_css' => '',
        /**
         * If smething goes wrong try set to true
         * boolean
         */
        'reinit' => false,
        /**
         * Set the editor size: small - small box, large - full size
         * boolean
         */
        'size' => 'small', // small | large
        /**
         * Set editor type : 'tinymce' or 'html'
         */
        'editor_type' => 'tinymce',
        /**
         * Set the editor height, must be int
         */
        'editor_height' => 400
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
                'type'    => 'select', // or 'short-select'
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

.. _multi-picker-get-db-value:

.. rubric:: Get database option value

.. code-block:: php

    $value = fw_get_db_..._option(
        'option_id/'. fw_get_db_..._option('option_id/'. 'gadget')
    );

.. _multi-picker-add-support-for-new-option-type-in-picker:

.. rubric:: Add support for new option type in picker

If you want to use in ``picker`` an option type that is not supported by default (is not present in the examples above), follow the steps below.
In this example, is added support for ``icon`` option type *(it is not practical, just for demonstration purposes)*.

1. Add in ``{theme}/inc/hooks.php``

    .. code-block:: php

        /**
         * Generate array( 'choice_id' => array( Choice Options ) )
         * @internal
         * @param array $choices
         * @param array $data
         * @return array
         */
        function _filter_theme_option_type_multi_picker_choices_icon($choices, $data) {
            $choices = $data['option']['choices'];

            // maybe check and remove invalid choices ...

            return $choices;
        }
        add_filter(
            'fw_option_type_multi_picker_choices:icon',
            '_filter_theme_option_type_multi_picker_choices_icon',
            10, 2
        );

        /**
         * @internal
         */
        function _admin_theme_multi_picker_custom_picker_scripts() {
            wp_enqueue_script(
                'multi-picker-custom-pickers',
                get_template_directory_uri() . '/js/multi-picker-custom-pickers.js',
                array('fw-events'),
                false,
                true
            );
        }
        add_action(
            'admin_enqueue_scripts',
            '_admin_theme_multi_picker_custom_picker_scripts'
        );

2. Add in ``{theme}/js/multi-picker-custom-pickers.js``

    .. code-block:: javascript

        fwEvents.on('fw:option-type:multi-picker:init:icon', function(data){
            data.$pickerGroup.find('.fw-option-type-icon > input[type="hidden"]').on('change', function() {
                data.chooseGroup(
                    this.value // this is `choice_id` from the `fw_option_type_multi_picker_choices:{type}` filter (above)
                );
            }).trigger('change');
        });

3. Add in ``{theme}/framework-customizations/theme/options/settings.php``

    .. code-blocK:: php

        $options = array(

        'demo_multi_picker_icon' => array(
            'type'         => 'multi-picker',
            'label'        => false,
            'desc'         => false,
            'picker'       => array(
                'gadget' => array(
                    'label'   => __( 'Multi Picker: Icon', 'unyson' ),
                    'type'    => 'icon',
                )
            ),
            'choices' => array(
                'fa fa-btc'  => array(
                    'price'  => array(
                        'label' => __( 'Price', 'unyson' ),
                        'type'  => 'slider',
                        'value' => 70,
                    ),
                ),
                'fa fa-viacoin' => array(
                    'price'  => array(
                        'label' => __( 'Price', 'unyson' ),
                        'type'  => 'slider',
                        'value' => 30
                    ),
                ),
            ),
        ),

        );

4. Open **Theme Settings** page and pick `Bitcoin or Viacoin <https://static.md/cdb8b42e2c297f3d9f2b77f7695fe61a.png>`__.

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
