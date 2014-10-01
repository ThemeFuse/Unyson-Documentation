Shortcodes
==========

The shortcodes extension makes possible the easy creation of `WordPress Shortcodes <http://codex.wordpress.org/Shortcode_API>`_ and their integration with the framework's layout builder.

.. contents::
    :local:
    :backlinks: top

Directory structure
-------------------

A shortcode can be created in the following places:

* ``framework-customizations/theme/shortcodes/``
* ``{some-extension}/shortcodes/``

.. code-block:: text

    {shortcode-name}/
    ├─class-fw-shortcode-{shortcode-name}.php # optional
    ├─config.php
    ├─options.php # optional
    ├─static/ # optional
    │ ├─css/
    │ │ ├─auto-enqueued-style.css
    │ │ └─...
    │ ├─img/
    │ │ ├─layout_builder.png
    │ │ └─...
    │ └─js/
    │   ├─auto-enqueued-script.js
    │   └─...
    └─views/
      ├─view.php
      └─...

The framework will register a new WordPress shortcode with its tag being the shortcode directory name,
with hyphens replaced by underscores (``[shortcode_name]`` for the above example).

.. _config-file:

Config File
-----------

The shortcode configuration is a file named ``config.php`` placed inside the root directory of the shortcode.
It contains an array that must be stored in a ``$cfg`` variable:

.. code-block:: php

    $cfg = array(
        'layout_builder' => array(
            'title'         => __('Demo Shortcode', 'fw'),
            'description'   => __('Demo shortcode description', 'fw'),
            'tab'           => __('Demo Elements', 'fw'),
            'popup_size'    => 'small' // can be 'large', 'medium' or 'small'
        )
    );

For the shortcode to appear in the layout builder, the config array contains a special ``layout_builder`` key that holds an array with the following data:

* ``title`` - the title that will appear in the shortcode box.

.. class:: screenshot

    |shortcodes-layout-builder-title|

* ``description`` - the text that will be shown in a tooltip when hovering the shortcode box.

.. class:: screenshot

    |shortcodes-layout-builder-description|

* ``tab`` - the builder tab in which the shortcode box will appear.

.. class:: screenshot

    |shortcodes-layout-builder-tab|

* ``popup_size`` - the size of the popup in which the :ref:`shortcode options <options-file>` will be displayed.

    Allowed values are ``large | medium | small``. This parameter is optional and the default is set to ``medium``.

.. class:: screenshot

    |shortcodes-layout-builder-popup|

.. _builder-icon:

Builder icon
------------

To set an icon for the shortcode box, put an image named ``layout_builder.png`` inside ``{your-shortcode}/static/img/`` directory.
The image should have the size of 16x16 px.

.. class:: screenshot

    |shortcodes-layout-builder-icon|

.. _options-file:

Options file
------------

The shortcode directory can contain a file named ``options.php`` with correctly formed :doc:`options </options/introduction>`:

.. code-block:: php

    $options = array(
        'demo_text'   => array(
            'label'   => __('Demo text label', 'fw'),
            'desc'    => __('Demo text description', 'fw'),
            'help'    => __('Demo text help', 'fw'),
            'type'    => 'text'
        ),
        'demo_select' => array(
            'label'   => __('Demo select label', 'fw'),
            'desc'    => __('Demo select description', 'fw'),
            'type'    => 'select',
            'choices' => array(
                'c1'  => __('Choice 1', 'fw'),
                'c2'  => __('Choice 2', 'fw'),
                'c3'  => __('Choice 3', 'fw')
            ),
            'value'   => 'c2'
        )
    );

If it does, then it will have an icon when dragged into the builder's canvas area, indicating that the shortcode can be edited:

.. class:: screenshot

    |shortcodes-edit-icon|

When clicking either the edit icon or the shortcode itself, a modal window will open containing the declared options:

.. class:: screenshot

    |shortcodes-modal-window|

The saved options values will be passed into the :ref:`view file <default-view>`.

.. _default-view:

Default view file
-----------------

By default, when WordPress wants to render a shortcode built into the framework, it will serve the html from the default view file located in ``{your-shortcode}/views/view.php``.
**3 variables** are passes into the view file : ``$atts``, ``$content`` and ``$tag``. 

.. tip::

    More information can be found in the :ref:`cookbook section <cookbook>`.


Static files
------------

When rendering the :ref:`default view <default-view>`, the framework will enqueue
all ``css`` files from ``{your-shortcode}/static/css/`` and
all ``js`` files from ``{your-shortcode}/static/js/`` directories in alphabetical order.

.. note::

    Files from subdirectories inside both ``{your-shortcode}/static/css/`` and ``{your-shortcode}/static/js/`` will not be enqueued by default.

    Check out the :ref:`cookbook section <cookbook>` for tips on how to do that.

.. attention::

    All of the above is valid only in the case that the ``render`` method from the :ref:`class file <class-file>` was not overriden.

.. _class-file:

Class file
----------

When creating a shortcode folder with all the required files, the framework makes an instance of ``FW_Shortcode`` to ensure the correct default functionality.
However, some of that default functionality can be overridden by creating a class in the shortcode directory that extends ``FW_Shortcode``.

.. note::

    The class file must respect the following naming convention: ``class-fw-shortcode-{your-shortcode-folder-name}.php``.

    The class inside the class file must respect the following naming convention: ``FW_Shortcode_{Your_Shortcode_Folder_Name}``.

    *Replace the hyphens with underscores in the class name.*

.. note::

    The framework replaces hyphens with underscores when registering the shortcode, so ``your-shortcode`` will be transformed to ``[your_shortcode]``.

So in order to create a class for the ``[demo_shortcode]`` shortcode, we need to create a file ``demo-shortcode/class-fw-shortcode-demo-shortcode.php``
and within the file create a class that extends ``FW_Shortcode``:

.. code-block:: php

    class FW_Shortcode_Demo_Shortcode extends FW_Shortcode
    {
        // ...
    }

The new class inherits some usefull methods like:

* ``get_tag()`` - returns the shortcode's tag.
* ``get_path()`` - returns the path to the shortcode folder. Useful for loading views or checking if files exist.
* ``get_uri()`` - returns the uri to the shortcode folder. Useful for enqueuing styles and scripts, or forming the ``src`` attribute of an ``<img>`` tag for an image from ``static/img/``.
* ``get_config($key = null)`` - returns the shortcode's whole config array, or just a specified key value.
* ``get_options()`` - returns the shortcode's options array, if there is any.

The methods that are most prone to be overriden are:

* ``_init()`` - is called when the ``FW_Shortcode`` instance for the shortcode is created. Useful for loading other php files (custom :doc:`option types </options/introduction>`, libraries, etc.).
* ``render($atts, $content, $tag)`` - returns the html that will be displayed when the shortcode will be executed by WordPress. Useful for changing the default behavior with a custom one.

.. tip::

    More information about this can be found in the :ref:`cookbook section <cookbook>`.

.. _cookbook:

Cookbook
--------

Creating a simple shortcode
^^^^^^^^^^^^^^^^^^^^^^^^^^^

This example will go through creating the ``[hr]`` (horizontal ruler) shortcode in a few simple steps:

1. Create a ``hr`` folder in ``framework-customizations/theme/shortcodes/``.

2. Create a :ref:`config file <config-file>` inside ``framework-customizations/theme/shortcodes/``:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');

        $cfg = array(
            'layout_builder' => array(
                'title'       => __('Horizontal Ruler', 'fw'),
                'description' => __('Creates a \'hr\' html tag', 'fw'),
                'tab'         => __('Demo Elements', 'fw'),
            )
        );

    .. note::

        At this point the shortcode should appear in the **Demo Elements** tab of the layout builder as shown bellow:

        .. class:: screenshot

            |shortcodes-hr-shortcode|

    .. tip::

        To add an icon to the shortcode see the :ref:`icon section <builder-icon>`.

3. Create the :ref:`view file <default-view>` in ``framework-customizations/theme/shortcodes/hr/views/``:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden'); ?>

        <hr>

The ``[hr]`` shorcode is completed! The directory structure of the shortcode is as shown bellow:

.. code-block:: text

    framework-customizations/
    └─theme/
      └─shortcodes/
        └─hr/
          ├─config.php
          └─views/
            └─view.php

Creating a shortcode with options
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This example will go through creating the ``[button]`` shortcode.

1. Create a ``button`` folder in ``framework-customizations/theme/shortcodes/``

2. Create a :ref:`config file <config-file>` inside ``framework-customizations/theme/button/``:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');

        $cfg = array(
            'layout_builder' => array(
                'title'         => __('Button', 'fw'),
                'description'   => __('Creates a button with choosable label, size and style', 'fw'),
                'tab'           => __('Demo Elements', 'fw'),
            )
        );

    .. note::

        At this point the shortcode should appear in the **Demo Elements** tab of the layout builder as shown bellow:

        .. class:: screenshot

            |shortcodes-button-shortcode|

    .. tip::

        To add an icon to the shortcode see the :ref:`icon section <builder-icon>`.

3. Create an :ref:`options file <options-file>` inside ``framework-customizations/theme/shortcodes/button/`` with the options for **label**, **size** and **style**:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');

        $options = array(
            'label' => array(
                'label'   => __('Label', 'fw'),
                'desc'    => __('The button label', 'fw'),
                'type'    => 'text',
                'value'   => __('Click me!', 'fw')
            ),
            'size' => array(
                'label'   => __('Size', 'fw'),
                'desc'    => __('The button size', 'fw'),
                'type'    => 'select',
                'choices' => array(
                    'big'    => __('Big', 'fw'),
                    'medium' => __('Medium', 'fw'),
                    'small'  => __('Small', 'fw')
                ),
                'value'   => 'medium'
            ),
            'style' => array(
                'label'   => __('Style', 'fw'),
                'desc'    => __('The button style', 'fw'),
                'type'    => 'select',
                'choices' => array(
                    'primary'   => __('Primary', 'fw'),
                    'secondary' => __('Secondary', 'fw')
                )
            )
        );

    Now, when clicking the shortcode inside the canvas area of the layout builder a pop-up  window containting the options will appear:

    .. class:: screenshot

        |shortcodes-button-options-popup|

4. Create the :ref:`view file <default-view>` in ``framework-customizations/theme/shortcodes/button/views/``. Make use of the ``$atts`` variable that is avaialble inside the view, it contains all the options values that the user has selected in the pop-up:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden'); ?>

        <button class="button button-<?php echo $atts['size']; ?> button-<?php echo $atts['style']; ?>">
            <?php echo $atts['label']; ?>
        </button>

    .. tip::

        For more information about the view variables check out the :ref:`default view section <default-view>`.

The ``[button]`` shorcode is completed! The directory structure of the shortcode is as shown bellow:

.. code-block:: text

    framework-customizations/
    └─theme/
      └─shortcodes/
        └─button/
          ├─config.php
          ├─options.php
          └─views/
            └─view.php

Creating an advanced shortcode with a custom class
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

This ex will go through creating a ``[table_builder]`` shortcode, it will make use of it's own custom option type:

1. Create a ``table-builder`` folder in ``framework-customizations/theme/shortcodes/``.

2. Create :ref:`a config file <config-file>` inside ``framework-customizations/theme/table-builder/``:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');

        $cfg = array(
            'layout_builder' => array(
                'title'       => __('Table Builder', 'fw'),
                'description' => __('Creates custom tables', 'fw'),
                'tab'         => __('Demo Elements', 'fw'),
                'popup_size'  => 'large'
            )
        );

    .. note::

        At this point the shortcode should appear in the **Demo Elements** tab of the layout builder as shown bellow:

        .. class:: screenshot

            |shortcodes-table-builder-shortcode|

    .. tip::

        To add an icon to the shortcode see the :ref:`icon section <builder-icon>`

3. A custom :doc:`option type </options/introduction>` is needed for the shortcode to be created, because the ones that exist in the framework do not suit its needs.

    1. Create a ``table-builder`` option type in ``framework-customizations/theme/shortcodes/table-builder/includes/fw-option-type-table-builder/``

    2. Create a :ref:`custom class <class-file>` for the shortcode and override the ``_init()`` method, to load the custom option type class file.

        .. code-block:: php

            <?php if (!defined('FW')) die('Forbidden');

            class FW_Shortcode_Table_Builder extends FW_Shortcode
            {
                /**
                 * @internal
                 */
                public function _init()
                {
                    if (is_admin()) {
                        $this->load_option_type();
                    }
                }

                private function load_option_type()
                {
                    require $this->get_path() . '/includes/fw-option-type-table-builder/class-fw-option-type-table-builder.php';
                }

                // ...

            }

    3. Create an :ref:`options file <options-file>` inside ``framework-customizations/theme/shortcodes/table-builder/`` with the custom option type:

        .. code-block:: php

            <?php if (!defined('FW')) die('Forbidden');

            $options = array(
                'table' => array(
                    'type'  => 'table-builder',
                    'label' => false,
                    'desc'  => false,
                )
            );

    .. note::

        At this point, when clicking the shortcode inside the canvas area of the layout builder a pop-up window containting the options will appear:

        .. class:: screenshot

            |shortcodes-table-builder-options-popup|

4. Create the :ref:`view file <default-view>` in ``framework-customizations/theme/shortcodes/table-builder/views/`` and make use of the custom option type value.

The ``[table_builder]`` shorcode is completed! The directory structure of the shortcode is as shown bellow:

.. code-block:: text

    framework-customizations/
    └─theme/
      └─shortcodes/
        └─table-builder/
          ├─class-fw-shortcode-table-builder.php
          ├─config.php
          ├─options.php
          ├─views/
          │ └─view.php
          └─includes/
            └─fw-option-type-table-builder/
              ├─class-fw-option-type-table-builder.php
              ├─static/
              └─views/

.. |shortcodes-layout-builder-title| image:: _images/layout-builder-title.jpg
.. |shortcodes-layout-builder-description| image:: _images/layout-builder-description.jpg
.. |shortcodes-layout-builder-tab| image:: _images/layout-builder-tab.jpg
.. |shortcodes-layout-builder-popup| image:: _images/layout-builder-popup.jpg
.. |shortcodes-layout-builder-icon| image:: _images/layout-builder-icon.jpg
.. |shortcodes-edit-icon| image:: _images/edit-icon.jpg
.. |shortcodes-modal-window| image:: _images/modal-window.png
.. |shortcodes-hr-shortcode| image:: _images/hr-shortcode.jpg
.. |shortcodes-button-shortcode| image:: _images/button-shortcode.jpg
.. |shortcodes-button-options-popup| image:: _images/button-options-popup.png
.. |shortcodes-table-builder-shortcode| image:: _images/table-builder-shortcode.jpg
.. |shortcodes-table-builder-options-popup| image:: _images/table-builder-options-popup.png
