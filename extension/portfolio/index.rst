Portfolio
=========

The Portfolio extension allows you to create Portfolio section on your site.

Configuration
-------------

In the :doc:`config.php </extensions/directory-structure>` file, you can set the portfolio Gallery and Featured Image sizes.

.. code-block:: php

    $cfg['image_sizes'] = array(
        'featured-image' => array(
            'width'  => 227,
            'height' => 142,
            'crop'   => true
        ),
        'gallery-image'  => array(
            'width'  => 474,
            'height' => 241,
            'crop'   => true
        )
    );

Hooks
-----

* ``fw_ext_portfolio_post_slug`` - portfolio custom post slug

    .. code-block:: php

        /**
         * @internal
         */
        function _filter_custom_portfolio_post_slug($slug) {
            return 'work';
        }
        add_filter('fw_ext_portfolio_post_slug', '_filter_custom_portfolio_post_slug');

* ``fw_ext_portfolio_taxonomy_slug`` - portfolio taxonomy slug

    .. code-block:: php

        /**
         * @internal
         */
        function _filter_custom_portfolio_tax_slug($slug) {
            return 'works';
        }
        add_filter('fw_ext_portfolio_taxonomy_slug', '_filter_custom_portfolio_tax_slug');

* ``fw_ext_projects_post_type_name`` - portfolio custom post labels (plural and singular)

    .. code-block:: php

        /**
         * @internal
         */
        function _filter_portfolio_labels($labels) {
            $labels = array(
                'singular' => __('Custom Project', 'fw'),
                'plural'   => __('Custom Projects', 'fw'),
            );

            return $labels;
        }
        add_filter('fw_ext_projects_post_type_name', '_filter_portfolio_labels');

* ``fw_ext_portfolio_category_name`` - portfolio taxonomy labels (plural and singular)

    .. code-block:: php

        /**
         * @internal
         */
        function portfolio_tax_labels_names( $labels ) {
            $labels = array(
                'singular' => __( 'Custom Category', 'fw' ),
                'plural'   => __( 'Custom Categories', 'fw' ),
            );

            return $labels;
        }
        add_filter( 'fw_ext_portfolio_category_name', 'portfolio_tax_labels_names' );

Views
-----

Templates are located in the :doc:`views/ </extensions/directory-structure>` directory.
Here is the list of templates that you can customize:

* ``archive.php`` - portfolio archive.
* ``taxonomy.php`` - portfolio taxonomy.
* ``single.php`` - portfolio single post.