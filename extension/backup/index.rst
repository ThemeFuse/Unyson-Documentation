Backup
======

The Backup extension was designed to achieve the following tasks:

1. **Backup**: Make a Full or Database only copy of the site
   periodically or on demand.

2. **Restore**: Do a restore from a previously made backup.

3. **Demo Install**: Make an archive of the currently selected theme with
   all of its settings (database plus uploads directory).

   Auto Install: Gives the ability to use these settings at the
   time the theme was activated.

4. **Migration**: Move a WordPress site from one place to another.

.. contents::
    :local:
    :backlinks: top

Backup and Restore
------------------

These two are the basic features of the **Backup** extension.

The backup process works the following way:

1. All the necessary data is collected and stored in a zip archive.
   For **Full Backup** this is the database content and all of the
   files under the ``ABSPATH`` directory. For **Database Backup** this is
   the database content only.

2. The backup archive is moved from a temporary location into a persistent one.
   By default in the ``uploads/backup`` directory. But it can be anywhere,
   for e.g. Dropbox or Amazon S3.

3. Information about this archive is registered in the database, so next
   time the Backup page will display it in the **Backup Archive** list.

The restore process works in the following way:

1. The archive is fetched from a persistent location and extracted to a
   temporary directory.

2. If it contains a database dump, then the current database
   will be cleared and restored from the dump file. If there are WordPress files in it,
   the whole directory under ``ABSPATH`` will be removed and restored from the archive.

The Backup extension can be extended in only one way, by writing a custom **Storage Layer**.

Storage Layer
^^^^^^^^^^^^^

**Storage Layer** is a way for the **Backup Extension** to stores backup archives. 
To create one, create a sub-extension that implements ``FW_Backup_Storage_Interface``.

For an example of implementation take a look at the **backup-storage-local** extension.

Demo Install
------------

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

Migration
---------

Migration is a term representing moving a WordPress website from one location
(e.g. ``http://localhost/site``) to another (e.g. ``http://site.com``).

This is achieved by:

1. Making a full backup copy of the site
2. Moving it in the ``uploads/backup/`` directory on the new site

After opening the Backup page a new archive will be displayed in the **Backup Archive** list.
