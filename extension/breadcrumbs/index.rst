Breadcrumbs
===========

.. contents::
    :local:
    :backlinks: top

Helpers
-------

* ``fw_ext_get_breadcrumbs($separator = '>')`` - use this function to return breadcrumbs HTML.

    .. code-block:: php

        <h3>My page</h3>
        <?php echo fw_ext_get_breadcrumbs( '>' ) ?>
        <!-- Home >> Books >> PHP For Beginners -->

    .. note::

        This function should be used only in the front-end area after WordPress ``wp`` action.

* ``fw_ext_breadcrumbs($separator = '>')`` - use this function to render breadcrumbs in your template.

    .. code-block:: php

        <h3>My page</h3>
        <?php fw_ext_breadcrumbs( '>' ) ?>
        <!-- Home >> Books >> PHP For Beginners -->

    .. note::

        This function should be used only in the front-end area after WordPress ``wp`` action.

View
----

* ``breadcrumbs.php`` is the template where you can define how the breadcrumbs will be shown on the page. You can overwrite the default view with your own, by creating a ``breadcrumbs.php`` file in the extension's ``views`` directory in the child theme.

Filters
-------

* ``fw_ext_breadcrumbs_build`` - in some cases you want to modify the breadcrumbs items that will be rendered, or a specific item. This filter allows you to modify the breadcrumbs items array before it will be rendered.

    .. code-block:: php

        /**
         * @internal
         */
        function _filter_my_custom_breadcrumbs_items( $items ) {
            // do some changes ...

            return $items;
        }
        add_filter( 'fw_ext_breadcrumbs_build', '_filter_my_custom_breadcrumbs_items' );

* ``fw_ext_breadcrumbs_search_query`` - this filter is used in the search archive template and it contains the search query word. In case you want to modify the word or customize it, like capitalizing it, use this filter.

    .. code-block:: php

        /**
         * @internal
         */
        function _filter_my_custom_breadcrumbs_search_word( $word ) {
            return strtoupper( $word );
        }
        add_filter( 'fw_ext_breadcrumbs_search_query', '_filter_my_custom_breadcrumbs_search_word' );

    .. note::

        This filter doesn't affect the search query

Date format filters
^^^^^^^^^^^^^^^^^^^

* ``fw_ext_breadcrumbs_date_day_format`` - date format for day archives (``d F Y``)
* ``fw_ext_breadcrumbs_date_month_format`` - date format for day archives (``F Y``)
* ``fw_ext_breadcrumbs_date_year_format`` - date format for day archives (``Y``)

These 3 filters are used to modify the date format in date archives

.. code-block:: php

    /**
     * @internal
     */
    function _filter_my_custom_breadcrumbs_archive_date_format( $date_format ) {
        return 'd, F Y';
    }
    add_filter( 'fw_ext_breadcrumbs_date_day_format', '_filter_my_custom_breadcrumbs_archive_date_format' );
