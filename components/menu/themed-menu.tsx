'use client'

import { Business } from '@/types/database'
import { useEffect } from 'react'

interface ThemedMenuProps {
  children: React.ReactNode
  business: Business
  customizations?: Partial<Business> | null
}

export function ThemedMenu({ children, business, customizations }: ThemedMenuProps) {
  const theme = customizations || business

  useEffect(() => {
    // Apply theme styles as CSS variables
    const root = document.documentElement
    
    root.style.setProperty('--primary-color', theme.primary_color || '#8B5CF6')
    root.style.setProperty('--background-color', theme.background_color || '#FFFFFF')
    root.style.setProperty('--text-color', theme.text_color || '#000000')
    root.style.setProperty('--card-background-color', theme.card_background_color || '#F9FAFB')
    
    // Set font families
    if (theme.font_family && theme.font_family !== 'system') {
      root.style.setProperty('--font-family', getFontFamily(theme.font_family))
    } else {
      root.style.setProperty('--font-family', 'ui-sans-serif, system-ui, sans-serif')
    }
    
    if (theme.heading_font_family && theme.heading_font_family !== 'system') {
      root.style.setProperty('--heading-font-family', getFontFamily(theme.heading_font_family))
    } else {
      root.style.setProperty('--heading-font-family', 'ui-sans-serif, system-ui, sans-serif')
    }

    // Apply layout class
    const bodyClasses = ['menu-theme']
    if (theme.layout_style) {
      bodyClasses.push(`layout-${theme.layout_style}`)
    }
    if (theme.menu_width) {
      bodyClasses.push(`width-${theme.menu_width}`)
    }

    document.body.classList.add(...bodyClasses)

    return () => {
      // Cleanup
      document.body.classList.remove(...bodyClasses)
    }
  }, [theme])

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{
        backgroundColor: theme.background_color || '#FFFFFF',
        color: theme.text_color || '#000000',
        fontFamily: 'var(--font-family)',
      }}
    >
      {children}
      
      <style jsx global>{`
        .menu-theme {
          --primary: ${theme.primary_color || '#8B5CF6'};
          --background: ${theme.background_color || '#FFFFFF'};
          --foreground: ${theme.text_color || '#000000'};
          --card: ${theme.card_background_color || '#F9FAFB'};
          --card-foreground: ${theme.text_color || '#000000'};
          --border: ${adjustColorOpacity(theme.text_color || '#000000', 0.2)};
        }
        
        .menu-theme h1, .menu-theme h2, .menu-theme h3, .menu-theme h4, .menu-theme h5, .menu-theme h6 {
          font-family: var(--heading-font-family);
        }
        
        .menu-theme .menu-item-card {
          background-color: ${theme.card_background_color || '#F9FAFB'};
          border-color: ${adjustColorOpacity(theme.text_color || '#000000', 0.1)};
        }
        
        .menu-theme .menu-item-price {
          color: ${theme.primary_color || '#8B5CF6'};
          font-weight: 600;
        }
        
        .menu-theme .menu-category-title {
          color: ${theme.primary_color || '#8B5CF6'};
          border-bottom-color: ${adjustColorOpacity(theme.primary_color || '#8B5CF6', 0.3)};
        }
        
        .layout-modern .menu-item-card {
          border-radius: 16px;
          overflow: hidden;
        }
        
        .layout-compact .menu-item-card {
          padding: 12px;
        }
        
        .layout-grid {
          columns: 1;
        }
        
        @media (min-width: 640px) {
          .layout-grid {
            columns: 2;
          }
        }
        
        @media (min-width: 1024px) {
          .layout-grid {
            columns: 3;
          }
        }
        
        .width-wide {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .width-full {
          max-width: none;
        }
        
        .width-standard {
          max-width: 800px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  )
}

function getFontFamily(fontKey: string): string {
  const fontMap: Record<string, string> = {
    inter: '"Inter", ui-sans-serif, system-ui, sans-serif',
    roboto: '"Roboto", ui-sans-serif, system-ui, sans-serif',
    playfair: '"Playfair Display", ui-serif, Georgia, serif',
    montserrat: '"Montserrat", ui-sans-serif, system-ui, sans-serif',
    lora: '"Lora", ui-serif, Georgia, serif',
    poppins: '"Poppins", ui-sans-serif, system-ui, sans-serif',
    opensans: '"Open Sans", ui-sans-serif, system-ui, sans-serif',
  }
  return fontMap[fontKey] || 'ui-sans-serif, system-ui, sans-serif'
}

function adjustColorOpacity(color: string, opacity: number): string {
  // Convert hex to rgba
  if (color.startsWith('#')) {
    const hex = color.slice(1)
    const r = parseInt(hex.slice(0, 2), 16)
    const g = parseInt(hex.slice(2, 4), 16)
    const b = parseInt(hex.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }
  return color
}
