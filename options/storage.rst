Custom Save Location
====================

.. contents::
    :local:
    :backlinks: top

Introduction
------------

By default *(post, settings, customizer, term and other)* options are saved all in one place in database, in a wp_option or any other location.
In some cases you need an option to be saved in a separate wp_option or post meta or some custom location in database,
for example Mailer settings option-type is saved in one wp_option and the same value is used in all Contact Forms.
This custom saving behavior is achieved via the ``fw-storage`` option parameter, it has the following structure:

.. code-block:: php

    'option_id' => array(
        'type' => 'any-type',

        'fw-storage' => array(
            'type' => 'valid-storage-type',
            // additional parameters of the used storage type
        ),
    )

When options are saved and loaded from database all their ``fw-storage`` parameters are processed.

Predefined types
----------------

Here are some examples with default storage types:

1. To save an option in a separate `wp_option <https://codex.wordpress.org/Options_API>`__:

    .. code-block:: php

        'demo-option-id' => array(
            'type' => 'text',

            'fw-storage' => array(
                'type' => 'wp-option',
                'wp-option' => 'demo_wp_option',
            ),
        )

    Add the above option array in post, settings, customizer or term options,
    save the form and check the database ``wp_options`` table for an option named ``demo_wp_option``.

    Additional parameters can be found `here <https://github.com/ThemeFuse/Unyson/blob/master/framework/includes/option-storage/type/class-fw-option-storage-type-wp-option.php>`__.

2. To save an option in a separate `post meta <https://developer.wordpress.org/reference/functions/get_post_meta/>`__:

    .. code-block:: php

        'demo-option-id' => array(
            'type' => 'text',

            'fw-storage' => array(
                'type' => 'post-meta',
                'post-meta' => 'demo_post_meta',
            ),
        )

    Add the above option array in **post options**,
    edit a post and check the database ``wp_postmeta`` table for a meta named ``demo_post_meta``.

    Additional parameters can be found `here <https://github.com/ThemeFuse/Unyson/blob/master/framework/includes/option-storage/type/class-fw-option-storage-type-post-meta.php>`__.

Custom Types
------------

It's possible to register new storage types.

1. Create your class in a separate file and extend the ``FW_Option_Storage_Type`` class.

    Let's say the file is ``{theme}/class-fw-option-storage-type-demo.php``.

    .. code-block:: php

        class FW_Option_Storage_Type_Demo extends FW_Option_Storage_Type {
            public function get_type() {
                return 'demo';
            }

            protected function _load($id, array $option, $value, array $params) {
                if ($param_id = $this->get_parameter_value($id, $option, $params)) {
                    // the parameter was specified
                    return $this->load_value($param_id);
                } else {
                    // do nothing, return the current value
                    return $value;
                }
            }

            protected function _save($id, array $option, $value, array $params) {
                if ($param_id = $this->get_parameter_value($id, $option, $params)) {
                    $this->save_value($param_id, $value);

                    // do not return current value to prevent duplicate and useless memory usage
                    // return empty default option-type value
                    return fw()->backend->option_type($option['type'])->get_value_from_input(
                        array('type' => $option['type']), null
                    );
                } else {
                    // do nothing, return the current value
                    return $value;
                }
            }

            /**
             * Check and extract the identification parameter
             * @param string $id
             * @param array $option
             * @param array $params
             * @return string|bool
             */
            private function get_parameter_value($id, $option, $params) {
                if (isset($option['fw-storage']['demo-id'])) {
                    return $option['fw-storage']['demo-id'];
                } else {
                    return false;
                }
            }

            private function load_value($param_id) {
                // Load the value from your custom location (a wp_option, a custom table, etc.)
                $value = 'Hello World'; // ...

                return $value;
            }

            private function save_value($param_id, $value) {
                // Save the value to your custom location...
            }
        }

    .. note::

        The class implementation is simplified just to give you an idea of how it works.
        For a complete implementation inspect `the predefined types <https://github.com/ThemeFuse/Unyson/tree/master/framework/includes/option-storage/type>`__.

2. Register your custom type. Add in ``{theme}/functions.php``:

    .. code-block:: php

        add_action(
            'fw:option-storage-types:register',
            '_action_theme_custom_fw_storage_types'
        );
        function _action_theme_custom_fw_storage_types($register) {
            require_once dirname(__FILE__) .'/class-fw-option-storage-type-demo.php';
            $register->register(new FW_Option_Storage_Type_Demo());
        }

3. Use your custom type in any option:

    .. code-block:: php

        'some-option-id' => array(
            'type' => 'text',

            'fw-storage' => array(
                'type' => 'demo', // Must match FW_Option_Storage_Type_Demo::get_type()
                'demo-id' => 'lorem-ipsum', // This is used by FW_Option_Storage_Type_Demo::get_parameter_value()
            ),
        )
