Cookbook
========

The Cookbook is a collection of specific recipes that explain how to correctly solve the most recurrent problems
that developers face in their day to day work.

.. contents::
    :local:
    :backlinks: top

Disable Child Extensions
------------------------

Child extensions will not be activated if parent extension will ``return false;`` from ``_init()``.

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    class FW_Extension_Example extends FW_Extension
    {
        /**
         * @internal
         */
        protected function _init()
        {
            // ...

            if ($this->something_is_wrong()) {
                return false; // prevent child extensions activation
            }
        }
    }


Validate Child Extensions
-------------------------

The parent extension has the possibility to check each child extension if it's valid or not. If the child extension is not valid, it will not be activated. To do that, the parent extension must overwrite the ``_child_extension_is_valid()`` method.

The method should return ``true`` if child extension is valid, and ``false`` if not.

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    class FW_Extension_Example extends FW_Extension
    {
        /**
         * {@inheritdoc}
         */
        public function _child_extension_is_valid($child_extension_instance)
        {
            // force child extensions to extend some custom class, instead of FW_Extension
            return is_subclass_of($child_extension_instance, 'FW_Ext_Demo_Custom_Class');
        }

        // ...
    }

Download/Udpate Extension via GitHub
-------------------------

Let's say you want to add some extensions available for your theme. To install extension from your GitHub repository you can add a file ``available-extensions.php`` in your ``yourTheme/framework-customizations/theme/available-extensions.php`` with the following code:

        .. code-block:: php

            <?php defined( 'FW' ) or die();

            // is executed when the extension is first installed
            $extensions = array(
                'extension_name' => array(
                    'display'     => true,
                    'parent'      => null,
                    'name'        => __( 'Extension name', 'fw' ),
                    'description' => __( 'Extension description.', 'fw' ),
                    'thumbnail'   => 'pathToThumbnail/thumbnail.jpg',
                    'download'    => array(
                        'source' => 'github',
                        'opts'   => array(
                            'user_repo' => 'https://github.com/yourUsername/yourRepositoryExtension',
                        ),
                    ),
                ),
            );

To allow your extension to download updates from GitHub add in its manifest.php key with your URL to GitHub repository:

    .. code-block:: php

        $manifest['github_repo'] = 'https://github.com/yourUsername/yourRepositoryExtension';

On GitHub create first tag version release otherwise GitHub API can't return any version.

Download/Udpate Extension via custom server.
-------------------------

Let's say you want to add some extensions available for your theme. To install extension from your custom server you can add a file ``available-extensions.php`` in your ``yourTheme/framework-customizations/theme/available-extensions.php`` with the following code:

        .. code-block:: php

            <?php defined( 'FW' ) or die();

            // is executed when the extension is first installed
            $extensions = array(
                'extension_name' => array(
                    'display'     => true,
                    'parent'      => null,
                    'name'        => __( 'Extension name', 'fw' ),
                    'description' => __( 'Extension description.', 'fw' ),
                    'thumbnail'   => 'pathToThumbnail/thumbnail.jpg',
                    'download'    => array(
                        'source' => 'custom',
                        'opts'   => array(
                            // All these keys you can access on your server
                            'remote'       => 'https://yourServerName/versions/', // Required
                            'purchase_key' => get_option( 'user_purchase_key' )
                        ),
                    ),
                ),
            );

To allow your extension to download updates from your server add in its manifest.php key with your URL to your server:

    .. code-block:: php
        // All keys added in manifest you can access on your custom server so you can check for purchase key, username, etc.
        $manifest['remote'] = 'https://yourServerName/versions/';

On your server create a file index.php in ``https://yourServerName/versions/index.php``:

    .. code-block:: php

        <?php

        // Here you have entire manifest sttings on update or on install extenions array 'opts' from available-extensions.php
        $set = json_decode( file_get_contents( 'php://input' ), true );

         /*
         * pull - what client's server wants to get. Version or theme/extension zip archive
         * type - item type can be theme or extension
         */

        $vars = array(
            'pull' => array( 'version', 'zip' ),
            'type' => array( 'theme', 'extension' )
        );

        foreach( $vars as $key => $values ) {
            if ( ! isset( $set[ $key ] ) || ! in_array( $set[ $key ], $values ) ) {
                die( json_encode( array( 'error' => 'Something went wrong. Please contact support team.' ) ) );
            }
        }

         /*
         *  If you have many extensions or themes, check if you have it.
         *  item - is name of extension or id of theme from manifest.php
         */
        $my_products = array(
            'extension' => array( 'extension_name', 'extension_name1' ),
            'theme'     => array( 'scratch', 'scratch1' ),
        );

        if ( ! isset( $set['item'] ) || ! in_array( $set['item'], $my_products[ $set['type'] ] ) ) {
            die( json_encode( array( 'error' => 'This item doesn\'t exists.'  ) ) );
        }

        /**
         * Extract latest version for theme or extension.
         */
        $version = '1.0.1';

        // Client's server asked for version just return it.
        if ( $set['pull'] === 'version' ) {
            die( $version );
        }

        /*
            if ( empty( $set['purchase_key'] ) ) {
                die( json_encode( array( 'error' => 'Please insert purchase key.' ) ) );
            }

            // Check here if purchase_key is valid.
            if ( ! is_valid( $set['purchase_key'] ) ) {
                die( json_encode( array( 'error' => 'Purchase key is not valid.' ) ) );
            }
        */

        /**
         * Build path to archive.
         */
        $path = dirname( __FILE__ ) . "/{$set['item']}.{$version}.zip";

        if ( ! file_exists( $path ) ) {
            die( json_encode( array( 'error' => 'File zip doesn\'t exists.' ) ) );
        }

        header( 'Content-Type: application/zip' );
        header( 'Content-Disposition: attachment; filename=' .  basename( $path ) );
        header( 'Content-Length: ' . filesize( $path ) );
        readfile( $path );

        die();






















