module.exports = {
	Sign: require("./sign_controller"),
	Generate: require("./generate_controller"),
	Events: require("./events_controller"),
	Dashboard: require("./dashboard_controller"),
	Ticket: require("./tickets_controller"),
	Blog: require("./blog_controller"),
	Organizer: require("./superAdminController/organizer_controller"),
	Attendee: require("./superAdminController/attendee_controller"),
};
