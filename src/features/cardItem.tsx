import { Card } from "../models/card"; // 型をインポート
import cardImages from "../assets/cardImages"; // 画像をインポート
import "../css/card.css"; // スタイルをインポート

// カード単体のコンポーネント
export const CardItem = ({
  card,
  onSelect,
  isSelected,
}: {
  card: Card;
  onSelect: (card: Card) => void;
  isSelected: boolean;
}) => {
  const handleClick = () => {
    onSelect(card);
  };

  const cardImage = cardImages.find((image) => image.id === card.id);
  if (!cardImage) {
    console.error(`Image not found for card: ${card.id}`);
    console.error(cardImages);
    return null; // 画像が見つからない場合は何も表示しない
  }

  return (
    <div
      className="card-item"
      onClick={handleClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "4px",
        textAlign: "center",
        width: "100%", // 幅を親要素に依存
        maxWidth: "120px",
        minWidth: "50px",
        backgroundColor: isSelected ? "#26C6DA" : "white",
        cursor: "pointer",
      }}
    >
      <img
        src={cardImage.data}
        alt={`${card.name} image`}
        style={{
          width: "100%",
          height: "auto",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "2px",
        }}
      />
      {/* <h2>{card.name}</h2> */}
      {/* <p>{cardImage.name}</p> */}
      {/* <p>Level: {card.level}</p> */}
      {/* <p>Month: {card.month}月</p> */}
      {/* <p>ID: {card.id}</p> */}
      {/* <p>State: {card.state}</p> */}
      {/* <p>isSelected: {isSelected ? "true" : "false"}</p> */}
    </div>
  );
};
