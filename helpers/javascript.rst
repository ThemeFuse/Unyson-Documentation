JavaScript Helpers
==================

Useful javascript functions and classes. The main helper is ``fw``, an object containing constants, methods and classes. To use these helpers, add ``fw`` to your script dependencies:

.. code-block:: php

    wp_register_script(..., ..., array('fw'));

.. contents::
    :local:
    :backlinks: top



General
-------

General javaScript helpers:

* ``fw.FW_URI`` - URI to the framework directory.

* ``fw.SITE_URI`` - URI to the site root directory.

* ``fw.intval(value)`` - alternative to php `intval() <http://php.net/manual/en/function.intval.php>`_. Returns ``0`` on failure, instead of ``NaN`` like `parseInt() <http://www.w3schools.com/jsref/jsref_parseint.asp>`_ does.

* ``fw.md5(string)`` - calculate `md5`_ hash of the string.

* ``fw.loading`` - show loading on the page. 

    .. tip::

        Useful when doing AJAX requests and want to inform your users about that.
    
    .. code-block:: javascript

        fw.loading.show();

        setTimeout(function(){
            fw.loading.hide();
        }, 3000);

    The ``show()`` and ``hide()`` methods can be called multiple times. If ``show()`` is called 10 times, then ``hide()`` should be called 10 times for loading to disappear. This is done for cases when this helper is used by multiple asynchronous scripts, the loading should not disappear until all scripts complete the work.

* ``fw.capitalizeFirstLetter(text)`` - capitalizes the first letter of a string.

* ``fw.ops(properties, value, obj, delimiter)`` - same as ``fw_aks(...)`` from :doc:`php`, but for javascript objects.

    .. code-block:: javascript

        var obj = {foo: {}};

        fw.ops('foo/bar', 'demo', obj);

        console.log(obj); // {foo: {bar: 'demo'}}

* ``fw.opg(properties, obj, defaultValue, delimiter)`` - same as ``fw_akg(...)`` from :doc:`php`, but for javascript objects.

    .. code-block:: javascript

        var obj = {foo: {bar: 'hello'}};

        console.log( fw.opg('foo/bar', obj) ); // 'hello'

* ``fw.randomMD5()`` - generate random `md5`_.



Options Modal
-------------

Modal with :doc:`options </options/introduction>`. Display html generated from a given options array. After the user completes the form and presses "Save", values are available as a javascript object.

.. code-block:: javascript

    var modal = new fw.OptionsModal({
        title: 'Custom Title',
        options: [
            {'test_1': {
                'type': 'text',
                'label': 'Test1'
            }},
            {'test_2': {
                'type': 'textarea',
                'label': 'Test2'
            }}
        ],
        values: {
            'test_1': 'Default 1',
            'test_2': 'Default 2'
        },
        size: 'small' // 'medium', 'large'
    });

    // listen for values change
    modal.on('change:values', function(modal, values) {
        console.log(values);
    });

    // replace values
    modal.set('values', {
        'test_1': 'Custom 1',
        'test_2': 'Custom 2'
    });

    modal.open();

.. note::

    Make sure to enqueue scripts and styles for the options you use in modal. Usually it is done before page is displayed.

    .. code-block:: php

        fw()->backend->enqueue_options_static($modal_options);

Confirmation
------------

General purpose confirmation mechanism that operates with ``jQuery.Deferred``.

.. code-block:: javascript

    var confirm = fw.soleConfirm.create({
      severity: 'info', // warning | info
      message: 'Some message to display', // or null, if you don't want any
      backdrop: null // null | false | true
    });

    confirm.result; // Instance of jQuery.Deferred factory

    confirm.result.then(function (confirm_instance) {
      // confirm_instance is same as confirm

      // Handle success branch
    });

    confirm.result.fail(function (confirm_instance) {
      // Handle fail branch
    });

    confirm.show();

Queueing confirms
^^^^^^^^^^^^^^^^^

Confirm is actually using ``fw.soleModal`` under the hood, which is queued
one after the other.

.. code-block:: javascript

    var confirm1 = fw.soleConfirm.create();
    var confirm2 = fw.soleConfirm.create();

    confirm1.show();
    confirm2.show();

    confirm1.hide(); // That's when the confirm2 will actually pop in, results are buffered

Same confirm multiple times
^^^^^^^^^^^^^^^^^^^^^^^^^^^

Because of the way ``jQuery.Deferred`` works, one single confirm instance
will resolve it's promise exactly one time. If you really need to use the same
confirm once again - just reset it.

.. code-block:: javascript

    var confirm = fw.soleConfirm.create();

    confirm.result.then(function () {
      // handle success
      // will be triggered just once
    });

    confirm.show();

    // ...
    // after the user takes his choice
    // ...

    confirm.show(); // will throw an error!
    confirm.reset();

    // you'll have to attach your listeners once again, the old one
    // will already not be around
    confirm.result.then(function () {
      // one more handler
    });

    confirm.show(); // will work just fine


Events
------

``fwEvents`` is a global object on which you can trigger or listen custom events. This way different scripts can communicate with each other.

.. code-block:: javascript

    // script-1.js

    fwEvents.on('script-2:message', function(data){
        console.log('script-1 received a message from script-2: '+ data.message);
    });

    // script-2.js

    fwEvents.trigger('script-2:message', {message: 'Hello World!'});

.. include:: /links.rst.inc

Reactive Options and Fetch Html helper
--------------------------------------

This section is a draft for an upcoming documentation for reactive option types.

For now, it documents only `fw.options.fetchHtml() <https://github.com/ThemeFuse/Unyson/pull/2723>`_
helper.

.. code-block:: javascript

    fw.options.fetchHtml(
        // An array of options
        {
            a: {
                type: 'text',
                label: 'My Option'
            },

            b: {
                type: 'password'
            }
        }, 


        // The array of default values
        {
            a: 'Hello'
        }
    ).then(function (html) {
        console.log(html);
    });

* ``fw.options.fetchHtml(options, values)`` - fetch the HTML representation for every option, returns a Promise
* ``fw.options.fetchHtml.getCacheEntryFor(options, values)`` - get current cached HTML string or false
* ``fw.options.fetchHtml.emptyCache()`` - empty cache and force each option type to be re-downloaded
