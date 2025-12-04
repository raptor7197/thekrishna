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

            const eventWithCommits = pushEvents.find(e => e.payload.commits && e.payload.commits.length > 0);
            if (eventWithCommits) {
                console.log('Found event with commits!');
                console.log('Repo:', eventWithCommits.repo.name);
                console.log('Message:', eventWithCommits.payload.commits[0].message);
            } else {
                console.log('No events with commits found.');
                if (pushEvents.length > 0) console.log('First payload:', pushEvents[0].payload);
            }
        } catch (e) {
            console.error(e);
        }
    });
});
