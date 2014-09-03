Option Types
============

Every option has ``type`` as a required parameter. Its value should be an existing registered option type.


HTML
----

All option types must have ``.fw-option-type-{type}`` class on main/wrapper html element.


CSS
---

If the option type has css, all rules must be prefixed with ``.fw-option-type-{type}`` class:

.. code-block:: css

    /* correct */
    .fw-option-type-demo .some-class {
        color: blue;
    }

    /* wrong */
    .some-class {
        color: blue;
    }

.. tip::

   This is done to prevent css conflicts.


Javascript
----------

All javascript must stick to ``.fw-option-type-{type}`` class and work only within the main/wrapper element (no events attached to the body). If the option type has custom javascript events, those events must be triggered on the main element.

.. code-block:: javascript

    $someInnerElement.closest('.fw-option-type-demo')
        .trigger('fw:option-type:demo:custom-event', {some: 'data'});

If it's specified in the documentation that an option type has custom events,
it means that you can attach event listeners on the elements with ``.fw-option-type-{type}`` class
(not on body or ``fwEvents``).

.. caution::

    Do not confuse ``.fw-option-type-{type}`` with ``.fw-backend-option-type-{type}`` class which is used internally by the framework and should not be used in option type scripts.