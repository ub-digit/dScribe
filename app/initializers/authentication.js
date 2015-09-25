
console.log("debug2", "running authentication js");
import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from 'd-scribe/config/environment';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

console.log("debug", "running authentication js");
var CustomAuthenticator = Base.extend({
	restore: function(properties) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.ajax({
				type: 'GET',
				url: ENV.APP.authenticationBaseURL+'/'+properties.token
			}).then(function() {
				resolve(properties);
			}, function() {
				reject();
			});
		});
	},
	authenticate: function(credentials) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.ajax({
				type: 'POST',
				url: ENV.APP.authenticationBaseURL,
				data: JSON.stringify({
					username: credentials.identification,
					password: credentials.password
				}),
				contentType: 'application/json'
			}).then(function(response) {
				var token = response.access_token;
				Ember.run(function() {
					resolve({
						authenticated: true,
						token: token,
						username: response.user.username,
						name: response.user.name,
						can_view_users : Ember.$.inArray('view_users', response.user.role.rights) !== -1,
						can_manage_tree : Ember.$.inArray('manage_tree', response.user.role.rights) !== -1,
						can_manage_tree_root : Ember.$.inArray('manage_tree_root', response.user.role.rights) !== -1,
            can_manage_jobs : Ember.$.inArray('manage_jobs', response.user.role.rights) !== -1
					});
				});
			}, function(xhr) {
				Ember.run(function() {
					reject(xhr.responseJSON.error);
				});
			});
		});
	},
	invalidate: function() {
		return new Ember.RSVP.Promise(function(resolve) {
			resolve();
		});
	}
});

export var initialize = function(container) {
	container.register('authenticator:custom', CustomAuthenticator);
};

AuthenticatedRouteMixin.reopen({
	beforeModel: function(transition) {
		var session = this.get('session');
		var token = null;
		if(session) {
			token = session.get('token');
		}
		Ember.$.ajax({
			type: 'GET',
			url: ENV.APP.authenticationBaseURL+'/'+token
		}).then(null, function() {
			session.invalidate();
		});
		return this._super(transition);
	}
});

export default {
	name: 'authentication',
	before: 'simple-auth',
	initialize: initialize
};
