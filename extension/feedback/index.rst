Feedback
========

The extension adds the possibility for users to leave feedback impressions about a post (product, article, etc).
This system can be activated for some post types, and replaces the default comments system.

.. contents::
    :local:
    :backlinks: top

Helpers
-------

* ``fw_ext_feedback()`` - displays summary information about the feedback received for a specific post.

Views
-----

* ``reviews.php`` - the template for displaying reviews.

Hooks
-----

* ``fw_ext_feedback`` - allows you to add summary information about the feedback received for a specific post.
* ``fw_ext_feedback_listing_walker`` - provides the ability to send a custom walker class object to use the when rendering the reviews.
 
.. code-block:: php

	/** @internal */
    function _filter_fw_ext_feedback_listing_walker() {
		require dirname( __FILE__ ) . '/includes/extends/class-fw-feedback-stars-walker.php';

		return new FW_Feedback_Stars_Walker(); 
	} 
	add_filter( 'fw_ext_feedback_listing_walker', '_filter_fw_ext_feedback_listing_walker' );


Stars Feedback
--------------

The ``feedback-stars`` is a child extension that allows visitors to appreciate a post using star rating.

Helpers
^^^^^^^

* ``fw_ext_feedback_stars_get_post_rating()`` - returns brief information about the post’s votes.

* ``fw_ext_feedback_stars_get_post_detailed_rating()`` - returns detailed information about the post's votes.

Views
^^^^^

* ``rate.php`` - display the stars in the form of introduction of review.

* ``rate.php`` - displays information about the votes allocated to a post.

* ``rate.php`` - output a single review in the HTML5 format.

* ``rate.php`` - output a single review.
