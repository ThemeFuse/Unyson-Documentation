Child Theme
===========

======================== =====================================================================
``FW_CT``                Is ``true`` if child theme is active
======================== =====================================================================

.. note::

    The following constants are defined only if ``FW_CT`` is ``true``. This is done to prevent bugs.

    For example if parent theme is active, then all child theme constants would be
    exactly the same as parent theme constants. If you will have some functionality
    that includes a file with functions from parent and child theme,
    you will include the same file twice and that will result in errors like
    ``Cannot redeclare function``.

======================== =====================================================================
``FW_CT_DIR``            Full path to parent theme directory
``FW_CT_CUSTOM_DIR``     Full path to ``child-theme/framework-customizations/`` directory
``FW_CT_THEME_DIR``      Full path to ``child-theme/framework-customizations/theme`` directory
``FW_CT_EXTENSIONS_DIR`` Full path to ``child-theme/framework-customizations/extensions`` directory
``FW_CT_URI``            URI to parent theme directory
``FW_CT_CUSTOM_URI``     URI to ``child-theme/framework-customizations/`` directory
``FW_CT_THEME_URI``      URI to ``child-theme/framework-customizations/theme`` directory
``FW_CT_EXTENSIONS_URI`` URI to ``child-theme/framework-customizations/extensions`` directory
======================== =====================================================================