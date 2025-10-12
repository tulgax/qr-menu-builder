# QR Menu Builder

A modern web application that allows restaurant and café owners to create and manage digital menus accessible via QR codes.

## Features

- **User Authentication**: Secure signup and login for business owners
- **Business Management**: Create and manage your business profile
- **Category Management**: Organize menu items into categories
- **Menu Item Management**: Add items with name, description, price, images, and tags
- **QR Code Generation**: Generate and download QR codes for your menu
- **Public Menu View**: Mobile-optimized menu view for customers
- **Real-time Updates**: Update your menu instantly without reprinting QR codes

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Backend/Auth**: Supabase (PostgreSQL + Auth)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd qrmenu
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up Supabase database:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the SQL migration from `supabase/schema.sql`

5. Set up Supabase Storage:
   - Go to Storage in your Supabase dashboard
   - Create a new bucket named `menu-images`
   - Make it public so menu images can be accessed by customers

6. Run the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

### Tables

1. **businesses**
   - id (uuid, primary key)
   - user_id (uuid, references auth.users)
   - name (text)
   - description (text, optional)
   - logo_url (text, optional)
   - created_at (timestamp)

2. **categories**
   - id (uuid, primary key)
   - business_id (uuid, references businesses)
   - name (text)
   - display_order (integer)
   - created_at (timestamp)

3. **menu_items**
   - id (uuid, primary key)
   - category_id (uuid, references categories)
   - name (text)
   - description (text)
   - price (decimal)
   - image_url (text, optional)
   - tags (text[], array)
   - display_order (integer)
   - is_available (boolean)
   - created_at (timestamp)

## Usage

### For Business Owners

1. **Sign Up**: Create an account with your email
2. **Set Up Business**: Add your business name and description
3. **Create Categories**: Organize your menu into categories (e.g., Appetizers, Main Courses, Drinks)
4. **Add Menu Items**: Add items with details, prices, photos, and dietary tags
5. **Generate QR Code**: Download your unique QR code
6. **Print & Display**: Print the QR code and place it on your tables

### For Customers

1. **Scan QR Code**: Use your phone camera to scan the QR code
2. **View Menu**: Browse the digital menu on your mobile device
3. **See Details**: View item descriptions, prices, photos, and dietary information

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Project Structure

```
qrmenu/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Auth pages (login, signup)
│   ├── (dashboard)/         # Protected dashboard pages
│   ├── menu/[businessId]/   # Public menu view
│   └── onboarding/          # Business setup
├── components/              # React components
│   ├── ui/                 # Shadcn UI components
│   ├── auth/               # Authentication forms
│   ├── dashboard/          # Dashboard components
│   └── menu/               # Public menu components
├── lib/                    # Utilities and helpers
│   └── supabase/          # Supabase client configuration
├── types/                  # TypeScript type definitions
└── public/                # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
