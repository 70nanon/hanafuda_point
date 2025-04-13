import { useState } from "react";
import cardImages from "../assets/cardImages"; // 画像をインポート

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type Level = 20 | 10 | 5 | 1;

type HandList = {
  score: number;
  name:
    | "五光"
    | "四光"
    | "雨四光"
    | "三光"
    | "花見で一杯"
    | "月見で一杯"
    | "猪鹿蝶"
    | "赤短"
    | "青短"
    | "タネ"
    | "タネ+"
    | "タン"
    | "タン+"
    | "カス"
    | "カス+";
};

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

type MonthIdMap = { [key in Month]: number[] };
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
        width: "50px",
        minWidth: "100px",
        backgroundColor: isSelected ? "#b2ebf2" : "white",
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
      <p>Level: {card.level}</p>
      {/* <p>Month: {card.month}月</p> */}
      {/* <p>ID: {card.id}</p> */}
      {/* <p>State: {card.state}</p> */}
      {/* <p>isSelected: {isSelected ? "true" : "false"}</p> */}
    </div>
  );
};

const CardList = ({
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
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(2, 1fr)", // 2列のグリッド
        }}
      >
        {/* カードリストを表示 */}
        {cardList.map(({ month, cards }) => (
          <div key={month} style={{ marginBottom: "16px", marginLeft: "10px" }}>
            <div>
              {/* <h2
                style={{
                  textAlign: "start",
                  dominantBaseline: "middle",
                  minWidth: "20px",
                }}
              >
                {month}月
              </h2> */}
              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  gridTemplateColumns: "repeat(4, 1fr)", // 4列のグリッド
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

// カードのスコアを計算する関数
const calculateScore = (cards: Card[]) => {
  const handList = getHandList(cards);
  let score = handList.reduce((acc, hand) => acc + hand.score, 0);
  if (score >= 7) {
    score = score * 2; // スコアが7点を超える場合、2倍にする
  }
  return score;
};

// 手役を取得する関数
const getHandList = (cards: Card[]) => {
  const handList: HandList[] = [];
  const levelCardsMap: { [key in Level]: Card[] } = {
    20: [],
    10: [],
    5: [],
    1: [],
  };
  cards.forEach((card) => {
    levelCardsMap[card.level].push(card);
  });

  // 五光
  if (levelCardsMap[20].length === 5) {
    handList.push({ score: 10, name: "五光" });
  }

  // 四光, 雨四光
  if (levelCardsMap[20].length === 4) {
    if (levelCardsMap[20].find((card) => card.month === 11)) {
      handList.push({ score: 7, name: "雨四光" });
    } else {
      handList.push({ score: 8, name: "四光" });
    }
  }

  // 三光
  if (levelCardsMap[20].length === 3) {
    handList.push({ score: 5, name: "三光" });
  }

  // 花見で一杯, 月見で一杯
  if (levelCardsMap[10].find((card) => card.month === 9)) {
    if (levelCardsMap[20].find((card) => card.month === 3)) {
      handList.push({ score: 5, name: "花見で一杯" });
    }
    if (levelCardsMap[20].find((card) => card.month === 8)) {
      handList.push({ score: 5, name: "月見で一杯" });
    }
  }

  // 猪鹿蝶
  const inosikaList = [6, 7, 10];
  if (
    inosikaList.every((month) =>
      levelCardsMap[10].some((card) => card.month === month)
    )
  ) {
    handList.push({ score: 5, name: "猪鹿蝶" });
  }

  // タネ
  if (levelCardsMap[10].length >= 5) {
    const overCount = levelCardsMap[10].length - 5;
    if (overCount > 0) {
      // 5枚以上のタネがある場合、5枚を超えた分だけ点数を加算
      handList.push({ score: 1 + overCount, name: "タネ+" });
    } else {
      // 5枚のタネがある場合
      handList.push({ score: 1, name: "タネ" });
    }
  }

  // 赤短, 青短
  const akatanMonths = [1, 2, 3];
  if (
    akatanMonths.every((month) =>
      levelCardsMap[5].some((card) => card.month === month)
    )
  ) {
    handList.push({ score: 5, name: "赤短" });
  }
  const aotanMonths = [6, 9, 10];
  if (
    aotanMonths.every((month) =>
      levelCardsMap[5].some((card) => card.month === month)
    )
  ) {
    handList.push({ score: 5, name: "青短" });
  }

  // タン
  if (levelCardsMap[5].length >= 5) {
    const overCount = levelCardsMap[5].length - 5;
    if (overCount > 0) {
      // 5枚以上のタンがある場合、5枚を超えた分だけ点数を加算
      handList.push({ score: 1 + overCount, name: "タン+" });
    } else {
      // 5枚のタンがある場合
      handList.push({ score: 1, name: "タン" });
    }
  }

  // カス
  if (levelCardsMap[1].length >= 10) {
    const overCount = levelCardsMap[1].length - 10;
    if (overCount > 0) {
      // 10枚以上のカスがある場合、10枚を超えた分だけ点数を加算
      handList.push({ score: 1 + overCount, name: "カス+" });
    } else {
      // 10枚のカスがある場合
      handList.push({ score: 1, name: "カス" });
    }
  }

  return handList;
};
