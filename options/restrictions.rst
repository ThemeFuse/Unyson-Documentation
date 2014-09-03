Restrictions
============

Here are some restrictions to keep in mind:

* **Post Options** array on first level can have only ``box`` containers.
* ``attr`` parameter from **Post Options** first level ``box`` containers, is not used.
  Because boxes are added with `add_meta_box()`_ which has no parameter for specifying attributes.
* **Taxonomy Options** array on first level cannot have containers.

.. note::

    There are no restrictions for what options are contained in the ``options`` parameter. It's possible to create multi level options: boxes inside boxes, tabs inside boxes, tabs inside tabs, and so on.


.. include:: /links.rst.inc
