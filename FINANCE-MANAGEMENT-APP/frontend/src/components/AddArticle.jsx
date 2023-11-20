import React, { useState, useEffect } from "react";

const RandomArticles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          "https://randomapi.com/api/your-ref-id?key=P57V-5G2J-SYAN-XTHL&results=5"
        ); // Zastąp 'your-ref-id' i 'your-api-key' swoimi wartościami

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setArticles(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Losowe artykuły</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <strong>{article.title}</strong>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RandomArticles;
