
export interface PostItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ApiResponse<T> {
  body: T;
  status: string;
  message?: string;
}
