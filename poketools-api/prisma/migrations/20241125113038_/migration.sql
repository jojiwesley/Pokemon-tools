-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "abilities" TEXT,
ADD COLUMN     "boost" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "effectiveness" JSONB,
ADD COLUMN     "element" TEXT,
ADD COLUMN     "evolutionStone" TEXT,
ADD COLUMN     "evolutions" JSONB,
ADD COLUMN     "level" INTEGER,
ADD COLUMN     "material" TEXT,
ADD COLUMN     "moves" JSONB,
ADD COLUMN     "pokemonNumber" INTEGER,
ADD COLUMN     "url" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
