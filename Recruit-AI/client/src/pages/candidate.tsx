import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import { useToast } from "@/hooks/use-toast";
import { User, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const mockCandidateData = {
  name: "John Doe",
  matchScore: 85,
  strengths: [
    "Excellent communication skills",
    "Strong analytical abilities",
  ],
  gaps: [
    "Limited experience in project management",
    "Familiarity with new technologies needed",
  ],
  recommendedAction: "Consider for interview",
};

export default function Candidate() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleBackToScreening = () => {
    setLocation("/screening");
  };

  const handleSendInvite = () => {
    toast({
      title: "Interview Invite Sent",
      description: `An interview invitation has been sent to ${mockCandidateData.name}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" data-testid="page-candidate">
      <Navigation />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground" data-testid="text-title">
            Candidate Evaluation
          </h1>
          
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <Button
              variant="outline"
              onClick={handleBackToScreening}
              className="px-6"
              data-testid="button-back"
            >
              Back to Screening
            </Button>
            <Button
              onClick={handleSendInvite}
              className="px-6"
              data-testid="button-send-invite"
            >
              Send Interview Invite
            </Button>
          </div>
        </div>

        <div className="border-t border-border" />

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-overview-heading">
                Candidate Overview
              </h2>
              
              <Card className="p-8 bg-card border-border" data-testid="card-match-score">
                <CardContent className="p-0 text-center">
                  <p className="text-6xl font-bold text-foreground" data-testid="text-score-value">
                    {mockCandidateData.matchScore}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide">Match Score</p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="text-xl font-semibold text-foreground">{mockCandidateData.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">Candidate</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className="bg-card border-border" data-testid="card-candidate-name">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">Candidate Name</h3>
                      <p className="text-muted-foreground" data-testid="text-candidate-name">
                        {mockCandidateData.name}
                      </p>
                      <Badge variant="secondary" className="text-xs" data-testid="badge-match-score">
                        Match Score: {mockCandidateData.matchScore}%
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border" data-testid="card-strengths">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">Strengths</h3>
                      <ul className="space-y-1 text-muted-foreground">
                        {mockCandidateData.strengths.map((strength, index) => (
                          <li key={index} data-testid={`text-strength-${index}`}>
                            • {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border" data-testid="card-gaps">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">Gaps</h3>
                      <ul className="space-y-1 text-muted-foreground">
                        {mockCandidateData.gaps.map((gap, index) => (
                          <li key={index} data-testid={`text-gap-${index}`}>
                            • {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border" data-testid="card-recommended-action">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-foreground">Recommended Action</h3>
                      <p className="text-muted-foreground" data-testid="text-recommended-action">
                        {mockCandidateData.recommendedAction}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
