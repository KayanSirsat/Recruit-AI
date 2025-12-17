import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import { useToast } from "@/hooks/use-toast";
import { User, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

export default function Candidate() {
  const [location, setLocation] = useLocation();
  const state = (location as any)?.state;
  const [candidateData, setcandidateData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
      if (!state?.jobDescription || !state?.resume) {
        console.warn("Missing job description or resume");
        setLoading(false);
        return;
      }
    const fetchEvaluation = async () => {
      try {
        const response = await fetch(
          "https://joemama992022.app.n8n.cloud/webhook/recruit-ai/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jobDescription: state?.jobDescription,
              resume: state?.resume,
            }),
          }
        );

        const data = await response.json();

        setcandidateData({
          name: data.name,
          matchScore: data.score,
          strengths: data.strengths,
          gaps: data.gaps,
          recommendedAction: data.recommendation,
        });
      } catch (error) {
        console.error("Failed to fetch candidate evaluation", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, []);


  const { toast } = useToast();

  const handleBackToScreening = () => {
    setLocation("/screening");
  };

  const handleSendInvite = () => {
    toast({
      title: "Interview Invite Sent",
      description: `An interview invitation has been sent to ${candidateData?.name}.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" data-testid="page-candidate">
      <Navigation />

      <main className="flex-1">
              {loading && (
          <div className="text-center py-12 text-muted-foreground">
            Evaluating candidate...
          </div>
        )}

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
                    {candidateData?.matchScore}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wide">Match Score</p>
                  <div className="mt-6 pt-6 border-t border-border">
                    <h3 className="text-xl font-semibold text-foreground">{candidateData?.name}</h3>
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
                        {candidateData?.name}
                      </p>
                      <Badge variant="secondary" className="text-xs" data-testid="badge-match-score">
                        Match Score: {candidateData?.matchScore}%
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
                        {candidateData?.strengths?.map((strength: string, index: number) => (
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
                       {candidateData?.gaps && candidateData.gaps.length > 0 ? (
  candidateData.gaps.map((gap: string, index: number) => (
    <li key={index} data-testid={`text-gap-${index}`}>
      • {gap}
    </li>
  ))
) : (
  <li>No major gaps identified</li>
)}


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
                        {candidateData?.recommendedAction}
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
