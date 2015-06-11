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
    │     ├-manifest.php   # Theme details: title, description, version, dependencies, etc.
    │     ├-config.php     # Theme specific configuration
    │     └─options/
    │       ├─settings.php # Theme settings options
    │       ├─customizer.php # Customizer options
    │       ├─posts/       # Post types options
    │       │ ├─post.php
    │       │ ├─testimonial.php
    │       │ ├─{post-type}.php
    │       │ └─...
    │       └─taxonomies/  # Taxonomy terms options
    │         ├─category.php
    │         ├─post_tag.php
    │         ├─{taxonomy}.php
    │         └─...
    └-child-theme/
      └-framework-customizations/
        └-... # same as in then parent theme, but here you can overwrite specific files from the parent theme

Let's take a closer look at each directory and file, and understand how it works.

* ``framework-customizations/theme/`` - Contains options, views, helpers, and all bunch of theme stuff, we'll take a closer look at every file below.

* ``framework-customizations/theme/manifest.php`` - Contains an array with information about theme, accessible through ``fw()->theme->manifest->get('key');``.
  More details about the :doc:`theme manifest </manifest/theme>`.

* ``framework-customizations/theme/config.php`` - Theme configuration array, accessible through ``fw()->theme->get_config('key');``. `Here <https://github.com/ThemeFuse/Unyson/blob/3b79926d5e09f7c9b2697444ffa8d4c9a39b7f5b/framework/core/components/theme.php#L156-L159>`__ are the default values.

* ``framework-customizations/theme/options/`` - A directory containing option files: post types, taxonomies and theme settings page options.
  The framework will automatically pick them, display in admin pages and save the values in the database.
  Also you can add custom options files in it, for e.g. ``framework-customizations/theme/options/my-options.php`` and access them through ``fw()->theme->get_options('my-options')``.
  Use the ``fw_get_db_..._option()`` functions to get the settings, posts and taxonomies options values from the database.

* ``framework-customizations/extension/`` - Contains customizations for the framework extensions.
  You can overwrite options, views and configuration files of the extensions located in the framework.
  You can also store there theme extensions and create sub-extensions for extensions located in the framework.

You can also create a ``framework-customizations/`` directory in the child theme.
There you can do the same things as in parent theme, and also you can overwrite some files from the parent theme, like options and configuration files.
Keep in mind that some files from the child theme are included before the parent theme files (or the other way around, it depends on the case)
to give you the ability to customize some parent theme behavior.
