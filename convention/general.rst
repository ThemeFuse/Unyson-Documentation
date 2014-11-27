General
=======

The framework was built following some rules to ensure compatibility between components
and to provide an easier way for developers to work together. Here are some starting rules to keep in mind: 

* The code should work on **php 5.2.4**, like `WordPress Minimum Requirements`_ says. Don't use php 5.3+ features, because some hosting providers don't have php 5.3+ installed on the servers.

* Follow `WordPress Coding Standards`_.

    .. note::

        If you already have some code written with spaces indentation (that does not follow `WordPress Coding Standards`_),
        use this `RegExp <http://en.wikipedia.org/wiki/Regular_expression>`_ to replace spaces with tabs:

        ``(?<=^\s*) {4}`` replace with ``\t``

.. include:: /links.rst.inc
