const mongoose = require("mongoose");
const db = require("../models");
const FAQ = require("../models/FAQ");
const Blog = require("../models/Blog");

exports.formsignUp = (req, res) => {
	// let data = JSON.parse(req.body.data);
	//const signup = FormSignup(data);
	//db.FormSignup.create(signup);
	//res.status(200).json("Form Send...");
	//db.disconnect();
};

exports.genTicket = async (req, res) => {
	var bookingAlreadyExists = false;
	const getTicketNo = (num) => {
		return String(num).padStart(6, "0"); // '000001'
	};

	let data = {
		organizer_id: JSON.parse(req.body.org_id),
		event_id: JSON.parse(req.body.event_id),
		attendee_id: JSON.parse(req.body.user_id),
	};

	db.Ticket.findOne({
		event_id: data.event_id,
		attendee_id: data.attendee_id,
	}).then((result) => {
		if (result === null) {
			try {
				db.Event.findOne({ _id: data.event_id }).then(async (event) => {
					const newTicketNo = Number(event.tickets_sold) + 1;
					await db.Event.findOneAndUpdate(
						{ _id: data.event_id },
						{ $set: { tickets_sold: getTicketNo(newTicketNo) } },
						{ upsert: false, new: true },
						(err, resp) => {
							if (err) {
								res.send(`error because: ${err}`);
							} else {
								db.Ticket.create(
									new Ticket({
										organizer_id: data.organizer_id,
										attendee_id: data.attendee_id,
										event_id: data.event_id,
										ticket_no: resp.tickets_sold,
										month: new Date().getMonth(),
									})
								).then((ticketRes) =>
									res.status(200).json({ ticketRes: ticketRes, eventRes: resp })
								);
							}
						}
					);
				});
			} catch (e) {
				console.log(String(e));
			}
		} else res.status(200).json(false); //send false if ticket is already booked(Exists in database)
	});
};

exports.generateEvent = (req, res) => {
	db.Event.create(
		new Event({
			organizer_id: req.body.id,
			title: req.body.title,
			hostingPlatform: req.body.hostingPlatform,
			category: req.body.category,
			eventType: req.body.eventType,
			webURL: req.body.webURL,
			description: req.body.description,
			moreinfo: req.body.moreinfo,
			start_date: req.body.dateStart,
			end_date: req.body.dateEnd,
			start_time: req.body.timeStart,
			end_time: req.body.timeEnd,
			venue: req.body.venue,
			venue_address: req.body.venueAddress,
			city: req.body.city,
			state: req.body.state,
			zipcode: req.body.zipcode,
			country: req.body.country,
			images: req.file,
			tickets_sold: "000000",
			updated_at: new Date(),
		}),
		(err, result) => {
			if (err) {
				res.send({ error: `error in Updating Event because: ${err}` });
			} else if (result) {
				res.status(200).json({ result: result });
			} else
				res.send({ error: `error in Updating Event because else: ${err}` });
		}
	);
};

exports.updateEvent = async (req, res) => {
	await db.Event.findOneAndUpdate(
		{ _id: req.body.eventId },
		{
			$set: {
				organizer_id: req.body.id,
				title: req.body.title,
				hostingPlatform: req.body.hostingPlatform,
				eventType: req.body.eventType,
				category: req.body.category,
				webURL: req.body.webURL,
				description: req.body.description,
				moreinfo: req.body.moreinfo,
				start_date: req.body.dateStart,
				end_date: req.body.dateEnd,
				start_time: req.body.timeStart,
				end_time: req.body.timeEnd,
				venue: req.body.venue,
				venue_address: req.body.venueAddress,
				city: req.body.city,
				state: req.body.state,
				zipcode: req.body.zipcode,
				country: req.body.country,
				images: req.file,
				country: req.body.country,
				updated_at: new Date(),
			},
		},
		{ upsert: false, new: true },
		(err, result) => {
			if (err) {
				res.send({ error: `error in Updating Event because: ${err}` });
			} else if (result) {
				res.status(200).json({ result: result });
			} else
				res.send({ error: `error in Updating Event at else because : ${err}` });
		}
	);
};

exports.generateSite = (req, res) => {
	console.log("generateSite ran");
	db.Site.findOne({ organizer_id: req.body.id }, (err, result) => {
		//Check if data exists or not
		if (err) {
			res.send({ error: e });
		}
		if (result === null) {
			////Create if data exists
			try {
				db.Site.create(
					new Site({
						organizer_id: req.body.id,
						name: req.body.name,
						slogan: req.body.slogan,
						logo: req.file,
					})
				).then((resp) => res.send("Data Saved"));
			} catch (e) {
				res.send({ error: e });
			}
		} else if (result._id) {
			//update if data exists
			db.Site.updateOne(
				{ organizer_id: req.body.id },
				{
					$set: {
						name: req.body.name,
						slogan: req.body.slogan,
						logo: req.file,
					},
				},
				{ upsert: false },
				(err, result) => {
					err
						? res.send({ error: "error in updating data" })
						: res.send("Site Data Updated");
				}
			); //updating Ends
		}
	});
};

exports.generateSiteSocials = (req, res) => {
	data = JSON.parse(req.body.data);

	db.Social.findOne({ organizer_id: data.id }, (err, result) => {
		if (err) {
			res.send({ error: e });
		}
		if (result === null) {
			try {
				db.Social.create(
					new Social({
						organizer_id: data.id,
						facebook: data.facebook,
						instagram: data.instagram,
						youtube: data.youtube,
						twitter: data.twitter,
						linkedIn: data.linkedIn,
					})
				).then((resp) => res.send("Data Saved"));
			} catch (e) {
				res.send({ error: e });
			}
		} else if (result._id) {
			db.Social.updateOne(
				{ organizer_id: data.id },
				{
					$set: {
						facebook: data.facebook,
						instagram: data.instagram,
						youtube: data.youtube,
						twitter: data.twitter,
						linkedIn: data.linkedIn,
					},
				},
				{ upsert: false },
				(err, result) => {
					err
						? res.send({ error: "error in updating data" })
						: res.send("Social Media's Data Updated");
				}
			); //updating Ends
		}
	}); //findOne
};

exports.generateFAQs = (req, res) => {

	const data = JSON.parse(req.body.data);
	const questions = [];
	const answers = [];
	questions[0] = data.q1;
	questions[1] = data.q2;
	questions[2] = data.q3;
	questions[3] = data.q4;
	questions[4] = data.q5;
	answers[0] = data.a1;
	answers[1] = data.a2;
	answers[2] = data.a3;
	answers[3] = data.a4;
	answers[4] = data.a5;

	db.FAQ.create(
		new FAQ({
			organizer_id: req.params.org_id,
			questions: questions,
			answers: answers,
			updated_at: new Date(),
		}),
		(err, result) => {
			if (result) {

				res.status(200).json({ result: "FAQs Saved" });
			} else if (err) {
				res.status(400).json({ error: err });
			} else res.status(400).json({ error: "Error creating FAQs @else" });
		}
	);
};
exports.generateBlog = (req, res) => {
	const data = JSON.parse(req.body.data);
	db.Blog.create(
		new Blog({
			organizer_id: data.org_id,
			title: data.title,
			details: data.details,
			updated_at: new Date(),
		}),
		(err, result) => {
      
			if (result) {
				res.status(200).json({ result: "Blog Saved" });
			} else if (err) {
				res.status(400).json({ error: err });
			} else res.status(400).json({ error: "Error creating Blog @else" });
		}
	);
};
