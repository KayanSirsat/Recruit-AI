import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Screening from "@/pages/screening";
import Candidate from "@/pages/candidate";

function Router() {
  return (
    <Switch>
      <Route path="/">
        <Redirect to="/screening" />
      </Route>
      <Route path="/screening" component={Screening} />
      <Route path="/candidate" component={Candidate} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
