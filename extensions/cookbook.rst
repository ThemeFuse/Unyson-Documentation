Cookbook
========

The Cookbook is a collection of specific recipes that explain how to correctly solve the most recurrent problems
that developers face in their day to day work.

.. contents::
    :local:
    :backlinks: top

Disable Child Extensions
------------------------

Child extensions will not be activated if parent extension will ``return false;`` from ``_init()``.

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    class FW_Extension_Example extends FW_Extension
    {
        /**
         * @internal
         */
        protected function _init()
        {
            // ...

            if ($this->something_is_wrong()) {
                return false; // prevent child extensions activation
            }
        }
    }


Validate Child Extensions
-------------------------

The parent extension has the possibility to check each child extension if it's valid or not. If the child extension is not valid, it will not be activated. To do that, the parent extension must overwrite the ``_child_extension_is_valid()`` method.

The method should return ``true`` if child extension is valid, and ``false`` if not.

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    class FW_Extension_Example extends FW_Extension
    {
        /**
         * {@inheritdoc}
         */
        public function _child_extension_is_valid($child_extension_instance)
        {
            // force child extensions to extend some custom class, instead of FW_Extension
            return is_subclass_of($child_extension_instance, 'FW_Ext_Demo_Custom_Class');
        }

        // ...
    }
