type CardImage = {
  id: number;
  name: string;
  data: string;
};
type CardImageList = CardImage[];

// 画像を一括インポート
const images = import.meta.glob("./hanafuda/*.png", { eager: true });

const cardImages: CardImageList = [];
for (const path in images) {
  const fileName = path.split("/").pop()?.replace(/\.[^/.]+$/, ""); // ファイル名を取得
  if (fileName) {
    cardImages.push({
      id: parseInt(fileName.split('-')[1]), // IDをファイル名から取得
      name: fileName,
      data: (images[path] as any).default, // 画像のパスを格納
    });
  }
}

export default cardImages;
