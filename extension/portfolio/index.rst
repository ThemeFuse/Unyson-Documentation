Portfolio
=========

The Portfolio extension allows you to create Portfolio section on your site.

.. contents::
    :local:
    :backlinks: top

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

Also define if the portfolio custom post will support gallery or not.
.. code-block:: php

    $cfg['has-gallery'] = true;

Helpers
-------

* ``fw_ext_portfolio_get_gallery_images( $post_id )`` - use this function to return all project gallery images.

    .. code-block:: php

        <?php if ( have_posts() ) : ?>
            <?php while ( have_posts() ) : ?>
                <?php $gallery = fw_ext_portfolio_get_gallery_images(); ?>
                <ul class="gallery">
                    <?php foreach( $gallery as $image ) : ?>
                        <li>
                            <a href="<?php echo get_permalink($image['attachment_id'])?>">
                                <img src="<?php echo $image['url'] ?>" alt=""/>
                            </a>
                        </li>
                    <?php endforeach ?>
                </ul>
            <?php endwhile ?>
        <?php endif ?>

    .. note::

        If you are in The Loop, the global $post will bw used for $post_id

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

.. raw:: html

	<iframe src="https://player.vimeo.com/video/115245789?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>

Templates are located in the :doc:`views/ </extensions/directory-structure>` directory.
Here is the list of templates that you can customize:

* ``single.php`` - Portfolio course single post template. By default is used ``single.php`` from the theme root directory, you can overwrite it by creating ``framework-customizations/extensions/portfolio/views/single.php``.
* ``taxonomy.php`` - Portfolio category template. By default is used ``taxonomy.php`` from the theme root directory, you can overwrite it by creating ``framework-customizations/extensions/portfolio/views/taxonomy.php``.
* ``content.php`` - Default portfolio single page template content. It is loaded if the ``framework-customizations/extensions/portfolio/views/single.php`` doesn't exist and is used ``single.php`` from the theme root directory.
  The content of this view is rendered using worpdress `the_content <http://codex.wordpress.org/Plugin_API/Filter_Reference/the_content>`_ filter, when the course single page is loaded.