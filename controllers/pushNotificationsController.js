const https = require('https');

module.exports = {


    sendNotification(token, data) {

        const notification = JSON.stringify({
            'to': token,
            'data': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'notification': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'priority': 'high',
            'ttl': '4500s'
        });

        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            port: 443,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAw61n4HU:APA91bHW2YjgDIUAvPCuMFGzqm79LpNW4_EEArz4dDJe6_INoMp1f8Ddc22UCj1M64Q8O7SAWictOgizpIRu7kj_nnBmq52ppkddc5tmex0JIQ9EbbIcfOsZn30KqpqVTaTkqJd8VKaa',
            }
        }

        const req = https.request(options, (res) => {
            console.log('STATUS CODE FIREBASE', res.statusCode);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (error) => {
            console.log('ERROR DE FIREBASE MESSAGING', error);
        });

        req.write(notification);
        req.end();

    },

    sendNotificationToMultipleDevices(tokens, data) {

        const notification = JSON.stringify({
            'registration_ids': tokens,
            'data': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'notification': {
                'click_action': 'FLUTTER_NOTIFICATION_CLICK',
                'title': data.title,
                'body': data.body,
                'id_notification': data.id_notification,
            },
            'priority': 'high',
            'ttl': '4500s'
        });

        const options = {
            hostname: 'fcm.googleapis.com',
            path: '/fcm/send',
            method: 'POST',
            port: 443,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAw61n4HU:APA91bHW2YjgDIUAvPCuMFGzqm79LpNW4_EEArz4dDJe6_INoMp1f8Ddc22UCj1M64Q8O7SAWictOgizpIRu7kj_nnBmq52ppkddc5tmex0JIQ9EbbIcfOsZn30KqpqVTaTkqJd8VKaa',
            }
        }

        const req = https.request(options, (res) => {
            console.log('STATUS CODE FIREBASE', res.statusCode);

            res.on('data', (d) => {
                process.stdout.write(d);
            });
        });

        req.on('error', (error) => {
            console.log('ERROR DE FIREBASE MESSAGING', error);
        });

        req.write(notification);
        req.end();

    }



}