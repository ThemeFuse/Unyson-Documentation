Styling
=======

This extension lets you control the website visual style. Starting from predefined styles to changing specific fonts and colors across the website.
It creates a page in **Appearance > Styling** menu.

.. contents::
    :local:
    :backlinks: top


.. important::

    This extensions is not be visible by default in Unyson Extensions page.
    To make it appear in that list, you have to:

    * Add the extension name in :doc:`theme manifest </manifest/theme>`

        .. code-block:: php

            $manifest['supported_extensions'] = array(
                'styling' => array(),
            );

    * Or set the ``WP_DEBUG`` constant to ``true``


Option Types
------------

* ``style`` - generates the styling settings. It should be used only once in settings options and has the following structure:

    .. code-block:: php

        'theme_style' => array(
            'label' => false,
            'type'  => 'style',
            /**
             * Must contain a list of predefined styles
             * that contains the name, icon and value for each block element
             */
            'predefined' => $predefined = include_once( 'includes/predefined-styles.php' ),
            /**
             * Must contain the initial value for each element from each block
             */
            'value' => $predefined['black']['blocks'],
            /**
             * Each key contains the necessary settings to stylize one or more blocks of the site
             */
            'blocks' => array(
                'block-1' => array(
                    'title' => __( 'Header', 'fw' ),
                    /**
                     * Elements that can be controlled
                     * Allowed elements are: 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'links', 'links_hover', 'background'
                     */
                    'elements' => array( 'h1', 'links', 'links_hover', 'background' ),
                    'css_selector' => array(
                        '#masthead',
                        '.primary-navigation .mega-menu',
                        '.primary-navigation .mega-col',
                        '.primary-navigation .mega-row',
                    ),
                    /**
                     * Additional options that will be displayed in this block, before standard elements
                     */
                    'before' => array(
                        'menu_border' => array(
                            'label' => __('Menu Border', 'fw'),
                            'desc'  => false,
                            'type'  => 'color-picker',
                            'value' => '#cccccc',
                        )
                    ),
                    /**
                     * Addition options that will be displayed in this block, after standard elements
                     */
                    'after' => array(
                        // ...
                    )
                ),
                'block-2' => array(
                    // ...
                ),
            ),
        )

    An example of ``before`` option usage:

    .. code-block:: php

        /**
         * @internal
         */
        function _action_print_additional_css() {
            $theme_style = fw_ext_styling_get('theme_style', '');
            $menu_border = (!empty($theme_style['blocks']['block-1']['before']['menu_border']))
                ? $theme_style['blocks']['header']['before']['menu_border']
                : '#cccccc';

            if (!empty($quick_css)) {
                echo ''.
                '<style type="text/css">'.
                    '.primary-menu .mega-menu .mega-menu-col,'.
                    '.primary-menu .mega-menu .mega-menu-row {'.
                    '    border-color: '. $menu_border .';'.
                    '}'.
                '</style>';
            }
        }
        add_action( 'wp_head', '_action_print_additional_css', 100 );

Configure
---------

The options that appear on the customization page are located in the extension's directory ``/options/appearance-settings.php``
and can be overwritten by copying the file to ``framework-customizations/extensions/styling/options/appearance-settings.php`` in the child theme.

Helpers
-------

* ``fw_ext_styling_get($option, $default = null)`` - a safe way of getting the value of an option from the styling extension.

    .. code-block:: php

        function _action_print_quick_css() {
            $quick_css = fw_ext_styling_get('quick_css', '');

            if (!empty($quick_css)) {
                echo '<style type="text/css">' . $quick_css . '</style>';
            }
        }
        add_action( 'wp_head', '_action_print_quick_css', 100 );
