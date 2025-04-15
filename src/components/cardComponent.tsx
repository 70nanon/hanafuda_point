import { useState } from "react";
import { Card } from "../models/card"; // 型をインポート
import { buildCardList, calculateScore, getHandList } from "../utils/cardUtil"; // ユーティリティ関数をインポート
import { CardList } from "../features/cardList"; // カードリストコンポーネントをインポート
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material"; // MUI のコンポーネントをインポート
import MenuIcon from "@mui/icons-material/Menu"; // MUI のアイコンをインポート
import "../css/card.css"; // スタイルをインポート

export const CardComponent = () => {
  // カードリストの状態を管理
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true); // ドロワーの開閉状態を管理

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
  const handList = getHandList(selectedCards); // 選択されたカードから手役を取得

  return (
    <div style={{ display: "flex", position: "relative" }}>
      {/* ドロワーを開閉するボタン */}
      <IconButton
        onClick={() => setIsDrawerOpen(true)}
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 1100,
          backgroundColor: "#007bff",
          color: "white",
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* ドロワー */}
      <Drawer
        anchor="right" // ドロワーを右側に表示
        open={true} // ドロワーの開閉状態
        onClose={() => setIsDrawerOpen(false)} // ドロワーを閉じる
        variant="persistent" // ドロワーのバリアント
        PaperProps={{
          sx: { width: 300 }, // ドロワーの幅を指定
        }}
      >
        <div style={{ width: 300, padding: 16 }}>
          <h2 style={{ textAlign: "center" }}>合計点</h2>
          <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
            {calculateScore(selectedCards)}点
          </h3>
          {calculateScore(selectedCards) >= 7 && (
            <p style={{ fontSize: "0.7em", color: "red" }}>
              (7点以上の場合は点数2倍)
            </p>
          )}
          <h2>成立した役</h2>
          {handList.length > 0 ? (
            <List>
              {handList.map((hand) => (
                <ListItem key={hand.name}>
                  <ListItemText
                    primary={hand.name}
                    secondary={`${hand.score}点`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <p>なし</p>
          )}
        </div>
      </Drawer>

      {/* メインコンテンツ */}
      <div style={{ flex: 1, marginRight: isDrawerOpen ? 300 : 0, width: "100%" }}>
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
    </div>
  );
};
