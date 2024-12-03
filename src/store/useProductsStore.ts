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
  filterFavorites: () => void; // This should update the products state directly
  addProduct: (product: Product) => void;
  loadPersistedData: () => void; // This should be part of the state, not passed to set
};

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  favorites: [],

  // Load persisted data from localStorage if available
  loadPersistedData: () => {
    const savedProducts = localStorage.getItem("products");
    const savedFavorites = localStorage.getItem("favorites");

    if (savedProducts) {
      set({ products: JSON.parse(savedProducts) });
    }

    if (savedFavorites) {
      set({ favorites: JSON.parse(savedFavorites) });
    }
  },

  // Fetch products from the API and format the data
  fetchProducts: async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: ApiResponse[] = await response.json(); // Explicitly type the response
      const formattedData = data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image,
        liked: false,
      }));
      set({ products: formattedData });
      // Save fetched products to localStorage
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
    // Persist updated products and favorites to localStorage
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
    // Persist updated products and favorites to localStorage
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    localStorage.setItem("favorites", JSON.stringify(favorites));
  },

  // Update the products state to only show favorites
  filterFavorites: () => {
    const favorites = get().favorites;
    set({ products: favorites });
  },

  // Add a new product to the list
  addProduct: (product: Product) => {
    const newProducts = [...get().products, product];
    set({ products: newProducts });
    // Persist new product list to localStorage
    localStorage.setItem("products", JSON.stringify(newProducts));
  },
}));

// Initialize the store with persisted data on app load
useProductsStore.getState().loadPersistedData();
