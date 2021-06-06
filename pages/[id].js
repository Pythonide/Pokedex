import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../styles/Pokemon.module.css';
import Head from 'next/head';
import Search from '../components/Search';
import { motion } from 'framer-motion';

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/hello');
  const data = await res.json();
  const paths = data.pokedex.map((d) => {
    return {
      params: { id: d.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:3000/api/id/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const Pokemon = ({ data }) => {
  const router = useRouter();

  return (
    <>
      {data.result.map((pokemon) => {
        const id = pokemon.id;
        const num = String(id).padStart(3, '0');
        const image = '/' + num + pokemon.name.english + '.png';

        return (
          <Fragment key={pokemon.id}>
            <Head>
              <title>
                #{num} {pokemon.name.english}
              </title>
              <meta
                name="description"
                content={`Detailed stats for ${pokemon.name.english}`}
              />
              <link rel="icon" href="/huevo.png" />
            </Head>
            <div
              className={styles.wrapper}
              id={`${pokemon.type[0].toLowerCase()}`}
            >
              <div className={styles.container}>
                {/*Label*/}
                <motion.div
                  animate={{ x: [-30, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.7, ease: 'easeIn' }}
                  className={styles.label}
                >
                  <h1>{pokemon.name.english}</h1>
                  <h3>#{num}</h3>
                </motion.div>
                {/*Search*/}
                <Search />
                {/*Image*/}
                <motion.div
                  animate={{ x: [-30, 0], opacity: [0, 1] }}
                  transition={{ duration: 0.7, ease: 'easeIn' }}
                  className={styles.img_container}
                >
                  <img src={image} alt={pokemon.name.japanese} />
                  <h1>{pokemon.name.japanese}</h1>
                </motion.div>
                {/*Previous*/}
                <div className={styles.prev}>
                  <button
                    type="button"
                    onClick={() => {
                      if (id > 0) {
                        router.push(`/${id - 1}`);
                      }
                    }}
                  >
                    {'<'}
                  </button>
                </div>
                {/*Next*/}
                <div className={styles.next}>
                  <button
                    type="button"
                    onClick={() => {
                      if (id < 809) router.push(`/${id + 1}`);
                    }}
                  >
                    {'>'}
                  </button>
                </div>
                <div className={styles.empty_div}></div>
                {/*Stats*/}
                <motion.div
                  initial={{ x: 30 }}
                  animate={{ x: 0, opacity: [0, 1] }}
                  transition={{ duration: 0.7, ease: 'easeIn' }}
                  className={styles.stats}
                >
                  <div className={styles.types}>
                    {pokemon.type.map((type) => {
                      const img = '/' + type + '.png';
                      return <img src={img} alt={type} />;
                    })}
                  </div>

                  <div className={styles.base}>
                    <h2>Base Stats:</h2>
                    <div className={styles.base_stats}>
                      <h4>HP: {pokemon.base.HP}</h4>
                      <h4>ATTACK: {pokemon.base.Attack}</h4>
                      <h4>DEFENSE: {pokemon.base.Defense}</h4>
                      <h4>SP. ATTACK: {pokemon.base.Sp_Attack}</h4>
                      <h4>SP. DEFENSE: {pokemon.base.Sp_Defense}</h4>
                      <h4>SPEED: {pokemon.base.Speed}</h4>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </>
  );
};

export default Pokemon;
