Introduction
============

.. raw:: html

	<iframe src="https://player.vimeo.com/video/115152971?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>

.. contents::
    :local:
    :backlinks: top

Introduction
------------

**Options** are intended for creating form fields representing different kind of data e.g. rich and plain text, icons, media content, fonts and more.
With options you can easily create tabs, boxes and form inputs for the admin pages. You just build an array and it will be transformed to html.
On form submit, values will be saved into the database, and you will be able to access them anywhere you want using ``fw_get_db_..._option()`` :doc:`helper functions </helpers/php>`.

For advanced users, this is an easy way to create form inputs and use them for various purposes. The simplest options array looks something like this:

.. code-block:: php

    $options = array(
        'option_id' => array(
            'type' => 'text'
        )
    );

This will generate a text input. The array key is used as option id, it should be unique.
Values in the database will be stored as ``array('option_id' => 'value')``.

.. note::

    The only required parameter for any option is ``type``.

All options have some base parameters:

* ``label`` *(string)* Label
* ``desc`` *(string)* Description
* ``value`` *(mixed)* Default value
* ``attr`` *(array)* HTML attributes *(some options will place these attributes in input, other in wrapper div)*
* ``help`` *(string|array)* Additional info about option. This will generate an |help-tip| next to option that will show the text in a tip popup.

Some options can have additional (optional) parameters. A better customized option will look like this:

.. code-block:: php

    $options = array(
        'option_id' => array(
            'type'  => 'text',
            'value' => 'Default value',
            'label' => __('Option Label', 'fw'),
            'desc'  => __('Option Description', 'fw'),
            'attr'  => array('class' => 'custom-class', 'data-foo' => 'bar'),
            'help'  => __('Some html that will appear in tip popup', 'fw'),
        )
    );

You can test the above array by creating any of the below options file
and placing the array in it.

Options files
-------------

These are the main places where options are used:

* **Theme Settings Page**: Loads the options from ``{theme}/framework-customizations/theme/options/settings.php``

* **Customizer Page**: Loads the options from ``{theme}/framework-customizations/theme/options/customizer.php``

* **Post Add/Edit Page**: Loads the options from ``{theme}/framework-customizations/theme/options/posts/{$post_type}.php``

* **Taxonomy Term Edit Page**: Loads the options from ``{theme}/framework-customizations/theme/options/taxonomies/{$taxonomy}.php``

Containers
----------

.. raw:: html

	<iframe src="https://player.vimeo.com/video/116053617?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>

Options that have no value and contain other options in the ``options`` parameter are containers. If an option has the ``options`` parameter, it is considered a container.

The simplest container option array looks as in the below example and will generate an empty metabox without title:

.. code-block:: php

    $options = array(
        array(
            'type'    => 'box',
            'options' => array()
        )
    );

.. note::

    Like options, containers have a minimum set of required parameters: ``type`` and ``options``.
    The ``type`` parameter in Customizer options is optional and it's not used (has no effect).

There are 4 built-in container types:

* ``box`` - WordPress metabox

    .. code-block:: php

        'box_id' => array(
            'type' => 'box',
            'options' => array(
                'option_id'  => array( 'type' => 'text' ),
            ),
            'title' => __('Box Title', 'fw'),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),

            /**
             * When used in Post Options on the first array level
             * the ``box`` container accepts additional parameters
             */
            //'context' => 'normal|advanced|side',
            //'priority' => 'default|high|core|low',
        ),

* ``tab`` - One tab *(Tabs from the same array level will be collected and rendered as multiple tabs)*

    .. code-block:: php

        'tab_id' => array(
            'type' => 'tab',
            'options' => array(
                'option_id'  => array( 'type' => 'text' ),
            ),
            'title' => __('Tab Title', 'fw'),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
        ),
        'tab_id_2' => array(
            'type' => 'tab',
            'options' => array(
                'option_id_2'  => array( 'type' => 'text' ),
            ),
            'title' => __('Tab Title #2', 'fw'),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
        ),

* ``group`` - Group options into a wrapper div. Has no design. Usually used to show/hide a group of options from javascript

    .. code-block:: php

        'group_id' => array(
            'type' => 'group',
            'options' => array(
                'option_id'  => array( 'type' => 'text' ),
            ),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
        ),

* ``popup`` - A button, when clicked it will open a modal with options

    .. code-block:: php

        'popup_id' => array(
            'type' => 'group',
            'options' => array(
                'option_id'  => array( 'type' => 'text' ),
            ),
            'title' => __('Button and Popup Title', 'fw'),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
            'modal-size' => 'small', // small, medium, large
            'desc' => __('Button Description', 'fw'),
        ),

Restrictions
^^^^^^^^^^^^

Here are some restrictions to keep in mind:

* **Post Options** array ``{theme}/framework-customizations/theme/options/posts/{$post_type}.php``
  on first level can have only ``box`` containers.
* ``attr`` parameter from **Post Options** first level ``box`` containers, is not used.
  Because boxes are added with `add_meta_box()`_ which has no parameter for specifying attributes.
* **Taxonomy Options** array ``{theme}/framework-customizations/theme/options/taxonomies/{$taxonomy}.php`` on first level cannot have containers.

.. note::

    There are no restrictions (except Customizer) for what options are contained in the ``options`` parameter.
    It's possible to create multi level options: boxes inside boxes, tabs inside boxes, tabs inside tabs, and so on.

Customizer
----------

Starting with `v2.3.0 <https://github.com/ThemeFuse/Unyson-Extensions-Approval/issues/66>`__ options can be used in Customizer.

**Customizer Options** ``{theme}/framework-customizations/theme/options/customizer.php``
are turned into `Customizer <https://codex.wordpress.org/Theme_Customization_API>`__ elements (panels, sections and controls).

The customizer elements have a strict structure which also applies to options array structure:

* Containers can be nested only to 2 levels

    * ``container > option`` is turned into ``section > control``
    * ``container > container > option`` is turned into ``panel > section > control``
    * ``container > container > container > option`` will not work ``panel > section > ERROR``

* Containers must contain only options or only containers

Examples
^^^^^^^^

Try the below arrays in ``{theme}/framework-customizations/theme/options/customizer.php``.

* Create a Section

    .. code-block:: php

        $options = array(
            'section_1' => array(
                'title' => __('Unyson Section', 'fw'),
                'options' => array(

                    'option_1' => array(
                        'type' => 'text',
                        'value' => 'Default Value',
                        'label' => __('Unyson Option', 'fw'),
                        'desc' => __('Option Description', 'fw'),
                    ),

                ),
            ),
        );

* Create a Panel with Sections

    .. code-block:: php

        $options = array(
            'panel_1' => array(
                'title' => __('Unyson Panel', 'fw'),
                'options' => array(

                    'section_1' => array(
                        'title' => __('Unyson Section #1', 'fw'),
                        'options' => array(

                            'option_1' => array(
                                'type' => 'text',
                                'value' => 'Default Value',
                                'label' => __('Unyson Option #1', 'fw'),
                                'desc' => __('Option Description', 'fw'),
                            ),

                        ),
                    ),

                    'section_2' => array(
                        'title' => __('Unyson Section #2', 'fw'),
                        'options' => array(

                            'option_2' => array(
                                'type' => 'text',
                                'value' => 'Default Value',
                                'label' => __('Unyson Option #2', 'fw'),
                                'desc' => __('Option Description', 'fw'),
                            ),
                            'option_3' => array(
                                'type' => 'text',
                                'value' => 'Default Value',
                                'label' => __('Unyson Option #3', 'fw'),
                                'desc' => __('Option Description', 'fw'),
                            ),

                        ),
                    ),

                ),
            ),
        );

* Get option database/saved value in template

    .. code-block:: php

        $value = fw_get_db_customizer_option('option_1');

Live Preview
^^^^^^^^^^^^

In background, customizer options are converted into `customizer elements <https://codex.wordpress.org/Theme_Customization_API#Part_1:_Defining_Settings.2C_Controls.2C_Etc.>`__,
so they follow default WordPress behavior and implementing a live preview can be done using `the default WordPress solution <https://codex.wordpress.org/Theme_Customization_API#Part_3:_Configure_Live_Preview_.28Optional.29>`__.

1. Change the setting transport and enqueue the javascript

    .. code-block:: php

        // file: {theme}/inc/hooks.php

        if (defined('FW')):
            /**
             * @param WP_Customize_Manager $wp_customize
             * @internal
             */
            function _action_customizer_live_fw_options($wp_customize) {
                if ($wp_customize->get_setting('fw_options[OPTION_ID]')) {
                    $wp_customize->get_setting('fw_options[OPTION_ID]')->transport = 'postMessage';

                    add_action( 'customize_preview_init', '_action_customizer_live_fw_options_preview' );
                }
            }
            add_action('customize_register', '_action_customizer_live_fw_options');

            /**
             * @internal
             */
            function _action_customizer_live_fw_options_preview() {
                wp_enqueue_script(
                    'mytheme-customizer',
                    get_template_directory_uri() .'/assets/js/theme-customizer.js',
                    array( 'jquery','customize-preview' ),
                    fw()->theme->manifest->get_version(),
                    true
                );
            }
        endif;

2. Handle the change in javascript

    .. code-block:: javascript

        // file: {theme}/assets/js/theme-customizer.js

        ( function( $ ) {
            wp.customize( 'fw_options[OPTION_ID]', function( value ) {
                value.bind( function( newval ) {
                    /**
                     * An array of collected html inputs
                     * [{'name':'input[name]','value':'input value'}]
                     * or
                     * [{'name':'input[name]','value':'input value'},{'name':'input[name]','value':'input value'},...]
                     */
                    newval = JSON.parse(newval);

                    $( 'h1' ).text( newval[0].value );
                } );
            } );
        } )( jQuery );

    .. note::

        The value comes in ``[{'name':'input[name]','value':'input value'}]`` format,
        because the customizer form is not submitted as a regular form.
        A control can store its value only inside a single input which has some special attributes (instead of ``name="..."``)
        and it is monitored for changes by the Customizer script to trigger the preview update.
        Because of that, the framework options collect all their inputs values and store them in that special input
        (`here <http://bit.ly/1Fau8gg>`__ is an advanced explanation).

.. include:: /links.rst.inc

.. |help-tip| image:: /_images/help-tip.png
