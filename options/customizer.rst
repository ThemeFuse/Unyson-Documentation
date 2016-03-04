Customizer
==========

Starting with `v2.3.0 <https://github.com/ThemeFuse/Unyson-Extensions-Approval/issues/66>`__ options can be used in Customizer.

**Customizer Options** ``{theme}/framework-customizations/theme/options/customizer.php``
are turned into `Customizer <https://codex.wordpress.org/Theme_Customization_API>`__ elements (panels, sections and controls).

The customizer elements have a strict structure which also applies to options array structure:

* Containers can be nested only 2 levels

    * ``container > option`` is turned into ``section > control``
    * ``container > container > option`` is turned into ``panel > section > control``
    * ``container > container > container > option`` will not work ``panel > section > ERROR``

* Containers must contain only options or only containers, because a panel can't contain both sections and controls.

Examples
--------

Try the below arrays in ``{theme}/framework-customizations/theme/options/customizer.php``.

* Create a Section

    .. code-block:: php

        $options = array(
            'section_1' => array(
                'title' => __('Unyson Section', '{domain}'),
                'options' => array(

                    'option_1' => array(
                        'type' => 'text',
                        'value' => 'Default Value',
                        'label' => __('Unyson Option', '{domain}'),
                        'desc' => __('Option Description', '{domain}'),
                    ),

                ),
            ),
        );

* Create a Panel with Sections

    .. code-block:: php

        $options = array(
            'panel_1' => array(
                'title' => __('Unyson Panel', '{domain}'),
                'options' => array(

                    'section_1' => array(
                        'title' => __('Unyson Section #1', '{domain}'),
                        'options' => array(

                            'option_1' => array(
                                'type' => 'text',
                                'value' => 'Default Value',
                                'label' => __('Unyson Option #1', '{domain}'),
                                'desc' => __('Option Description', '{domain}'),
                            ),

                        ),
                    ),

                    'section_2' => array(
                        'title' => __('Unyson Section #2', '{domain}'),
                        'options' => array(

                            'option_2' => array(
                                'type' => 'text',
                                'value' => 'Default Value',
                                'label' => __('Unyson Option #2', '{domain}'),
                                'desc' => __('Option Description', '{domain}'),
                            ),
                            'option_3' => array(
                                'type' => 'text',
                                'value' => 'Default Value',
                                'label' => __('Unyson Option #3', '{domain}'),
                                'desc' => __('Option Description', '{domain}'),
                            ),

                        ),
                    ),

                ),
            ),
        );

* Get option database/saved value in template

    .. code-block:: php

        $value = fw_get_db_customizer_option('option_1');

.. _customizer-options-live-preview:

Live Preview
------------

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