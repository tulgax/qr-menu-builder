import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Bell, Mail, MessageSquare, Smartphone } from 'lucide-react'

export default function NotificationsPage() {
  return (
    <>
      <DashboardHeader 
        title="Notifications" 
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Notifications" }
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
          <p className="text-muted-foreground">
            Manage how and when you receive notifications.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Email Notifications
            </CardTitle>
            <CardDescription>
              Receive updates and alerts via email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="menu-updates">Menu Updates</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when menu items are changed or updated
                </p>
              </div>
              <Switch id="menu-updates" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="qr-scans">QR Code Scans</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when customers scan your QR code
                </p>
              </div>
              <Switch id="qr-scans" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-summary">Weekly Summary</Label>
                <p className="text-sm text-muted-foreground">
                  Get a weekly summary of your menu performance
                </p>
              </div>
              <Switch id="weekly-summary" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="product-updates">Product Updates</Label>
                <p className="text-sm text-muted-foreground">
                  News about new features and improvements
                </p>
              </div>
              <Switch id="product-updates" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Push Notifications
            </CardTitle>
            <CardDescription>
              Receive instant notifications on your device
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-enabled">Enable Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Allow browser notifications for important updates
                </p>
              </div>
              <Switch id="push-enabled" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-orders">Customer Activity</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified of customer menu views in real-time
                </p>
              </div>
              <Switch id="push-orders" disabled />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="push-alerts">System Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Important alerts about your account or service
                </p>
              </div>
              <Switch id="push-alerts" disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Communication Preferences
            </CardTitle>
            <CardDescription>
              Choose how we communicate with you
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">
                  Receive tips, best practices, and special offers
                </p>
              </div>
              <Switch id="marketing" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsletter">Newsletter</Label>
                <p className="text-sm text-muted-foreground">
                  Monthly newsletter with industry insights
                </p>
              </div>
              <Switch id="newsletter" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="surveys">Surveys & Feedback</Label>
                <p className="text-sm text-muted-foreground">
                  Help us improve by sharing your feedback
                </p>
              </div>
              <Switch id="surveys" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
            <CardDescription>
              Your recent notification history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Welcome to QR Menu Builder!</p>
                  <p className="text-sm text-muted-foreground">
                    Get started by creating your first menu category
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Just now</p>
                </div>
              </div>

              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">No more notifications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Preferences</Button>
        </div>
      </div>
    </>
  )
}
