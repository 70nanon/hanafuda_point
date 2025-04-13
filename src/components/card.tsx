import { useState } from "react";

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Level = 20 | 10 | 5 | 1;

class Card {
  id: number;
  name: string;
  level: Level;
  month: Month;
  state: "active" | "inactive";
  isSelected: boolean;

  constructor(id: number, name: string, level: Level, month: Month) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.month = month;
    this.state = "active";
    this.isSelected = false;
  }
}

// Monthごとに存在しうるLevelを定義
type MonthLevelMap = Record<Month, Level[]>;
const monthLevelMap: MonthLevelMap = {
  1: [20, 5, 1, 1],
  2: [10, 5, 1, 1],
  3: [20, 5, 1, 1],
  4: [10, 5, 1, 1],
  5: [10, 5, 1, 1],
  6: [10, 5, 1, 1],
  7: [10, 5, 1, 1],
  8: [20, 10, 1, 1],
  9: [10, 5, 1, 1],
  10: [10, 5, 1, 1],
  11: [20, 10, 5, 1],
  12: [20, 1, 1, 1],
};

type MonthIdMap = {
  [key in Month]: number[];
};
const monthIdMap: MonthIdMap = {
  1: [1, 2, 3, 4],
  2: [5, 6, 7, 8],
  3: [9, 10, 11, 12],
  4: [13, 14, 15, 16],
  5: [17, 18, 19, 20],
  6: [21, 22, 23, 24],
  7: [25, 26, 27, 28],
  8: [29, 30, 31, 32],
  9: [33, 34, 35, 36],
  10: [37, 38, 39, 40],
  11: [41, 42, 43, 44],
  12: [45, 46, 47, 48],
};

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

  const calculateScore = (cards: Card[]) => {
    // スコア計算のロジックをここに実装
    return cards.reduce((acc, card) => acc + card.level * card.month, 0); // 仮の計算式
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
      <h1 style={{ textAlign: "center" }}>合計点</h1>
      <h2 style={{ textAlign: "center" }}>{calculateScore(selectedCards)}点</h2>

      {/* 選択されたカードのID一覧を表示 */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <h3>選択されたカードのID:</h3>
        <p>{selectedCards.map((card) => card.id).join(", ") || "なし"}</p>
      </div>

      {cardList.map(({ month, cards }) => (
        <div key={month} style={{ marginBottom: "16px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
              overflowX: "auto",
            }}
          >
            <h2
              style={{
                textAlign: "center",
                dominantBaseline: "middle",
                minWidth: "70px",
              }}
            >
              {month}月
            </h2>
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
      ))}
    </div>
  );
};

// カード単体のコンポーネント
const CardItem = ({
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

  return (
    <div
      className="card-item"
      onClick={handleClick}
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        minWidth: "200px",
        backgroundColor: isSelected ? "#e0f7fa" : "white",
        cursor: "pointer",
      }}
    >
      <h2>{card.name}</h2>
      <p>Level: {card.level}</p>
      <p>Month: {card.month}月</p>
      <p>ID: {card.id}</p>
      <p>State: {card.state}</p>
      <p>isSelected: {isSelected ? "true" : "false"}</p>
    </div>
  );
};

// カードリストを構築する関数
const buildCardList = () => {
  const months = [...new Array(12).keys()].map((number) => ++number);
  return months
    .map((number) => {
      const month = number as Month;
      // monthLevelMapからlevelを取得
      const levels = monthLevelMap[month];
      const cards = levels.map((level, i) => {
        const card = new Card(
          monthIdMap[month][i],
          `${month}-${i + 1}`,
          level,
          month
        );
        return card;
      });
      return {
        month: month,
        cards: cards,
      };
    })
    .flat();
};
