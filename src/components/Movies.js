import React, { useState, useEffect } from "react";

const Card = ({ film }) => {
  const { title, release_date, opening_crawl } = film;
  const date = new Date(release_date);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  function cutString(opening_crawl) {
    const words = opening_crawl.split(" ");
    if (words.length > 25) {
      return words.slice(0, 33).join(" ") + " ...";
    }
    return opening_crawl;
  }
  const cutText = cutString(opening_crawl);
  return (
    <div
      className='card-container'
    >
      <h1>{title}</h1>
      <p className="date">{formattedDate}</p>
      <p className='summary'>{cutText}</p>
      <a href='#'>More Info</a>
    </div>
  );
};

const Movies = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    async function fetchFilms() {
      const response = await fetch("https://swapi.dev/api/films");
      const data = await response.json();
      setFilms(data.results);
    }
    fetchFilms();
  }, []);

  return (
    <section className='movies-container'>
      {films.map((film, index) => (
        <Card film={film} key={index} />
      ))}
    </section>
  );
};

export default Movies;
