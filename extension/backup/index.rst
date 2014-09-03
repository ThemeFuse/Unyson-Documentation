Backup
======

The extension makes a .zip file with all of the files from ``ABSPATH``
and a special file ``database.sql`` containing database dump.  Then it
sends it to the storage layer (e.g. Local directory).

.. contents::
    :local:
    :backlinks: top

Architecture
------------

The extension encapsulates its task into two so-called processes:
:ref:`backup` and :ref:`restore`.

.. _backup:

Backup
^^^^^^

The Backup process is responsible for making a backup copy of a site
and send it to the storage layer:

1. Export File System
2. Export Database
3. Send .zip file to a Storage Layer

.. _restore:

Restore
^^^^^^^

The Restore process is responsible for fetching the .zip file, extracting
it and replacing the database contents:

1. **Restore File System**

    1. Fetch .zip file from Storage Layer
    2. Extract .zip file to a temporary directory
    3. Move all files from root directory to a backup directory
    4. Move new files from temporary directory to root directory

2. **Restore Database**

    1. Save backup settings
    2. Drop all database tables
    3. Import database.sql
    4. Restore backup settings

API
---

The extension provides the following API for those who want to build a
sub extension:

Exceptions
^^^^^^^^^^

For error handling the extension relies on the following exception
hierarchy:

* ``FW_Backup_Exception``

    * ``FW_Backup_Exception_Curl``
    * ``FW_Backup_Exception_Cancelled``
    * ``FW_Backup_Exception_Invalid_Argument``
    * ``FW_Backup_Exception_Not_Implemented``
    * ``FW_Backup_Exception_Parameter_Not_Found``
    * ``FW_Backup_Exception_Service``

        * ``FW_Backup_Exception_Service_Not_Found``
        * ``FW_Backup_Exception_Service_Invalid_Interface``

Services
^^^^^^^^

Generally speaking the Backup extension was build around the idea that any
complex task (such as backup and restore) can be represented as a set
of smaller tasks which then can be encapsulated in classes.

These classes instantiated at runtime are called services. Services can
depend on other services and some values (called parameters).

* ``param($key)`` - yield a value of a parameter. Allowed parameter names are:

    * ``wordpress_dir`` - absolute path to the wordpress directory
    * ``backup_dir`` - absolute path to the backup directory (used by Local Storage)

        .. note::

            The actual directory may not exists. Take a look at ``get_backup_dir()`` API in order to create it.

    * ``backup_rel`` - relative to wordpress_dir path to the backup directory (used by Local Storage)

        .. note::

            The actual directory may not exists. Take a look at ``get_backup_dir()`` API in order to create it.

* ``service($service_id, $instance_of = null)`` - yield a clone of a specified service or a direct instance of it if its name begins with "shared." prefix. In the latter case all service clients will have the same object.

    Valid service names are:

    * ``shared.post.meta`` - encapsulation of a meta information associated with a backup. Resides in FW_Backup_Service_Post_Meta class.

    * ``shared.feedback`` - encapsulation of a feedback for a Backup process. Represented as FW_Backup_Interface_Feedback interface.

    * ``post.meta`` - version of shared.post.meta

    * ``db`` - generic functionality for the database. Encapsulated in class FW_Backup_Service_Database

    * ``fs`` - generic functionality for the file system. Encapsulated in FW_Backup_Service_File_System

    * ``ie.settings`` - Import/Export of the Backup Settings. Represented as FW_Backup_Interface_IE interface

    * ``ie.history`` - Import/Export of all backups. Represented as FW_Backup_Interface_IE interface

    * ``ie.db`` - Import/Export of the database. Represented as FW_Backup_Interface_IE interface

    * ``ie.fs`` - Import/Export of the file system. Encapsulated in FW_Backup_IE_File_System class

        .. note::

            This service is not implement ``FW_Backup_Interface_IE`` interface

    * ``process.backup-restore`` - encapsulation of Backup and Restore processes

    * ``process.apply-age-limit`` - encapsulation of "Apply Age Limit" process

    * ``cron.full`` - encapsulation of a periodic job for making Full backup. Represented as FW_Backup_Interface_Cron interface.

    * ``cron.db`` - encapsulation of a periodic job for making the Database backup. Represented as FW_Backup_Interface_Cron interface.

* ``service_list($instance_of)`` - yield a list of services implementing the specified interface

Directories
^^^^^^^^^^^

* ``get_backup_dir($create = false)`` - yield a path to the directory where local backups will be stored.

    .. note::

        If ``$create`` is ``true`` but directory cannot be created ``false`` will be returned.

Pages
^^^^^

* ``url_backup()`` - URL of a backup page

* ``url_backup_progress($post_id)`` - URL of a page displaying the progress of a specified Backup process

* ``url_backup_now($cron_id)`` - URL of a page starting Backup Now process

* ``url_backup_cancel($post_id)`` - URL of a page cancelling Backup process

* ``url_backup_download($post_id)`` - URL for downloading backup file

* ``url_backup_restore($post_id)`` - URL of a page starting Restore process from specified backup copy

* ``url_backup_trash($post_id)`` - URL of a page deleting a specified backup copy

* ``url_backup_unschedule($cron_id)`` - URL of a page which unscheduled a specified Backup process

Processes
^^^^^^^^^

* ``backup_now($cron_id)`` - initiate Backup process

* ``backup_cancel($post_id)`` - cancel Backup process

* ``backup_unschedule($cron_id)`` - unschedule specified backup

* ``backup_render_progress($post_id)`` - yield a HTML with a specified backup progress

* ``restore_now($post_id)`` - initiate Restore process from a specified backup copy

Storage Layer
^^^^^^^^^^^^^

The storage layer is encapsulated in FW_Backup_Interface_Storage interface:

* ``get_title($context = null)`` - should yield a string representing a short description of a Storage Layer e.g. ``Dropbox``, ``Amazon S3`` or ``Local``. The ``$context`` parameter was introduced to show *Locally* in the notification bar:

    .. code-block:: text

         Full Backup schedule active: Daily | Locally | Next Backup on 16.07.2014 11:22:33
         Full Backup schedule active: Daily | on Dropbox | Next Backup on 16.07.2014 11:22:33

    and *Local* in Backup Settings dialog. Currently it can take only two values: ``null`` and ``'on'``.

* ``ping()`` - should check the connection with the storage server. On any error a ``FW_Backup_Exception`` should be thrown.

    Designed to avoid situations when backup file was made (which takes time) but can't be stored since Storage Layer wasn't configured properly or doesn't have enough space on it.  Will be called just before Backup process will start.

* ``move($file)`` - should upload a ``$file`` into a storage and remove it. As a result an instance of ``FW_Backup_Interface_File`` should be returned. This object will be passed as an argument to ``fetch()`` and ``remove()`` methods. On any error ``FW_Backup_Exception`` should be thrown.

* ``fetch(FW_Backup_Interface_File $backup_file)`` - should make a local copy of a ``$backup_file`` and return full path to it. On any error ``FW_Backup_Exception`` should be thrown.

* ``remove(FW_Backup_Interface_File $backup_file)`` - should remove the ``$backup_file`` from the storage. This method will be called when Backup Extension was instructed to delete the associated backup. On any error ``FW_Backup_Exception`` should be thrown.

Storage Extension
^^^^^^^^^^^^^^^^^

The storage Extension is any extension from the extensions directory implementing ``FW_Backup_Interface_Storage_Factory`` interface. The task of a Storage Extension is to introduce Storage Layer to the Backup extension.

For an example take a look at storage-local extension.
