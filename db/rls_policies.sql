-- RLS Policies
CREATE POLICY your_policy ON your_table
  FOR SELECT
  USING (owner = current_user);
