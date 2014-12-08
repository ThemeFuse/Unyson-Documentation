SEO
===

The SEO extension doesn't have any functionality that is reflected visually in the front end. It offers additional functionality for its sub-extensions, like :ref:`tags` module.

.. contents::
    :local:
    :backlinks: top

Option placeholders
--------------------

In order to keep all sub-extensions options together, the SEO extension creates special options sections in:

* **Settings Options** - a tab named **SEO** where all sub-extensions add their options. Also in the **SEO** tab there is a sub-tab named **General** with a box named **General Settings**.

* **Post Options** - a section *(box or tab)* named **SEO**. In case the post options has the General box with id ``general``, the seo section will appear as a sub tab for that box, in other cases it creates a new box.

* **Term Options** - a special section in Term Options.

Options Filters
^^^^^^^^^^^^^^^

All the filters have the same functionality, the only differences is where they add options.

* ``fw_ext_seo_settings_options`` - use to add your own tab in Settings Options **SEO** tab.
* ``fw_ext_seo_general_settings`` - use to add your own box in Settings Options **SEO > General** tab.
* ``fw_ext_seo_general_setting_options`` - use to add your own options in Settings Options **SEO > General > General Settings** box.
* ``fw_ext_seo_post_type_options`` - add options in post options **SEO** box.
* ``fw_ext_seo_taxonomy_options`` - add options in term options **SEO** section.

    All filters have the same parameter ``$options`` array.

    .. code-block:: php

        /**
         * @internal
         */
        function _filter_set_my_framework_titles_metas_tab( $options ) {
            $options['my_id_tab'] = array(
                'title'   => __( 'My Options', 'fw' ),
                'type'    => 'tab',
                'options' => array(
                    'my_id_title' => array(
                        'label' => __( 'Title', 'fw' ),
                        'desc'  => __( 'Set title', 'fw' ),
                        'type'  => 'text',
                        'value' => ''
                    ),
                    'my_id_description' => array(
                        'label' => __( 'Description', 'fw' ),
                        'desc'  => __( 'Set description', 'fw' ),
                        'type'  => 'textarea',
                        'value' => ''
                    ),
                )
            );

            return $options;
        }
        add_filter( 'fw_ext_seo_settings_options', '_filter_set_my_framework_titles_metas_tab' );

.. _tags:

Tags
----

The SEO extension has a list of built in SEO tags, but in some cases you'll want to add your own. To add a new SEO tag you have to use the ``fw_ext_seo_init_tags`` filter. This is the format for a SEO tag:

.. code-block:: php

    'tag_name' => array(
        'desc'  => __( 'My new tag', 'fw' ),
        'value' => '',
    )

``tag_name`` must be unique. This tag will be available as ``%%tag_name%%``.

Add new tag
^^^^^^^^^^^

.. code-block:: php

    /**
     * @internal
     */
    function _filter_add_my_seo_tag($tags) {
        $tags['mytag'] = array(
            'desc'  => __( 'My new tag', 'fw' ),
            'value' => '',
        );

        return $tags;
    }
    add_filter( 'fw_ext_seo_init_tags', '_filter_add_my_seo_tag' );

The seo tags are created when the extension is initialized,
in some cases you cannot know the value of the tag in the current state, like ``%%title%%`` tag.
So in ``fw_ext_seo_init_tags`` filter, you can add the tag without value,
and define the value after the current page location is defined, by using the ``fw_ext_seo_update_tags`` filter.

Update tag value
^^^^^^^^^^^^^^^^

.. code-block:: php

    /**
     * @internal
     */
    function _filter_update_my_seo_tag( $tags ) {
        if ( isset($tags['mytag']) && is_front_page() ) {
            $tags['mytag']['value'] = __('Home', 'fw');
        }

        return $tags;
    }
    add_filter( 'fw_ext_seo_update_tags', '_filter_update_my_seo_tag' );

.. _actions:

Actions
-------

* ``fw_ext_seo_init_location`` - is, initialized with WordPress ``wp`` action and defines the current page location, used to update SEO tags. Sends as first parameter ``$location`` an array with details about current page location.

.. _helpers:

Helpers
-------

* ``fw_ext_seo_parse_meta_tags($text)`` - parses a string and replaces all SEO tags with their values.

    .. note::

        Use this function after ``fw_ext_seo_init_location`` action.

.. toctree::

    titles-and-meta
    sitemap