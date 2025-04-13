export type { Card, CardList, CardListByLevel }

type Card = {
  name: string
  level: 20 | 10 | 5 | 1
  month: number
}

type CardList = Card[]
type CardListByLevel = {
  [key in Card['level']]: CardList
}
