export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          role: "admin" | "user";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "user";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: "admin" | "user";
          created_at?: string;
          updated_at?: string;
        };
      };
      daily_verses: {
        Row: {
          id: string;
          date: string;
          reference: string;
          text: string;
          reflection: string;
          long_reflection: string;
          seed: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          reference: string;
          text: string;
          reflection: string;
          long_reflection: string;
          seed: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          reference?: string;
          text?: string;
          reflection?: string;
          long_reflection?: string;
          seed?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      daily_prayers: {
        Row: {
          id: string;
          date: string;
          prayer: string;
          seed: string;
          created_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          prayer: string;
          seed: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          prayer?: string;
          seed?: string;
          created_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_favorites: {
        Row: {
          id: string;
          user_id: string;
          verse_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          verse_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          verse_id?: string;
          created_at?: string;
        };
      };
    };
  };
}
