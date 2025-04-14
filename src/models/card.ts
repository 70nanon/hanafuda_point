export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Level = 20 | 10 | 5 | 1;
export type HandList = {
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

export class Card {
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
