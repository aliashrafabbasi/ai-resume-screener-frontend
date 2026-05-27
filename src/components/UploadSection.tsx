import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  FileText,
  X,
  Send,
  Loader2,
  AlertCircle,
  Sparkles,
  ScanSearch,
} from 'lucide-react';

interface UploadSectionProps {
  onSubmit: (file: File, jobDescription: string) => void;
  isLoading: boolean;
  uploadProgress: number;
}

export default function UploadSection({
  onSubmit,
  isLoading,
  uploadProgress,
}: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [error, setError] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file only');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    multiple: false,
  });

  const handleSubmit = () => {
    if (!file) {
      setError('Please upload a resume');
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter a job description');
      return;
    }
    setError('');
    onSubmit(file, jobDescription);
  };

  const removeFile = () => {
    setFile(null);
    setError('');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="w-full"
    >
      {/* Hero */}
      <div className="mb-16 text-center sm:mb-20">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-primary-400/30 bg-primary-500/15 px-5 py-2"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary-400" />
          <span className="text-xs font-semibold text-primary-300">
            AI-Powered Screening
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
        >
          Screen Resumes with
          <br />
          <span className="bg-gradient-to-r from-primary-400 via-violet-400 to-accent-400 bg-clip-text text-transparent">
            AI Precision
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-6 text-sm leading-relaxed text-surface-400 sm:text-base"
        >
          Upload a resume and describe the role to get an instant match report.
        </motion.p>
      </div>

      {/* Upload box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mb-10 sm:mb-12"
      >
        <div
          {...getRootProps()}
          className={`group cursor-pointer rounded-2xl border-2 border-dashed p-2 transition-all duration-200 ${
            isDragActive
              ? 'border-primary-400 bg-primary-500/10'
              : file
                ? 'border-accent-400/40 bg-surface-800/80'
                : 'border-surface-600 bg-surface-800/60 hover:border-primary-400/40 hover:bg-surface-800/80'
          }`}
        >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center py-16 sm:py-20">
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div
                key="file"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-500/20 ring-2 ring-accent-400/30">
                    <FileText className="h-8 w-8 text-accent-400" />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-danger-500 text-white shadow-md"
                  >
                    <X className="h-3 w-3" />
                  </motion.button>
                </div>
                <p className="mt-4 text-base font-semibold text-white">{file.name}</p>
                <p className="mt-1 text-sm text-surface-400">{formatFileSize(file.size)}</p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-500/15 ring-2 ring-primary-500/20"
                >
                  <Upload className="h-8 w-8 text-primary-400" />
                </motion.div>
                <p className="mt-5 text-lg font-semibold text-white">
                  {isDragActive ? 'Drop here!' : 'Drag & drop your resume'}
                </p>
                <p className="mt-2 text-sm text-surface-400">
                  or{' '}
                  <span className="font-semibold text-primary-400">browse files</span>
                  {' '}&middot; PDF up to 10MB
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </motion.div>

      {/* Job Description box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10 rounded-2xl border border-surface-700 bg-surface-800/60 p-7 sm:mb-12 sm:p-8"
      >
        <label className="mb-4 block text-sm font-semibold text-white">
          Job Description
        </label>
        <textarea
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value);
            if (error) setError('');
          }}
          placeholder="e.g., Senior Frontend Developer with React, TypeScript, 3+ years of experience..."
          rows={5}
          className="w-full resize-none rounded-xl border border-surface-600 bg-surface-900 px-5 py-4 text-sm leading-relaxed text-white placeholder-surface-500 outline-none transition-all focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="flex items-center gap-2.5 rounded-xl border border-danger-500/30 bg-danger-500/15 px-5 py-4 text-sm font-medium text-danger-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <div className="rounded-xl border border-primary-500/30 bg-primary-500/10 p-5 sm:p-6">
              <div className="mb-2.5 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <ScanSearch className="h-4 w-4 animate-spin text-primary-400" />
                  <span className="font-medium text-surface-200">Analyzing resume...</span>
                </div>
                <span className="font-mono font-bold text-primary-400">
                  {uploadProgress}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface-700">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
        onClick={handleSubmit}
        disabled={isLoading}
        className="mt-2 flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-600 px-6 py-4.5 text-base font-bold text-white shadow-lg shadow-primary-600/25 transition-all hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-500/30 disabled:cursor-not-allowed disabled:opacity-50 sm:py-5"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Analyze Resume
          </>
        )}
      </motion.button>
    </motion.div>
  );
}
