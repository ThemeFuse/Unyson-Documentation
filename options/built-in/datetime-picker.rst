Datetime Picker
---------------

Pick a datetime in calendar.

.. code-block:: php

    array(
        'type'  => 'datetime-picker',
        'value' => '',
        'attr'  => array( 'class' => 'custom-class', 'data-foo' => 'bar' ),
        'label' => __('Label', '{domain}'),
        'desc'  => __('Description', '{domain}'),
        'help'  => __('Help tip', '{domain}'),
        'datetime-picker' => array(
            'format'        => 'Y/m/d H:i', // Format datetime.
            'maxDate'       => false,  // By default there is not maximum date , set a date in the datetime format.
            'minDate'       => false,  // By default minimum date will be current day, set a date in the datetime format.
            'timepicker'    => true,   // Show timepicker.
            'datepicker'    => true,   // Show datepicker.
            'defaultTime'   => '12:00' // If the input value is empty, timepicker will set time use defaultTime.
        ),
    )