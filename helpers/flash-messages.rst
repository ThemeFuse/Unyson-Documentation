.. _fw-flash-messages:

FW_Flash_Messages
-----------------

You can display small messages that will be stored on the user's session for exactly one additional request.
This is useful when processing a form: you want to redirect and have a special message shown on the next page.
These types of messages are called "flash" messages.

.. _fw-flash-messages-add:

.. rubric:: Adding a flash message

.. code-block:: php

    FW_Flash_Messages::add(
        'unique-id',
        __('Test message', '{domain}'),
        'success' // available types: info, warning, error, success
    );

.. _fw-flash-messages-display:

.. rubric:: Displaying flash messages

In admin the messages are displayed as `admin notices <https://codex.wordpress.org/Plugin_API/Action_Reference/admin_notices>`__.

In frontend the messages are printed in footer,
then a javascript tries to find on the page the content container and move the messages in it.
This position guessing sometimes fails when the page has some special html structure
and the messages may not be visible or will be displayed in an inappropriate place.
You can choose a place in your template and display the messages manually:

.. code-block:: php

    <?php if (defined('FW')) { FW_Flash_Messages::_print_frontend(); } ?>

