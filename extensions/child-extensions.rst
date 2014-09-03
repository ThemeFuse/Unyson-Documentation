Child Extensions
================

An extension can have child extensions that are located in ``extensions/`` directory within its own directory. A child extension can be located in the parent theme and child theme on the same relative path. Here are 3 possible cases where an extension can extists and where its child extensions can be placed: 

1. If a ``hello`` extension is located in framework, child extensions can be placed in: framework, parent theme and child theme.

    .. code-block:: text

        ├─parent-theme/
        │ ├─framework/
        │ │ └─extensions/
        │ │   └─hello/
        │ │     └─extensions/
        │ │       ├─hello-child/
        │ │       └─...
        │ └─framework-customizations/
        │   └─extensions/
        │     └─hello/
        │       └─extensions/
        │         ├─hello-child/
        │         └─...
        └─child-theme/
          └─framework-customizations/
            └─extensions/
              └─hello/
                └─extensions/
                  ├─hello-child/
                  └─...

2. If a ``hello`` extension is located in parent theme, child extensions can be placed in: parent theme and child theme.

    .. code-block:: text

        ├─parent-theme/
        │ ├─framework/
        │ └─framework-customizations/
        │   └─extensions/
        │     └─hello/
        │       └─extensions/
        │         ├─hello-child/
        │         └─...
        └─child-theme/
          └─framework-customizations/
            └─extensions/
              └─hello/
                └─extensions/
                  ├─hello-child/
                  └─...

3. If a ``hello`` extension is located in child theme, child extensions can be placed only in child theme.

    .. code-block:: text

        ├─parent-theme/
        │ ├─framework/
        │ └─framework-customizations/
        └─child-theme/
          └─framework-customizations/
            └─extensions/
              └─hello/
                └─extensions/
                  ├─hello-child/
                  └─...