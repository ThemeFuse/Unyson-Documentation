Introduction
============

**Options** are intended for creating form fields representing different kind of data e.g. rich and plain text, icons, media content, fonts and more. With options you can easily create tabs, boxes and form inputs for the admin pages.

You just build an array and it will be transformed to html. On form submit, values will be saved into the database, and you will be able to access them anywhere you want. Here are the main places where options are used:


* **Settings Page**: Uses settings options located in ``framework-customizations/theme/options/settings.php``

* **Post Add/Edit Page**: Uses post options located in ``framework-customizations/theme/options/posts/{$post_type}.php``
    
* **Taxonomy Term Edit Page**: Uses taxonomy options located in ``framework-customizations/theme/options/taxonomies/{$taxonomy}.php``


For advanced users, this is an easy way to create form inputs and use them for various purposes. The simplest options array looks something like this:

.. code-block:: php

    $options = array(
        'id' => array(
            'type' => 'text'
        )
    );

This will generate a text input. The Array key is used as option id, it should be unique.
Values in the database will be stored as ``array('id' => 'value')``. The only required parameter for any option is ``type``.

All options have some base parameters:

* ``label`` *(string)* Label
* ``desc`` *(string)* Description
* ``value`` *(mixed)* Default value
* ``attr`` *(array)* HTML attributes *(some options will place these attributes in input, other in wrapper div)*
* ``help`` *(string|array)* Additional info about option. This will generate an |help-tip| next to option that will show the text in a tip popup.

Some options can have additional parameters, but they are all optional except ``type``. A better customized option will look like this:

.. code-block:: php

    $options = array(
        'id' => array(
            'type'  => 'text',
            'value' => 'Default value',
            'label' => __('Option Label', 'fw'),
            'desc'  => __('Option Description', 'fw'),
            'attr'  => array('class' => 'custom-class', 'data-foo' => 'bar'),
            'help'  => __('Some html that will appear in tip popup', 'fw'),
        )
    );


.. include:: /links.rst.inc

.. |help-tip| image:: /_images/help-tip.png