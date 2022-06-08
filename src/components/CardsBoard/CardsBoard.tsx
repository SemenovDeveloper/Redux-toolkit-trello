import { CardCard } from "components/Card";
import { ColumnType } from "types/types";
import { useAppSelector } from "hooks/redux";

interface CardProps {
  columnData: ColumnType;
}

export const Cards: React.FC<CardProps> = ({ columnData }) => {
  const cardsList = useAppSelector((state) => state.cardReducer);
  const filteredCards = cardsList.filter(
    (card) => card.columnID === columnData.ID
  );

  return (
    <div>
      {filteredCards.map((card) => {
        return <CardCard key={card.ID} card={card} />;
      })}
    </div>
  );
};
