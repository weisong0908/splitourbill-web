export default {
  methods: {
    /**
     * Pushes notification to snackbar and registers it application wise
     * @param {Object} notification The notification message object
     * @param {String} notification.title The title of the notification message
     * @param {String} notification.message The body of the notification message
     * @param {String} notification.type The type of the notification message ("is-success", or "is-danger")
     */
    notify(notification) {
      this.$buefy.snackbar.open({
        message: notification.title,
        position: "is-top",
        type: notification.type
      });

      this.$store.commit("addNotification", {
        title: notification.title,
        message: notification.message,
        type: notification.type
      });
    }
  }
};
