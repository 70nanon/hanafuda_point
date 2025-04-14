import { useState } from "react";
import { Card } from "../models/card"; // 型をインポート
import { buildCardList, calculateScore, getHandList } from "../utils/cardUtil"; // ユーティリティ関数をインポート
import { CardList } from "../features/cardList"; // カードリストコンポーネントをインポート
import "../css/card.css"; // スタイルをインポート

export const CardComponent = () => {
  // カードリストの状態を管理
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const handleCardSelect = (card: Card) => {
    setSelectedCards((prev) => {
      if (prev.some((c) => c.id === card.id)) {
        // すでに選択されている場合は、selectedCardsから削除
        card.isSelected = false;
        return prev.filter((c) => c.id !== card.id);
      } else {
        // 新たに選択された場合は、selectedCardsに追加
        card.isSelected = true;
        return [...prev, card];
      }
    });
  };

  /* 
    const cardList: CardList = [
      { month: 1, cards: [new Card(1, "Card 1", 20, 1), new Card(2, "Card 2", 10, 1)] },
      { month: 2, cards: [new Card(3, "Card 3", 5, 2), new Card(4, "Card 4", 1, 2)] },
      // ... 他の月のカードも同様に追加
    ];
  */
  const cardList = buildCardList(); // 月ごとのカードリストを初期化

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>合計点</h2>
      <h3 style={{ textAlign: "center" }}>
        {calculateScore(selectedCards)}点
        {calculateScore(selectedCards) >= 7 && (
          <span style={{ fontSize: "0.7em", color: "red" }}>
            (7点以上の場合は点数2倍)
          </span>
        )}
      </h3>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h2>成立した役:</h2>
        <p>
          {getHandList(selectedCards).map((hand) => (
            <span key={hand.name} style={{ marginRight: "8px" }}>
              {hand.name}({hand.score}点)
            </span>
          ))}
        </p>
      </div>

      {/* 選択されたカードのID一覧を表示 */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h3>選択されたカードのID:</h3>
        <p>{selectedCards.map((card) => card.id).join(", ") || "なし"}</p>
      </div>

      <CardList
        cardList={cardList}
        selectedCards={selectedCards}
        handleCardSelect={handleCardSelect}
      />
    </div>
  );
};

