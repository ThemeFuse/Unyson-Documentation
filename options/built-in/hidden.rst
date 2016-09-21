Hidden
------

Simple hidden input.

.. code-block:: php

    array(
        'type'  => 'hidden',
        'value' => 'default value',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
    )

.. tip::

   The hidden input is not visible, so parameters like ``label``, ``desc`` and ``help`` have no sense here.