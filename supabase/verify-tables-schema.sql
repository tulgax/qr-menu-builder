-- Verification script for tables feature
-- Run this in Supabase SQL Editor to check if everything is set up correctly

-- Check if tables table exists and has correct structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'tables'
ORDER BY ordinal_position;

-- Check if table_scans table exists and has correct structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'table_scans'
ORDER BY ordinal_position;

-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('tables', 'table_scans');

-- Check existing policies on tables
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'tables';

-- Check existing policies on table_scans
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'table_scans';

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename IN ('tables', 'table_scans')
ORDER BY tablename, indexname;

