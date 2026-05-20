import { Link } from "wouter";
import { FileWarning } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center" style={{ background: "#f0f2f8" }}>
      <div className="text-center p-8 bg-white border border-[#e2e6f0] rounded-xl max-w-md w-full shadow-sm">
        <FileWarning className="w-16 h-16 text-[#e8174a] mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-[#222] mb-2 font-sans tracking-tight">404 - Page Introuvable</h1>
        <p className="text-sm text-[#666] mb-6">La page que vous recherchez n'existe pas ou a été déplacée.</p>
        <Link href="/" className="inline-flex items-center justify-center bg-[#1a5fa8] text-white hover:bg-[#154c86] transition-colors rounded-lg px-6 py-2.5 text-sm font-medium">
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
}