export type Popup = {
  type: "version" | "receive" | "age" | "bonus";
};

export const hasPopupRequest = () =>
  new Promise<Popup>((r, j) => {
    r({
      type: (["version", "receive", "age", "bonus"] as const)[
        Math.floor(Math.random() * 4)
      ],
    });
  });
