"use client";

import { motion, AnimatePresence } from "motion/react";
import { FileText, Search } from "lucide-react";
import { useProject } from "../../hooks/useProjects";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const { data: projects, isLoading, isError } = useProject();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<any | null>(null);

  // Filter projects that actually have a PRD (even if it's brief)
  const documents =
    projects?.filter((p) => p.prdText && p.prdText.trim().length > 0) || [];

  const filteredDocs = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.prdText.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            View all generated Product Requirement Documents (PRDs).
          </p>
        </div>

        {/* Search */}
        <div className="relative relative w-full sm:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Loading Skeletons */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-zinc-200 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-800"
            />
          ))}
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="text-red-500 text-sm mt-8 p-4 bg-red-50 dark:bg-red-500/10 rounded-xl border border-red-200 dark:border-red-500/20">
          Failed to load documents. Please try refreshing the page.
        </div>
      )}

      {/* Documents Grid */}
      {!isLoading && !isError && filteredDocs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredDocs.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedDoc(doc)}
              className="group cursor-pointer p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-500/30 transition-all flex flex-col h-64"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    PRD Document
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    Project: {doc.name}
                  </p>
                </div>
              </div>

              <div className="flex-1 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 overflow-hidden relative border border-zinc-100 dark:border-zinc-800/50">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap line-clamp-4">
                  {doc.prdText}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-zinc-50 dark:from-zinc-950 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Empty States */}
      {!isLoading && documents.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-white/50 dark:bg-zinc-900/50"
        >
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-zinc-400">
            <FileText size={32} />
          </div>
          <h3 className="text-lg font-semibold mb-2">No PRDs Found</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm">
            You don't have any Product Requirement Documents yet. Create a
            project and generate a PRD first.
          </p>
        </motion.div>
      )}

      {/* No Search Results */}
      {!isLoading && documents.length > 0 && filteredDocs.length === 0 && (
        <div className="mt-8 text-center py-12 text-zinc-500 dark:text-zinc-400">
          No documents match your search "{searchQuery}"
        </div>
      )}

      {/* Full Document Modal Viewer (Simple implementation) */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-zinc-900 w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-xl flex flex-col border border-zinc-200 dark:border-zinc-800 overflow-hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">
                      Product Requirements Document (PRD)
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Project: {selectedDoc.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedDoc(null)}
                >
                  Close
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 text-sm text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {selectedDoc.prdText}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
