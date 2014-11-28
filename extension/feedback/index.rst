Feedback
========

The extension adds the possibility for users to leave feedback impressions about a post (product, article, etc).
This system can be activated for some post types, and replaces the default comments system.

Activation
----------

To activate the reviews for a particular post type, add this code to your ``framework-customizations/theme/hooks.php``:

.. code-block:: php

    if (!function_exists('_action_theme_activate_feedback')):
        function _action_theme_activate_feedback() {
            add_post_type_support($post_type, 'fw-feedback');
        }
    endif;
    add_action('init', '_action_theme_activate_feedback');

Stars Feedback
--------------

The ``feedback-stars`` is a child extension that allows visitors to appreciate a post using star rating.

Helpers
^^^^^^^

* ``fw_ext_feedback_stars_get_post_rating()`` - returns brief information about the post’s votes.

* ``fw_ext_feedback_stars_get_post_detailed_rating()`` - returns detailed information about the post's votes.

* ``fw_ext_feedback_stars_load_view()`` - renders the view that displays information about the votes. *Usually used in the comments view.*
