Prefixes
========

In the framework everything is prefixed to prevent naming conflicts and to give a meaning to functions, classes and methods names.

.. contents::
    :local:
    :backlinks: top

Core
----

* Public functions and classes should be prefixed with:

    * ``fw_`` for functions
    * ``FW_`` for classes

    .. code-block:: php

        function fw_useful_function() {
            // ...
        }

        class FW_Useful_Class {
            // ...
        }

    .. _public-function:

    .. note::
    
        A **Public function** is meant to be used by anyone. Usually it's a helper function that does something useful.

* Private functions and classes should be prefixed with:

    * ``_fw_`` for functions
    * ``_FW_`` for classes

    .. code-block:: php

        /**
         * @internal
         */
        function _fw_private_function() {
            // ...
        }

        /**
         * @internal
         */
        class _FW_Private_Class
        {
            // ...
        }

    .. _private-function:

    .. note::

        A **private function** is used somewhere internally. Don't forget to use the `@internal`_ tag in your PhpDoc in order to make it clear to other developers that this is a private function. It will also remove the function from your documentation (if you are using an automatic documentation generator)

* Functions and methods used for hooks should be prefixed with:

    * ``_action_`` for ``add_action()``
    * ``_filter_`` for ``add_filter()``

    .. code-block:: php

        /**
         * @internal
         */
        function _action_init_something() {
            // ...
        }
        add_action('init', '_action_init_something');

    .. important::

        Be sure the function name is unique enough in order to minimize the chances to be  defined by someone else. Do not use too simple function names like ``_action_init``.

    .. code-block:: php

        class FW_Example
        {
            public function __construct()
            {
                add_filter('the_content', array($this, '_filter_the_content'));
            }

            /**
             * @internal
             */
            public function _filter_the_content($content) {
                // ...

                return $content;
            }
        }

* Filters and actions should be prefixed with ``'fw_'``.

    .. code-block:: php

        $data = apply_filters('fw_whatever', $data);

        do_action('fw_whatever');

Theme
-----

* Public functions and classes should be prefixed with:

    * ``fw_theme_`` for functions
    * ``FW_Theme_`` for classes

    .. code-block:: php

        function fw_theme_head() {
            // ...
        }

        class FW_Theme_Pagination
        {
            // ...
        }

* Private functions and classes should be prefixed with:

    * ``_fw_theme_`` for functions
    * ``_FW_Theme_`` for classes

    .. code-block:: php

        /**
         * @internal
         */
        function _fw_theme_private_function() {
            // ...
        }

        /**
         * @internal
         */
        class _FW_Theme_Private_Class
        {
            // ...
        }

* Functions used for hooks should be prefixed with:

    * ``_action_theme_`` for ``add_action()``
    * ``_filter_theme_`` for ``add_filter()``

    .. code-block:: php

        /**
         * @internal
         */
        function _filter_theme_the_content($content) {
            // ...

            return $content;
        }
        add_filter('the_content', '_filter_theme_the_content');

        /**
         * @internal
         */
        function _action_theme_init() {
            // ...
        }
        add_action('init', '_action_theme_init');

* Filters and actions should be prefixed with ``fw_theme_``.

    .. code-block:: php

        $data = apply_filters('fw_theme_whatever', $data);

        do_action('fw_theme_whatever');

Extensions
----------

* Public functions and classes should be prefixed with:

    * ``fw_ext_<extension-name>_`` for functions
    * ``FW_Ext_<extension-name>_`` for classes

* Private functions and classes should be prefixed with:

    * ``_fw_ext_<extension-name>_`` for functions
    * ``_FW_Ext_<extension-name>_`` for classes

* Functions used for hooks should be prefixed with:

    * ``_action_fw_ext_<extension-name>_`` for ``add_action()``
    * ``_filter_fw_ext_<extension-name>_`` for ``add_filter()``

    For e.g. if extension name is ``demo``:

    .. code-block:: php

        /**
         * @internal
         */
        function _filter_fw_ext_demo_the_content($content) {
            // ...

            return $content;
        }
        add_filter('the_content', '_filter_fw_ext_demo_the_content');

        /**
         * @internal
         */
        function _action_fw_ext_demo_init() {
            // ...
        }
        add_action('init', '_action_fw_ext_demo_init');

* Filters and actions should be prefixed with ``'fw_ext_<extension-name>_'``.

    For e.g. if extension name is ``demo``:

    .. code-block:: php

        $data = apply_filters('fw_ext_demo_whatever', $data);

        do_action('fw_ext_demo_whatever');


.. include:: /links.rst.inc
