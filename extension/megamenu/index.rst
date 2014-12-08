Mega Menu
=========

The Mega Menu extension gives the end-user the ability to construct advanced navigation menus.

.. contents::
    :local:
    :backlinks: top

Overview
--------

When it is turned on, it enriches menu with the following:

1. Ability to set an icon for any menu item
2. Ability to group several menu items into columns placed in rows

HTML/CSS
--------

The extension adds the following css classes:

* ``.menu-item-has-icon``
* ``.menu-item-has-mega-menu``
* ``.sub-menu-has-icons``
* ``.mega-menu``
* ``.mega-menu-row``
* ``.mega-menu-col``

The markup will be the following:

.. code-block:: text

    li.menu-item-has-mega-menu
        div.mega-menu
            ul.mega-menu-row
                li.mega-menu-col
                li.mega-menu-col
                li.mega-menu-col
            ul.mega-menu-row
                li.mega-menu-col
                li.mega-menu-col
                li.mega-menu-col
            ul.mega-menu-row
                li.mega-menu-col
                li.mega-menu-col
                li.mega-menu-col

.. note::

    All other standard WordPress classes and HTML remains the same.

Markup Example
--------------

.. code-block:: html

    <ul>
        <li class="menu-item-has-mega-menu menu-item-has-icon">
            <a class="fa-exclamation" href="#">Mega Menu 1</a>
            <div class="mega-menu">
                <ul class="sub-menu mega-menu-row">
                    <li class="mega-menu-col">
                        <a href="#">Just Links</a>
                        <ul class="sub-menu">
                            <li>
                                <a href="#">Menu Item 1</a>
                            </li>
                            <li>
                                <a href="#">Menu Item 2</a>
                            </li>
                            <li>
                                <a href="#">Menu Item 3</a>
                            </li>
                            <li>
                                <a href="#">Menu Item 4</a>
                            </li>
                            <li>
                                <a href="#">Menu Item 5</a>
                            </li>
                        </ul>
                    </li>
                    <li class="mega-menu-col">
                        <a href="#">Links with Icons</a>
                        <ul class="sub-menu sub-menu-has-icons">
                            <li class="menu-item-has-icon">
                                <a class="fa-inbox" href="#">Menu Item 1</a>
                                <p>Praesent quis enim euismod, fringilla quam vitae, consectetur quam.</p>
                            </li>
                            <li class="menu-item-has-icon">
                                <a class="fa-wrench" href="#">Menu Item 2</a>
                            </li>
                            <li class="menu-item-has-icon">
                                <a class="fa-italic" href="#">Menu Item 3</a>
                            </li>
                            <li class="menu-item-has-icon">
                                <a class="fa-ellipsis-v" href="#">Menu Item 4</a>
                            </li>
                            <li class="menu-item-has-icon">
                                <a class="fa-home" href="#">Menu Item 5</a>
                                <p>Suspendisse potenti. Morbi a elit non mauris tempor consequat. Praesent dapibus malesuada ligula, a fermentum leo euismod nec. Nunc porta ligula id velit interdum congue. In mi augue, sodales a convallis id, accumsan vitae nisi. Mauris id laoreet quam, vel hendrerit enim. Nunc ultricies diam id neque vulputate, eu egestas est convallis. Nullam sed nisi vehicula turpis pharetra rutrum. Nunc scelerisque sodales elit, nec elementum nisl varius vel. Aliquam accumsan tellus a tortor porta mollis.</p>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </li>
        <li class="menu-item-has-icon">
            <a class="fa-info-circle" href="#">Home</a>
            <ul class="sub-menu sub-menu-has-icons">
                <li class="menu-item-has-icon">
                    <a class="fa-info-circle" href="#">Page 2</a>
                </li>
                <li class="menu-item-has-icon">
                    <a class="fa-info-circle" href="#">Page 3</a>
                    <ul class="sub-menu sub-menu-has-icons">
                        <li class="menu-item-has-icon">
                            <a class="fa-key" href="#">Page 4</a>
                        </li>
                        <li class="menu-item-has-icon">
                            <a class="fa-briefcase" href="#">Page 5</a>
                        </li>
                        <li class="menu-item-has-icon">
                            <a class="fa-gavel" href="#">Page 6</a>
                            <ul class="sub-menu sub-menu-has-icons">
                                <li class="menu-item-has-icon">
                                    <a class="fa-globe" href="#">Page 7</a>
                                </li>
                                <li>
                                    <a href="#">Page 8</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    </ul>
