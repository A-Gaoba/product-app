import { create } from "zustand";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  liked: boolean;
};

type ApiResponse = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type ProductsState = {
  products: Product[];
  favorites: Product[];
  fetchProducts: () => Promise<void>;
  toggleLike: (id: number) => void;
  deleteProduct: (id: number) => void;
  filterFavorites: () => void;
  loadPersistedData: () => void;
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  favorites: [],

  // Load persisted data from localStorage
  loadPersistedData: () => {
    const savedProducts = localStorage.getItem("products");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        if (Array.isArray(parsedProducts)) {
          set({ products: parsedProducts });
        }
      } catch (error) {
        console.error("Error parsing products from localStorage:", error);
      }
    }

    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites)) {
          set({ favorites: parsedFavorites });
        }
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
      }
    }
  },

  // Fetch products from API
  fetchProducts: async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: ApiResponse[] = await response.json();
      const formattedData = data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        liked: false,
      }));
      set({ products: formattedData });
      localStorage.setItem("products", JSON.stringify(formattedData));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  },

  // Toggle the like status of a product
  toggleLike: (id: number) => {
    const updatedProducts = get().products.map((product) =>
      product.id === id ? { ...product, liked: !product.liked } : product
    );
    const favorites = updatedProducts.filter((product) => product.liked);
    set({ products: updatedProducts, favorites });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },

  // Delete a product by its ID
  deleteProduct: (id: number) => {
    const updatedProducts = get().products.filter(
      (product) => product.id !== id
    );
    const favorites = updatedProducts.filter((product) => product.liked);
    set({ products: updatedProducts, favorites });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },

  // Filter the products to only show favorites
  filterFavorites: () => {
    const favorites = get().favorites;
    set({ products: favorites });
  },
}));

useProductsStore.getState().loadPersistedData();
