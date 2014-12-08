Titles and Meta
===============

A sub-extension of the SEO extension, used to setup the theme SEO title and meta keywords for search engines.

.. contents::
    :local:
    :backlinks: top

Configuration
-------------

.. code-block:: php

    /**
     * Posts types that you want to exclude from titles and meta settings
     */
    $cfg['excluded_post_types'] = array('attachment');

    /**
     * Taxonomies that you want to exclude from titles and meta settings.
     */
    $cfg['excluded_taxonomies'] = array('post_tag');

Views
-----

* ``meta.php`` - Template to render the meta keywords and description.

Hooks
-----

* ``fw_ext_seo_titles_metas_load_metas`` - Filter to modify some meta properties before it will be rendered in front-end.

.. code-block:: php

    /**
     * @internal
     * @param array $data All meta that needs to be rendered on the current page
     * @param array $location Current page location details
     */
    function _filter_modify_seo_meta($data, $location) {
        /**
         * The view to display current meta.
         * If the view key is not set, then will be loaded meta.php.
         */
        $data['view'] = 'my-view';

        return $data;
    }
    add_filter('fw_ext_seo_titles_metas_load_metas', '_filter_modify_seo_meta');

* ``fw_ext_seo_titles_metas_load_title`` - Filter to make some modifications in page title before it will be rendered.

.. code-block:: php

    /**
     * @internal
     * @param string $title The current title
     * @param string $separator Separator symbol
     * @param string $sepdirection Separator position
     * @param array $location Current page location details
     */
    function _filter_modify_seo_title($title, $separator, $sepdirection, $location) {
        // ...

        return $title;
    }
    add_filter('fw_ext_seo_titles_metas_load_title', '_filter_modify_seo_title');

