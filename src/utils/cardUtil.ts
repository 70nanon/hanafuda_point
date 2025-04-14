import { Card, HandList, Month, Level } from "../models/card";

// カードリストを構築する関数
export const buildCardList = (): { month: Month; cards: Card[] }[] => {
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
export const calculateScore = (cards: Card[]) => {
  const handList = getHandList(cards);
  let score = handList.reduce((acc, hand) => acc + hand.score, 0);
  if (score >= 7) {
    score = score * 2; // スコアが7点を超える場合、2倍にする
  }
  return score;
};

// 手役を取得する関数
export const getHandList = (cards: Card[]) => {
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
