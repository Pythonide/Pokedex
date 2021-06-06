import pokedex from '../../../pokedex.json';

export default (req, res) => {
  const pokemon = req.query.name;
  const result = pokedex.filter((p) => p.name.english === pokemon);
  res.status(200).json({
    result,
  });
};
