import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/navigation";
import { Upload, FileText, X } from "lucide-react";

export default function Screening() {
  const [, setLocation] = useLocation();
  const [jobDescription, setJobDescription] = useState("");
  const [resume, setResume] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ jobDescription?: string; resume?: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf") {
        setUploadedFile(file);
        setResume("");
        setErrors((prev) => ({ ...prev, resume: undefined }));
      } else {
        setErrors((prev) => ({ ...prev, resume: "Please upload a PDF file" }));
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    const newErrors: { jobDescription?: string; resume?: string } = {};
    
    if (!jobDescription.trim()) {
      newErrors.jobDescription = "Please enter a job description";
    }
    if (!resume.trim() && !uploadedFile) {
      newErrors.resume = "Please enter resume text or upload a PDF file";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLocation("/candidate");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background" data-testid="page-screening">
      <Navigation />
      
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground" data-testid="text-title">
            Recruit-AI
          </h1>
          <p className="mt-3 text-muted-foreground text-lg" data-testid="text-subtitle">
            AI-powered candidate screening
          </p>
        </div>

        <div className="border-t border-border" />

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-job-description-heading">
                Job Description
              </h2>
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-description" className="text-sm font-medium text-foreground">
                Paste Job Description
              </Label>
              <Textarea
                id="job-description"
                placeholder="Paste the role requirements here"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                className="min-h-[300px] p-4 resize-none bg-card border-border"
                data-testid="input-job-description"
              />
              {errors.jobDescription && (
                <p className="text-sm text-destructive" data-testid="error-job-description">
                  {errors.jobDescription}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-border my-8" />

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-resume-heading">
                Candidate Resume
              </h2>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Upload Resume (PDF)
                </Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                  data-testid="input-file-upload"
                />
                
                {uploadedFile ? (
                  <Card className="border-border bg-card">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-muted rounded-md">
                          <FileText className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(uploadedFile.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                        data-testid="button-remove-file"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full h-20 border-dashed border-2 border-border bg-card"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="button-upload-pdf"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Click to upload PDF
                      </span>
                    </div>
                  </Button>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-border" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">or</span>
                <div className="flex-1 border-t border-border" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resume" className="text-sm font-medium text-foreground">
                  Paste Resume Text
                </Label>
                <Textarea
                  id="resume"
                  placeholder="Paste resume text here"
                  value={resume}
                  onChange={(e) => {
                    setResume(e.target.value);
                    if (e.target.value.trim()) {
                      setUploadedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }
                  }}
                  className="min-h-[200px] p-4 resize-none bg-card border-border"
                  data-testid="input-resume"
                />
              </div>
              
              {errors.resume && (
                <p className="text-sm text-destructive" data-testid="error-resume">
                  {errors.resume}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-12">
            <Button
              onClick={handleAnalyze}
              className="px-12 py-6 text-base font-semibold"
              size="lg"
              data-testid="button-analyze"
            >
              Analyze Candidate
            </Button>
          </div>
        </div>

        <div className="border-t border-border" />
      </main>

      <footer className="py-8 text-center">
        <p className="text-sm text-muted-foreground" data-testid="text-footer">
          Recruit-AI Prototype
        </p>
      </footer>
    </div>
  );
}
