const https = require('https');

https.get('https://api.github.com/users/raptor7197/events/public', {
    headers: { 'User-Agent': 'node.js' }
}, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const events = JSON.parse(data);
            const pushEvents = events.filter(e => e.type === 'PushEvent');
            console.log('Total PushEvents:', pushEvents.length);
            if (pushEvents.length > 0) {
                console.log('First PushEvent Payload keys:', Object.keys(pushEvents[0].payload));
                console.log('First PushEvent commits:', pushEvents[0].payload.commits);
                if (pushEvents[0].payload.commits) {
                    console.log('First commit message:', pushEvents[0].payload.commits[0]?.message);
                }
            }
        } catch (e) {
            console.error(e);
        }
    });
});
