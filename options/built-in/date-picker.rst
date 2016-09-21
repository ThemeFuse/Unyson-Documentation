Date Picker
-----------

Pick a date in calendar.

.. code-block:: php

    array(
        'type'  => 'date-picker',
        'value' => '',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'monday-first' => true, // The week will begin with Monday; for Sunday, set to false
        'min-date' => date('d-m-Y'), // By default minimum date will be current day. Set a date in format d-m-Y as a start date
        'max-date' => null, // By default there is not maximum date. Set a date in format d-m-Y as a start date
    )