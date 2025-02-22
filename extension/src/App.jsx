import React, { useEffect, useState } from "react";

const Popup = () => {
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Request latest news analysis from background script
        chrome.runtime.sendMessage({ type: "REQUEST_LATEST_DATA" });

        // Listen for response
        chrome.runtime.onMessage.addListener((message) => {
            if (message.type === "CREDIBILITY_RESULT") {
                setNewsData(message.payload);
                setLoading(false);
            }
        });
    }, []);

    return (
        <div className="w-[300px] p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-bold">Fake News Detector</h2>

            {loading ? (
                <p className="text-gray-500">🔄 Analyzing...</p>
            ) : newsData ? (
                <div className="mt-2 p-3 border rounded-md">
                    <h3 className="text-md font-semibold">📰 {newsData.title}</h3>
                    <p className="text-gray-500">🌐 {newsData.source}</p>
                    <p className={`mt-2 font-semibold ${newsData.credibility > 50 ? "text-green-600" : "text-red-600"}`}>
                        {newsData.credibility}% Credibility
                    </p>

                    <h4 className="mt-2 font-semibold">📊 Fact-Checking Sources</h4>
                    {newsData.factCheck.length > 0 ? (
                        newsData.factCheck.map((item, index) => (
                            <p key={index} className="text-sm text-gray-600">✅ {item.source}: {item.status}</p>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No fact-checking data available.</p>
                    )}

                    <h4 className="mt-2 font-semibold">🔄 Alternative Sources</h4>
                    {newsData.alternativeSources.length > 0 ? (
                        newsData.alternativeSources.map((item, index) => (
                            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="block text-blue-600 text-sm hover:underline">
                                🔗 {item.name}
                            </a>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500">No alternative sources found.</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-500">No news data available.</p>
            )}
        </div>
    );
};

export default Popup;
