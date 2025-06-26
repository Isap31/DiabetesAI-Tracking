/*
  # Create health data tables

  1. New Tables
    - `glucose_readings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `glucose_value` (integer)
      - `context` (text)
      - `notes` (text, optional)
      - `created_at` (timestamp)

    - `meal_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `meal_name` (text)
      - `carbohydrates` (numeric)
      - `protein` (numeric, optional)
      - `calories` (numeric, optional)
      - `created_at` (timestamp)

    - `exercise_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `exercise_type` (text)
      - `duration_minutes` (integer)
      - `intensity` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
*/

-- Glucose readings table
CREATE TABLE IF NOT EXISTS glucose_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  glucose_value integer NOT NULL,
  context text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE glucose_readings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own glucose readings"
  ON glucose_readings
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Meal logs table
CREATE TABLE IF NOT EXISTS meal_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  meal_name text NOT NULL,
  carbohydrates numeric NOT NULL,
  protein numeric,
  calories numeric,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE meal_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own meal logs"
  ON meal_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Exercise logs table
CREATE TABLE IF NOT EXISTS exercise_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_type text NOT NULL,
  duration_minutes integer NOT NULL,
  intensity text NOT NULL CHECK (intensity IN ('light', 'moderate', 'vigorous')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exercise_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own exercise logs"
  ON exercise_logs
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS glucose_readings_user_id_created_at_idx ON glucose_readings(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS meal_logs_user_id_created_at_idx ON meal_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS exercise_logs_user_id_created_at_idx ON exercise_logs(user_id, created_at DESC);