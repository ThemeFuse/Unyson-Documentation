Builder
=======

This extension provides the core builder functionality that you can extend to create you own builder.

.. contents::
    :local:
    :backlinks: top

Data Structure
--------------

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

Create Builder
--------------

The builder is just an :doc:`option type </options/option-types>`.
But you can't use it right away, because it's too abstract and doesn't have any concrete purpose.
You can only extend it and create new builders based on it.

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

This is the minimum builder possible. Use it in your post options to see what it shows at this point.

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
        add_action('fw_init', '_action_include_demo_lists_builder');

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
                        // just turn off these things to focus only on builder
                        'fullscreen' => false, 'template_saving' => false, 'history' => false,
                    ),
                ),
            ),
        );

3. Go to ``your.site/wp-admin/edit.php`` page, open any post edit page and look for the "Lists Builder" box.

As you can see, the box is empty. At least you've successfully created the builder, now you can improve it.

Create Items
------------

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
             * The boxes that appear on top and can be dragged down or clicked to create items
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