Learning Quiz
=============

A sub-extension of the Learning extension that offers users the possibility to build tests and quiz for lessons.

.. contents::
    :local:
    :backlinks: top

Views
-----

Templates are located in the ``views/`` directory. Here is the list of templates that you can customize:

* ``start-quiz.php`` - Quiz star button from the lesson page.
* ``single.php`` - Learning quiz single post template. By default is used ``single.php`` from the theme root directory, you can overwrite it by creating ``framework-customizations/extensions/learning/extensions/learning-quiz/views/single.php``.
* ``content.php`` - Default learning quiz single page template content. It is loaded if the ``framework-customizations/extensions/learning/extensions/learning-quiz/views/single.php`` doesn't exist and is used ``single.php`` from the theme root directory.
  The content of this view is rendered using WordPress `the_content <http://codex.wordpress.org/Plugin_API/Filter_Reference/the_content>`__ filter, when the lesson single page is loaded.

Helpers
-------

* ``fw_ext_learning_quiz_has_quiz( $post_id )`` - Check if the post is lesson and if it has a quiz.

.. code-block:: php

    if ( fw_ext_learning_quiz_has_quiz( $post_id ) ) { ... }

* ``fw_ext_learning_quiz_get_quiz( $post_id )`` - Return the quiz of the lesson.

.. code-block:: php

    /**
     * @param int $post_id
     * @return WP_Post|null - in case the the id is not valid or is not lesson post type, or the lesson doesn't have a quiz.
     */
    $quiz = fw_ext_learning_quiz_get_quiz( $post_id );

* ``fw_ext_learning_quiz_get_quiz_permalink( $post_id )`` - Return the permalink of the quiz post.

* ``fw_ext_learning_quiz_get_response( $post_id )`` - After the quiz form is submitted, it returns a response after processing the quiz.

.. code-block:: php

    /**
     * @param int $post_id
     * @return array(
     *  questions => FW_Quiz_Question_Process_Response[]
     *  accumulated => (int|float) The amount of points accumulated
     *  minimum-pass-mark - (int|float) The minimum pass-mark
     * )
     */
    $response = fw_ext_learning_quiz_get_response( $post_id );

Actions
-------

* ``fw_ext_learning_quiz_form_process`` - Action fired when the quiz form was submitted and processed.

.. code-block:: php

    /**
     * @internal
     * @param int $post_id
     * @return array(
     *  questions => FW_Quiz_Question_Process_Response[]
     *  accumulated => (int|float) The amount of points accumulated
     *  minimum-pass-mark - (int|float) The minimum pass-mark
     * )
     */
    function _action_fw_process_quiz_response( $response ) {
        // ...
    }
    add_action( 'fw_ext_learning_quiz_form_process', '_action_fw_process_quiz_response' );
