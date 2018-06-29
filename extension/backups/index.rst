Backup & Demo Content
=====================

This extension lets you create an automated backup schedule,
import demo content or even create a demo content archive for migration purposes.

.. contents::
    :local:
    :backlinks: top

Migration
--------------------

Migration is a term representing moving a WordPress website from one location (e.g. http://localhost/site) to another (e.g. http://site.com).

This is achieved by:

1. Making a full backup copy of the old site(http://localhost/site).
2. Moving it in the ``wp-content/uploads/fw-backup`` directory on the new site(http://site.com).

After opening the Backup page a new archive will be displayed in the Backup Archive list.

Demo Content Install
--------------------

The demo content install might be very useful for your clients.
After they install the theme, they won't need to configure and create content from scratch
but instead they can install the demo content you've created.
Their site will look exactly like your theme demo page, and they can just start to modify and adapt the existing content.

Create Demos
^^^^^^^^^^^^

In order to create a demo content archive, just create a Content Backup.

.. tip::

    Before creating a Content Backup for Demo Install use a plugin to remove post revisions.

The next step is to let your users view and select which demo content to install.
This page is created in the WordPress admin under **Tools > Demo Content Install**
if the theme has at least one demo content available.
The demo content archives can be placed in theme or can be downloaded from a remote server.

.. _demo-in-theme:

Demos bundled in theme
######################

1. Create Content Backup
2. **Extract** the zip in ``{theme}/demo-content/{demo-name}/``
3. Create ``{theme}/demo-content/{demo-name}/manifest.php`` with the following contents:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');
        /**
         * @var string $uri Demo directory url
         */

        $manifest = array();
        $manifest['title'] = __('Awesome Demo', '{domain}');
        $manifest['screenshot'] = $uri . '/screenshot.png';
        $manifest['preview_link'] = 'https://your-site.com/demo/awesome';

4. Go to **Tools > Demo Content Install** menu in the WordPress admin. The demo(s) should be listed on that page.

.. _demo-on-server:

Demos on remote server
######################

1. Create Content Backup
2. Upload the zip on your server (in any directory you want, for e.g. ``your-site.com/demo/``)
3. Upload this `download script <https://raw.githubusercontent.com/ThemeFuse/Unyson-Backups-Extension/master/includes/module/tasks/type/download/type/piecemeal/server/index.php>`__,
   let's say in the same directory ``your-site.com/demo/``
4. In the same directory with the download script, create a `config.php <https://raw.githubusercontent.com/ThemeFuse/Unyson-Backups-Extension/master/includes/module/tasks/type/download/type/piecemeal/server/config.php>`__
   file and add your demos in the following format:

    .. code-block:: php

        //   'demo-id' => '/path/to/demo.zip',
        'awesome-demo' => dirname(__FILE__) .'/awesome-demo.zip',

5. Register the demo(s) in your theme. Add in `{theme}/inc/hooks.php <https://github.com/ThemeFuse/Theme-Includes>`__:

    .. code-block:: php

        /**
         * @param FW_Ext_Backups_Demo[] $demos
         * @return FW_Ext_Backups_Demo[]
         */
        function _filter_theme_fw_ext_backups_demos($demos) {
            $demos_array = array(
                'your-demo-id' => array(
                    'title' => __('Demo Title', '{domain}'),
                    'screenshot' => 'https://your-site.com/.../screnshot.png',
                    'preview_link' => 'https://your-site.com/demo/your-demo-id',
                ),
                // ...
            );

            $download_url = 'https://your-site.com/path/to/download-script/';

            foreach ($demos_array as $id => $data) {
                $demo = new FW_Ext_Backups_Demo($id, 'piecemeal', array(
                    'url' => $download_url,
                    'file_id' => $id,
                ));
                $demo->set_title($data['title']);
                $demo->set_screenshot($data['screenshot']);
                $demo->set_preview_link($data['preview_link']);

                $demos[ $demo->get_id() ] = $demo;

                unset($demo);
            }

            return $demos;
        }
        add_filter('fw:ext:backups-demo:demos', '_filter_theme_fw_ext_backups_demos');

6. Go to **Tools > Demo Content Install** menu in the WordPress admin. The demo(s) should be listed on that page.

Hooks
-----

.. _filter-fw_ext_backups_db_export_exclude_option:

* Filter to exclude wp options on database export

    .. code-block:: php

        function _filter_theme_fw_ext_backups_db_export_exclude_option($exclude, $option_name, $is_full_backup) {
            if (!$is_full_backup) {
                if ($option_name === 'your-private-option') {
                    return true;
                }
            }

            return $exclude;
        }
        add_filter(
            'fw_ext_backups_db_export_exclude_option',
            '_filter_theme_fw_ext_backups_db_export_exclude_option',
            10, 3
        );

.. _filter-fw_ext_backups_db_restore_exclude_option:

* Filter to exclude wp options on database restore

    .. note::

        The current options (if exist) will be wiped out. To keep the current options, use :ref:`the following filter <filter-fw_ext_backups_db_restore_keep_options>`.

    .. code-block:: php

        function _filter_theme_fw_ext_backups_db_restore_exclude_option($exclude, $option_name, $is_full) {
            if (!$is_full) {
                if ($option_name === 'your-special-option') {
                    return true;
                }
            }

            return $exclude;
        }
        add_filter(
            'fw_ext_backups_db_restore_exclude_option',
            '_filter_theme_fw_ext_backups_db_restore_exclude_option',
            10, 3
        );

.. _filter-fw_ext_backups_db_restore_keep_options:

* Filter to preserve current wp options values on database restore

    .. code-block:: php

        function _filter_fw_ext_backups_db_restore_keep_options($options, $is_full) {
            if (!$is_full) {
                $options[ 'your-special-option' ] = true;
            }

            return $options;
        }
        add_filter(
            'fw_ext_backups_db_restore_keep_options',
            '_filter_fw_ext_backups_db_restore_keep_options',
            10, 2
        );

.. _filter-fw_ext_backups_demo_dirs:

* Filter to register a custom directory that contains theme demos (for e.g. a plugin bundled with theme)

    .. code-block:: php

        function _filter_theme_fw_ext_backups_demo_dirs($dirs) {
            $dirs['/path/to/dir-with-theme-demos']
            = 'http://.../uri/to/dir-with-theme-demos';

            return $dirs;
        }
        add_filter('fw_ext_backups_demo_dirs', '_filter_theme_fw_ext_backups_demo_dirs');

Troubleshooting
--------------------

Requirements
^^^^^^^^^^^^

If you have trouble with install demo content or backup content please make sure you have these recommended php values:

     .. code-block:: php

        upload_max_filesize = 128M
        max_input_time = -1
        post_max_size = 128M
        max_input_vars = 8000
        max_execution_time = 200

Make sure you have enough disk space. The full backup backups the entire wp-content folder and sometimes users have there a lot of "trash" like backups from other plugins, cache ... Some times other plugins backups are really huge 2-4GB. You have to make sure that you do not have the same problem.


LiteSpeed webserver
^^^^^^^^^^^^

The admin notice "Unyson: Your website is hosted using the LiteSpeed web server. Please consult this article if you have problems backing up." means that your web hosting company uses the LiteSpeed webserver.
LiteSpeed appears to have problems with all WordPress scheduled tasks that last more than a very short time – including all backup plugins. Adding this in an early position in the .htaccess file in your WordPress root folder may fix the problem:

    .. code-block:: php

        RewriteRule (wp-cron|class-fw-extension-backups|class--fw-ext-backups-module-tasks)\.php - [E=noabort:1]

Adding the above line does not mean that the problem is definitely fixed, you will only know that via testing. If the above does not help, then you can try to add a line to your wp-config.php(WordPress’s alternative scheduling system):

 .. code-block:: php

    define( 'ALTERNATE_WP_CRON', true );

If that does not help you, then you’ll need the help of your web hosting company to see why WordPress’s scheduler isn’t working on their setup, or is terminating it prematurely. Or failing that, you’ll need a different web hosting company. This problem is a generic one affecting all backup plugins on WordPress that run via the scheduler (which is all of them, as far as we know).


