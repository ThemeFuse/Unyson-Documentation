Directory Structure
===================

The extensions directory has the following structure:

.. code-block:: text

    {extension-name}/
    ├─[class-fw-extension-{extension-name}.php] # class FW_Extension_{Extension_Name} extends FW_Extension { ... }
    ├─config.php    # Extension specific configurations (should be described in extension's README.md)
    ├─static.php    # wp_enqueue_style() and wp_enqueue_script()
    ├─posts.php     # register_post_type() and register_taxonomy()
    ├─hooks.php     # add_filter() and add_action()
    ├─helpers.php   # Helper functions and classes
    ├─README.md     # Documentation
    ├─manifest.php  # Data about extension: version, name, dependencies, etc.
    ├─options/      # Files containing options
    │ ├─posts/      # Files containing post types options
    │ │ ├─post.php
    │ │ ├─{post-type}.php
    │ │ └─...
    │ ├─taxonomies/ # Files containing taxonomy tags options
    │ │ ├─category.php
    │ │ ├─post_tag.php
    │ │ ├─{taxonomy}.php
    │ │ └─...
    │ └-...
    ├─views/
    │ └─...
    ├─static/
    │ ├─js/
    │ ├─css/
    │ └─...
    ├─includes/ # All .php files are auto included (no need to require_once)
    │ ├─other.php
    │ └─...
    └───[extensions/] # Directory for sub extensions (if has)