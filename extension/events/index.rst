Events
======

This extension adds a fully fledged Events module to your theme. It comes with built in pages that contain a calendar where events can be added.

.. contents::
    :local:
    :backlinks: top

Hooks
-----

* ``fw_theme_ext_events_after_content`` - adding some html after the content

    .. code-block:: php

        /** @internal */
        function _action_theme_render_html($post) {
            if (!empty($post) and $post === fw()->extensions->get( 'events' )->get_post_type_name() ) {
                echo '<div>'. __('Hello world', 'fw') .'</div>';
            }
        }
        add_action('fw_theme_ext_events_after_content', '_action_theme_render_html');

* ``fw_ext_events_post_slug`` - event custom post slug

    .. code-block:: php

        /** @internal */
        function _filter_custom_events_post_slug($slug) {
            return 'event';
        }
        add_filter('fw_ext_events_post_slug', '_filter_custom_events_post_slug');

* ``fw_ext_events_taxonomy_slug`` - event taxonomy slug

    .. code-block:: php

        /** @internal */
        function _filter_custom_events_taxonomy_slug($slug) {
            return 'events';
        }
        add_filter('fw_ext_events_taxonomy_slug', '_filter_custom_events_taxonomy_slug');

* ``fw_ext_events_post_type_name`` - event custom post labels (plural and singular)

    .. code-block:: php

        /** @internal */
        function _filter_event_labels($labels) {
            $labels = array(
                'singular' => __('Custom Event', 'fw'),
                'plural'   => __('Custom Events', 'fw'),
            );

            return $labels;
        }
        add_filter('fw_ext_events_post_type_name', '_filter_event_labels');

* ``fw_ext_events_category_name`` - event taxonomy labels (plural and singular)

    .. code-block:: php

        /** @internal */
        function _filter_event_tax_labels_names($labels) {
            $labels = array(
                'singular' => __( 'Custom Category', 'fw' ),
                'plural'   => __( 'Custom Categories', 'fw' ),
            );

            return $labels;
        }
        add_filter( 'fw_ext_events_category_name', '_filter_event_tax_labels_names' );

New options on the Event edit page
----------------------------------

A sub-extension which implements ``FW_Events_Interface_Tabs`` will be include options announced in ``fw_get_tabs_options()`` method.

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    class FW_Extension_Event_Tickets extends FW_Extension implements FW_Events_Interface_Tabs {

        public function fw_get_tabs_options() {
            return array(
                'events_tab' => array(
                    'title'   => __( 'New Demo Tab Options', 'fw' ),
                    'type'    => 'tab',
                    'options' => array(
                        'demo_text_id' => array(
                            'type'  => 'text',
                            'desc'  => 'Demo text description',
                            'label' => 'Demo Text Label',
                        )
                    )
                )
            );
        }
    }

Views
-----

.. raw:: html

	<iframe src="https://player.vimeo.com/video/115245839?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
	
	<br><br>

Templates are located in the ``views/`` directory. Here is the list of templates that you can customize:

* ``single.php`` - Events single post template. By default is used ``single.php`` from the theme root directory, you can overwrite it by creating ``framework-customizations/extensions/events/views/single.php``.
* ``taxonomy.php`` - Events category template. By default is used ``taxonomy.php`` from the theme root directory, you can overwrite it by creating ``framework-customizations/extensions/events/views/taxonomy.php``.
* ``content.php`` - Default events single page template content. It is loaded if the ``framework-customizations/extensions/events/views/single.php`` doesn't exist and is used ``single.php`` from the theme root directory.
  The content of this view is rendered using worpdress `the_content <http://codex.wordpress.org/Plugin_API/Filter_Reference/the_content>`__ filter, when the event single page is loaded.

Events Tags
-----------

A way to process events search tags.

Frontend render
^^^^^^^^^^^^^^^

There are some ways you can display an event in frontend:

The ``events-tags`` extension automatically connects to the [calendar] and [map] shortcodes, which is available in **Drag & Drop page builder** in the **Content Elements** tab.

Also it can be rendered from code - the shortcode ``[map]`` has public method ``'render_custom'`` that you can use to render a map on frontend.

.. code-block:: php

    $shortcode_map = fw()->extensions->get('shortcodes')->get_shortcode('map');

    if (!empty($shortcode_map)) {
        echo $shortcode_map->render_custom(
            array(
                array(
                    'title' => __('Some Title', 'fw'),
                    'url' => 'https://example.com',
                    'description' => __('Some description', 'fw'),
                    'thumb' => array('attachment_id' => get_post_thumbnail_id( $post->ID ) ),
                    'location' => array(
                        'coordinates' => array(
                            'lat' => '-34',
                            'lng' => '150'
                        )
                    )
                )
            )
        );
    }