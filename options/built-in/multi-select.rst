Multi-Select
------------

Select multiple choices from different sources: posts, taxonomies, users or a custom array.

.. code-block:: php

    array(
        'type'  => 'multi-select',
        'value' => array( 'choice-1', 'choice-3' ),
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        /**
         * Set population method
         * Are available: 'posts', 'taxonomy', 'users', 'array'
         */
        'population' => 'array',
        /**
         * Set post types, taxonomies, user roles to search for
         *
         * 'population' => 'posts'
         * 'source' => 'page',
         *
         * 'population' => 'taxonomy'
         * 'source' => 'category',
         *
         * 'population' => 'users'
         * 'source' => array( 'editor', 'subscriber', 'author' ),
         *
         * 'population' => 'array'
         * 'source' => '' // will populate with 'choices' array
         */
        'source' => '',
        /**
         * Set the number of posts/users/taxonomies that multi-select will be prepopulated
         * Or set the value to false in order to disable this functionality.
         */
        'prepopulate' => 10,
        /**
         * An array with the available choices
         * Used only when 'population' => 'array'
         */
        'choices' => array(
            'choice-1' => __('Choice 1', '{domain}'),
            'choice-2' => __('Choice 2', '{domain}'),
            'choice-3' => __('Choice 3', '{domain}'),
        ),
        /**
         * Set maximum items number that can be selected
         */
        'limit' => 100,
    )