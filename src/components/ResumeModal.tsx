/// <reference types="vite/client" />
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink, Calendar, Shield, Info, FileText, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { fetchGitHubFileMetadata } from '../lib/githubService';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ResumeMetadata {
  size: number;
  downloadUrl: string;
  lastUpdated: string | null;
  version: string;
  name: string;
}

export const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [metadata, setMetadata] = useState<ResumeMetadata | null>(null);
  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (isOpen) {
      const username = import.meta.env.VITE_GITHUB_USERNAME || 'APPIKONDAKUMARSAI';
      const repo = import.meta.env.VITE_GITHUB_RESUME_REPO || 'RESUME';
      const path = import.meta.env.VITE_GITHUB_RESUME_PATH || 'data_analyst (1).pdf';

      async function loadResume() {
        if (!isMounted) return;
        setIsLoading(true);
        setError(null);
        try {
          const data = await fetchGitHubFileMetadata(username, repo, path);
          if (!isMounted) return;
          
          if (data) {
            setMetadata(data);
            
            // Fetch as arrayBuffer to handle data manually
            if (data.downloadUrl) {
              const response = await fetch(data.downloadUrl);
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              const buffer = await response.arrayBuffer();
              if (isMounted) {
                setPdfData(buffer);
              }
            } else {
              throw new Error('No download URL found for resume');
            }
          } else {
            throw new Error('Failed to find resume on GitHub');
          }
        } catch (err: any) {
          console.error('Error loading resume:', err);
          if (isMounted) {
            setError(err.message || 'Failed to load resume preview');
          }
        } finally {
          if (isMounted) {
            setIsLoading(false);
          }
        }
      }
      loadResume();
    } else {
      setPageNumber(1);
      setScale(1.0);
      setPdfData(null);
      setError(null);
    }

    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl h-[90vh] bg-zinc-900/50 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row"
          >
            {/* Sidebar Info */}
            <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-white/10 p-6 flex flex-col justify-between bg-zinc-950/20">
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <FileText size={20} />
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">Resume Details</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
                      <Calendar size={12} /> Last Updated
                    </div>
                    <p className="text-zinc-300 font-medium">
                      {formatDate(metadata?.lastUpdated || null)}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
                      <Shield size={12} /> Version Tag
                    </div>
                    <p className="text-zinc-300 font-mono">
                      {metadata?.version || 'v1.0.0'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-mono uppercase tracking-widest">
                      <Info size={12} /> File Size
                    </div>
                    <p className="text-zinc-300">
                      {formatSize(metadata?.size || 0)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mt-8 md:mt-0">
                <a
                  href={metadata?.downloadUrl}
                  download
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-blue-500 hover:text-white transition-all group"
                >
                  <Download size={18} className="group-hover:scale-110 transition-transform" />
                  Download PDF
                </a>
                <a
                  href={metadata?.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-zinc-800 text-white rounded-xl font-bold text-sm hover:bg-zinc-700 transition-all"
                >
                  <ExternalLink size={18} />
                  Open in New Tab
                </a>
              </div>
            </div>

            {/* Preview Area */}
            <div className="flex-1 relative flex flex-col bg-black/40 overflow-hidden">
              {/* Toolbar */}
              <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
                    className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                    title="Zoom Out"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-xs font-mono text-zinc-400 w-12 text-center uppercase tracking-tighter">
                    {Math.round(scale * 100)}%
                  </span>
                  <button
                    onClick={() => setScale(prev => Math.min(2, prev + 0.1))}
                    className="p-2 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-colors"
                    title="Zoom In"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  {numPages > 1 && (
                    <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1">
                      <button
                        onClick={() => setPageNumber(prev => Math.max(1, prev - 1))}
                        disabled={pageNumber <= 1}
                        className="text-white disabled:opacity-30"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <span className="text-xs font-mono text-white">
                        {pageNumber} / {numPages}
                      </span>
                      <button
                        onClick={() => setPageNumber(prev => Math.min(numPages, prev + 1))}
                        disabled={pageNumber >= numPages}
                        className="text-white disabled:opacity-30"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}

                  <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white transition-all hover:scale-110"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* PDF Document */}
              <div className="flex-1 overflow-auto p-8 pt-20 flex justify-center custom-scrollbar">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative">
                      <div className="w-12 h-12 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                      <div className="absolute inset-0 blur-xl bg-blue-500/30 animate-pulse" />
                    </div>
                  </div>
                )}
                
                {pdfData ? (
                  <Document
                    file={pdfData}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={null}
                    className="shadow-2xl"
                    onLoadError={(err) => {
                      console.error('PDF Load Error:', err);
                      setError('Failed to render PDF. You can still download it or open in a new tab.');
                      setIsLoading(false);
                    }}
                  >
                    <Page 
                      pageNumber={pageNumber} 
                      scale={scale}
                      loading={null}
                      className="rounded-lg overflow-hidden"
                    />
                  </Document>
                ) : (
                  !isLoading && (
                    <div className="flex flex-col items-center justify-center text-zinc-500 gap-6 p-8 text-center">
                      <div className="p-4 rounded-2xl bg-zinc-800/50">
                        <FileText size={48} className="opacity-20" />
                      </div>
                      <div className="space-y-2">
                        <p className="font-mono text-xs uppercase tracking-widest text-zinc-400">
                          {error || 'Document not found'}
                        </p>
                        {metadata?.downloadUrl && (
                          <div className="flex flex-col gap-3 mt-4">
                            <p className="text-sm text-zinc-500 max-w-xs">
                              The in-browser preview is having trouble loading. Please use one of the options below.
                            </p>
                            <div className="flex gap-2 justify-center">
                               <a 
                                  href={metadata.downloadUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-xs font-bold hover:bg-blue-500/20 transition-all"
                               >
                                 Open in New Tab
                               </a>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
