import { Card } from "components";
import { ColumnType } from "types/types";
import { useAppSelector } from "hooks";

interface CardProps {
  column: ColumnType;
}

export const Cards: React.FC<CardProps> = ({ column }) => {
  const cardsList = useAppSelector((state) => state.cardReducer);
  const filteredCards = cardsList.filter(
    (card) => card.columnID === column.ID
  );

  return (
    <div>
      {filteredCards.map((card) => {
        return <Card key={card.ID} card={card} column={column}/>;
      })}
    </div>
  );
};
