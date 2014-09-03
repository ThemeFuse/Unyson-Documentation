Getting Started
===============

`Unyson`_ is a framework for `WordPress`_ that facilitates development of a theme. This framework was created from the ground up by the team behind `ThemeFuse`_ from the desire to empower developers to build outstanding WordPress themes fast and easy.


.. note::

    This documentation assumes you have a working knowledge of WordPress.
    If you haven't, please start by reading `WordPress Documentation`_.

Installation
------------

1. `Download`_ the framework archive from the framework's GitHub repository


2. Extract it to your parent theme directory. After this you must have ``framework/`` directory in parent theme. It's mandatory to have this exact same folder structure otherwise it will not work.

3. Include the Unyson framework by adding this line in your theme's ``functions.php``:

    .. code-block:: php

        require_once TEMPLATEPATH .'/framework/bootstrap.php';
        
License
-------

The licenses for most software are designed to take away your freedom to share and change it. By contrast, the GNU General Public License is intended to guarantee your freedom to share and change free software. Unyson inherits the `General Public License`_ (GPL) from WordPress.


.. include:: /links.rst.inc

.. toctree::
    :hidden:

    convention/index
    constants/index
    options/index
    extensions/index
    components/index
    helpers/index
    manifest/index
    extension/index
