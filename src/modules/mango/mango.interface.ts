export interface IMango {
  name: string;
  variety: string;
  image: string;
  unit: "kg" | "pcs";
  price: number;
  stock: number;
  origin: string;
  season: "summer" | "winter";
}
