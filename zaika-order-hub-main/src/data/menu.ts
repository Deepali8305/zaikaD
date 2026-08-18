import alooParatha from "@/assets/food/aloo-paratha.jpg";
import gobhiParatha from "@/assets/food/gobhi-paratha.jpg";
import paneerParatha from "@/assets/food/paneer-paratha.jpg";
import omelette from "@/assets/food/omelette.jpg";
import breadToast from "@/assets/food/bread-toast.jpg";
import boiledEgg from "@/assets/food/boiled-egg.jpg";
import grilledPotatoSandwich from "@/assets/food/grilled-potato-sandwich.jpg";
import grilledEggSandwich from "@/assets/food/grilled-egg-sandwich.jpg";
import grilledCheeseEggSandwich from "@/assets/food/grilled-cheese-egg-sandwich.jpg";
import grilledCheeseVegSandwich from "@/assets/food/grilled-cheese-veg-sandwich.jpg";
import poha from "@/assets/food/poha.jpg";
import upma from "@/assets/food/upma.jpg";
import poori from "@/assets/food/poori.jpg";
import tea from "@/assets/food/tea.jpg";
import americano from "@/assets/food/americano.jpg";
import coffee from "@/assets/food/coffee.jpg";
import breadPakora from "@/assets/food/bread-pakora.jpg";
import eggPakora from "@/assets/food/egg-pakora.jpg";
import paneerPakora from "@/assets/food/paneer-pakora.jpg";
import mixVegPakora from "@/assets/food/mix-veg-pakora.jpg";
import vegThali from "@/assets/food/veg-thali.jpg";
import seasonalVegCurry from "@/assets/food/seasonal-veg-curry.jpg";
import paneerBhurji from "@/assets/food/paneer-bhurji.jpg";
import paneerMasala from "@/assets/food/paneer-masala.jpg";
import raita from "@/assets/food/raita.jpg";
import curdBowl from "@/assets/food/curd-bowl.jpg";
import dalFry from "@/assets/food/dal-fry.jpg";
import roti from "@/assets/food/roti.jpg";
import paratha from "@/assets/food/paratha.jpg";
import eggCurry from "@/assets/food/egg-curry.jpg";
import chickenMasala from "@/assets/food/chicken-masala.jpg";
import nonvegThali from "@/assets/food/nonveg-thali.jpg";
import chapatiChicken from "@/assets/food/chapati-chicken.jpg";
import friedRice from "@/assets/food/fried-rice.jpg";
import vegFriedRice from "@/assets/food/veg-fried-rice.jpg";
import eggFriedRice from "@/assets/food/egg-fried-rice.jpg";
import chickenFriedRice from "@/assets/food/chicken-fried-rice.jpg";
import noodle from "@/assets/food/noodle.jpg";
import vegNoodle from "@/assets/food/veg-noodle.jpg";
import eggNoodle from "@/assets/food/egg-noodle.jpg";

export type CategoryId =
  | "breakfast"
  | "beverages"
  | "snacks"
  | "veg"
  | "non-veg"
  | "rice-noodles";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** null means the price has not been configured yet. */
  price: number | null;
  category: CategoryId;
  image: string;
  available: boolean;
};

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "beverages", label: "Beverages" },
  { id: "snacks", label: "Snacks" },
  { id: "veg", label: "Veg" },
  { id: "non-veg", label: "Non-Veg" },
  { id: "rice-noodles", label: "Rice & Noodles" },
];

export const MENU: MenuItem[] = [
  // Breakfast
  { id: "aloo-paratha", name: "Aloo Paratha", description: "2 Pieces + Curd", price: 100, category: "breakfast", image: alooParatha, available: true },
  { id: "gobhi-paratha", name: "Gobhi Paratha", description: "2 Pieces + Curd", price: 130, category: "breakfast", image: gobhiParatha, available: true },
  { id: "paneer-paratha", name: "Paneer Paratha", description: "2 Pieces + Curd", price: 150, category: "breakfast", image: paneerParatha, available: true },
  { id: "omelette", name: "Omelette", description: "2 Eggs", price: 80, category: "breakfast", image: omelette, available: true },
  { id: "bread-toast", name: "Bread Toast", description: "4 Pieces + Butter Cube + Omelette", price: 100, category: "breakfast", image: breadToast, available: true },
  { id: "boiled-egg", name: "Boiled Egg", description: "Each", price: 40, category: "breakfast", image: boiledEgg, available: true },
  { id: "grilled-potato-sandwich", name: "Grilled Potato Sandwich", description: "4 Pieces", price: 120, category: "breakfast", image: grilledPotatoSandwich, available: true },
  { id: "grilled-egg-sandwich", name: "Grilled Egg Sandwich", description: "4 Pieces", price: 150, category: "breakfast", image: grilledEggSandwich, available: true },
  { id: "grilled-cheese-egg-sandwich", name: "Grilled Cheese Egg Sandwich", description: "Grilled with cheese and egg", price: 175, category: "breakfast", image: grilledCheeseEggSandwich, available: true },
  { id: "grilled-cheese-veg-sandwich", name: "Grilled Cheese Veg Sandwich", description: "Grilled with cheese and vegetables", price: 140, category: "breakfast", image: grilledCheeseVegSandwich, available: true },
  { id: "poha", name: "Poha", description: "Freshly prepared", price: 100, category: "breakfast", image: poha, available: true },
  { id: "upma", name: "Upma", description: "Freshly prepared", price: 100, category: "breakfast", image: upma, available: true },
  { id: "poori", name: "Poori", description: "4 Pieces + Sabzi", price: 120, category: "breakfast", image: poori, available: true },

  // Beverages
  { id: "tea", name: "Tea", description: "Freshly brewed", price: 50, category: "beverages", image: tea, available: true },
  { id: "americano", name: "Americano", description: "Freshly brewed", price: 80, category: "beverages", image: americano, available: true },
  { id: "coffee", name: "Coffee", description: "Freshly brewed", price: 100, category: "beverages", image: coffee, available: true },

  // Snacks
  { id: "bread-pakora", name: "Bread Pakora", description: "Freshly fried", price: 100, category: "snacks", image: breadPakora, available: true },
  { id: "egg-pakora", name: "Egg Pakora", description: "Freshly fried", price: 150, category: "snacks", image: eggPakora, available: true },
  { id: "paneer-pakora", name: "Paneer Pakora", description: "Freshly fried", price: 170, category: "snacks", image: paneerPakora, available: true },
  { id: "mix-veg-pakora", name: "Mix Veg Pakora", description: "Freshly fried", price: 120, category: "snacks", image: mixVegPakora, available: true },

  // Veg
  { id: "veg-thali", name: "Veg Thali", description: "Rice + 2 Chapati + Dal + 1 Veg + Curd + Pickle", price: 250, category: "veg", image: vegThali, available: true },
  { id: "seasonal-vegetable-curry", name: "Seasonal Vegetable Curry", description: "Prepared with seasonal vegetables", price: 200, category: "veg", image: seasonalVegCurry, available: true },
  { id: "paneer-bhurji", name: "Paneer Bhurji", description: "Freshly prepared", price: 175, category: "veg", image: paneerBhurji, available: true },
  { id: "paneer-masala", name: "Paneer Masala", description: "Freshly prepared", price: 200, category: "veg", image: paneerMasala, available: true },
  { id: "raita", name: "Raita", description: "Freshly prepared", price: 100, category: "veg", image: raita, available: true },
  { id: "curd-bowl", name: "Curd Bowl", description: "Fresh curd", price: 100, category: "veg", image: curdBowl, available: true },
  { id: "dal-fry", name: "Dal Fry", description: "Freshly prepared", price: 175, category: "veg", image: dalFry, available: true },
  { id: "roti", name: "Roti", description: "Per piece", price: 15, category: "veg", image: roti, available: true },
  { id: "paratha", name: "Paratha", description: "Per piece", price: 25, category: "veg", image: paratha, available: true },

  // Non-Veg
  { id: "egg-curry", name: "Egg Curry", description: "2 Pieces", price: 150, category: "non-veg", image: eggCurry, available: true },
  { id: "chicken-masala", name: "Chicken Masala", description: "6 Pieces", price: 400, category: "non-veg", image: chickenMasala, available: true },
  { id: "non-veg-thali", name: "Non-Veg Thali", description: "Rice Bowl + Chicken (2 Pieces)", price: 250, category: "non-veg", image: nonvegThali, available: true },
  { id: "chapati-chicken", name: "Chapati", description: "4 Pieces + Chicken (2 Pieces)", price: 200, category: "non-veg", image: chapatiChicken, available: true },

  // Rice & Noodles
  { id: "fried-rice", name: "Fried Rice", description: "Freshly prepared", price: 150, category: "rice-noodles", image: friedRice, available: true },
  { id: "veg-fried-rice", name: "Veg Fried Rice", description: "Freshly prepared", price: 170, category: "rice-noodles", image: vegFriedRice, available: true },
  { id: "egg-fried-rice", name: "Egg Fried Rice", description: "Freshly prepared", price: 200, category: "rice-noodles", image: eggFriedRice, available: true },
  // Price for Chicken Fried Rice is not configured yet — shown as unavailable.
  { id: "chicken-fried-rice", name: "Chicken Fried Rice", description: "Freshly prepared", price: null, category: "rice-noodles", image: chickenFriedRice, available: false },
  { id: "noodle", name: "Noodle", description: "Freshly prepared", price: 60, category: "rice-noodles", image: noodle, available: true },
  { id: "veg-noodle", name: "Veg Noodle", description: "Freshly prepared", price: 80, category: "rice-noodles", image: vegNoodle, available: true },
  { id: "egg-noodle", name: "Egg Noodle", description: "Freshly prepared", price: 100, category: "rice-noodles", image: eggNoodle, available: true },
];

export const POPULAR_IDS = [
  "veg-thali",
  "aloo-paratha",
  "chicken-masala",
  "veg-fried-rice",
  "paneer-masala",
  "tea",
];

export function getMenuItem(id: string) {
  return MENU.find((item) => item.id === id);
}
