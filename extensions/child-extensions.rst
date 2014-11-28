Child Extensions
================

An extension can have child extensions that are located in the ``extensions/`` directory within its own directory.
A child extension can be located in the parent theme and child theme on the same relative path.
Here are 3 possible cases where an extension can exists and where its child extensions can be placed:

1. If the ``hello`` extension is located in framework, the child extensions can be placed in: framework, parent theme and child theme.

    .. code-block:: text

        framework/
        └─extensions/
          └─hello/
            └─extensions/
              ├─hello-child/
              └─...

        ├─parent-theme/
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

2. If the ``hello`` extension is located in parent theme, the child extensions can be placed in: parent theme and child theme.

    .. code-block:: text

        ├─parent-theme/
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

3. If the ``hello`` extension is located in child theme, the child extensions can be placed only in the child theme.

    .. code-block:: text

        └─child-theme/
          └─framework-customizations/
            └─extensions/
              └─hello/
                └─extensions/
                  ├─hello-child/
                  └─...