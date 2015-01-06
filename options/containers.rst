Containers
==========

.. raw:: html

	<iframe src="https://player.vimeo.com/video/115152971?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>
	
Options that have no value and contain other options in the ``options`` parameter are containers. If an option has the ``options`` parameter, it is considered a container.

There are only three types of containers:

* ``box`` - WordPress metabox.
* ``tab`` - one tab (Tabs from same array level will be collected and generated as multiple tabs).
* ``group`` - group options into a wrapper div.

These types are built into the framework and new types of container options can't be defined. The simplest container option array looks something like this and will generate an empty metabox without title:

.. code-block:: php

    $options = array(
        array(
            'type'    => 'box',
            'options' => array()
        )
    );

Accepted parameters:

* ``title`` *(string)* In ``box`` and ``tab`` this is used as title. In ``group`` it's not used
* ``attr`` *(array)* HTML attributes

.. attention::

   These are all the parameters that the container options supports.


A better customized container option will look like this:

.. code-block:: php

    $options = array(
        array(
            'type'    => 'box',
            'title'   => __('Container Title', 'fw'),
            'attr'    => array('class' => 'custom-class', 'data-foo' => 'bar'),
            'options' => array(
                'id'  => array( 'type' => 'text' )
            )
        )
    );

This will generate a box with a title and one option in it.

.. important::

     Used in **Post Options** on the first array level, the ``box`` container accepts additional parameters:

      * ``'context' => 'normal|advanced|side'``
      * ``'priority' => 'default|high|core|low'``

      These parameters are sent to `add_meta_box()`_ function.


.. include:: /links.rst.inc
