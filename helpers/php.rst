PHP Helpers
===========

.. contents::
    :local:
    :backlinks: top

.. _general:

General
-------

General PHP helpers:

.. _fw-print:

* ``fw_print($value, $die = false)`` - styled version of ``print_r()``.

.. _fw-html-tag:

* ``fw_html_tag($tag, $attr = null, $end = null)`` - generate html tag.

        .. code-block:: php

            echo fw_html_tag('script', array('src' => '/demo.js'), true);

            // <script src="/demo.js"></script>

.. _fw-attr-to-html:

* ``fw_attr_to_html(array $attr_array)`` - generate html attributes from array.

        .. code-block:: php

            echo '<div '. fw_attr_to_html(array('id' => 'foo', 'class' => 'bar')) .'></div>';

            // <div id="foo" class="bar" ></div>

.. _generfw-akg:

* ``fw_akg($keys, &$array_or_object, $default_value = null, $keys_delimiter = '/')`` - get array multikey value.

        .. _multikey:

        .. note::

            **MultiKey** is a string composed from multiple array keys, separated by a delimiter character, that represents an array structure. For example

            .. code-block:: text

                'a/b/c'

            represents

            .. code-block:: php

                array(
                    'a' => array(
                        'b' => array(
                            'c' => null
                        )
                    )
                )

        .. code-block:: php

            $demo = array(
                'a' => array(
                    'b' => 'hello'
                )
             );

            echo fw_akg('a/b', $demo);

            // 'hello'

.. _fw-aks:

* ``fw_aks($keys, $value, &$array_or_object, $keys_delimiter = '/')`` - set a :ref:`multikey <multikey>` value in array.

    .. code-block:: php

        $demo = array(
            'a' => array()
        );

        fw_aks('a/b', 'hello', $demo);

        print_r($demo);

        /*
        array(
            'a' => array(
                'b' => 'hello'
            )
        )
        */

.. _fw-aku:

* ``fw_aku($keys, &$array_or_object, $keys_delimiter = '/')`` - unset a :ref:`multikey <multikey>` from array.

    .. code-block:: php

        $demo = array(
            'a' => array(
                'b' => array()
            )
        );

        fw_aku('a/b', $demo);

        print_r($demo);

        /*
        array(
            'a' => array()
        )
        */

.. _fw-rand-md5:

* ``fw_rand_md5()`` - generate a random `md5`_.

.. _fw-unique-increment:

* ``fw_unique_increment()`` - random number incremented every time you call the function.

    .. code-block:: php

        echo fw_unique_increment(), PHP_EOL;
        echo fw_unique_increment(), PHP_EOL;
        echo fw_unique_increment(), PHP_EOL;

        /*
        9370
        9371
        9372
        */

.. _fw-stripslashes-deep-keys:

* ``fw_stripslashes_deep_keys($value)`` - strip slashes (recursive) from values and keys (if value is array) if ``magic_quotes_gpc = On``.

.. _fw-addslashes-deep-keys:

* ``fw_addslashes_deep_keys($value)`` - add slashes (recursive) to values and keys (if value is array) if ``magic_quotes_gpc = On``.

.. _fw-current-screen-match:

* ``fw_current_screen_match($rules)`` - check if current ``global $current_screen;`` (available in admin side) matches the given rules. Used to detect on which admin page you currently are. Thus you can for example enqueue a script only on a target page, not on all admin pages.

    .. code-block:: php

        /**
         * @internal
         */
        function _action_enqueue_demo_admin_scripts() {
            // To find out what is the current screen of the current page, uncomment next line
            //global $current_screen; fw_print($current_screen);

            $only = array(
                'only' => array(
                    array( 'id' => 'dashboard' )
                )
            );

            if (fw_current_screen_match($only)) {
                // enqueue this script only on dashboard page
                wp_enqueue_script(
                    'demo-dashboard',
                    get_template_directory_uri() .'/js/demo-only.js'
                );
            }

            $exclude = array(
                'exclude' => array(
                    array( 'id' => 'dashboard' ),
                    array( 'post_type' => 'post' )
                )
            );

            if (fw_current_screen_match($exclude)) {
                // enqueue this script on all admin pages
                // except dashboard page and all pages from posts menu (add, edit, categories, tags)
                wp_enqueue_script(
                    'demo-dashboard',
                    get_template_directory_uri() .'/js/demo-excluded.js'
                );
            }
        }
        add_action('admin_enqueue_scripts', '_action_enqueue_demo_admin_scripts');

    .. note::

        You can combine ``only`` and ``exclude`` in the same rules array.

.. _fw-locate-theme-path-uri:

* ``fw_locate_theme_path_uri($rel_path)`` - search by relative path, in child then in parent theme directory, and return URI.

    .. code-block:: php

        echo fw_locate_theme_path_uri('/styles.css');

        // http://your-site.com/wp-content/themes/child-theme/style.css

.. _fw-locate-theme-path:

* ``fw_locate_theme_path($rel_path)`` - search by relative path, in child then in parent theme directory, and return full path.

    .. code-block:: php

        echo fw_locate_theme_path('/styles.css');

        // /var/www/wordpress/public_html/wp-content/themes/child-theme/style.css

.. _fw-render-view:

* ``fw_render_view($file_path, $view_variables = array())`` - safe render view and return html. In view will be accessible only passed variables, not current context variables.

    .. code-block:: php

        $private = 'Top Secret';

        echo fw_render_view(
            get_stylesheet_directory() .'/demo-view.php',
            array('message' => 'Hello')
        );

        /* demo-view.php
        <?php if (!defined('FW')) die('Forbidden');

        echo $message;
        echo $private;
        */

        // Hello
        // Notice: Undefined variable: private

.. _fw-get-variables-from-file:

* ``fw_get_variables_from_file($file_path, array $variables)`` - extract specified variables from file.

    .. code-block:: php

        $variables = fw_get_variables_from_file(
            get_stylesheet_directory() .'/demo-variables.php',
            array(
                'message' => 'Hi',
                'foo' => 'bar'
            )
        );

        /* demo-variables.php
        <?php if (!defined('FW')) die('Forbidden');

        $message = 'Hello';
        */

        print_r($variables);

        /*
        array(
            'message' => 'Hello',
            'foo' => 'bar'
        )
        */

.. _fw-include-file-isolated:

* ``fw_include_file_isolated($file_path)`` - include files isolated and don't give access to current context variables.

    .. code-block:: php

        $private = 'Top Secret';

        fw_include_file_isolated(get_stylesheet_directory() .'/demo-isolated.php');

        /* demo-isolated.php
        <?php if (!defined('FW')) die('Forbidden');

        echo $private;
        */

        // Notice: Undefined variable: private

.. _fw-html-attr-name-to-array-multi-key:

* ``fw_html_attr_name_to_array_multi_key($attr_name)`` - convert html ``name`` attribute to :ref:`multikey <multikey>`.

    .. code-block:: php

        echo fw_html_attr_name_to_array_multi_key('a[b][c]');

        // 'a/b/c'

.. _fw-is-real-post-save:

* ``fw_is_real_post_save()`` - used in 'save_post' action to detect if it's a real post save, not a revision, auto save or something else.

.. _fw-current-url:

* ``fw_current_url()`` - generate current page url from ``$_SERVER`` data.

.. _fw-is-valid-domain-name:

* ``fw_is_valid_domain_name($domain_name)`` - check if a domain name is valid.

.. _fw-htmlspecialchars:

* ``fw_htmlspecialchars($string)`` - UTF-8 version of php's ``htmlspecialchars()``. Just a shorthand not to write two more parameters for default ``htmlspecialchars()`` every time.

    .. note::

        In php 5.2 ``htmlspecialchars()`` default encoding is not UTF-8.

.. _fw-human-time:

* ``fw_human_time($seconds)`` - convert seconds to human readable time.

    .. code-block:: php

        echo fw_human_time(12345);

        // '3 hours'

.. _fw-strlen:

* ``fw_strlen($string)`` - UTF-8 version of php's ``strlen()``.

    .. code-block:: php

        echo strlen('Привет!'), PHP_EOL;
        echo fw_strlen('Привет!'), PHP_EOL;

        // 13
        // 7

.. _fw-is-post-edit:

* ``fw_is_post_edit()`` - check if you are currently on a post edit page. It also detects if form submit was made from the post edit page.

.. _fw-dirname-to-classname:

* ``fw_dirname_to_classname($dirname)`` - convert directory name to string to be used as/in class name.

    .. code-block:: php

        echo 'FW_'. fw_dirname_to_classname('hello-world');

        // FW_Hello_World

.. _fw-fix-path:

* ``fw_fix_path($path)`` - make sure a path is in unix style, with ``/`` directory separators.

.. _fw-get-stylesheet-customizations-directory:

* ``fw_get_stylesheet_customizations_directory()`` - Full path to the child-theme/framework-customizations directory.

.. _fw-get-stylesheet-customizations-directory-uri:

* ``fw_get_stylesheet_customizations_directory_uri()`` - URI to the child-theme/framework-customizations directory.

.. _fw-get-template-customizations-directory:

* ``fw_get_template_customizations_directory()`` - Full path to the parent-theme/framework-customizations directory.

.. _fw-get-template-customizations-directory-uri:

* ``fw_get_template_customizations_directory_uri()`` - URI to the parent-theme/framework-customizations directory.

.. _fw-get-framework-directory:

* ``fw_get_framework_directory()`` - Full path to the parent-theme/framework directory.

.. _fw-get-framework-directory-uri:

* ``fw_get_framework_directory_uri()`` - URI to the parent-theme/framework directory

.. _cache:

Cache
-----

Use cache to store frequently accessed data. Cache is just a big array and has one useful feature: it will automatically begin to unset array keys if the php memory is close to full. So it is safe to store in it as much data as you want (of course the maximum allowed by php, by default is ~100Mb).

.. code-block:: php

    function get_foo_bar() {
        $cache_key = 'foo/bar';

        try {
            /**
             * This will throw an exception if the key was not found
             */
            return FW_Cache::get($cache_key);
        } catch (FW_Cache_Not_Found_Exception $e) {
            $data = _generate_foo_bar_data();

            FW_Cache::set($cache_key, $data);

            return $data;
        }
    }

.. attention::

    Don't do this:

    .. code-block:: php

            ...
        } catch (FW_Cache_Not_Found_Exception $e) {
            FW_Cache::set($cache_key, _generate_foo_bar_data());

            return FW_Cache::get($cache_key);
        }

    because ``FW_Cache::set(...)`` can fail or the data that was set can be removed after automatically memory free.

.. _options:

Options
-------

Functions for working with options:

.. _fw-extract-only-options:

* ``fw_extract_only_options(array $options)`` - extract only regular options from any array of options.

    .. code-block:: php

        $options = array(
            array(
                'type' => 'box',
                'options' => array(
                    'demo-1' => array(
                        'type' => 'text'
                    )
                )
            ),
            array(
                'type' => 'box',
                'options' => array(
                    array(
                        'type' => 'tab',
                        'options' => array(
                            'demo-2' => array(
                                'type' => 'textarea'
                            )
                        )
                    )
                )
            )
        );

        print_r( fw_extract_only_options($options) );

        /*
        array(
            'demo-1' => array(
                'type' => 'text'
            ),
            'demo-2' => array(
                'type' => 'textarea'
            )
        )
        */

.. _fw-get-options-values-from-input:

* ``fw_get_options_values_from_input(array $options, $input_array = null)`` - extract options values from input array. If no input array is provided, values from ``$_POST`` will be used.

    .. code-block:: php

        $options = array(
            'demo-1' => array( 'type' => 'text', 'value' => 'default value 1' ),
            'demo-2' => array( 'type' => 'text', 'value' => 'default value 2' ),
        );

        $input_values = array(
            'demo-1' => 'input value 1',
            'demo-3' => 'input value 3',
        );

        $values = fw_get_options_values_from_input($options, $input_values);

        print_r($values);

        /*
        array(
            'demo-1' => 'input value 1',
            'demo-2' => 'default value 2',
        )
        */

.. _fw-prepare-option-value:

* ``fw_prepare_option_value($value)`` - by default WordPress offers filters for other plugins to alter database options and post meta. For ex translation plugins use these filters to translate things. If you save your options values in a custom place (like framework does by default, by saving options in a serialized array in database options and post meta) the WordPress filter doesn't know how to work with them.

    .. tip::

        Use this function to pass an option value through filters and translation features that simulates WordPress default behavior. This function is already used in core so you don't have to bother about passing options values through it each time. Use it if you will do something custom and strings will not be translated.

.. _database:

Database
--------

.. _fw-get-db-settings-option:

* ``fw_get_db_settings_option($option_id, $default_value = null)`` - get value from the database of an option from the framework's settings page.
  Settings options are located in ``framework-customizations/theme/options/settings.php``.

.. _fw-set-db-settings-option:

* ``fw_set_db_settings_option($option_id, $value)`` - set a value in the database for an option from the framework's settings page.

-----

.. _fw-get-db-post-option:

* ``fw_get_db_post_option($post_id, $option_id, $default_value = null)`` - get a post option value from the database.
  Post options are located in ``framework-customizations/theme/options/posts/{post-type}.php``.

.. _fw-set-db-post-option:

* ``fw_set_db_post_option($post_id, $option_id, $value)`` - set a post option value in the database.

-----

.. _fw-get-db-term-option:

* ``fw_get_db_term_option($term_id, $taxonomy, $option_id, $default_value = null)`` - get a term option value from the database.
  Term options are located in ``framework-customizations/theme/options/taxonomies/{taxonomy}.php``.

.. _fw-set-db-term-option:

* ``fw_set_db_term_option($term_id, $taxonomy, $option_id, $value)`` - set a term option value in the database.

-----

.. _fw-get-db-ext-settings-option:

* ``fw_get_db_ext_settings_option($extension_name, $option_id, $default_value = null)`` - get extension settings option value from the database.

.. _fw-set-db-ext-settings-option:

* ``fw_set_db_ext_settings_option($extension_name, $option_id, $value)`` - update extension settings option value in the database.

.. _fw-get-db-extension-data:

* ``fw_get_db_extension_data($extension_name, $key, $default_value = null)`` - get a value from the database of some private data stored by an extension.

.. _fw-set-db-extension-data:

* ``fw_set_db_extension_data($extension_name, $key, $value)`` - extensions uses this function to store private values in the database.
    
    .. important::
    
        All values are stored in one wp option. This prevents database spam with wp options for each extension.

FW_Form
-------

A convenient way to create forms. You can create a form class instance and give it three callbacks that control the render, validate and save process.

.. code-block:: php

    $my_form = new FW_Form('<unique-id>', array(
        'render'   => '_my_form_render',
        'validate' => '_my_form_validate',
        'save'     => '_my_form_save',
    ));

    function _my_form_render() {
        $input_value = FW_Request::POST('demo');

        echo '<input type="text" name="demo" maxlength="10" value="'. esc_attr($input_value) .'">';
    }

    function _my_form_validate($errors) {
        $input_value = FW_Request::POST('demo');

        if (fw_strlen($input_value) > 10) {
            $errors['demo'] = __('Value cannot be more that 10 characters long', 'fw');
        }

        return $errors;
    }

    function _my_form_save() {
        $input_value = FW_Request('demo');

        // do something with value
    }

    echo $my_form->render();
    // this will output:
    // <form ... ><input type="text" name="demo" maxlength="10" value=""></form>

.. include:: /links.rst.inc
