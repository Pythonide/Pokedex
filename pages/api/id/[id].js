import pokedex from '../../../pokedex.json';

export default (req, res) => {
  const pokemon = req.query.id;
  const result = pokedex.filter((p) => p.id == pokemon);
  res.status(200).json({
    result,
  });
};
