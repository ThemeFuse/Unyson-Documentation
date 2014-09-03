Introduction
============

The Unyson framework core has three components:

* :doc:`theme`
* :doc:`backend`
* :doc:`extensions`

Accessing one of the core's component is done in this way:

.. code-block:: php

    fw()->{$component}->{$method}()

``fw()`` returns the framework object, this being the only way to access the framework core.

