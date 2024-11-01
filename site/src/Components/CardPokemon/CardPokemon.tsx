// components/PokemonCard.tsx
type PokemonCardProps = {
  name: string;
  url: string;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, url }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">{name}</h2>
      <p>{url}</p>
    </div>
  );
};

export default PokemonCard;