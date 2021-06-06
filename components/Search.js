import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Pokemon.module.css';

const Search = () => {
  const [searchName, setSearchName] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const search = searchName.charAt(0).toUpperCase() + searchName.slice(1);
    const res = await fetch(`http://localhost:3000/api/name/${search}`);
    const data = await res.json();
    let pokeId = 0;
    pokeId = data.result.map((i) => {
      return i.id;
    });
    router.push(`/${pokeId}`);
  };
  return (
    <form className={styles.search} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="search"
        placeholder="Search Pokemon"
        onChange={(e) => {
          setSearchName(e.target.value);
        }}
      />
      <button type="submit">Go</button>
    </form>
  );
};

export default Search;
