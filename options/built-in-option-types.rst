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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )

Password
--------

Regular password input.

.. code-block:: php

    array(
        'type'  => 'password',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )

Textarea
--------

Regular textarea.

.. code-block:: php

    array(
        'type'  => 'textarea',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'text'  => __('Yes', '{domain}'),
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



Select Multiple
---------------

Select with multiple values.

.. code-block:: php

    array(
        'type'  => 'select-multiple',
        'value' => array( 'choice-1', 'choice-3' ),
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
    )



Multi-Select
------------

Select multiple choices from different sources: posts, taxonomies, users or a custom array.

.. code-block:: php

    array(
        'type'  => 'multi-select',
        'value' => array( 'choice-1', 'choice-3' ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'prepopulate' => 10,
        /**
         * An array with the available choices
         * Used only when 'population' => 'array'
         */
        'choices' => array(
            'choice-1' => __('Choice 1', '{domain}'),
            'choice-2' => __('Choice 2', '{domain}'),
            'choice-3' => __('Choice 3', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'left-choice' => array(
            'value' => 'goodbye',
            'label' => __('Goodbye', '{domain}'),
        ),
        'right-choice' => array(
            'value' => 'hello',
            'label' => __('Hello', '{domain}'),
        ),
    )

.. rubric:: Custom Events

``fw:option-type:switch:change`` - Value was changed.

.. note::

        Switch value in html is json encoded to prevent issues with boolean values,
        so before using the html value in javascript do ``value = JSON.parse(value);``


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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )



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



Date Picker
-----------

Pick a date in calendar.

.. code-block:: php

    array(
        'type'  => 'date-picker',
        'value' => '',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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



Icon
----

Choose a `FontAwesome <http://fontawesome.io/>`_ icon.

.. code-block:: php

    array(
        'type'  => 'icon',
        'value' => 'fa-smile-o',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )

Icon V2
----

.. code-block:: php

    array(
        'type'  => 'icon-v2',

        /**
         * small | medium | large | sauron
         * Yes, sauron. Definitely try it. Great one.
         */
        'preview_size' => 'small',

        /**
         * small | medium | large
         */
        'modal_size' => 'small',

        /**
         * There's no point in configuring value from code here.
         *
         * I'll document the result you get in the frontend here:
         * 'value' => array(
         *   'type' => 'icon-font', // icon-font | custom-upload
         *
         *   // ONLY IF icon-font
         *   'icon-class' => '',
         *   'icon-class-without-root' => false,
         *   'pack-name' => false,
         *   'pack-css-uri' => false
         *
         *   // ONLY IF custom-upload
         *   // 'attachment-id' => false,
         *   // 'url' => false
         * ),
         */

        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )

Default value is not really supported, because of the complexity of the data
that this option type holds.

The second version of the first Icon_ option type. It was improved lots in
terms of both UI and extensibility. The user will be able to filter through
a list of icon packs and also upload his own icon. The result value will contain
``type`` field and it will contain the type of the selected content. It can be
``icon-font`` or ``custom-upload``. You'll also get favorite icon functionallity
which will work out of the box.

.. note::
    You'll have to enable `SVG` uploads by yourself, with a hook in your theme.

By default, we have just 6 icon packs enabled and server with Unyson itself.

- `Font Awesome <https://github.com/FortAwesome/Font-Awesome>`_
- `Entypo <http://www.entypo.com>`_
- `Linecons <http://designmodo.com/linecons-free/>`_
- `Linearicons <https://linearicons.com/>`_
- `Typicons <http://typicons.com/>`_
- `Unycon <https://github.com/ThemeFuse/Unyson/tree/v2.5.8/framework/static/libs/unycon>`_

.. note::
    By default, `none <https://github.com/ThemeFuse/Unyson/blob/0bed6c7b3c03f64bae27f988a39fb763d75abdc3/framework/includes/option-types/icon-v2/class-fw-option-type-icon-v2.php#L18>`_
    of this packs will be enqueued in the frontend of your theme.

    You should call this in order to enqueue them:
    ``fw()->backend->option_type('icon-v2')->packs_loader->enqueue_frontend_css();``

.. rubric:: Configure Icon Packs

`Icon V2`_ is easily extensible with a couple of filters you can hook into.
First, you may want to configure which of the *already* registered packs we
should display into the picker.

.. code-block:: php

    function _custom_packs_list($current_packs) {
        /**
         * $current_packs is an array of pack names.
         * You should return which one you would like to show in the picker.
         */
        return array('font-awesome', 'unycon');
    }

    add_filter('fw:option_type:icon-v2:filter_packs', '_custom_packs_list');

.. note::
    That's a global hook which changes behavior for
    **all** pickers. Configuring packs per picker is not available and will **not**
    be implemented later. If you have some particular use case for this, please fill
    an issue.

.. rubric:: Add Icon Pack

Long story short, you can add more packs by filtering on
``fw:option_type:icon-v2:packs`` filter. Simplest example, all of the keys are required:

.. code-block:: php

    add_filter('fw:option_type:icon-v2:packs', '_add_my_pack');

    function _add_my_pack($default_packs) {
        /**
         * No fear. Defaults packs will be merged in back. You can't remove them.
         * Changing some flags for them is allowed.
         */
        return array(
          'my_pack' => array(
            'name' => 'my_pack', // same as key
            'title' => 'My Cool Pack',
            'css_class_prefix' => 'my-pack',
            'css_file' => 'path_to_css_file',
            'css_file_uri' => 'network_accessible_url'
          )
        )
    }

And this will just work for most of the cases. You don't need to specify
which icons specifically to show inside the picker. All of them will be showed,
by default. In fact, there's some magick going on that will extract all of your
icons and show them up. I'll try to make it clear below.

.. rubric:: Computing icons list

`By default <https://github.com/ThemeFuse/Unyson/blob/0bed6c7b3c03f64bae27f988a39fb763d75abdc3/framework/includes/option-types/icon-v2/includes/class-fw-icon-v2-packs-loader.php#L105>`_, when you register an icon pack it's icons will be extracted from the css file
automatically, so that you don't have to maintain a `long array <https://github.com/ThemeFuse/Unyson/blob/master/framework/includes/option-types/icon/class-fw-option-type-icon.php#L203>`_
of icons for each pack. Instead we do some trick instead. We look into the css
file for each pack and look for patterns that look like this:

.. code-block:: php

    .`css_class_prefix`-some-icon:before {
        content: '\266a';
    }

``css_class_prefix`` there refers to the ``css_class_prefix`` option you specified
for your icon pack.

.. code-block:: css

    // Those will be considered an icon
    .my-pack-some-icon:before { content: '\266a'; }
    .my-pack.my-pack-some-icon:before { content: '\266a'; }
    .my-pack.my-pack-some-icon:after { content: '\266a'; }

    // This one won't
    .my-pack.my-pack-some-icon:after { color: red; }

Generally speaking, that's what an icon pack CSS file consist of:

- ``@font-face`` rules
- icon generations -- we try hard to get just them
- some other general purpose helpers -- they're encountered not that often

You can also completely stop this mechanism for one pack by specifying an array
of icons for the ``icons`` option. A more complete pack definition can be found
`here <https://github.com/ThemeFuse/Unyson/blob/0bed6c7b3c03f64bae27f988a39fb763d75abdc3/framework/includes/option-types/icon-v2/includes/class-fw-icon-v2-packs-loader.php#L19>`_.


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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )



Addable Option
--------------

Create a list of options.

.. code-block:: php

    array(
        'type'  => 'addable-option',
        'value' => array('Value 1', 'Value 2', 'Value 3'),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'option' => array( 'type' => 'text' ),
        'add-button-text' => __('Add', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'box-options' => array(
            'option_1' => array( 'type' => 'text' ),
            'option_2' => array( 'type' => 'textarea' ),
        ),
        'template' => 'Hello {{- option_1 }}', // box title
        'box-controls' => array( // buttons next to (x) remove box button
            'control-id' => '<small class="dashicons dashicons-smiley"></small>',
        ),
        'limit' => 0, // limit the number of boxes that can be added
        'add-button-text' => __('Add', '{domain}'),
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
        'label' => __('Addable Popup', '{domain}'),
        'desc'  => __('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', '{domain}'),
        'template' => '{{- demo_text }}',
        'popup-title' => null,
        'size' => 'small', // small, medium, large
        'limit' => 0, // limit the number of popup`s that can be added
        'add-button-text' => __('Add', '{domain}'),
        'sortable' => true,
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )


Oembed
------

Generate oembed preview of the inserted link, for more details see `Embeds <https://codex.wordpress.org/Embeds>`__ in WordPress.

.. code-block:: php

    array(
        'type'  => 'oembed',
        'value' => 'https://vimeo.com/113078377',
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'preview' => array(
            'width'  => 300, // optional, if you want to set the fixed width to iframe
            'height' => 300, // optional, if you want to set the fixed height to iframe
            /**
             * if is set to false it will force to fit the dimensions,
             * because some widgets return iframe with aspect ratio and ignore applied dimensions
             */
            'keep_ratio' => true
        )
    )

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

	/**
	 * Also available
	 * https://github.com/WordPress/WordPress/blob/4.4.2/wp-includes/class-wp-editor.php#L80-L94
	 */
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
                'label'   => __('Choose device', '{domain}'),
                'type'    => 'select', // or 'short-select'
                'choices' => array(
                    'phone'  => __('Phone', '{domain}'),
                    'laptop' => __('Laptop', '{domain}')
                ),
                'desc'    => __('Description', '{domain}'),
                'help'    => __('Help tip', '{domain}'),
            )
        ),
        /*
        'picker' => array(
            // '<custom-key>' => option
            'gadget' => array(
                'label'   => __('Choose device', '{domain}'),
                'type'    => 'radio',
                'choices' => array(
                    'phone'  => __('Phone', '{domain}'),
                    'laptop' => __('Laptop', '{domain}')
                ),
                'desc'    => __('Description', '{domain}'),
                'help'    => __('Help tip', '{domain}'),
            )
        ),
        */
        /*
        'picker' => array(
            // '<custom-key>' => option
            'gadget' => array(
                'label'   => __('Choose device', '{domain}'),
                'type'    => 'image-picker',
                'choices' => array(
                    'phone'  => 'http://placekitten.com/70/70',
                    'laptop' => 'http://placekitten.com/71/70'
                ),
                'desc'    => __('Description', '{domain}'),
                'help'    => __('Help tip', '{domain}'),
            )
        ),
        */
        /*
        picker => array(
            // '<custom-key>' => option
            'gadget' => array(
                'label' => __('Choose device', '{domain}'),
                'type'  => 'switch',
                'right-choice' => array(
                    'value' => 'laptop',
                    'label' => __('Laptop', '{domain}')
                ),
                'left-choice' => array(
                    'value' => 'phone',
                    'label' => __('Phone', '{domain}')
                ),
                'desc' => __('Description', '{domain}'),
                'help' => __('Help tip', '{domain}'),
            )
        ),
        */
        'choices' => array(
            'phone' => array(
                'price' => array(
                    'type'  => 'text',
                    'label' => __('Price', '{domain}'),
                ),
                'memory' => array(
                    'type'  => 'select',
                    'label' => __('Memory', '{domain}'),
                    'choices' => array(
                        '16' => __('16Gb', '{domain}'),
                        '32' => __('32Gb', '{domain}'),
                        '64' => __('64Gb', '{domain}'),
                    )
                )
            ),
            'laptop' => array(
                'price' => array(
                    'type'  => 'text',
                    'label' => __('Price', '{domain}'),
                ),
                'webcam' => array(
                    'type'  => 'switch',
                    'label' => __('Webcam', '{domain}'),
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
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
    )
