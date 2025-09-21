// Database types for Supabase tables
// Update these based on your actual Supabase table structure

export interface Database {
  public: {
    Tables: {
      stories: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          role?: string;
          bio?: string;
          quote?: string;
          story_text?: string;
          profile_photo_url?: string;
          video_url?: string;
          video_thumbnail_url?: string;
          media_type: "video" | "photo" | "text";
          video_source?: "supabase" | "youtube" | "vimeo";
          transcript_url?: string;
          highlight_stat_label?: string;
          highlight_stat_value?: string;
          display_order?: number;
          is_published: boolean;
          category?: "youth" | "expert" | "leader" | "community";
          age_group?: "youth" | "adult";
          tags?: string[];
        };
        Insert: Omit<Database["public"]["Tables"]["stories"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["stories"]["Insert"]>;
      };
      campaign_metrics: {
        Row: {
          id: string;
          created_at: string;
          metric_name: string;
          current_value: number;
          goal_value: number;
          unit?: string;
          description?: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["campaign_metrics"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["campaign_metrics"]["Insert"]>;
      };
      activity_feed: {
        Row: {
          id: string;
          created_at: string;
          actor_name: string;
          action_type: "nomination" | "booking" | "story_shared" | "completion" | "endorsement";
          action_description: string;
          is_visible: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["activity_feed"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["activity_feed"]["Insert"]>;
      };
    };
    Views: {
      // Add any views here
    };
    Functions: {
      // Add any database functions here
    };
  };
}

// Helper types for easier use
export type Story = Database["public"]["Tables"]["stories"]["Row"];
export type CampaignMetric = Database["public"]["Tables"]["campaign_metrics"]["Row"];
export type ActivityItem = Database["public"]["Tables"]["activity_feed"]["Row"];