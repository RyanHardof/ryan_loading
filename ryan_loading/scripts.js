// Image Data: Includes only URLs
const imagesData = [
    "https://cdn.discordapp.com/attachments/1274883633148198922/1274950323445829735/iJe3uDV.jpg?ex=66d1f544&is=66d0a3c4&hm=2a8f68733b6b6fb1c76b34938a1e0d08f482560ea7a0703a300e14e564ff08e0&",
    "https://cdn.discordapp.com/attachments/652818388577550336/1278521672244134003/image.png?ex=66d26d18&is=66d11b98&hm=b5ab63373425c27881a558a223f561492e33ad4402e752196b88a5d6bae7f53c&",
    "https://cdn.discordapp.com/attachments/652818388577550336/1278411623408730143/image.png?ex=66d2af5a&is=66d15dda&hm=78718a94706a7c3707d506067c19b91e8d0d86f4469684ba4ed94cc95a748caa&"
];

// Mapping of Discord IDs to usernames
const userIdToNameMap = {
    "1274883633148198922": "Ryan Hard",
    "652818388577550336": "v0rgi"
};

let currentImageIndex = 0;
const slideshowImage = document.getElementById('slideshow-image');
const imageDetails = document.getElementById('image-details');
const backgroundAudio = document.getElementById('background-audio');

// Set initial volume to 15%
backgroundAudio.volume = 0.15; // 15% volume

// Function to extract the uploader ID and timestamp from the URL
function extractDetailsFromUrl(url) {
    // Regex to extract Discord attachment parts
    const regex = /attachments\/(\d+)\/(\d+)\//;
    const matches = url.match(regex);

    if (!matches || matches.length < 3) {
        return { uploader: "Unknown", date: "Unknown" };
    }

    const uploaderId = matches[1];
    const timestamp = matches[2];

    // Convert the timestamp to a human-readable date (UNIX epoch in Discord IDs)
    const date = new Date(parseInt(timestamp, 10) / 4194304 + 1420070400000);
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    // Get the uploader name from the mapping, or use the ID if not found
    const uploaderName = userIdToNameMap[uploaderId] || `User ID: ${uploaderId}`;

    return { uploader: uploaderName, date: formattedDate };
}

// Function to change the image and update details
function changeImage() {
    currentImageIndex = (currentImageIndex + 1) % imagesData.length;
    const currentImageUrl = imagesData[currentImageIndex];
    const { uploader, date } = extractDetailsFromUrl(currentImageUrl);

    slideshowImage.src = currentImageUrl;
    imageDetails.innerText = `Posted by: ${uploader} on ${date}`;
}

// Set initial image and details and start changing every 10 seconds
const initialImageUrl = imagesData[currentImageIndex];
const { uploader, date } = extractDetailsFromUrl(initialImageUrl);
slideshowImage.src = initialImageUrl;
imageDetails.innerText = `Posted by: ${uploader} on ${date}`;
setInterval(changeImage, 10000);

// Function to mute/unmute audio on pressing the space bar
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        backgroundAudio.muted = !backgroundAudio.muted;
    }
});
