"use client";

import React, { useState, useRef } from "react";
import { UserRound, Wand2, Loader2, RefreshCw, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import PlaceholderHighlighter from "../PlaceholderHighlighter";

type SampleProfile = {
  id: string;
  name: string;
  relationship: string;
  tone: string;
  contactInput: string;
  composePrompt: string;
  composeSubject: string;
  composeBody: string;
  improveOriginal: string;
  improveResult: string;
  reviewOriginal: string;
  reviewResult: string;
};

const sampleProfiles: SampleProfile[] = [
  {
    id: "sarah",
    name: "Sarah Jenkins",
    relationship: "Client",
    tone: "Formal",
    contactInput: "Sarah Jenkins is my main client for the Alpha project. We usually keep things professional but warm. She likes milestone updates on Thursdays.",
    composePrompt: "Write an email to Sarah about finalizing the Q3 milestone deliverables ahead of schedule. Ask for a brief call this Thursday.",
    composeSubject: "Update on [Project Name] & Next Steps",
    composeBody:
      "Dear [Client Name],\n\nI am pleased to share that we have finalized the [Milestone Name] deliverables ahead of schedule. Attached is the summary for your review.\n\nPlease let me know if you would like to schedule a brief call this [Day of Week] to discuss the next deployment phase.\n\nBest regards,\n[Your Name]",
    improveOriginal:
      "Hey Sarah, finished the [Project] stuff early. Let me know if you want to chat [Day].",
    improveResult:
      "Dear [Client Name],\n\nI am glad to update you that our team completed the [Project Name] milestones early. Please review the attached deliverables at your convenience.\n\nWould [Day of Week] afternoon work for a brief check-in regarding phase two?\n\nSincerely,\n[Your Name]",
    reviewOriginal: 
      "Dear Sarah,\n\nI am writing to confirm that all milestone objectives is complete. Attached is the project breakdown for your evaluation.\n\nLet me know if Thursday work for a short alignment meeting.\n\nBest regards,\nAlex",
    reviewResult:
      "Dear [Client Name],\n\nI am writing to confirm that all [Milestone Name] objectives are complete. Attached is the project breakdown for your evaluation.\n\nLet me know if [Day of Week] works for a short alignment meeting.\n\nBest regards,\n[Your Name]",
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    relationship: "Colleague",
    tone: "Casual",
    contactInput: "Marcus Vance is a colleague on the frontend team. We chat casually. He reviews my API specs.",
    composePrompt: "Tell Marcus I just pushed the draft API specs for tomorrow's review. Ask him to take a look when he has a sec.",
    composeSubject: "Quick sync on [Event] tomorrow",
    composeBody:
      "Hey [Colleague Name],\n\nQuick heads up — I just pushed the draft [Document Type] for tomorrow's review. Take a look when you get a sec and let me know if anything looks off.\n\nCatch you at the standup,\n[Your Name]",
    improveOriginal:
      "Marcus, I uploaded the [Doc Name]. Look at them before tomorrow.",
    improveResult:
      "Hey [Colleague Name],\n\nJust dropped the updated [Document Type] into the shared folder for tomorrow's review. Give them a quick skim whenever you have a free minute!\n\nThanks,\n[Your Name]",
    reviewOriginal:
      "Hey Marcus,\n\nThe API specs for tomorrow's sprint review is ready. Feel free to review them before standup tomorrow morning.\n\nCheers,\nAlex",
    reviewResult:
      "Hey [Colleague Name],\n\nThe [Document Type] for tomorrow's sprint review are ready. Feel free to review them before standup tomorrow morning.\n\nCheers,\n[Your Name]",
  },
];

type GenStatus = "idle" | "generating" | "completed";

export default function InteractiveFeatureDemo({ feature }: { feature: "contact" | "compose" | "improve" | "review" }) {
  const [activeProfile, setActiveProfile] = useState<SampleProfile>(sampleProfiles[0]);
  const [genStatus, setGenStatus] = useState<GenStatus>("idle");
  
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, { dependencies: [activeProfile, feature, genStatus] });

  const handleGenerate = () => {
    setGenStatus("generating");
    setTimeout(() => {
      setGenStatus("completed");
    }, 1500);
  };

  return (
    <div className="relative rounded-3xl border border-slate-200/90 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900 sm:p-5 lg:p-6">
      <div className="mb-4 flex flex-col gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
        {/* Profile Picker Pill Buttons (Click to switch) */}
        <div className="flex flex-col items-start gap-3 pb-1 sm:pb-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Select Recipient:
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {sampleProfiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => {
                  setActiveProfile(profile);
                  setGenStatus("idle");
                }}
                className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl px-2.5 py-1 text-[11px] font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ${
                  activeProfile.id === profile.id
                    ? "bg-primary text-white shadow-xs dark:bg-sky-500 dark:text-slate-950"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                <UserRound className="h-3.5 w-3.5" />
                {profile.name} ({profile.relationship} · {profile.tone})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Preview Container */}
      <div className="flex flex-col gap-5 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/70 sm:p-5">
        
        {/* Context Summary Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200/70 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 transition-all duration-300">
          {feature === "contact" && genStatus === "idle" ? (
            <div className="flex h-full min-h-[60px] items-center justify-center text-center w-full">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Contact profile empty. Analyze to extract tone.
              </p>
            </div>
          ) : feature === "contact" && genStatus === "generating" ? (
            <div className="flex h-full min-h-[60px] flex-col items-center justify-center space-y-3 w-full">
              <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
              <p className="text-sm text-slate-500">Extracting tone...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-lg font-semibold text-primary dark:bg-sky-950 dark:text-sky-300">
                  {activeProfile.name[0]}
                </div>
                <div className="overflow-hidden">
                  <p className="truncate font-semibold text-primary dark:text-white text-[15px]">
                    {activeProfile.name}
                  </p>
                  <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    {activeProfile.relationship} Profile
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 dark:text-slate-500">
                    Style:
                  </span>
                  <span className="font-medium text-primary dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
                    {activeProfile.tone}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 dark:text-slate-500">
                    Status:
                  </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Live Preview Display Box */}
        <div className="relative h-[380px] rounded-xl border border-slate-200/70 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900 overflow-y-auto flex flex-col">
          <div ref={contentRef} className="flex-1 space-y-4">
            
            {/* Contact Tab */}
            {feature === "contact" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    User Notes
                  </span>
                  <div className="mt-2 rounded-lg bg-slate-50 p-4 text-[13px] text-slate-600 dark:bg-slate-950 dark:text-slate-300 font-sans border border-slate-100 dark:border-slate-800">
                    {activeProfile.contactInput}
                  </div>
                </div>
                
                {genStatus === "idle" && (
                  <div className="flex justify-center">
                    <button onClick={handleGenerate} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-800 active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 w-full sm:w-auto">
                      <Wand2 className="h-4 w-4" />
                      Analyze Relationship
                    </button>
                  </div>
                )}
                
                {genStatus === "generating" && (
                  <div className="flex justify-center items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 py-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Building relationship model...
                  </div>
                )}
                
                {genStatus === "completed" && (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/20 animate-scale-in mt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        Profile Analyzed & Active
                      </span>
                    </div>
                    <p className="text-sm text-emerald-700 dark:text-emerald-400/90 leading-relaxed">
                      We&apos;ll remember that <span className="font-semibold">{activeProfile.name}</span> is a {activeProfile.relationship.toLowerCase()} who prefers a <span className="font-semibold">{activeProfile.tone.toLowerCase()}</span> tone.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Compose Tab */}
            {feature === "compose" && (
              <div className="space-y-6 flex flex-col h-full">
                {/* Prompt Section */}
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Prompt
                  </span>
                  <div className="mt-2 rounded-lg bg-slate-50 p-4 text-[13px] text-slate-600 dark:bg-slate-950 dark:text-slate-300 font-sans border border-slate-100 dark:border-slate-800">
                    {activeProfile.composePrompt}
                  </div>
                </div>
                
                {/* Action Section */}
                {genStatus === "idle" && (
                  <div className="flex justify-center">
                    <button onClick={handleGenerate} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-800 active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 w-full sm:w-auto">
                      <Wand2 className="h-4 w-4" />
                      Generate Email
                    </button>
                  </div>
                )}
                
                {genStatus === "generating" && (
                  <div className="flex justify-center items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 py-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Composing email...
                  </div>
                )}

                {/* Result Section */}
                {genStatus === "completed" && (
                  <div className="space-y-3 pt-2 flex-1 animate-scale-in border-t border-slate-100 dark:border-slate-800/60 mt-4">
                    <div className="mt-4 border-b border-slate-100 pb-3 dark:border-slate-800">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Subject
                      </span>
                      <p className="mt-1 font-semibold text-primary dark:text-white text-[15px]">
                        <PlaceholderHighlighter text={activeProfile.composeSubject} />
                      </p>
                    </div>
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 block">
                        Generated Email
                      </span>
                      <div className="mt-2 text-[13px] leading-relaxed text-slate-700 dark:text-slate-200 whitespace-pre-wrap font-sans bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800/80">
                        <PlaceholderHighlighter text={activeProfile.composeBody} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Improve Tab */}
            {feature === "improve" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Rough Input Draft
                  </span>
                  <div className="mt-2 rounded-lg bg-slate-50 p-4 text-[13px] text-slate-600 dark:bg-slate-950 dark:text-slate-300 font-sans border border-slate-100 dark:border-slate-800">
                    <PlaceholderHighlighter text={activeProfile.improveOriginal} />
                  </div>
                </div>
                
                {genStatus === "idle" && (
                  <div className="flex justify-center">
                    <button onClick={handleGenerate} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-800 active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 w-full sm:w-auto">
                      <RefreshCw className="h-4 w-4" />
                      Rewrite Email
                    </button>
                  </div>
                )}
                
                {genStatus === "generating" && (
                  <div className="flex justify-center items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 py-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Applying {activeProfile.tone.toLowerCase()} tone...
                  </div>
                )}

                {genStatus === "completed" && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60 animate-scale-in">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-400 mb-2 block">
                      Improved Version ({activeProfile.tone})
                    </span>
                    <div className="mt-2 text-[13px] font-medium leading-relaxed text-slate-800 dark:text-slate-100 whitespace-pre-wrap font-sans bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800/80">
                      <PlaceholderHighlighter text={activeProfile.improveResult} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Review Tab */}
            {feature === "review" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Draft to Review
                  </span>
                  <div className="mt-2 rounded-lg bg-slate-50 p-4 text-[13px] text-slate-600 dark:bg-slate-950 dark:text-slate-300 font-sans border border-slate-100 dark:border-slate-800">
                    {activeProfile.reviewOriginal}
                  </div>
                </div>

                {genStatus === "idle" && (
                  <div className="flex justify-center">
                    <button onClick={handleGenerate} className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-md hover:bg-slate-800 active:scale-95 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 w-full sm:w-auto">
                      <CheckCircle2 className="h-4 w-4" />
                      Check Grammar & Tone
                    </button>
                  </div>
                )}

                {genStatus === "generating" && (
                  <div className="flex justify-center items-center gap-2 text-sm font-medium text-sky-600 dark:text-sky-400 py-3">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Reviewing draft...
                  </div>
                )}

                {genStatus === "completed" && (
                  <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800/60 animate-scale-in mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        Grammar &amp; Clarity Check
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        Ready to send
                      </span>
                    </div>
                    <div className="text-[13px] leading-relaxed text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-100 dark:border-slate-800/80">
                      <PlaceholderHighlighter text={activeProfile.reviewResult} />
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
