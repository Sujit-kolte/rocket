// Instagram Live Follower Count (Using SocialCounts API)
async function getInstagramFollowers() {
    try {
        const response = await fetch("https://api.socialcounts.org/instagram-live/stesrocketry");
        const data = await response.json();
        document.getElementById("insta-followers").innerText = data.followerCount;
    } catch (error) {
        console.error("Error fetching Instagram followers:", error);
    }
}

// YouTube Live Subscriber Count
async function getYouTubeSubscribers() {
    try {
        const response = await fetch("https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCVTnOGlyfUj11d11QVb5Z2Q&key=AIzaSyCbMIHyQ9O-yJNtmEeBHf9snNqWzONCawQ");
        const data = await response.json();
        document.getElementById("youtube-subscribers").innerText = data.items[0].statistics.subscriberCount;
    } catch (error) {
        console.error("Error fetching YouTube subscribers:", error);
    }
}

// LinkedIn Live Follower Count (For Company Pages Only)
async function getLinkedInFollowers() {
    try {
        const response = await fetch("https://api.linkedin.com/v2/organizationalEntityFollowerStatistics?q=organizationalEntity&organizationalEntity=urn:li:organization:YOUR_COMPANY_ID", {
            headers: { "Authorization": "Bearer YOUR_ACCESS_TOKEN" }
        });
        const data = await response.json();
        document.getElementById("linkedin-followers").innerText = data.elements[0].followerCounts.totalFollowerCount;
    } catch (error) {
        console.error("Error fetching LinkedIn followers:", error);
    }
}

// Update follower counts every 5 seconds
setInterval(() => {
    getInstagramFollowers();
    getYouTubeSubscribers();
    getLinkedInFollowers();
}, 5000);

// Initial call
getInstagramFollowers();
getYouTubeSubscribers();
getLinkedInFollowers();