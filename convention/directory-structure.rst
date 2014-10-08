Directory Structure
===================

We've organized the files and folders in order to be easy to understand and use. What follows is the directory and file structure of Unyson:

.. code-block:: text

    themes/
    ├-parent-theme/
    │ ├-framework/
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
    │     ├─options/       # Files containing options
    │     │ ├─settings.php # Contains framework settings options
    │     │ ├─posts/       # Files containing post types options
    │     │ │ ├─post.php
    │     │ │ ├─testimonial.php
    │     │ │ ├─{post-type}.php
    │     │ │ └─...
    │     │ └─taxonomies/  # Files containing taxonomy terms options
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
        └-... # same as in parent theme, but here you can overwrite specific files from parent theme

Let's take a closer look to each directory and file, and understand how it works.

* ``framework/`` - In this directory you'll find the framework.
  Do not change anything in it, because all the files from that directory will be replaces on a framework update and you'll lose all the changes.

* ``framework-customizations/`` - Contains everything related to your theme.
  You are free to change everything you want in this directory.

* ``framework-customizations/extension/`` - Contains customizations for the framework extensions.
  You can overwrite options, views and configuration files of the extensions located in the framework directory.
  You can also store there theme extensions and create sub-extensions for extensions located in the framework.

* ``framework-customizations/theme/`` - Contains options, views, helpers, and all bunch of theme stuff, we'll take a closer look at every file below.

* ``framework-customizations/theme/config.php`` - Theme configuration array, accessible through ``fw()->theme->get_config('key');``.

* ``framework-customizations/theme/static.php`` - Enqueue all theme scripts and styles in this file.
  It is included automatically on ``wp_enqueue_scripts`` and ``admin_enqueue_scripts`` actions,
  so you can enqueue both admin and frontend scripts and styles from it, but you will have to use the ``is_admin()`` function.

* ``framework-customizations/theme/posts.php`` - Register theme post types and taxonomies in this file.
  It is included automatically on ``init`` action.

* ``framework-customizations/theme/menus.php`` - Register menus in this file. It is included automatically on ``init`` action.

* ``framework-customizations/theme/hooks.php`` - Add all theme's filters and actions to this file.
  This file is automatically included as early as possible, in this way your theme will not miss any action or filter execution.

* ``framework-customizations/theme/helpers.php`` - Add all helper functions and classes used all over your theme to this file.

* ``framework-customizations/theme/manifest.php`` - Contains an array with information about theme.

* ``framework-customizations/theme/options/`` - A directory containing option files only: post types options, taxonomy options, settings page options and
  you can also add custom options files in it. Check out the available :doc:`methods to retrieve the theme options </components/theme>`.

* ``framework-customizations/theme/widgets/`` - Contains theme widgets organized into directories.
  Widget class files are included automatically on ``widgets_init`` action.

* ``framework-customizations/theme/includes/`` - Contains any ``.php`` file that you want to be included automatically.

You can also create a ``framework-customizations/`` directory in the child theme.
There you can do the same things as in parent theme, and also you can overwrite some files from parent theme, like options and configuration files.
Keep in mind that some files from the child theme are included before the parent theme files (or the other way around, it depends on the case)
to give you the ability to customize some parent theme behavior.
