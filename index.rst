Getting Started
===============

`Unyson`_ is a framework for `WordPress`_ that facilitates development of a theme.
This framework was created from the ground up by the team behind `ThemeFuse`_
from the desire to empower developers to build outstanding WordPress themes fast and easy.

.. note::

    This documentation assumes you have a working knowledge of WordPress.
    If you haven't, please start by reading `WordPress Documentation`_.

Minimum Requirements
--------------------

* WordPress 4.4 or greater
* PHP version 5.2.4 or greater
* MySQL version 5.0 or greater

Installation
------------

Install as plugin
^^^^^^^^^^^^^^^^^

.. raw:: html

	<iframe src="https://player.vimeo.com/video/113078377?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>

The easiest (recommended) way to install the framework, is through the 'Plugins' menu:
Search for plugin named ``Unyson`` and click the Install button.

Or you can install `the plugin <https://wordpress.org/plugins/unyson/>`__ manually:

1. Upload the ``unyson`` folder to the ``/wp-content/plugins/`` directory
2. Activate the Unyson plugin through the 'Plugins' menu
3. Configure the plugin by going to the Unyson menu

Install anywhere
^^^^^^^^^^^^^^^^

The framework can be placed in any directory you want, just include the ``bootstrap.php`` file.

.. note::

    You can include the ``bootstrap.php`` file multiple times,
    however only the first included version will be active,
    all other includes will be ignored/inactive.

The only thing you will have to configure is the framework directory uri, for the static files to be enqueued properly:

.. code-block:: php

    if (defined('FW')):
        // the framework was already included in another place, so this version will be inactive/ignored
    else:
        require dirname(__FILE__) .'/framework/bootstrap.php';
    endif;


License
-------

The licenses for most software are designed to take away your freedom to share and change it. By contrast, the GNU General Public License is intended to guarantee your freedom to share and change free software. Unyson inherits the `General Public License`_ (GPL) from WordPress.

.. include:: /links.rst.inc

.. toctree::
    :hidden:

    convention/index
    options/index
    extensions/index
    components/index
    helpers/index
    manifest/index
    extension/index
    hooks/index
