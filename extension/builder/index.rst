Builder
=======

This extension provides the core builder functionality that you can extend to create new builders.

.. contents::
    :local:
    :backlinks: top

Changing the grid
-----------------

By default the Builder uses a `bootstrap like grid <https://github.com/ThemeFuse/Unyson-Builder-Extension/blob/master/static/css/frontend-grid.css>`__, with the same class names but prefixed with ``.fw-{bootstrap-class-name}``.
The grid css is enqueued in all frontend pages from ``framework/extensions/builder/static.php``.
Also this extension defines the grid columns for all builders (for e.g. ``page-builder`` and ``form-builder``) in ``framework/extensions/builder/config.php``.

Changing the grid for all builders
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

1. Overwrite ``framework/extensions/builder/config.php`` by creating ``{theme}/framework-customizations/extensions/builder/config.php``

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');

        $cfg = array();

        $cfg['default_item_widths'] = array(
            /**
             * Copy/Paste here default columns https://github.com/ThemeFuse/Unyson-Builder-Extension/blob/master/config.php
             * and add, remove or change them
             */
        );

2. Prevent default grid css enqueue and enqueue your own css.
   Create ``{theme}/framework-customizations/extensions/builder/static.php``

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');

        if (!is_admin()) {
            wp_register_style(
                'fw-theme-frontend-grid',
                get_template_directory_uri() .'/framework-customizations/extensions/builder/static/frontend-grid.css',
                array(),
                fw()->theme->manifest->get_version()
            );
        }

Changing the grid for one builder
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Other extensions use the ``fw_ext_builder_get_item_width($builder_type, $width_id)`` function to get and output grid css class in frontend

.. code-block:: php

    <div class="<?php echo esc_attr(fw_ext_builder_get_item_width('page-builder', '1_2/frontend_class')) ?>" >

The function loads the grid from config, but allows you to change it via `this filter <https://github.com/ThemeFuse/Unyson-Builder-Extension/blob/f57ebc5623407277f1c2d22365fe0a74cff22b36/helpers.php#L22-L24>`__.
You can use the filter to change the grid columns for some builder type.

.. code-block:: php

    add_filter(
        'fw_builder_item_widths:page-builder',
        '_filter_theme_custom_page_builder_columns'
    );
    function _filter_theme_custom_page_builder_columns($columns) {
        $columns['3_7'] = array(
            'title' => '3/7',
            'backend_class' => 'custom-backend-3-7-column', // you must enqueue in backend a css with this class
            'frontend_class' => 'frontend-custom-3-7-column', // you must enqueue in frontend a css with this class
        );

        return $columns;
    }

The Builder
-----------

The builder is just an :doc:`option type </options/option-types>`.
But you can't use it right away, because it's too abstract and doesn't have any concrete purpose.
You can only extend it and create new builders based on it.

Data Structure
^^^^^^^^^^^^^^

The javascript side of the builder is based on `backbone <http://backbonejs.org/>`__,
so it uses collections and models to store the data:

.. code-block:: javascript

    [
        {
            type: 'foo',
            _items: [],
            attr_x: 'Hello',
            ...
        },
        {
            type: 'bar',
            _items: [ {type: 'baz', ...}, ... ],
            attr_y: 'Hi',
            ...
        },
        ...
    ]

Every model (also called item) has a required attribute ``type``.
Also it has an attribute ``_items`` that is generated automatically
by the `backbone-relational <http://backbonerelational.org/>`__ plugin,
the purpose of which is to make possible to have nested items easier.
There are no rules for other attributes, every item has whatever attributes it wants.

The same data structure is used on the php side,
this collection is simply transformed into an array with ``json_decode($collection, true)``.

Creating a Builder
^^^^^^^^^^^^^^^^^^

This tutorial will explain you how to create a simple demo builder for html ``<ul>`` and ``<ol>`` lists.
First, :doc:`create an option type </options/create-option-type>` that extends the builder option type:

.. code-block:: php

    // file: theme/inc/includes/option-types/lists-builder/class-fw-option-type-lists-builder.php

    class FW_Option_Type_Lists_Builder extends FW_Option_Type_Builder
    {
        public function get_type() {
            return 'lists-builder';
        }
    }
    FW_Option_Type::register('FW_Option_Type_Lists_Builder');

That's it, the new builder was created. Use it in your post options to see what it shows at this point.

.. note::

    This example assumes that you use in your theme `this directory structure <https://github.com/ThemeFuse/Theme-Includes#directory-structure>`__.

1. Include the option type:

    .. code-block:: php

        // file: theme/inc/includes/lists-builder.php

        /** @internal */
        function _action_include_demo_lists_builder() {
            if (!fw_ext('builder')) {
                /**
                 * Lists Builder requires the FW_Option_Type_Builder class
                 * which does not exist if the 'builder' extension is not active.
                 *
                 * You can install and activate the 'builder' extension by installing any extension that uses it,
                 * for e.g. Page Builder or Learning (which has the Learning Quiz Builder sub-extension)
                 */
                return;
            }

            require_once dirname(__FILE__) .'/option-types/lists-builder/class-fw-option-type-lists-builder.php';
        }
        add_action('fw_init', '_action_include_demo_lists_builder', 9);

2. Add it in post options:

    .. code-block:: php

        // file: theme/framework-customizations/theme/options/posts/post.php

        $options = array(
            'lists-builder-box' => array(
                'type' => 'box',
                'title' => __('Lists Builder', 'fw'),
                'options' => array(
                    'lists-builder' => array(
                        'type' => 'lists-builder',

                        // this will make it full width
                        'label' => false,
                    ),
                ),
            ),
        );

3. Go to ``your.site/wp-admin/edit.php`` page, open any post edit page and look for the "Lists Builder" box.

As you can see, the box is empty. At least you've successfully created the builder, now you can improve it.

Creating Items
^^^^^^^^^^^^^^

To build lists you'll need the following elements: ``<ul>``, ``<ol>`` and ``<li>``.
In builder these elements can be created as item types.
The ``<ul>`` and ``<ol>`` (containers for ``<li>``) will be created as one item type (with sub types), and ``<li>`` as another item type.
To create item types for a builder type you have to:

1. Find out what item types the builder accepts.

    That information can be found in the ``FW_Option_Type_Builder::item_type_is_valid()`` method.
    The builder you created above doesn't have a custom ``item_type_is_valid()`` method, so it is inherited from the extended class,
    and that method looks like this:

    .. code-block:: php

        /**
         * Overwrite this method to force your builder type items to extend custom class or to have custom requirements
         * @param FW_Option_Type_Builder_Item $item_type_instance
         * @return bool
         */
        protected function item_type_is_valid($item_type_instance)
        {
            return is_subclass_of($item_type_instance, 'FW_Option_Type_Builder_Item');
        }

2. Register item types.

    Create and register item type that will represent the ``<ul>`` and ``<ol>`` elements:

    .. code-block:: php

        // file: theme/inc/includes/option-types/lists-builder/item-types/oul/class-fw-lists-builder-item-type-oul.php

        class FW_Lists_Builder_Item_Type_OUl extends FW_Option_Type_Builder_Item
        {
            /**
             * Specify which builder type this item type belongs to
             * @return string
             */
            public function get_builder_type()
            {
                return 'lists-builder';
            }

            /**
             * The item type
             * @return string
             */
            public function get_type()
            {
                return 'oul';
            }

            /**
             * The boxes that appear on top of the builder and can be dragged down or clicked to create items
             * @return array
             */
            public function get_thumbnails()
            {
                return array(
                    array(
                        'html' =>
                            '<div class="item-type-icon-title" data-sub-type="ul">'.
                            '    <div class="item-type-icon">&lt;ul&gt;</div>'.
                            '    <div class="item-type-title">'. __('Unordered List', 'fw') .'</div>'.
                            '</div>',
                    ),
                    array(
                        'html' =>
                            '<div class="item-type-icon-title" data-sub-type="ol">'.
                            '    <div class="item-type-icon">&lt;ol&gt;</div>'.
                            '    <div class="item-type-title">'. __('Ordered List', 'fw') .'</div>'.
                            '</div>',
                    ),
                );
            }

            /**
             * Enqueue item type scripts and styles
             */
            public function enqueue_static()
            {
            }
        }
        FW_Option_Type_Builder::register_item_type('FW_Lists_Builder_Item_Type_OUl');

    Create and register item type that will represent the ``<li>`` element:

    .. code-block:: php

        // file: theme/inc/includes/option-types/lists-builder/item-types/li/class-fw-lists-builder-item-type-li.php

        class FW_Lists_Builder_Item_Type_Li extends FW_Option_Type_Builder_Item
        {
            public function get_builder_type()
            {
                return 'lists-builder';
            }

            public function get_type()
            {
                return 'li';
            }

            public function get_thumbnails()
            {
                return array(
                    array(
                        'html' =>
                            '<div class="item-type-icon-title">'.
                            '    <div class="item-type-icon">&lt;li&gt;</div>'.
                            '    <div class="item-type-title">List Item</div>'.
                            '</div>',
                    ),
                );
            }

            public function enqueue_static()
            {
            }
        }
        FW_Option_Type_Builder::register_item_type('FW_Lists_Builder_Item_Type_Li');

3. Include the created files.

    At the end of the ``_action_include_demo_lists_builder()`` function (created above), add:

    .. code-block:: php

        // file: theme/inc/includes/lists-builder.php

        function _action_include_demo_lists_builder() {
            ...

            require_once dirname(__FILE__) .'/option-types/lists-builder/item-types/oul/class-fw-lists-builder-item-type-oul.php';
            require_once dirname(__FILE__) .'/option-types/lists-builder/item-types/li/class-fw-lists-builder-item-type-li.php';
        }

Refresh the page and you should see three boxes that can be dragged down.
Unfortunately you will get an error in console saying that the item type is not registered.
This happens because you also have to register the item type in javascript and define how it works and looks in builder.

Registering items in javascript
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Registering builder items can be done via the ``builderInstance.registerItemClass(ItemTypeClass)`` method.
Because ``builderInstance`` is created somewhere in builder scripts and it's not a global variable,
the only way to get it, is to listen special event ``fw-builder:{builder-type}:register-items``.

1. Create the scripts file that registers the ``oul`` item type:

    .. code-block:: javascript

        // file:: theme/inc/includes/option-types/lists-builder/item-types/oul/static/scripts.js

        fwEvents.one('fw-builder:'+ 'lists-builder' +':register-items', function(builder) {
            var ItemClass = builder.classes.Item.extend({
                defaults: {
                    type: 'oul' // the item type is specified here
                }
            });

            builder.registerItemClass(ItemClass);
        });

2. Enqueue the ``oul`` item type scripts file:

    .. code-block:: php

        class FW_Lists_Builder_Item_Type_OUl extends FW_Option_Type_Builder_Item
        {
            ...

            public function enqueue_static()
            {
                wp_enqueue_script(
                    'lists-builder-item-type-oul',
                    get_template_directory_uri() .'/inc/includes/option-types/lists-builder/item-types/oul/static/scripts.js',
                    array('fw-events')
                );
            }
        }

3. Create the scripts file that registers the ``li`` item type:

    .. code-block:: javascript

        // file:: theme/inc/includes/option-types/lists-builder/item-types/li/static/scripts.js

        fwEvents.one('fw-builder:'+ 'lists-builder' +':register-items', function(builder) {
            var ItemClass = builder.classes.Item.extend({
                defaults: {
                    type: 'li' // the item type is specified here
                }
            });

            builder.registerItemClass(ItemClass);
        });

4. Enqueue the ``li`` item type scripts file:

    .. code-block:: php

        class FW_Lists_Builder_Item_Type_Li extends FW_Option_Type_Builder_Item
        {
            ...

            public function enqueue_static()
            {
                wp_enqueue_script(
                    'lists-builder-item-type-li',
                    get_template_directory_uri() .'/inc/includes/option-types/lists-builder/item-types/li/static/scripts.js',
                    array('fw-events')
                );
            }
        }

Refresh the page and try to click or drag down the boxes.
The items should appear in the builder, but they are using the default view and doesn't have any concrete functionality.
At this point, you have a working builder.
If you add some items and save the post, after page refresh the builder will recover from the saved json value.
Customize the views and add some functionality to items to be able to build lists with them:

1. Replace the ``oul`` item type scripts with:

    .. code-block:: javascript

        // file: theme/inc/includes/option-types/lists-builder/item-types/oul/static/scripts.js

        fwEvents.one('fw-builder:'+ 'lists-builder' +':register-items', function(builder) {
            var ItemView = builder.classes.ItemView.extend({
                template: _.template(
                    '<div style="border: 1px solid #ccc; padding: 0 10px;">'+
                        '<p>&lt;<span><%- type %></span>&gt; <a href="#" onclick="return false;" class="dashicons fw-x"></a></p>'+

                        /**
                         * Special element with 'builder-items' class
                         * displays the items that are in the '_items' attribute of the model
                         */
                        '<div class="builder-items"><!-- list items --></div>'+
                    '</div>'
                ),
                render: function() {
                    // It is recommended to do the template render using this method
                    this.defaultRender({
                        type: this.model.get('list_type')
                    });
                }
            });

            var ItemClass = builder.classes.Item.extend({
                defaults: {
                    type: 'oul', // the item type is specified here
                    list_type: 'ul'
                },
                initialize: function(atts, opts) {
                    if (opts && opts.$thumb) {
                        /**
                         * When the item box is dragged down or clicked, opts.$thumb contains the box element
                         * so you can extract the data-sub-type attribute set in html.
                         *
                         * Note: opts.$thumb doesn't exist when the item is created from code
                         * for e.g. recovered from json after page refresh
                         */
                        this.set('list_type', opts.$thumb.find('[data-sub-type]').attr('data-sub-type'));
                    }

                    this.view = new ItemView({
                        id: 'lists-builder-item-'+ this.cid,
                        model: this
                    });

                    // it is recommended to call this method
                    this.defaultInitialize();
                },
                /**
                 * This method controls which item types are allowed to be added inside this item in the '_items' attribute
                 * @param {String} type
                 * @returns {boolean}
                 */
                allowIncomingType: function(type) {
                    if (type == 'li') {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            builder.registerItemClass(ItemClass);
        });

2. Replace the ``li`` item type scripts with:

    .. code-block:: javascript

        // file: theme/inc/includes/option-types/lists-builder/item-types/li/static/scripts.js

        fwEvents.one('fw-builder:'+ 'lists-builder' +':register-items', function(builder) {
            var ItemView = builder.classes.ItemView.extend({
                template: _.template(
                    '<div style="border: 1px solid #ccc; padding: 0 10px;">'+
                    '<p>'+
                        '<span><%= text %></span> '+
                        '<a href="#" onclick="return false;" class="dashicons dashicons-edit"></a>'+
                        '<a href="#" onclick="return false;" class="dashicons fw-x"></a>'+
                    '</p>'+
                    '</div>'
                ),
                events: {
                    'click a.dashicons.fw-x': 'defaultRemove',
                    'click .dashicons-edit': 'openTextEdit'
                },
                render: function() {
                    this.defaultRender({
                        text: this.model.get('text')
                    });
                },
                openTextEdit: function() {
                    var text = prompt('Edit <li> text', this.model.get('text'));

                    if (text === null) {
                        return;
                    }

                    this.model.set('text', text);
                }
            });

            var ItemClass = builder.classes.Item.extend({
                defaults: {
                    type: 'li', // the item type is specified here
                    text: 'Hello World!' // <li>{text}</li>
                },
                initialize: function(atts, opts) {
                    this.view = new ItemView({
                        id: 'lists-builder-item-'+ this.cid,
                        model: this
                    });

                    this.defaultInitialize();
                },
                /**
                 * This method controls to which item types this item is allowed to be added/moved
                 * @param {String} type
                 * @returns {boolean}
                 */
                allowDestinationType: function(type) {
                    if (type == 'oul') {
                        return true;
                    } else {
                        return false;
                    }
                }
            });

            builder.registerItemClass(ItemClass);
        });

Now the javascript side of the builder has the minimum functionality to be able to build lists.
After you build a list and saved the post, the html of the list needs to be generated so you can display it on the page.
To do that, continue to the next step.

Generate Custom Value
^^^^^^^^^^^^^^^^^^^^^

By default the builder saves its value as an array with one key ``json`` which stores the original value used in javascript.
From the original value, you can generate any custom values and store them in custom keys.
In the case with Lists Builder, you have to generate the lists html from that original json value to be able to display the list in html.
This can achieved by overwriting the builder ``_get_value_from_input()`` method.

.. code-block:: php

    class FW_Option_Type_Lists_Builder extends FW_Option_Type_Builder
    {
        ...

        /**
         * Generate the html of the list
         * {@inheritdoc}
         */
        protected function _get_value_from_input($option, $input_value)
        {
            $value = parent::_get_value_from_input($option, $input_value);

            $html = '';
            foreach (json_decode($value['json'], true) as $list) {
                $html .= '<'. $list['list_type'] .'>';

                foreach ($list['_items'] as $list_item) {
                    $html .= '<li>'. $list_item['text'] .'</li>';
                }

                $html .= '</'. $list['list_type'] .'>';
            }
            $value['html'] = $html;

            return $value;
        }
    }

Now you can use the generated html in post template. Add to ``theme/single.php``:

.. code-block:: php

    ...

    while ( have_posts() ) : the_post();

        echo fw_get_db_post_option( null, 'lists-builder/html' );

    ...

Congratulations, now you can create new builders!

There are many things that can be improved in the Lists Builder, but this article will become too big.
You can inspect `the builder code <https://github.com/ThemeFuse/Unyson-Builder-Extension/tree/master/includes/option-types/builder>`__
and other builders like `Page Builder <https://github.com/ThemeFuse/Unyson-PageBuilder-Extension/tree/master/includes/fw-option-type-page-builder>`__,
`Forms Builder <https://github.com/ThemeFuse/Unyson-Forms-Extension/tree/master/includes/option-types/form-builder>`__
and `Learning Quiz Builder <https://github.com/ThemeFuse/Unyson-Learning-Extension/tree/master/extensions/learning-quiz/includes/option-types/quiz-builder>`__
to find the answers for the questions that may appear while developing your own builder.
