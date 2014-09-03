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