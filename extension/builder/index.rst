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

Every model (we call it item) has a required attribute ``type``.
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

Let's create a simple demo builder for html ``<ul>`` and ``<ol>`` lists.
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

.. note::

    This example assumes that you use in your theme `this directory structure <https://github.com/ThemeFuse/Theme-Includes#directory-structure>`__.

Let's see what we've got at this point.

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

As you can see, the box is empty. At least you've created successfully the builder, now let's improve it.


