Introduction
============

Extensions are functionalities that add something new to framework or to another extension.
They can be installed via Extensions page, bundled with a theme or loaded from a plugin (or any directory).

.. contents::
    :local:
    :backlinks: top

Directory Structure
-------------------

Every extension has everything it needs in its own folder: settings, options, scripts, styles, etc.
In this way, extensions can be easy added or removed without affecting other files.

The extension directory has the following structure:

.. code-block:: text

    {extension-name}/
    ├─manifest.php  # Data about extension: version, name, dependencies, etc.
    ├─class-fw-extension-{extension-name}.php # class FW_Extension_{Extension_Name} extends FW_Extension { ... }
    ├─config.php    # Extension specific configurations
    ├─static.php    # wp_enqueue_style() and wp_enqueue_script()
    ├─posts.php     # register_post_type() and register_taxonomy()
    ├─hooks.php     # add_filter() and add_action()
    ├─helpers.php   # Helper functions and classes
    ├─readme.md.php # Install instructions
    ├─options/
    │ ├─posts/      # Post types options
    │ │ ├─post.php
    │ │ ├─{post-type}.php
    │ │ └─...
    │ ├─taxonomies/ # Taxonomies terms options
    │ │ ├─category.php
    │ │ ├─post_tag.php
    │ │ ├─{taxonomy}.php
    │ │ └─...
    │ └-...
    ├─settings-options.php # Extension Settings page options
    ├─views/
    │ └─...
    ├─static/
    │ ├─js/
    │ ├─css/
    │ └─...
    ├─includes/ # All .php files are auto included (no need to require_once)
    │ ├─other.php
    │ └─...
    └───[extensions/] # Directory for sub extensions

Let's take a closer look at each directory and file, and understand how it works.

* ``manifest.php`` - The only required file, all other files are optional. It contains the base information about extension.
  More details about the :doc:`extension manifest </manifest/extension>`.

* ``class-fw-extension-{extension-name}.php`` - If the extension has some advanced functionality,
  it can define a class that will be the instance of the extension returned by ``fw()->extensions->get('{extension-name}')``.
  By default an instance of default class will be created, which is an empty class that just extends the ``FW_Extension`` class.
  This file can't be overwritten.

* ``config.php`` - Configuration array, which is accessible through the ``$ext->get_config('key')`` method.
  Users can customize it by creating the same file in
  ``{theme-name}/framework-customizations/extension/{extension-name}/config.php``
  and overwrite only some keys (internally is made ``array_merge($extension_config, $theme_customized_config)``).

* ``static.php`` - Enqueue extension scripts and styles.
  It is included automatically on the ``wp_enqueue_scripts`` and ``admin_enqueue_scripts`` actions,
  so you can enqueue both admin and frontend scripts and styles from it, but you will have to use the ``is_admin()`` function.
  This file can be overwritten from theme by creating
  ``{theme-name}/framework-customizations/extension/{extension-name}/static.php``.

* ``posts.php`` - Register theme post types and taxonomies in this file. It is included automatically on the ``init`` action.

* ``hooks.php`` - File containing filters and actions.
  This file is automatically included as early as possible, in this way your extension will not miss any action or filter execution.

* ``helpers.php`` - All extension's helper functions and classes must be in this file.

* ``readme.md.php`` - Install instructions for users, to make the extension start working.

* ``options/`` - A directory containing option files: post types, taxonomies or custom options.
  The framework will **not** automatically pick them (like theme options), only the extension decides how to use these options.
  You can access them through the ``$ext->get_[...]_options()`` methods.
  Users can overwrite in the theme any file from the ``options/`` directory, by creating
  ``{theme-name}/framework-customizations/extension/{extension-name}/options/{file-name}.php``.

* ``settings-options.php`` - Options used for the extension settings page. The framework picks them automatically and saves the values in then database.
  Use the ``fw_get_db_ext_settings_option()`` function to get options values from the database.
  This file can't be overwritten from the theme, that's why it wasn't placed in the ``options/`` directory.

* ``views/`` - Contains extension templates. Inside extension class you can render a view like this ``$this->render_view('template-name');``.
  The views can be overwritten in the theme by creating
  ``{theme-name}/framework-customizations/extension/{extension-name}/views/{template-name}.php``.

* ``static/`` - Contains styles, scripts, images and other static files. Some files can be overwritten in the theme, some not,
  it depends how they are enqueued in the extension, using ``$this->locate_URI()`` or ``$this->get_declared_URI()``.

* ``includes/`` - All ``.php`` files within this directory will be included automatically.

.. _load-locations:

Load Locations
--------------

Extensions are loaded from the following directories and in the following order:

1. ``framework/extensions/``
2. Custom directories specified via the ``fw_extensions_locations`` filter
3. ``{parent-theme}/framework-customizations/extensions/``
4. ``{child-theme}/framework-customizations/extensions/``

Custom Load Locations
---------------------

You can load extensions from any directory via the ``fw_extensions_locations`` filter.
For e.g. to load extensions from your own plugin:

.. code-block:: php

    /**
     * @internal
     */
    function _filter_plugin_awesome_extensions($locations) {
        $locations[ dirname(__FILE__) . '/extensions' ]
        =
        plugin_dir_url( __FILE__ ) . 'extensions';

        return $locations;
    }
    add_filter('fw_extensions_locations', '_filter_plugin_awesome_extensions');

Child Extensions
----------------

Child Extensions are used to split a big extension into sub-extensions to separate the functionalities or
when some extensions are tightly connected to the parent extension and can't exist without it,
so they will be loaded only if the parent extension exists, is loaded and activated.

A child extension can be located in any :ref:`load location <load-locations>` but must be on the same relative path.
Here are some examples where an extension can exists and where its child extensions can be placed:

1. If the ``hello`` extension is located in framework, the child extensions can be placed in: framework, parent theme and child theme.

    .. code-block:: text

        framework/
        └─extensions/
          └─hello/
            └─extensions/
              ├─hello-child/
              └─...

        ├─parent-theme/
        │ └─framework-customizations/
        │   └─extensions/
        │     └─hello/
        │       └─extensions/
        │         ├─hello-child/
        │         └─...
        └─child-theme/
          └─framework-customizations/
            └─extensions/
              └─hello/
                └─extensions/
                  ├─hello-child/
                  └─...

2. If the ``hello`` extension is located in parent theme, the child extensions can be placed in: parent theme and child theme.

    .. code-block:: text

        ├─parent-theme/
        │ └─framework-customizations/
        │   └─extensions/
        │     └─hello/
        │       └─extensions/
        │         ├─hello-child/
        │         └─...
        └─child-theme/
          └─framework-customizations/
            └─extensions/
              └─hello/
                └─extensions/
                  ├─hello-child/
                  └─...

3. If the ``hello`` extension is located in child theme, the child extensions can be placed only in the child theme.

    .. code-block:: text

        └─child-theme/
          └─framework-customizations/
            └─extensions/
              └─hello/
                └─extensions/
                  ├─hello-child/
                  └─...