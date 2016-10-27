.. _fw-form:

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
            $errors['demo'] = __('Value cannot be more that 10 characters long', '{domain}');
        }

        return $errors;
    }

    function _my_form_save() {
        $input_value = FW_Request::POST('demo');

        // do something with value
    }

    echo $my_form->render();
    // this will output:
    // <form ... ><input type="text" name="demo" maxlength="10" value=""></form>

.. _fw-form-customize-errors:

Customize errors
^^^^^^^^^^^^^^^^

By default the errors are displayed right before the ``<form>`` tag.
You can display the errors in your own way and cancel the default display.
Before the errors are displayed, an action is fired so you can use it:

.. code-block:: php

    /**
     * @param FW_Form $form
     * @internal
     */
    function _action_theme_fw_form_errors_display($form) {
        /**
         * Once the errors was accessed/requested
         * the form will cancel/abort the default errors display
         */
        $errors = $form->get_errors();

        echo '<ul class="your-custom-errors-class">';
        foreach ($errors as $input_name => $error_message) {
            echo fw_html_tag(
                'li',
                array('data-input-name' => $input_name),
                $error_message
            );
        }
        echo '</ul>';
    }
    add_action('fw_form_display_errors_frontend', '_action_theme_fw_form_errors_display');

.. _fw-form-ajax-submit:

Ajax submit
^^^^^^^^^^^

You can use `this script <https://github.com/ThemeFuse/Unyson/blob/master/framework/static/js/fw-form-helpers.js>`__ to make ``FW_Form`` ajax submittable.

Enqueue the script in frontend:

.. code-block:: php

    // file: {theme}/inc/static.php
    // https://github.com/ThemeFuse/Theme-Includes

    if (!is_admin()) {
        wp_enqueue_script(
            'fw-form-helpers',
            fw_get_framework_directory_uri('/static/js/fw-form-helpers.js')
        );
        wp_localize_script('fw-form-helpers', 'fwAjaxUrl', admin_url( 'admin-ajax.php', 'relative' ));
    }

Run the initialization script:

.. code-block:: javascript

    jQuery(function(){
        fwForm.initAjaxSubmit({
            //selector: 'form[some-custom-attribute].or-some-class'

            // Open the script code and check the `opts` variable
            // to see all options that you can overwrite/customize.
        });
    });
