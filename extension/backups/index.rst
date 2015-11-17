Backup & Demo Content
=====================

This extension lets you create an automated backup schedule,
import demo content or even create a demo content archive for migration purposes.

.. contents::
    :local:
    :backlinks: top

Demo Content Install
--------------------

Demo Content is useful for the clients of your theme. After they installed the theme,
instead of seeing a plain list of posts and the need to configure and create content by their own
in order to make the site look nice, they can achieve all that just with one click,
by installing the demo content. Their site will look exactly like your theme demo page,
then the user will just start to adapt it for his needs.

Create Demos
^^^^^^^^^^^^

It's very easy to create a Demo, just create a Content Backup.

.. important::

    If you have contact forms added in pages in builder, please check Mailer settings and remove all private credentials.

    Mailer settings are saved in a wp option which is excluded on content backup, unfortunately a copy of the same settings
    are saved in post meta (in builder). This problem `will be fixed <https://github.com/ThemeFuse/Unyson/issues/838>`__ later,
    until then, you'll need to clear manually mailer settings for each contact form before content backup.

.. tip::

    Before creating Content Backup for Demo Install, use a plugin to exclude post revisions.

The next step is to make those demos appear in a page where the user can choose which he wants to install.
That page is created in WordPress admin menu **Tools > Demo Content Install** if the theme has at least one demo.
The demos can be placed in theme or can be downloaded from a remote server.

.. _demo-in-theme:

Demos bundled in theme
######################

1. Create Content Backup
2. Extract the zip in ``{theme}/demo-content/{demo-name}/``
3. Create ``{theme}/demo-content/{demo-name}/manifest.php`` with the following contents:

    .. code-block:: php

        <?php if (!defined('FW')) die('Forbidden');
        /**
         * @var string $uri Demo directory url
         */

        $manifest = array();
        $manifest['title'] = __('Awesome Demo', 'fw');
        $manifest['screenshot'] = $uri . '/screenshot.png';
        $manifest['preview_link'] = 'https://your-site.com/demo/awesome';

4. Find in WordPress admin the **Tools > Demo Content Install** menu. The demo(s) should be listed on that page.

.. _demo-on-server:

Demos on remote server
######################

1. Create Content Backup
2. Upload the zip on your server (in any directory you want, for e.g. ``your-site.com/demo/``)
3. Upload this `download script <https://raw.githubusercontent.com/ThemeFuse/Unyson-Backups-Extension/master/includes/module/tasks/type/download/type/piecemeal/server/index.php>`__,
   let's say in the same directory ``your-site.com/demo/``
4. In the same directory with download script, create `config.php <https://raw.githubusercontent.com/ThemeFuse/Unyson-Backups-Extension/master/includes/module/tasks/type/download/type/piecemeal/server/config.php>`__,
   and add your demos in the following format:

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
                    'title' => __('Demo Title', 'fw'),
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

6. Find in WordPress admin the **Tools > Demo Content Install** menu. The demo(s) should be listed on that page.

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

        The current option (if exists) will be wiped out. To keep current option, use :ref:`this filter <filter-fw_ext_backups_db_restore_keep_options>`.

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