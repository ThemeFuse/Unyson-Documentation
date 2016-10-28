Introduction
============

.. raw:: html

	<iframe src="https://player.vimeo.com/video/115152971?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>

.. contents::
    :local:
    :backlinks: top

Introduction
------------

**Options** are intended for creating form fields representing different kind of data e.g. rich and plain text, icons, media content, fonts and more.
With options you can easily create tabs, boxes and form inputs for the admin pages. You just build an array and it will be transformed to html.
On form submit, values will be saved into the database, and you will be able to access them anywhere you want using ``fw_get_db_..._option()`` :doc:`helper functions </helpers/php>`.

For advanced users, this is an easy way to create form inputs and use them for various purposes. The simplest options array looks something like this:

.. code-block:: php

    $options = array(
        'option_id' => array(
            'type' => 'text'
        )
    );

This will generate a text input. The array key is used as option id, it should be unique.
Values in the database will be stored as ``array('option_id' => 'value')``.

.. note::

    The only required parameter for any option is ``type``.

All options have some base parameters:

* ``label`` *(string)* Label
* ``desc`` *(string)* Description
* ``value`` *(mixed)* Default value
* ``attr`` *(array)* HTML attributes *(some options will place these attributes in input, other in wrapper div)*
* ``help`` *(string|array)* Additional info about option. This will generate an |help-tip| next to option that will show the text in a tip popup.

Some options can have additional (optional) parameters. A better customized option will look like this:

.. code-block:: php

    $options = array(
        'option_id' => array(
            'type'  => 'text',
            'value' => 'Default value',
            'label' => __('Option Label', '{domain}'),
            'desc'  => __('Option Description', '{domain}'),
            'attr'  => array('class' => 'custom-class', 'data-foo' => 'bar'),
            'help'  => __('Some html that will appear in tip popup', '{domain}'),
        )
    );

You can test the above array by creating any of the below options file
and placing the array in it.

Options files
-------------

These are the main places where options are used:

* **Theme Settings Page**: Loads the options from ``{theme}/framework-customizations/theme/options/settings.php``

* **Customizer Page**: Loads the options from ``{theme}/framework-customizations/theme/options/customizer.php``

* **Post Add/Edit Page**: Loads the options from ``{theme}/framework-customizations/theme/options/posts/{$post_type}.php``

* **Taxonomy Term Edit Page**: Loads the options from ``{theme}/framework-customizations/theme/options/taxonomies/{$taxonomy}.php``

Containers
----------

.. raw:: html

	<iframe src="https://player.vimeo.com/video/116053617?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>

Options that have no value and contain other options in the ``options`` parameter are containers. If an option has the ``options`` parameter, it is considered a container.

The simplest container option array looks as in the below example and will generate an empty metabox without title:

.. code-block:: php

    $options = array(
        array(
            'type'    => 'box',
            'options' => array()
        )
    );

.. note::

    Like options, containers have a minimum set of required parameters: ``type`` and ``options``.
    The ``type`` parameter in Customizer options is optional and it's not used (has no effect).

There are 4 built-in container types:

* ``box`` - WordPress metabox

    .. code-block:: php

        'box_id' => array(
            'type' => 'box',
            'options' => array(
                'option_id'  => array( 'type' => 'text' ),
            ),
            'title' => __('Box Title', '{domain}'),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),

            /**
             * When used in Post Options on the first array level
             * the ``box`` container accepts additional parameters
             */
            //'context' => 'normal|advanced|side',
            //'priority' => 'default|high|core|low',
        ),

* ``tab`` - One tab *(Tabs from the same array level will be collected and rendered as multiple tabs)*

    .. code-block:: php

        'tab_id' => array(
            'type' => 'tab',
            'options' => array(
                'option_id'  => array( 'type' => 'text' ),
            ),
            'title' => __('Tab Title', '{domain}'),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
        ),
        'tab_id_2' => array(
            'type' => 'tab',
            'options' => array(
                'option_id_2'  => array( 'type' => 'text' ),
            ),
            'title' => __('Tab Title #2', '{domain}'),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
        ),

* ``group`` - Group options into a wrapper div. Has no design. Usually used to show/hide a group of options from javascript

    .. code-block:: php

        'group_id' => array(
            'type' => 'group',
            'options' => array(
                'option_id'  => array( 'type' => 'text' ),
            ),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
        ),

* ``popup`` - A button, when clicked it will open a modal with options

    .. code-block:: php

        'popup_id' => array(
            'type' => 'popup',
            'options' => array(
                'option_id'  => array( 'type' => 'text' ),
            ),
            'title' => __('Button and Popup Title', '{domain}'),
            'attr' => array('class' => 'custom-class', 'data-foo' => 'bar'),
            'modal-size' => 'small', // small, medium, large
            'desc' => __('Button Description', '{domain}'),
        ),

Restrictions
------------

Here are some restrictions to keep in mind:

* ``attr`` parameter from **Post Options** first level ``box`` containers, is not used.
  Because boxes are added with `add_meta_box()`_ which has no parameter for specifying attributes.

.. note::

    There are no restrictions (except Customizer) for what options are contained in the ``options`` parameter.
    It's possible to create multi level options: boxes inside boxes, tabs inside boxes, tabs inside tabs, and so on.

.. include:: /links.rst.inc

.. |help-tip| image:: /_images/help-tip.png
