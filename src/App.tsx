import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardProvider } from "./store/contexts/DashboardContext";
import DashboardPage from "./pages/dashboard";
import TiersPage from "./pages/tiers";
import SettingsPage from "./pages/settings";
import BehaviorsPage from "./pages/behaviors";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardPage} />
      <Route path="/tiers" component={TiersPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/behaviors" component={BehaviorsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DashboardProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
        </DashboardProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
