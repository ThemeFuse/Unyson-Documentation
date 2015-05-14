Theme
=====

The Theme component makes the connection between the theme and the framework. The working directory is ``framework-customizations/theme/`` within child and parent themes.

.. _theme-get-options:

* ``get_options($name)`` - return options array from specified option file ``framework-customizations/theme/options/{$name}.php``.

    .. code-block:: php

        $custom_options = fw()->theme->get_options('custom');

.. _theme-get-settings-options:

* ``get_settings_options()`` - return options array from ``framework-customizations/theme/options/settings.php``.

    .. code-block:: php

        $settings_options = fw()->theme->get_settings_options();

.. _theme-get-customizer-options:

* ``get_customizer_options()`` - return options array from ``framework-customizations/theme/options/customizer.php``.

    .. code-block:: php

        $customizer_options = fw()->theme->get_customizer_options();

.. _theme-get-post-options:

* ``get_post_options($post_type)`` - return options array from ``framework-customizations/theme/options/posts/{$post_type}.php``.

    .. code-block:: php

        $custom_post_options = fw()->theme->get_post_options('custom_post');

.. _theme-get-taxonomy-options:

* ``get_taxonomy_options($taxonomy)`` - return options array from ``framework-customizations/theme/options/taxonomies/{$post_type}.php``.

    .. code-block:: php

        $category_options = fw()->theme->get_taxonomy_options('category');

.. _theme-get-config:

* ``get_config($key = null)`` - return entire config array from ``framework-customizations/theme/config.php`` or only specified key.

    .. code-block:: php

        $backlisted_extensions = fw()->theme->get_config('extensions_blacklist');

.. _theme-locate-path:

* ``locate_path($rel_path)`` - search full path of the file by a given relative path. Will search in the **child theme** then in the **parent theme**.

    .. code-block:: php

        echo fw()->theme->locate_path('/custom.php');

        // prints '/.../wp-content/themes/scratch-theme/framework-customizations/theme/custom.php'
