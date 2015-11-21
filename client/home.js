Template.body.events({
	"click .turnOnButton": function() {
		Meteor.call("setLightOn", true);
	},
	"click .turnOffButton": function() {
		Meteor.call("setLightOn", false);
	}
})