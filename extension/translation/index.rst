Translation
===========

This extension lets you translate your website in any language or even add multiple languages for your users to change at their will from the front-end.

.. contents::
    :local:
    :backlinks: top

Helpers
-------

* ``fw_ext_translation_get_frontend_active_language()`` - Frontend active language.
* ``fw_ext_translation_get_backend_active_language()`` - Backend active language.

Filters
-------

* ``fw_ext_translation_change_render_language_switcher`` - Change the view of the language switcher.

    .. code-block:: php

        add_action( 'fw_ext_translation_change_render_language_switcher', function ( $html, $frontend_urls ) {
            $html = '';

            foreach ( $frontend_urls as $lang_code => $url ) {
                $html .= '<a href="' . esc_attr($url) . '">' . $lang_code . '</a>';
            }

            return $html;
        }, 10, 2 );
