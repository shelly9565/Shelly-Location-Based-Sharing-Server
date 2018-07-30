const webpush = require('web-push');
let USER_SUBSCRIPTIONS = [];

exports.addPushSubscriber = (req, res) => {
    const sub = req.body;
    console.log('Received Subscription on the server: ', sub);
    USER_SUBSCRIPTIONS.push(sub);
    res.status(200).json({message: "Subscription added successfully."});
}

exports.sendNotification = (req, res) => {

    const vapidKeys = {
        "publicKey": "BMx3DoXNcg8u1-Oc8nQEZX8How6o6v_UNsbtUpN5wH4UNCZVK3pXWYjtFL0Pbf0Vw8aptJXEH6-axMGS7_UYZME",
        "privateKey": "SegiqwZOCxKqu2St8eHG8IuCZKY666Sxx_MxPfqHdmg"}

    webpush.setVapidDetails(
        'mailto:example@yourdomain.org',
        vapidKeys.publicKey,
        vapidKeys.privateKey
    );

    console.log('Total subscriptions', USER_SUBSCRIPTIONS.length);
    // sample notification payload
    const notificationPayload = {
        "notification": {
            "title": "Angular News",
            "body": "Newsletter Available!",
            "icon": "assets/main-page-logo-small-hat.png",
            "vibrate": [100, 50, 100],
            "data": {
                "dateOfArrival": Date.now(),
                "primaryKey": 1
            },
            "actions": [{
                "action": "explore",
                "title": "Go to the site"
            }]
        }
    };
    Promise.all(USER_SUBSCRIPTIONS.map(sub => webpush.sendNotification(
        sub, JSON.stringify(notificationPayload) )))
        .then(() => res.status(200).json({message: 'Newsletter sent successfully.'}))
        .catch(err => {
            console.error("Error sending notification, reason: ", err);
            res.sendStatus(500);
        });
}