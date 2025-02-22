let latestNewsAnalysis = null; // Store the latest analyzed news

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "NEWS_DATA") {
        console.log("Received news data:", message.payload);

        analyzeNewsWithAI(message.payload).then((credibilityData) => {
            latestNewsAnalysis = credibilityData; // Store the latest analysis

            // Send the analysis results to the popup UI
            chrome.runtime.sendMessage({
                type: "CREDIBILITY_RESULT",
                payload: latestNewsAnalysis
            });
        });
    } else if (message.type === "REQUEST_LATEST_DATA") {
        // Send the stored analysis data to the popup UI if available
        if (latestNewsAnalysis) {
            chrome.runtime.sendMessage({
                type: "CREDIBILITY_RESULT",
                payload: latestNewsAnalysis
            });
        }
    }
});

// Function to analyze news credibility using an AI model
async function analyzeNewsWithAI(newsData) {
    try {
        let AI_MODEL_URL = "http://localhost:5000/analyze"; // Replace with actual AI endpoint

        let response = await fetch(AI_MODEL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: newsData.articleText })
        });

        let data = await response.json();

        return {
            title: newsData.title,
            source: newsData.source,
            credibility: data.credibility_score || 50, // AI-determined credibility %
            factCheck: data.fact_check_sources || [],
            alternativeSources: data.alternative_sources || []
        };
    } catch (error) {
        console.error("Error contacting AI model:", error);
        return { error: "AI Analysis Failed" };
    }
}
