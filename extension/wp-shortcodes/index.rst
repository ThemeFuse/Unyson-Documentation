WordPress Shortcodes
====================

This extensions gives a way to insert and render correctly Unyson shortcodes
inside WordPress editor.

.. contents::
    :local:
    :backlinks: top

Understanding the purpose of this extension
-------------------------------------------

At first, this extension is not a silver bullet for all of the use cases you
may want to try, it is quite limited in what it can achieve. If you want to get
more details you should really go and read the whole discussion on
`GitHub <https://github.com/ThemeFuse/Unyson-Shortcodes-Extension/issues/62>`_.

.. warning::
    This document is a work in process.

The structure of a Unyson shortcode
-----------------------------------

At first, you should know that an Unyson shortcode consists of three parts
that make him look the way it does:

#. HTML. Usually it is located in ``view.php``
#. All of the static. Located in ``static.php``
#. Dynamic CSS. Enqueueud with ``wp_add_inline_style`` on ``'fw_ext_shortcodes_enqueue_static:{name}'``

Depending on your use case, it may be easier or harder to get those components
rendered correctly. I'll give a short table below that will make all of this
clear.

#. Shortcode in Post Editor
#. Shortocde in ``wp-editor`` option type of any Page Builder Shortcode
#. Shortocde in ``wp-editor`` that is inserted anywhere else (like Theme
   Settings or any ``OptionsModal``)

+---------------------------+------+-----------------+-------------+
| use case vs. what you get | HTML | ``static.php``  | dynamic css |
+===========================+======+=================+=============+
| 1 Post Editor             | yes  | yes             | yes         |
+---------------------------+------+-----------------+-------------+
| 2 Page Builder Shortcode  | yes  | yes             | no          |
+---------------------------+------+-----------------+-------------+
| 3 Any ``wp-editor``       | yes  | no              | no          |
+---------------------------+------+-----------------+-------------+

Shortcodes in main post editor
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

By default, you'll a get a button in the main post editor with all of the
shortcodes that are enabled, except the ``section`` and ``column`` ones.
This is actually the most simple use-case and you have nothing to do in order
to get them working. Everything should be out of the box here.

You can in fact, customize which shortcodes are showed up using this snippet
of code:


.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    add_filter('fw:ext:wp-shortcodes:default-shortcodes', _set_default_shortcodes);

    function _set_default_shortcodes($previous_shortcodes) {
        return array( 'button', 'notification' );
    }


Shortcodes in another Page Builder Shortcode
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^



