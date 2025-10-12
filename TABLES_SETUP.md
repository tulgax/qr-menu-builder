# Table Management Setup Guide

## ✅ Good News!

The `tables` and `table_scans` tables already exist in your Supabase database. The table management feature should work right away!

## 🔍 Verify Setup (Optional)

If you want to verify everything is set up correctly, run this in your Supabase SQL Editor:

```sql
-- Check if tables exist
SELECT COUNT(*) as tables_count FROM tables;
SELECT COUNT(*) as scans_count FROM table_scans;
```

If these queries work without errors, you're all set! ✅

## 🚀 How to Use the Table Management System

### 1. **Create Tables** (Table List Tab)
- Go to Dashboard → Tables → Table List tab
- Click "Add Table"
- Enter:
  - **Name**: e.g., "Table 1", "Booth 5", "Patio A"
  - **Capacity**: Number of seats (e.g., 4)
  - **Location**: e.g., "Main Floor", "Patio" (optional)
  - **Active**: Toggle on/off
- Click "Create"

### 2. **Arrange Floor Plan** (Floor Plan Tab)
- Switch to "Floor Plan" tab
- Drag tables to position them
- Use zoom controls (+/-) to adjust view
- Toggle grid for alignment help
- **Click "Save X Changes"** button to save positions

### 3. **Generate QR Codes**
- From Table List: Click "View QR" on any table
- Or: Click on a table card to go to detail page
- Click "Download QR Code" to save as PNG
- Print and place on the table

### 4. **View Analytics** (Analytics Tab)
- Switch to "Analytics" tab
- Select time period: 7, 14, 30, or 90 days
- See:
  - **Total Scans**: All scans across tables
  - **Average Scans**: Per table average
  - **Top Performer**: Most scanned table
  - **Ranked List**: All tables sorted by scans
  - **Heat Map**: Visual floor plan showing popularity

### 5. **Customer Experience**
When customers scan a table's QR code:
- They see the menu with a badge showing "You're viewing the menu for [Table Name]"
- The scan is logged automatically for analytics
- No login required for customers

## 📊 Analytics Features

- **Date Range Filters**: Compare performance over different periods
- **Ranked View**: See which tables are most popular
- **Floor Plan Heat Map**: Visual representation with color intensity
  - Lighter color = fewer scans
  - Darker color = more scans
- **Real-time Data**: Analytics update as customers scan QR codes

## 🎯 Tips

1. **Create tables first** in the Table List tab before using the Floor Plan
2. **Save your layout** - the Save button only appears when you move tables
3. **Track performance** - check Analytics regularly to see which tables get the most traffic
4. **QR Codes are unique** - each table has its own URL with table ID
5. **Active/Inactive** - Inactive tables show as grayed out on the floor plan

## ⚠️ If You See Issues

If you encounter any problems:

1. **Tables don't save positions**: Make sure you clicked the "Save X Changes" button
2. **No scans showing up**: Make sure customers are scanning the table-specific QR codes (not the general menu QR)
3. **Can't create tables**: Check that you're logged in and have a business profile set up

## 🎉 You're Ready!

Everything is set up and ready to use. Start by:
1. Going to Dashboard → Tables
2. Creating your first table
3. Generating its QR code
4. Testing by scanning it yourself!

---

**Need help?** All the features are built and working. Just start creating tables!

