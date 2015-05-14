Extensions
==========

The core of :doc:`Extensions </extensions/introduction>`.

.. _extensions-get:

* ``get($extension_name)`` - get instance of an existing active extension.

        .. code-block:: php

            echo fw()->extensions->get('blog')->get_name();
