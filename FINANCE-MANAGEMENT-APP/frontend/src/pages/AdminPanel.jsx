import React, { useState, useEffect } from "react";

// Przykładowe dane artykułów
const sampleArticles = [
  {
    id: 1,
    title: "Jak oszczędzać pieniądze na codzień",
    content: "Treść artykułu 1...",
  },
  {
    id: 2,
    title: "Najlepsze sposoby na inwestowanie",
    content: "Treść artykułu 2...",
  },
  // Dodatkowe artykuły...
];

const AdminPanel = () => {
  const [articles, setArticles] = useState(sampleArticles);

  // Funkcja do dodawania nowego artykułu
  const addArticle = () => {
    const newArticle = {
      id: articles.length + 1,
      title: "Tytuł nowego artykułu",
      content: "Treść nowego artykułu...",
    };
    setArticles([...articles, newArticle]);
  };

  // Funkcja do usuwania artykułu
  const deleteArticle = (id) => {
    const updatedArticles = articles.filter((article) => article.id !== id);
    setArticles(updatedArticles);
  };

  // Funkcja do modyfikowania artykułu (na potrzeby przykładu, zmienia tylko tytuł)
  const modifyArticle = (id) => {
    const modifiedArticles = articles.map((article) => {
      if (article.id === id) {
        return { ...article, title: "Zmieniony tytuł artykułu" };
      }
      return article;
    });
    setArticles(modifiedArticles);
  };

  // Symulacja pobierania danych z API z ciekawostkami finansowymi (zakładając odpowiedni format)
  useEffect(() => {
    // Ta część kodu byłaby zastąpiona rzeczywistym wywołaniem API
    // Przykładowe pobieranie danych z API (symulacja)
    const fetchArticlesFromAPI = async () => {
      // Tutaj pobierane byłyby faktyczne artykuły z zewnętrznego API
      // Na potrzeby przykładu, aktualizujemy dane co 10 sekund
      setTimeout(() => {
        const newArticleFromAPI = {
          id: articles.length + 1,
          title: "Nowy artykuł z API",
          content: "Treść nowego artykułu z API...",
        };
        setArticles([...articles, newArticleFromAPI]);
      }, 10000); // Symulacja odświeżania co 10 sekund
    };

    fetchArticlesFromAPI();
  }, [articles]);

  return (
    <div className="admin-panel">
      <h1>Panel Administratora</h1>
      <button onClick={addArticle}>Dodaj Artykuł</button>
      <div className="article-list">
        {articles.map((article) => (
          <div key={article.id}>
            <h3>{article.title}</h3>
            <p>{article.content}</p>
            <button onClick={() => deleteArticle(article.id)}>Usuń</button>
            <button onClick={() => modifyArticle(article.id)}>Modyfikuj</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
