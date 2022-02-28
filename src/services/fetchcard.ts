export type Card = {
  type: string;
};

const randomType = () => ["lucky", "happy", "wealth", "brave", "love", "knowledge"][
  Math.floor(Math.random() * 6)];

export const fetchNewCard = () =>
  new Promise<Card>((r, j) => {
    r({
      type: randomType(),
    });
  });

export const fetchOwnCards = () =>
  new Promise<Card[]>((r, j) => {
    const n = Math.floor(Math.random() * 5) + 1;
    return r(new Array(n).fill(0).map(i => ({
      type: randomType()
    })));
  });
