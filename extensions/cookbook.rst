Cookbook
========

The Cookbook ia a collection of specific recipes that explain how to correctly solve the most recurrent problems
that developers face in their day to day work.

.. contents::
    :local:
    :backlinks: top


Disable Extension
-----------------

An extension can be disabled by adding it to the blacklist. Blacklist is an array in theme config:

.. code-block:: php

    // file: framework-customizations/theme/config.php

    $cfg['extensions_blacklist'] = array('extension_name', 'another_extension_name');


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
