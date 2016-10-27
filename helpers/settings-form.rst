.. _fw-settings-form:

FW_Settings_Form
================

The easiest way to create admin settings forms.

1. Extending the ``FW_Settings_Form`` class. Create ``{theme}/class-fw-settings-form-test.php``:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');

        class FW_Settings_Form_Test extends FW_Settings_Form {
            public function get_values() {
                return get_option('test_fw_settings_form', array());
            }

            public function set_values($values) {
                update_option('test_fw_settings_form', $values, false);
            }

            public function get_options() {
                return array(
                    'tab1' => array(
                        'type' => 'tab',
                        'title' => 'Tab #1',
                        'options' => array(
                            'opt1' => array(
                                'type' => 'text',
                                'label' => 'Option #1'
                            ),
                            'opt2' => array(
                                'type' => 'textarea',
                                'label' => 'Option #2'
                            ),
                        ),
                    ),
                    'tab2' => array(
                        'type' => 'tab',
                        'title' => 'Tab #2',
                        'options' => array(
                            'tab2_1' => array(
                                'type' => 'tab',
                                'title' => 'Sub Tab #1',
                                'options' => array(
                                    'opt2_1' => array(
                                        'type' => 'text',
                                        'label' => 'Sub Option #1'
                                    ),
                                ),
                            ),
                            'tab2_2' => array(
                                'type' => 'tab',
                                'title' => 'Sub Tab #2',
                                'options' => array(
                                    'opt2_2' => array(
                                        'type' => 'textarea',
                                        'label' => 'Sub Option #2'
                                    ),
                                ),
                            ),
                        ),
                    ),
                );
            }

            protected function _init() {
                add_action('admin_menu', array($this, '_action_admin_menu'));
                add_action('admin_enqueue_scripts', array($this, '_action_admin_enqueue_scripts'));

                $this->set_is_side_tabs(true);
                $this->set_is_ajax_submit(true);
            }

            /**
             * @internal
             */
            public function _action_admin_menu() {
                add_menu_page(
                    'Test FW Settings Form',
                    'Test FW Settings Form',
                    'manage_options',
                    /** used in @see _action_admin_enqueue_scripts() */
                    'test-fw-settings-form',
                    array($this, 'render')
                );
            }

            /**
             * @internal
             */
            public function _action_admin_enqueue_scripts() {
                $current_screen = get_current_screen(); // fw_print($current_screen);

                // enqueue only on settings page
                if ('toplevel_page_'. 'test-fw-settings-form' === $current_screen->base) {
                    $this->enqueue_static();
                }
            }
        }

2. Include and initialize your class. Add in ``{theme}/functions.php``:

    .. code-block:: php

        add_action('fw_init', '_action_theme_test_fw_settings_form');
        function _action_theme_test_fw_settings_form() {
            if (class_exists('FW_Settings_Form')) {
                require_once dirname(__FILE__) . '/class-fw-settings-form-test.php';
                new FW_Settings_Form_Test('test');
            }
        }