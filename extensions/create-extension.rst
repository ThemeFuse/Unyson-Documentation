Create Extension
================

To create an extension: 

1. Create a directory with the name of the extension in any ``extensions/`` directory with a :doc:`manifest.php </manifest/introduction>` file in it.

    Internally that will create an instance of ``FW_Extension_Default`` class. 
    Optionally, you can place a file ``class-fw-extension-{extension-name}.php`` with the following contents, in the newly created directory and start create some advanced functionality:

    .. code-block:: php
    
        <?php if (!defined('FW')) die('Forbidden');
    
        class FW_Extension_{Extension_Name} extends FW_Extension
        {
            // ...
        }

2. To make the extension visible on the Extensions list page *(by default it is hidden)* set the :doc:`manifest <manifest/extension>` ``display`` parameter to ``true``.

3. Make sure you understand what the :doc:`manifest <manifest/extension>` ``standalone`` parameter means.
