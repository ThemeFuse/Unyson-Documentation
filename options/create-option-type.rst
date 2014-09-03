Create Option Type
==================

To define a new option type, create a class that extends the base option type class and register it.

.. code-block:: php

    class FW_Option_Type_New extends FW_Option_Type
    {
        protected function get_type()
        {
            return 'new';
        }

        /**
         * @internal
         */
        protected function _render($id, $option, $data)
        {
            /**
             * If this option has any js or css, use wp_enqueue_...() right here in this method.
             */
            {
                wp_enqueue_style(
                    'fw-option-'. $this->get_type(),
                    FW_CT_THEME_URI .'/includes/options-types/'. $this->get_type()
                        .'/static/css/styles.css'
                );

                wp_enqueue_script(
                    'fw-option-'. $this->get_type(),
                    FW_CT_THEME_URI .'/includes/options-types/'. $this->get_type()
                        .'/static/js/scripts.js',
                    array('fw-events', 'jquery')
                );
            }

            /**
             * $data['value'] contains value that should be used.
             * We decide if it's correct and how to use it in html
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
             * In this case we will use second option.
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
            $html .= '<button class="button">'. __('Clear text', 'fw') .'<button/>';
            $html .= '</div>';

            return $html;
        }

        /**
         * @internal
         */
        protected function _get_value_from_input($option, $input_value)
        {
            /**
             * In this method we receive $input_value (from form submit or whatever)
             * and we should return correct and safe value that will be stored in database.
             *
             * $input_value can be null.
             * In this case we should use default value from $option['value']
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
             * Find our uninitialized options by main class
             */
            var $options = data.$elements.find(optionTypeClass +':not(.initialized)');

            /**
             * Add some functionality to our options
             *
             * In this case, we will listen for button click and clear input value
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
