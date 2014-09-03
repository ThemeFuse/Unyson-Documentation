Extensions
==========

The core of :doc:`Extensions </extensions/introduction>`.

.. _extensions-get:

* ``get($extension_name)`` - get instance of an existing active extension.

        .. code-block:: php

            echo fw()->extensions->get('blog')->get_name();

.. _extensions-locate-path:

* ``locate_path($rel_path, ...)`` - search full path of the file by given relative path. Will search in **child theme** then in **parent theme** then in **framework**. These are the places where an extension can be. By default will search in all places, you can specify only the places you want.

        .. hint::

            Check in ``framework/core/extends/class-fw-extension.php`` to see examples of how this method is used.

.. _extensions-locate-path-uri:

* ``locate_path_URI($rel_path, ...)`` - same as :ref:`locate_path() <extensions-locate-path>` but will return URI to that path instead of full path.