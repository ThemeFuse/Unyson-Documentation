Slider
======

Adds a sliders module to your website from where you'll be able to create different built in jQuery sliders for your homepage and rest of the pages.

.. contents::
    :local:
    :backlinks: top

Directory Structure
-------------------

The slider extension directory has the following structure:

.. code-block:: text

    slider/
    ├-...
    └-extensions/
      ├─{slider-type}/
      ├─...
      └-{slider-type}/
        ├─class-fw-extension-{slider-type}.php # optional
        ├─config.php
        ├─options/ # optional
        │ ├─options.php
        │ └─...
        ├─static/ # optional
        │ ├─css/
        │ │ ├─auto-enqueued-style.css
        │ │ └─...
        │ ├─img/
        │ │ ├─preview.jpg
        │ │ ├─thumb.jpg
        │ │ └─...
        │ └─js/
        │   ├─auto-enqueued-script.js
        │   └─...
        └─views/
          ├─{slider-type}.php
          └─...

Create a simple slider type
---------------------------

To create simple slider type, create a :doc:`child extension </extensions/introduction>`. In our case the slider type is ``demo-slider``, so the child extension directory will be
``framework-customizations/extensions/media/extensions/slider/extensions/demo-slider``.

.. important::

    Make sure you have ``framework-customizations/extensions/media/extensions/slider/extensions/demo-slider/manifest.php`` with the following contents:

    .. code-block:: php

        <?php $manifest['standalone'] = true;

Configuration
^^^^^^^^^^^^^

The configuration file ``config.php`` contains the following parameters:

.. code-block:: php

    /**
     * Specify available population methods.
     *
     * There are 4 built-in population methods:
     *  'posts'      Populate with posts
     *  'categories' Populate with categories
     *  'tags'       Populate with tags
     *  'custom'     Populate with custom content provided by the user
     */
    $cfg['population_methods'] = array('posts', 'categories', 'tags', 'custom');

    /**
     * Specify what media types the slider supports.
     *
     * There are 2 media types available:
     *  'image' Supports images
     *  'video' Supports videos
     */
    $cfg['multimedia_types'] = array('image');


Static files
^^^^^^^^^^^^

Scripts, styles and images are stored in the ``static/`` directory.

* ``static/images/`` - directory for images. This directory has 2 special images that you should create:

    * ``thumb.jpg`` - small image with frontend preview of this slider type. Is displayed on the admin side in Slider Type choices.
    * ``preview.jpg`` - a bigger image with frontend preview of this slider type. It is displayed when the user hovers the ``thumb.jpg`` in the WordPress admin.

* ``static/css/`` - directory for styles. They will be automatically enqueued in frontend.
* ``static/js/`` - directory for scripts. They will be automatically enqueued in frontend.

.. note::

    Styles and scripts are enqueued in alphabetical orders. You cannot set dependencies for them.
    So if you want for e.g. ``c.js`` to be enqueued before ``b.js``, you must rename it, or prefix it
    with some number or letter ``a-c.js``.

For ``demo-sloder`` to work:

1. Download `this script <https://raw.githubusercontent.com/idiot/unslider/master/dist/js/unslider-min.js>`_ 
   in ``framework-customizations/extensions/media/extensions/slider/extensions/demo-slider/static/js/unslider-min.js``.
2. Download `this style <https://raw.githubusercontent.com/idiot/unslider/master/dist/css/unslider.css>`_
   in ``framework-customizations/extensions/media/extensions/slider/extensions/demo-slider/static/css/unslider.css``.

Options
^^^^^^^

Optionally, if your slider have extra :doc:`options </options/introduction>`, you can create 2 types of option files within ``options/`` directory:

* ``options.php`` - extra options shown after default options on add and edit slider page.
* ``{population-method}.php`` - extra options for concrete population method, shown after default options on edit slider page.


Template
^^^^^^^^

View the file that contains the slider template for frontend, is located in ``views/{slider-type}.php``. Here is an example for our ``demo-slider``:

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');
    /**
     * @var array $data
     */
    
    $unique_id = 'demo-slider-'. fw_unique_increment();
    ?>
    <?php if (isset($data['slides'])): ?>
        <script type="text/javascript">
            jQuery(function($){ $('#<?php echo $unique_id ?>').unslider(); });
        </script>
        <div id="<?php echo $unique_id ?>">
            <ul>
                <?php foreach ($data['slides'] as $slide): ?>
                    <li>
                        <?php if ($slide['multimedia_type'] === 'video') : ?>
                            <?php echo fw_oembed_get($slide['src'], $dimensions); ?>
                        <?php else: ?>
                            <img src="<?php echo fw_resize($slide['src'], $dimensions['width'], $dimensions['height']); ?>"
                                alt="<?php echo esc_attr($slide['title']) ?>"
                                width="<?php echo esc_attr($dimensions['width']); ?>"
                                height="<?php echo $dimensions['height']; ?>" />
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

The ``$data`` variable that is available in view, has the following structure:

.. code-block:: php

    $data = array(
        'slides' => array(
            array(
                'title' => 'Slide Title',
                'multimedia_type' => 'video|image',
                'src'   => 'Slide src',
                'extra' => array(
                    /**
                     * This array can be empty, it depends on population method
                     * or if user set extra options for population method
                     */
                    'extra-slide-key' => 'Extra slide value',
                    ...
                )
            ),
            ...
        ),
        'settings' => array(
            'title'             => 'Slider Title',
            'slider_type'       => '{slider-type}',
            'population_method' => 'posts|categories|tags|custom',
            'post_id'           => 10, // ID of the slider (slider is a custom post)
            'extra' => array(
                /**
                 * This array can be empty.
                 * Or will have something in it
                 * if user set custom options for slider in options/options.php
                 */
                'extra-slider-key' => 'Extra slider values',
                ...
            )
        )
    );


Create advanced slider type
---------------------------

If you want to create an advanced slider with your own extra logic,
you must create a class file named ``class-fw-extension-{slider-type}.php``
within the slider type directory.

In our case the slider type is ``bx-slider``, so the class file will be located in
``framework-customizations/extensions/media/extensions/slider/extensions/bx-slider/class-fw-extension-bx-slider.php``
and will contain:

.. code-block:: php

    <?php if (!defined('FW')) die('Forbidden');

    class FW_Extension_Bx_Slider extends FW_Slider
    {
        /**
         * @internal
         */
        public function _init()
        {
        }
    }

Then you can take a look at the ``FW_Slider`` methods to learn what are they doing and decide
which one you will overwrite.



Frontend render
---------------

There are two ways you can display a slider in frontend:

1. **Builder shortcode** - the main slider extension automatically creates a ``[slider]`` shortcode which is available in :doc:`builder </extension/shortcodes/index>` in the **Media Elements** tab.

2. **Render from code** - the slider extension has a public method that you can use to render a slider on frontend.

    .. code-block:: php

        fw()->extensions->get('slider')->render_slider(10, array(
            'width'  => 300,
            'height' => 200
        ));


