Introduction
============

The Framework, Theme and every Extension has a manifest. The manifest provides important information like: title, version, dependencies, etc.

The Framework generates a manifest for it self, the theme and every extension with default values automatically.
You can overwrite the default values by creating a ``manifest.php`` file in the root folder of the theme or extension and define the ``$manifest`` array.
