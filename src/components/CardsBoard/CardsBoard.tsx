import { Card } from "components";
import { ColumnType, CardType } from "types/types";
import { useAppSelector } from "hooks";

interface CardProps {
  column: ColumnType;
}

export const Cards: React.FC<CardProps> = ({ column }) => {
  const cardsList = useAppSelector((state) => state.cardReducer);
  const filteredCards = cardsList.filter(
    (card: CardType) => card.columnID === column.ID
  );

  return (
    <div>
      {filteredCards.map((card: CardType) => {
        return <Card key={card.ID} card={card} column={column} />;
      })}
    </div>
  );
};
