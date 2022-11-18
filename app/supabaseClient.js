import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://idlqcczhywpcclyezbml.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbHFjY3poeXdwY2NseWV6Ym1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg3MDI5MTIsImV4cCI6MTk4NDI3ODkxMn0.OHXYXxNZT3IBHm8hEucKM-XovNR6c1XDHhGlr8kbtPY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
