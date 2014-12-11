Builder
=======

This extension provides the core builder functionality that you can extend to create you own builder.

.. contents::
    :local:
    :backlinks: top

Data Structure
--------------

The javascript side of the builder is based on `backbone <http://backbonejs.org/>`__,
so it uses collections and models to store the data:

.. code-block:: javascript

    [
        {
            type: 'foo',
            _items: [],
            attr_x: 'Hello',
            ...
        },
        {
            type: 'bar',
            _items: [ {type: 'baz', ...}, ... ],
            attr_y: 'Hi',
            ...
        },
        ...
    ]

Every model (we call it item) has a required attribute ``type``.
Also it has an attribute ``_items`` that is generated automatically
by the `backbone-relational <http://backbonerelational.org/>`__ plugin,
the purpose of which is to make possible to have nested items easier.
There are no rules for other attributes, every item has whatever attributes it wants.

The same data structure is used on the php side,
this collection is simply transformed into an array with ``json_decode($js_value, true)``.

Builder and Item Types
----------------------

...
