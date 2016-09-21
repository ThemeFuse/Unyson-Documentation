Built-in Option Types
=====================

.. raw:: html

    <iframe src="https://player.vimeo.com/video/105002864?title=0&amp;byline=0&amp;portrait=0" width="100%" height="384" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

    <br><br>

Here is a complete list of all built-in option types with all available parameters for each option.

.. toctree::

    text
    textarea
    checkbox
    checkboxes
    radio
    select
    select-multiple
    multi-select
    switch
    color-picker
    rgba-color-picker
    gradient
    image-picker
    background-image
    date-picker
    datetime-picker
    datetime-range
    icon-v2
    upload
    multi-upload
    slider
    range-slider
    popup
    addable-popup
    addable-option
    addable-box
    typography-v2
    wp-editor
    multi-picker
    map
    multi
    hidden
    html
    password
    oembed
    typography
    icon

Some option types have custom javascript events. The events are triggered on elements with ``.fw-option-type-{type}`` class. Some events send data that can be accessed this way:

.. code-block:: php

    jQuery('.fw-option-type-demo#fw-option-demo')
        .on('fw:option-type:demo:custom-event', function(event, data){
            console.log(data);
        });