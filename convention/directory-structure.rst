Directory Structure
===================

We've organized the files and folders in order to be easy to understand and use. What follows is the directory and file structure of an Unyson theme:

.. code-block:: text

    themes/
    ├-parent-theme/
    │ └-framework-customizations/
    │   ├-extensions/
    │   │ ├─extension-name/
    │   │ └─...
    │   └-theme/
    │     ├-config.php     # Theme specific configuration
    │     ├-static.php     # wp_enqueue_style() and wp_enqueue_script()
    │     ├-posts.php      # register_post_type() and register_taxonomy()
    │     ├-menus.php      # register_nav_menus()
    │     ├-hooks.php      # add_filter() and add_action()
    │     ├-helpers.php    # Helper functions and classes
    │     ├-manifest.php   # Theme details: title, description, version, dependencies, etc.
    │     ├─options/
    │     │ ├─settings.php # Theme settings options
    │     │ ├─posts/       # Post types options
    │     │ │ ├─post.php
    │     │ │ ├─testimonial.php
    │     │ │ ├─{post-type}.php
    │     │ │ └─...
    │     │ └─taxonomies/  # Taxonomy terms options
    │     │   ├─category.php
    │     │   ├─post_tag.php
    │     │   ├─{taxonomy}.php
    │     │   └─...
    │     ├─widgets/       # Theme widgets
    │     │ ├─{widget-name}/
    │     │ │ ├─class-fw-widget-{widget-name}.php # class FW_Widget_{Widget_Name} extends WP_Widget { ... }
    │     │ │ └─views/
    │     │ │   ├─some-view.php
    │     │ │   └─...
    │     │ └─...
    │     └─includes/      # All .php files are auto included (no need to require_once)
    │       ├─some-file.php
    │       └─...
    └-child-theme/
      └-framework-customizations/
        └-... # same as in then parent theme, but here you can overwrite specific files from the parent theme

Let's take a closer look at each directory and file, and understand how it works.

* ``framework-customizations/theme/`` - Contains options, views, helpers, and all bunch of theme stuff, we'll take a closer look at every file below.

* ``framework-customizations/theme/config.php`` - Theme configuration array, accessible through ``fw()->theme->get_config('key');``.

* ``framework-customizations/theme/static.php`` - Enqueue all theme scripts and styles in this file.
  It is included automatically on the ``wp_enqueue_scripts`` and ``admin_enqueue_scripts`` actions,
  so you can enqueue both admin and frontend scripts and styles from it, but you will have to use the ``is_admin()`` function.

* ``framework-customizations/theme/posts.php`` - Register theme post types and taxonomies in this file.
  It is included automatically on the ``init`` action.

* ``framework-customizations/theme/menus.php`` - Register menus in this file. It is included automatically on the ``init`` action.

* ``framework-customizations/theme/hooks.php`` - Add all theme's filters and actions to this file.
  This file is automatically included as early as possible, in this way your theme will not miss any action or filter execution.

* ``framework-customizations/theme/helpers.php`` - Add all helper functions and classes used all over your theme to this file.

* ``framework-customizations/theme/manifest.php`` - Contains an array with information about theme, accessible through ``fw()->theme->manifest->get('key');``.
  More details about the :doc:`theme manifest </manifest/theme>`.

* ``framework-customizations/theme/options/`` - A directory containing option files: post types, taxonomies and theme settings page options.
  The framework will automatically pick them, display in admin pages and save the values in the database.
  Also you can add custom options files in it, for e.g. ``framework-customizations/theme/options/my-options.php`` and access them through ``fw()->theme->get_options('my-options')``.
  Use the ``fw_get_db_..._option()`` functions to get the settings, posts and taxonomies options values from the database.

* ``framework-customizations/theme/widgets/`` - Contains theme widgets organized into directories.
  Widget class files are included automatically on the ``widgets_init`` action.

* ``framework-customizations/theme/includes/`` - All ``.php`` files within this directory will be included automatically.

* ``framework-customizations/extension/`` - Contains customizations for the framework extensions.
  You can overwrite options, views and configuration files of the extensions located in the framework.
  You can also store there theme extensions and create sub-extensions for extensions located in the framework.

You can also create a ``framework-customizations/`` directory in the child theme.
There you can do the same things as in parent theme, and also you can overwrite some files from the parent theme, like options and configuration files.
Keep in mind that some files from the child theme are included before the parent theme files (or the other way around, it depends on the case)
to give you the ability to customize some parent theme behavior.
