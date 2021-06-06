import pokedex from '../../pokedex.json';

export default (req, res) => {
  res.status(200).json({
    pokedex,
  });
};
