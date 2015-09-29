(function ( $ ) {

	var resourceSpaceFeaturedImage = function() {

		var controller = wp.media.controller.FeaturedImage;

		wp.media.controller.FeaturedImage = controller.extend({

			initialize: function() {

				var self = this;

				wp.media.controller.FeaturedImage.__super__.initialize.apply( this );

				if ( ! wp.media.frames.resourceSpaceFeaturedImageFrame ) {

					// Bit of an odd hack. But we have to set this to a non-falsey value
					// in order to prevent infinite loop when creating the new frame.
					wp.media.frames.resourceSpaceFeaturedImageFrame = 1;

					wp.media.frames.resourceSpaceFeaturedImageFrame = wp.media({
						frame : "post",
						state : 'mexp-service-resource-space',
						resourceSpaceInsertCallback: function() {
							var selection   = self.get( 'selection' );
							var attachments = ( this.attachments.length ) ? [ this.attachments[0] ] : [];
							selection.reset( attachments );

							this.complete();
						},
					});
				}

			},

			activate: function() {

				wp.media.controller.FeaturedImage.__super__.activate.apply( this, arguments );

				// Add the stock images tab.
				this.frame.on( 'router:render:browse', this.resourceSpaceCreateTab );
				this.frame.on( 'content:render:resourceSpace', this.resourceSpaceRenderTab );

			},

			resourceSpaceCreateTab: function( routerView ) {

				routerView.set({
					resourceSpace: {
						text:     'Stock Images',
						priority: 60
					}
				});

				routerView.controller.content.mode('browse');

			},

			resourceSpaceRenderTab: function() {

				var resourceSpaceFrame = wp.media.frames.resourceSpaceFeaturedImageFrame;

				resourceSpaceFrame.open();

				// Switch content view back to browse in the original frame.
				var routerView = wp.media.frame.views.get( '.media-frame-router' )[0];
				routerView.controller.content.mode('browse');

				window.setTimeout( function() {

					// Ensure that the resource space frame is on top.
					resourceSpaceFrame.$el.closest('.media-modal').parent().appendTo( 'body' );

					// Hide all other menu options in the frame.
					resourceSpaceFrame.$el.addClass( 'hide-menu' );

				}, 1 );

				// Slightly hcky workaround because for some reason the load more
				// button doesn't exist when the event callback is attached.
				$('#resource-space-loadmore').on('click', function(e) {
					var view = wp.media.frames.resourceSpaceFrame.views.get('.media-frame-content' );
					if ( view.length ) {
						view[0].paginate(e);
					}
				} );

			},

		} );

	}

	$(document).ready( function() {
		resourceSpaceFeaturedImage()
	} );

}( jQuery ));
