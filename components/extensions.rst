Extensions
==========

The core of :doc:`Extensions </extensions/introduction>`.

.. _extensions-get:

* ``get($extension_name)`` - get instance of an existing active extension.

        .. code-block:: php

            echo fw()->extensions->get('extension_name')->get_name();

        Also it can be used to check if an extension exists (is active).

        .. code-block:: php

            if (fw()->extensions->get('extension_name')) {
                fw()->extensions->get('extension_name')->some_method();
            }

            // or there is shorter alias for this method

            if (fw_ext('extension_name')) {
                fw_ext('extension_name')->some_method();
            }
