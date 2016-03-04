Learning
========

This extension adds a Learning module to your theme. Using this extension you can add courses, lessons and tests for your users to take.

.. contents::
    :local:
    :backlinks: top

Config
------

From config file you can edit the lesson, course and course category taxonomy slugs.

.. code-block:: php

    $cfg['slugs'] = array(
        'courses'    => 'course',
        'lessons'    => 'lesson',
        'categories' => 'courses',
    );

Views
-----

.. raw:: html

	<iframe src="https://player.vimeo.com/video/115244456?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>

Templates are located in the ``views/`` directory. Here is the list of templates that you can customize:

* ``single-course.php`` - Learning course single post template. By default is used ``single.php`` from the theme root directory, you can overwrite it by creating ``framework-customizations/extensions/learning/views/single-course.php``.
* ``single-lesson.php`` - Learning lesson single post template. By default is used ``single.php`` from the theme root directory, you can overwrite it by creating ``framework-customizations/extensions/learning/views/single-lesson.php``.
* ``taxonomy.php`` - Learning category template. By default is used ``taxonomy.php`` from the theme root directory, you can overwrite it by creating ``framework-customizations/extensions/learning/views/taxonomy.php``.
* ``content-course.php`` - Default learning course single page template content. It is loaded if the ``framework-customizations/extensions/learning/views/single-course.php`` doesn't exist and is used ``single.php`` from the theme root directory.
  The content of this view is rendered using WordPress `the_content <http://codex.wordpress.org/Plugin_API/Filter_Reference/the_content>`__ filter, when the course single page is loaded.
* ``content-lesson.php`` - Default learning lesson single page template content. It is loaded if the ``framework-customizations/extensions/learning/views/single-lesson.php`` doesn't exist and is used ``single.php`` from the theme root directory.
  The content of this view is rendered using WordPress `the_content <http://codex.wordpress.org/Plugin_API/Filter_Reference/the_content>`__ filter, when the lesson single page is loaded.

Helpers
-------

* ``fw_ext_learning_get_course_lessons()`` - Returns an array with all course lesson posts.

    .. code-block:: php

        /**
         * @param null|int $post_id The id of the course post
         * @return WP_Post[]
         */
        $lessons = fw_ext_learning_get_course_lessons( $post_id );

* ``fw_ext_learning_get_previous_lesson()`` - Returns the previous lesson post.
    This function is similar to `previous_post_link() <http://codex.wordpress.org/Function_Reference/previous_post_link>`__  WordPress function, but it returns the entire post object.

.. attention::

    Do not use the ``previous_post_link()`` function to get previous lesson link, you'll not get the desired result.

.. code-block:: php

    /**
     * @param null|int $post_id (optional) The id of the course post
     * @return WP_Post[]|null - in case there are no previous posts, or $post_id is not a valid lesson post
     */
    $prev = fw_ext_learning_get_previous_lesson( $post_id );

* ``fw_ext_learning_get_next_lesson()`` - Returns the next lesson post. 
    This function is similar to `next_post_link() <http://codex.wordpress.org/Function_Reference/next_post_link>`__  WordPress function, but it returns the entire post object.

.. attention::

    Do not use the ``next_post_link()`` function to get next lesson link, you'll not get a the desired result.

.. code-block:: php

    /**
     * @param null|int $post_id (optional) The id of the course post
     * @return WP_Post[]|null - in case there are no previous posts, or $post_id is not a valid lesson post
     */
    $prev = fw_ext_learning_get_next_lesson( $post_id );

.. rubric:: Usage example

If you edit the lesson template and want to make a pagination to next and previous lessons.

.. code-block:: php

    <?php
    global $post;

    $prev = fw_ext_learning_get_previous_lesson( $post->ID );
    $next = fw_ext_learning_get_next_lesson( $post->ID );
    ?>
    <nav class="lesson-nav">
        <a class="prev" href="<?php get_permalink($prev->ID)?>"><?php _e( 'Previous lesson', '{domain}' )?></a>
        <a class="next" href="<?php get_permalink($next->ID)?>"><?php _e( 'Next lesson', '{domain}' )?></a>
    </nav>

Filters
-------

* ``fw_ext_learning_lessons_label_name`` - Rename lesson custom post default name ( singular and plural ).

.. code-block:: php

    /** @internal */
    function _filter_fw_ext_learning_rename_lesson_custom_post( $names ) {
        $names['singular'] = __( 'Singular Name', '{domain}' );
        $names['plural'] = __( 'Plural Name', '{domain}' );

        return $names;
    }
    add_filter( 'fw_ext_learning_lessons_label_name', '_filter_fw_ext_learning_rename_lesson_custom_post' );

* ``fw_ext_learning_courses_label_name`` - Rename course custom post default name ( singular and plural ).

.. code-block:: php

    /** @internal */
    function _filter_fw_ext_learning_rename_course_custom_post( $names ) {
        $names['singular'] = __( 'Singular Name', '{domain}' );
        $names['plural'] = __( 'Plural Name', '{domain}' );

        return $names;
    }
    add_filter( 'fw_ext_learning_courses_label_name', '_filter_fw_ext_learning_rename_course_custom_post' );

* ``fw_ext_courses_category_name`` - Rename course custom post category default name ( singular and plural ).

.. code-block:: php

    /** @internal */
    function _filter_fw_ext_learning_rename_course_custom_post_category( $names ) {
        $names['singular'] = __( 'Singular Name', '{domain}' );
        $names['plural'] = __( 'Plural Name', '{domain}' );

        return $names;
    }
    add_filter( 'fw_ext_courses_category_name', '_filter_fw_ext_learning_rename_course_custom_post_category' );

FW_Extension_Learning class
---------------------------

The ``FW_Extension_Learning`` is the Learning extension base class and in development process it may offer a lot of great methods to make the development easier.
You'll need the current instance of the ``FW_Extension_Learning``. You can get it using the ``fw_ext('extension_name')`` function:

.. code-block:: php

    /**
     * @var FW_Extension_Learning $learning
     */
    $learning = fw_ext('learning');

Do not forget to check the the result is not ``null``, this happens when the extension is not active.

Methods
^^^^^^^

* ``get_course_post_type()`` - Returns the courses post type name.

.. code-block:: php

    /**
     * @var string $type The course custom post type
     */
    $type = $learning->get_course_post_type();

* ``get_course_slug()`` - Returns the courses post type slug.

* ``get_lesson_post_type()`` - Returns the lesson post type name.

* ``get_lessons_slug()`` - Returns the lesson post type slug.

* ``get_categories_taxonomy()`` - Returns the course post type taxonomy name.

* ``get_categories_slug()`` - Returns the course post type taxonomy slug.

* ``is_course($post_id)`` - Check if the post is a course post type.

.. code-block:: php

    if( $learning->is_course( $post_id ) ) {
        ...
    }

.. toctree::

    quiz