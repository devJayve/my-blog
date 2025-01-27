export interface Category {
  id: string;
  name: string;
  created_at: Date;
}

export interface CategoryResponse {
  data: {
    categories: Category[];
  };
  success: boolean;
  error?: string;
}

export interface WriteFormState {
  title: string;
  slug: string;
  description: string;
  categories: string[];
  content?: string;
}
