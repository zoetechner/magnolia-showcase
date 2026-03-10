import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, LogIn, ShieldX } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import HeroEditor from "../components/admin/HeroEditor";
import LocationsEditor from "../components/admin/LocationsEditor";
import ProductsEditor from "../components/admin/ProductsEditor";
import StoryEditor from "../components/admin/StoryEditor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsAdmin } from "../hooks/useQueries";
import type { useBakeryStore } from "../store/bakeryStore";
import type { BakeryData } from "../types/bakery";

interface AdminPageProps {
  data: BakeryData;
  store: ReturnType<typeof useBakeryStore>;
  onNavigateHome: () => void;
}

function AdminHeader({
  onBack,
  onLogout,
  isLoggedIn,
}: { onBack: () => void; onLogout: () => void; isLoggedIn: boolean }) {
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="font-sans"
          data-ocid="admin.back.button"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Site
        </Button>
        <span className="font-display text-lg font-light text-muted-foreground">
          Magnolia Admin
        </span>
        {isLoggedIn ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLogout}
            className="font-sans text-muted-foreground"
            data-ocid="admin.logout.button"
          >
            Sign Out
          </Button>
        ) : (
          <div className="w-20" />
        )}
      </div>
    </header>
  );
}

export default function AdminPage({
  data,
  store,
  onNavigateHome,
}: AdminPageProps) {
  const { login, clear, loginStatus, identity, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin, isLoading: checkingAdmin } = useIsAdmin();
  const [activeTab, setActiveTab] = useState("hero");

  const isLoggedIn = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  if (isInitializing || (isLoggedIn && checkingAdmin)) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader
          onBack={onNavigateHome}
          onLogout={clear}
          isLoggedIn={false}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="space-y-4 w-64" data-ocid="admin.loading_state">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader
          onBack={onNavigateHome}
          onLogout={clear}
          isLoggedIn={false}
        />
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto">
              <LogIn className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-light text-foreground mb-2">
                Admin Access
              </h1>
              <p className="font-sans text-muted-foreground">
                Sign in to manage your bakery's content.
              </p>
            </div>
            <Button
              size="lg"
              onClick={() => login()}
              disabled={isLoggingIn}
              className="w-full rounded-full"
              data-ocid="admin.primary_button"
            >
              {isLoggingIn ? "Connecting..." : "Sign In"}
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <AdminHeader
          onBack={onNavigateHome}
          onLogout={clear}
          isLoggedIn={true}
        />
        <div className="flex-1 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full text-center space-y-6"
            data-ocid="admin.error_state"
          >
            <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
              <ShieldX className="h-8 w-8 text-destructive" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-light text-foreground mb-2">
                Access Denied
              </h1>
              <p className="font-sans text-muted-foreground">
                Your account doesn't have admin privileges.
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => clear()}
              className="rounded-full"
              data-ocid="admin.secondary_button"
            >
              Sign Out
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader onBack={onNavigateHome} onLogout={clear} isLoggedIn={true} />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <h1 className="font-display text-4xl font-light text-foreground">
              Dashboard
            </h1>
            <p className="font-sans text-muted-foreground mt-1">
              Manage your bakery&apos;s content
            </p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8" data-ocid="admin.tab">
              <TabsTrigger
                value="hero"
                className="font-sans"
                data-ocid="admin.hero.tab"
              >
                Hero
              </TabsTrigger>
              <TabsTrigger
                value="products"
                className="font-sans"
                data-ocid="admin.products.tab"
              >
                Products
              </TabsTrigger>
              <TabsTrigger
                value="story"
                className="font-sans"
                data-ocid="admin.story.tab"
              >
                Story
              </TabsTrigger>
              <TabsTrigger
                value="locations"
                className="font-sans"
                data-ocid="admin.locations.tab"
              >
                Locations
              </TabsTrigger>
            </TabsList>
            <TabsContent value="hero" className="mt-0">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="font-display text-2xl font-light text-foreground mb-6">
                  Hero Section
                </h2>
                <HeroEditor hero={data.hero} onSave={store.updateHero} />
              </div>
            </TabsContent>
            <TabsContent value="products" className="mt-0">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="font-display text-2xl font-light text-foreground mb-6">
                  Products
                </h2>
                <ProductsEditor
                  products={data.products}
                  onAdd={store.addProduct}
                  onUpdate={store.updateProduct}
                  onDelete={store.deleteProduct}
                />
              </div>
            </TabsContent>
            <TabsContent value="story" className="mt-0">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="font-display text-2xl font-light text-foreground mb-6">
                  Our Story
                </h2>
                <StoryEditor story={data.story} onSave={store.updateStory} />
              </div>
            </TabsContent>
            <TabsContent value="locations" className="mt-0">
              <div className="bg-card rounded-2xl p-8 border border-border">
                <h2 className="font-display text-2xl font-light text-foreground mb-6">
                  Locations
                </h2>
                <LocationsEditor
                  locations={data.locations}
                  onAdd={store.addLocation}
                  onDelete={store.deleteLocation}
                />
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
