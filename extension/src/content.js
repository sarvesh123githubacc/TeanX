function extractNewsData() {
    let title = document.querySelector("h1")?.innerText || "Untitled";
    let source = window.location.hostname; // Extract domain name
    let articleText = "";

    // Extract text from paragraphs
    let paragraphs = document.querySelectorAll("article p, div p");
    paragraphs.forEach((p) => {
        articleText += p.innerText + " ";
    });

    if (articleText.length < 50) {
        console.warn("Insufficient news content extracted.");
        return;
    }

    // Send extracted data to background.js for AI analysis
    chrome.runtime.sendMessage({
        type: "NEWS_DATA",
        payload: { title, source, articleText }
    });

    console.log("News data sent for analysis:", { title, source });
}

// Run extraction after page loads
window.addEventListener("load", () => {
    setTimeout(extractNewsData, 3000); // Delay for content to load
});
