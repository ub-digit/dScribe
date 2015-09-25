import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  actions: {
    sessionAuthenticationFailed: function(error) {
      this.controllerFor('login').set('error', error);
    }
  }
});

