Content Demo Install
======

1. ** Content Demo Install**: Make an archive of the currently selected theme with
   all of its settings (database plus uploads directory).

2. **Auto Install**: Gives the ability to use these settings at the
   time the theme was activated.


.. raw:: html

	<iframe src="https://player.vimeo.com/video/110769350?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

	<br><br>

**Demo Install** is the process of making an archive of the currently active theme, 
packed with all of its settings (database plus uploads directory). 
These settings are stored in the ``auto-install`` directory under the theme parent directory.

.. warning::

    This feature by default is turned off and is enabled only when the ``WP_DEBUG`` constant is defined and its value is true.

If it’s enabled, a **Create Demo Install** button should appear on Backup page.

Auto Install
------------

**Auto Install** is the reverse process of **Demo Install**.

This feature is enabled only when current theme contains the ``auto-install`` directory in it.

If it’s enabled, an **Auto Install** page will appear under the **Tools** menu. 
That page displays a button **Import Demo Content** and
by clicking on it, all tables from the database will be dropped and replaced by
the ``auto-install/database.sql`` file. Also the ``uploads`` directory
will be replaced with the ``auto-install/uploads`` directory.
