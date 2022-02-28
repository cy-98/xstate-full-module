export type Card = {
  type: string;
};
export const fetchNewCard = () =>
  new Promise<Card>((r, j) => {
    r({
      type: ["lucky", "happy", "wealth", "brave", "love", "knowledge"][
        Math.floor(Math.random()) * 6
      ],
    });
  });

export const fetchOwnCards = () =>
  new Promise<Card[]>((r, j) => {
    const n = Math.floor(Math.random() * 6);
    console.log(n);

    return r(new Array(n).fill({
      type: ["lucky", "happy", "wealth", "brave", "love", "knowledge"][
        Math.floor(Math.random()) * 6
      ],
    }));
  });
