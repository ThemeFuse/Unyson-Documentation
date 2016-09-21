HTML
----

If you want to display a custom piece of html, use this option type.

.. note::

    This option type has a value stored in a hidden input. Advanced users can create some javascript functionality in html and store the value in that hidden input.

.. code-block:: php

    array(
        'type'  => 'html',
        'value' => 'default hidden value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'html'  => 'My <b>custom</b> <em>HTML</em>',
    )

.. note::

    There are ``html-fixed`` and ``html-full`` option types as well. They are the same as ``html`` but has **fixed** and **full** :ref:`option width <option-type-width>`.
