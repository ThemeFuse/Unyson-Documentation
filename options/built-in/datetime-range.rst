Datetime Range
--------------

Set a datetime range.

.. code-block:: php

    array(
        'type'  => 'datetime-range',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'datetime-pickers' => array(
        'from' => array(
            'minDate' => '1970/01/01', // By default minimum date will be current day, set a date in the datetime format.
            'maxDate' => '2038/01/19', // By default there is not maximum date , set a date in the datetime format.
            'format'  => 'Y/m/d H:i',  // Format datetime.
            'timepicker'  => true,     // Show timepicker.
            'datepicker'  => true,     // Show datepicker.
            ),
        'to' => array(
            'minDate' => '1970/01/01', // By default minimum date will be current day, set a date in the datetime format.
            'maxDate' => '2038/01/19', // By default there is not maximum date , set a date in the datetime format.
            'format'  => 'Y/m/d H:i',  // Format datetime.
            'timepicker'  => true,     // Show timepicker.
            'datepicker'  => true,     // Show datepicker.
            )
        ),
        'value' => array(
            'from' => '',
            'to' => ''
        )
    )