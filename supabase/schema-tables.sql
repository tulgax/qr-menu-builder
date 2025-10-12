-- Migration for table management feature
-- Run this in Supabase SQL Editor after the main schema.sql

-- Create tables table
CREATE TABLE tables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  location TEXT,
  position_x DECIMAL(10, 2) DEFAULT 50,
  position_y DECIMAL(10, 2) DEFAULT 50,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table_scans table for analytics
CREATE TABLE table_scans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_id UUID NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
  scanned_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_tables_business_id ON tables(business_id);
CREATE INDEX idx_table_scans_table_id ON table_scans(table_id);
CREATE INDEX idx_table_scans_scanned_at ON table_scans(scanned_at);

-- Enable Row Level Security
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_scans ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tables table
CREATE POLICY "Users can view tables of their business"
  ON tables FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = tables.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert tables to their business"
  ON tables FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = tables.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update tables of their business"
  ON tables FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = tables.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete tables of their business"
  ON tables FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM businesses
      WHERE businesses.id = tables.business_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Public can view all tables"
  ON tables FOR SELECT
  USING (true);

-- RLS Policies for table_scans table
CREATE POLICY "Users can view scans of their business tables"
  ON table_scans FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM tables
      JOIN businesses ON businesses.id = tables.business_id
      WHERE tables.id = table_scans.table_id
      AND businesses.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can insert table scans"
  ON table_scans FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can view all table scans"
  ON table_scans FOR SELECT
  USING (true);

