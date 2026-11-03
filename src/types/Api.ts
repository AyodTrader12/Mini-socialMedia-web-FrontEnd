export type User = {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  bio?: string;
  avatar?: string;
  isVerified: boolean;
  role: "user" | "admin";
  createdAt: string;
  loginWithGoogle: (idToken: string) => Promise<User>;
};

export type PostAuthor = {
  id: string;
  username: string;
  fullName?: string;
  avatar?: string;
};

export type PostMedia = {
  url: string;
  type: "image" | "video";
  width?: number;
  height?: number;
};

export type Post = {
  id: string;
  author: PostAuthor;
  caption: string;
  media: PostMedia[];
  likesCount: number;
  commentsCount: number;
  likedByMe: boolean;
  bookmarkedByMe: boolean;
  createdAt: string;
  updatedAt: string;
  editedAt: string | null;
};

export type PostsPage = {
  posts: Post[];
  nextCursor: string | null;
};
export type AuthResponse = {
  user: User;
  token: string;
};