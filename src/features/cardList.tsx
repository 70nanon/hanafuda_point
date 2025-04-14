import { Card, Month } from "../models/card"; // 型をインポート
import { CardItem } from "./cardItem"; // カードアイテムコンポーネントをインポート
import "../css/card.css"; // スタイルをインポート

// カードリストコンポーネント
export const CardList = ({
  cardList,
  selectedCards,
  handleCardSelect,
}: {
  cardList: { month: Month; cards: Card[] }[];
  selectedCards: Card[];
  handleCardSelect: (card: Card) => void;
}) => {
  return (
    <div>
      <div className="card-grid">
        {/* カードリストを表示 */}
        {cardList.map(({ month, cards }) => (
          <div key={month} style={{ marginBottom: "16px", marginLeft: "10px" }}>
            <div>
              <h2
                style={{
                  textAlign: "start",
                  dominantBaseline: "middle",
                  minWidth: "20px",
                }}
              >
                {month}月
              </h2>
              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  gridTemplateColumns: "repeat(4, minmax(80px, 1fr))", // スマホ用の狭いレイアウト
                }}
              >
                {cards.map((card, index) => (
                  <CardItem
                    key={index}
                    card={card}
                    onSelect={handleCardSelect}
                    isSelected={selectedCards.some((c) => c.id === card.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};