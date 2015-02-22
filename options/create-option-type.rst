Create Option Type
==================

To define a new option type, create a class that extends the base option type class and register it.

.. note::

    It doesn't matter where you place your new option type.
    If you use the `Theme Includes <https://github.com/ThemeFuse/Theme-Includes#directory-structure>`__ directory structure,
    place it in the ``{theme}/inc/includes/option-types/my-option/`` directory.
    Also make sure it is included only when the framework is loaded and only on the admin page

    .. code-block:: php

        // file: {theme}/inc/includes/option-types.php

        /** @internal */
        function _action_theme_include_custom_option_types() {
            if (is_admin()) {
                require_once dirname(__FILE__) . '/option-types/new/class-fw-option-type-new.php';
            }
        }
        add_action('fw_init', '_action_theme_include_custom_option_types', 9);

.. code-block:: php

    class FW_Option_Type_New extends FW_Option_Type
    {
        public function get_type()
        {
            return 'new';
        }

        /**
         * @internal
         */
        protected function _enqueue_static($id, $option, $data)
        {
            $uri = get_template_directory_uri() .'/inc/includes/option-types/'. $this->get_type() .'/static';

            wp_enqueue_style(
                'fw-option-'. $this->get_type(),
                $uri .'/css/styles.css'
            );

            wp_enqueue_script(
                'fw-option-'. $this->get_type(),
                $uri .'/css/scripts.js',
                array('fw-events', 'jquery')
            );
        }

        /**
         * @internal
         */
        protected function _render($id, $option, $data)
        {
            /**
             * $data['value'] contains correct value returned by the _get_value_from_input()
             * You decide how to use it in html
             */
            $option['attr']['value'] = (string)$data['value'];

            /**
             * $option['attr'] contains all attributes.
             *
             * Main (wrapper) option html element should have "id" and "class" attribute.
             *
             * All option types should have in main element the class "fw-option-type-{$type}".
             * Every javascript and css in that option should use that class.
             *
             * Remaining attributes you can:
             *  1. use them all in main element (if option itself has no input elements)
             *  2. use them in input element (if option has input element that contains option value)
             *
             * In this case you will use second option.
             */

            $wrapper_attr = array(
                'id'    => $option['attr']['id'],
                'class' => $option['attr']['class'],
            );

            unset(
                $option['attr']['id'],
                $option['attr']['class']
            );

            $html  = '<div '. fw_attr_to_html($wrapper_attr) .'>';
            $html .= '<input '. fw_attr_to_html($option['attr']) .' type="text" />';
            $html .= '<button type="button" class="button">'. __('Clear text', 'fw') .'</button>';
            $html .= '</div>';

            return $html;
        }

        /**
         * @internal
         */
        protected function _get_value_from_input($option, $input_value)
        {
            /**
             * In this method you receive $input_value (from form submit or whatever)
             * and must return correct and safe value that will be stored in database.
             *
             * $input_value can be null.
             * In this case you should return default value from $option['value']
             */

            if (is_null($input_value)) {
                $input_value = $option['value'];
            }

            return (string)$input_value;
        }

        /**
         * @internal
         */
        protected function _get_defaults()
        {
            /**
             * These are default parameters that will be merged with option array.
             * They makes possible that any option has
             * only one required parameter array('type' => 'new').
             */

            return array(
                'value' => ''
            );
        }
    }

    FW_Option_Type::register('FW_Option_Type_New');

.. code-block:: css

    /**
     * Prefix (namespace) all css rules with ".fw-option-type-{$option_type}"
     * This guarantees that there will be no conflicts with other styles.
     */

    .fw-option-type-new input {
        background-color: green;
        color: white;
    }

    .fw-option-type-new button {
        display: block;
    }

.. code-block:: js

    jQuery(document).ready(function ($) {
        var optionTypeClass = '.fw-option-type-new';

        /**
         * Listen to special event that is triggered for uninitialized elements
         */
        fwEvents.on('fw:options:init', function (data) {
            /**
             * data.$elements are jQuery selected elements
             * that contains options html that needs to be initialized
             *
             * Find uninitialized options by main class
             */
            var $options = data.$elements.find(optionTypeClass +':not(.initialized)');

            /**
             * Listen for button click and clear input value
             */
            $options.on('click', 'button', function(){
                $(this).closest(optionTypeClass).find('input').val('');
            });

            /**
             * After everything has done, mark options as initialized
             */
            $options.addClass('initialized');
        });
    });
