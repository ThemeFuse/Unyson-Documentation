Theme Integration
=================

With options you can easy create admin forms and use the values in frontend. Let's to this!

Customizer Options
------------------

1. Create ``{theme}/framework-customizations/theme/options/customizer.php`` with the following contents:

.. code-block:: php

    <?php if (!defined( 'FW' )) die('Forbidden');

    $options = array(
        'body-color' => array(
            'type' => 'color-picker',
            'label' => __('Body Color', '{domain}'),
            'value' => '#ADFF2F',
        ),
    );

2. Add in ``{theme}/functions.php``

.. code-block:: php

    function _action_theme_wp_print_styles() {
        if (!defined('FW')) return; // prevent fatal error when the framework is not active

        $option_value = fw_get_db_customizer_option('body-color');

        echo '<style type="text/css">'
             . 'body { '
             . 'border: 30px solid '. esc_html($option_value) .'; '
             . '}'
             . '</style>';
    }
    add_action('wp_print_styles', '_action_theme_wp_print_styles');

3. Go to menu **Appearance > Customize**, find the **Body Color** option and change it.

.. hint::

    You can enable :ref:`Live Preview <customizer-options-live-preview>` for customizer options.

Settings Options
----------------

1. Create ``{theme}/framework-customizations/theme/options/settings.php`` with the following contents:

.. code-block:: php

    <?php if (!defined( 'FW' )) die('Forbidden');

    $options = array(
        'body-color' => array(
            'type' => 'color-picker',
            'label' => __('Body Color', '{domain}'),
            'value' => '#ADFF2F',
        ),
    );

2. Add in ``{theme}/functions.php``

.. code-block:: php

    function _action_theme_wp_print_styles() {
        if (!defined('FW')) return; // prevent fatal error when the framework is not active

        $option_value = fw_get_db_settings_option('body-color');

        echo '<style type="text/css">'
             . 'body { '
             . 'border: 30px solid '. esc_html($option_value) .'; '
             . '}'
             . '</style>';
    }
    add_action('wp_print_styles', '_action_theme_wp_print_styles');

3. Go to menu **Appearance > Theme Settings**, find the **Body Color** option, change it and press Save.
4. Go to frontend and see the changes.

Post Options
------------

1. Create ``{theme}/framework-customizations/theme/options/posts/post.php`` with the following contents:

.. code-block:: php

    <?php if (!defined( 'FW' )) die('Forbidden');

    $options = array(
        'main' => array(
            'type' => 'box',
            'title' => __('Testing Options', '{domain}'),
            'options' => array(
                'body-color' => array(
                    'type' => 'color-picker',
                    'label' => __('Body Color', '{domain}'),
                    'value' => '#ADFF2F',
                ),
            ),
        ),
    );

2. Add in ``{theme}/functions.php``

.. code-block:: php

    function _action_theme_wp_print_styles() {
        if (!defined('FW')) return; // prevent fatal error when the framework is not active

        global $post;

        if (!$post || $post->post_type != 'post') {
            return;
        }

        $option_value = fw_get_db_post_option($post->ID, 'body-color');

        echo '<style type="text/css">'
             . 'body { '
             . 'border: 30px solid '. esc_html($option_value) .'; '
             . '}'
             . '</style>';
    }
    add_action('wp_print_styles', '_action_theme_wp_print_styles');

3. Create a new Post, find **Body Color** option, change it and save the post.
4. Open the post in frontend and see the changes.

