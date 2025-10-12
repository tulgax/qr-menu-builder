import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { HelpCircle, Mail, MessageCircle, BookOpen, ExternalLink } from 'lucide-react'

export default function HelpPage() {
  return (
    <>
      <DashboardHeader 
        title="Help & Support" 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Help" }
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">
            Find answers to common questions and get support when you need it.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>
                Learn how to use all features of QR Menu Builder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Docs
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>
                Chat with our support team in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Chat
                <MessageCircle className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>
                Send us an email and we&apos;ll get back to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:support@qrmenubuilder.com">
                  Send Email
                  <Mail className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Quick answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I create my first menu?</AccordionTrigger>
                <AccordionContent>
                  Start by creating categories for your menu (e.g., Appetizers, Main Courses). 
                  Then add menu items to each category with names, descriptions, prices, and images. 
                  Finally, generate your QR code and print it for your tables.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>How do I update menu prices?</AccordionTrigger>
                <AccordionContent>
                  Go to the Menu Items page, find the item you want to update, click the edit icon, 
                  change the price, and save. Your menu will be updated instantly for all customers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>Can I upload images for menu items?</AccordionTrigger>
                <AccordionContent>
                  Yes! When creating or editing a menu item, click the &quot;Choose Image&quot; button to upload 
                  photos of your dishes. High-quality images help attract customers and showcase your food.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How do customers view my menu?</AccordionTrigger>
                <AccordionContent>
                  Customers simply scan the QR code you&apos;ve printed and placed on tables. This opens 
                  your digital menu in their phone browser - no app download required!
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Can I mark items as unavailable?</AccordionTrigger>
                <AccordionContent>
                  Yes! When editing a menu item, you can toggle the &quot;Available&quot; checkbox. 
                  Unavailable items will be visually indicated on the customer-facing menu, 
                  so customers know what&apos;s currently offered.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>How do I reorder categories or items?</AccordionTrigger>
                <AccordionContent>
                  Categories and menu items are ordered by their display order. You can edit items to 
                  change their position, or we&apos;re working on drag-and-drop functionality for easier reordering.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>Is my menu mobile-friendly?</AccordionTrigger>
                <AccordionContent>
                  Absolutely! Your menu is designed mobile-first, ensuring it looks great on all phone 
                  sizes. This is important since most customers will view it on their smartphones.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>What image formats are supported?</AccordionTrigger>
                <AccordionContent>
                  You can upload images in JPG, PNG, and WebP formats. We recommend using high-quality 
                  images (at least 800x600 pixels) for the best presentation on customer devices.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>
              Our support team is here to assist you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <HelpCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium mb-1">Can&apos;t find what you&apos;re looking for?</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Contact our support team and we&apos;ll help you get started.
                </p>
                <Button asChild>
                  <a href="mailto:support@qrmenubuilder.com">
                    Contact Support
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
