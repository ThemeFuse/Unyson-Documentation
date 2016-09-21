Mega Menu
=========

The Mega Menu extension gives the end-user the ability to construct advanced navigation menus.

.. contents::
    :local:
    :backlinks: top


.. important::

    This extensions is not be visible by default in Unyson Extensions page.
    To make it appear in that list, you have to:

    * Add the extension name in :doc:`theme manifest </manifest/theme>`

        .. code-block:: php

            $manifest['supported_extensions'] = array(
                'megamenu' => array(),
            );

    * Or set the ``WP_DEBUG`` constant to ``true``


Overview
--------

When it is turned on, it enriches menu with the following:

1. Ability to set an icon for any menu item
2. Ability to group several menu items into columns placed in rows

HTML/CSS
--------

The extension adds the following css classes:

* ``.menu-item-has-icon``
* ``.menu-item-has-mega-menu``
* ``.sub-menu-has-icons``
* ``.mega-menu``
* ``.mega-menu-row``
* ``.mega-menu-col``

The markup will be the following:

.. code-block:: text

    li.menu-item-has-mega-menu
        div.mega-menu
            ul.mega-menu-row
                li.mega-menu-col
                li.mega-menu-col
                li.mega-menu-col
            ul.mega-menu-row
                li.mega-menu-col
                li.mega-menu-col
                li.mega-menu-col

.. note::

    All other standard WordPress classes and HTML remains the same.

Markup Example
--------------

.. code-block:: html

    <ul>
        <li class="menu-item-has-mega-menu menu-item-has-icon">
            <a class="fa fa-exclamation" href="#">Mega Menu 1</a>
            <div class="mega-menu">
                <ul class="sub-menu mega-menu-row">
                    <li class="mega-menu-col">
                        <a href="#">Just Links</a>
                        <ul class="sub-menu">
                            <li>
                                <a href="#">Menu Item 1</a>
                            </li>
                            ...
                        </ul>
                    </li>
                    <li class="mega-menu-col">
                        <a href="#">Links with Icons</a>
                        <ul class="sub-menu sub-menu-has-icons">
                            <li class="menu-item-has-icon">
                                <a class="fa fa-inbox" href="#">Menu Item 1</a>
                                <p>Praesent quis enim euismod, fringilla quam vitae, consectetur quam.</p>
                            </li>
                            <li class="menu-item-has-icon">
                                <a class="fa fa-wrench" href="#">Menu Item 2</a>
                            </li>
                            ...
                        </ul>
                    </li>
                </ul>
            </div>
        </li>
        <li class="menu-item-has-icon">
            <a class="fa fa-info-circle" href="#">Home</a>
            <ul class="sub-menu sub-menu-has-icons">
                <li class="menu-item-has-icon">
                    <a class="fa fa-info-circle" href="#">Page 2</a>
                </li>
                <li class="menu-item-has-icon">
                    <a class="fa fa-info-circle" href="#">Page 3</a>
                    <ul class="sub-menu sub-menu-has-icons">
                        <li class="menu-item-has-icon">
                            <a class="fa fa-key" href="#">Page 4</a>
                        </li>
                        <li class="menu-item-has-icon">
                            <a class="fa fa-briefcase" href="#">Page 5</a>
                        </li>
                        <li class="menu-item-has-icon">
                            <a class="fa fa-gavel" href="#">Page 6</a>
                            <ul class="sub-menu sub-menu-has-icons">
                                <li class="menu-item-has-icon">
                                    <a class="fa fa-globe" href="#">Page 7</a>
                                </li>
                                <li>
                                    <a href="#">Page 8</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>

Change Item/Icon Markup
-----------------------

By default the icon is added to

.. code-block:: php

    <a href="..." class="fa fa-...">Menu item</a>

If you want to change it to

.. code-block:: php

    <a href="..."><i class="fa fa-..."></i> Menu item</a>

overwrite `this view <https://github.com/ThemeFuse/Unyson-MegaMenu-Extension/blob/master/views/item-link.php>`__ in your theme

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    // file: {theme}/framework-customizations/extensions/megamenu/views/item-link.php

    /**
     * @var WP_Post $item
     * @var string $title
     * @var array $attributes
     * @var object $args
     * @var int $depth
     */

    {
        $icon_html = '';

        if (
            fw()->extensions->get('megamenu')->show_icon()
            &&
            ($icon = fw_ext_mega_menu_get_meta($item, 'icon'))
        ) {
            $icon_html = '<i class="'. $icon .'"></i> ';
        }
    }

    // Make a menu WordPress way
    echo $args->before;
    echo fw_html_tag('a', $attributes, $args->link_before . $icon_html . $title . $args->link_after);
    echo $args->after;

Overwrite the Walker
--------------------

1. Create the walker class

.. code-block:: php

   // file:: {theme}/framework-customizations/extensions/megamenu/includes/class-fw-ext-mega-menu-custom-walker.php

   class FW_Ext_Mega_Menu_Custom_Walker extends FW_Ext_Mega_Menu_Walker
    {
        function start_lvl( &$output, $depth = 0, $args = array(), $class = 'sub-menu' ) {
            fw_print('Hello');

            return parent::start_lvl($output, $depth, $args, $class);
        }

        // other customizations ...
    }

2. Overwrite the default walker via filter

.. code-block:: php

    // file: {theme}/framework-customizations/extensions/megamenu/hooks.php

    // replace default walker
    {
        remove_filter('wp_nav_menu_args', '_filter_fw_ext_mega_menu_wp_nav_menu_args');

        /** @internal */
        function _filter_theme_ext_mega_menu_wp_nav_menu_args($args) {
            $args['walker'] = new FW_Ext_Mega_Menu_Custom_Walker();

            return $args;
        }
        add_filter('wp_nav_menu_args', '_filter_theme_ext_mega_menu_wp_nav_menu_args');
    }

Item Custom Options
-------------------

1. :ref:`Overwrite <extension-directory-structure>` these `options <https://github.com/ThemeFuse/Unyson-MegaMenu-Extension/tree/master/options>`__ in your theme.
2. Get the saved db value (it has the :ref:`same structure <multi-picker-get-db-value>` as ``multi-picker`` option-type value)

    .. code-block:: php

        if ($item_type = fw_ext_mega_menu_get_db_item_option($item_id, 'type')) {
            $values    = fw_ext_mega_menu_get_db_item_option($item_id, $item_type);
        }
