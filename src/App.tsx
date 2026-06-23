import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ResumeAnalysis } from './types';
import { uploadResume, getApiErrorMessage } from './services/api';
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import UploadSection from './components/UploadSection';
import ResultsPanel from './components/ResultsPanel';

function App() {
  const [result, setResult] = useState<ResumeAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (file: File, jobDescription: string) => {
    setIsLoading(true);
    setUploadProgress(0);
    setError('');

    try {
      const data = await uploadResume(file, jobDescription, (progress) => {
        setUploadProgress(progress);
      });
      setResult(data);
    } catch (err: unknown) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsLoading(false);
      setUploadProgress(0);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError('');
  };

  return (
    <div className="relative" style={{ minHeight: '100dvh' }}>
      <AnimatedBackground />
      <Header />

      <AnimatePresence mode="wait">
        {result ? (
          <motion.main
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex w-full justify-center px-4 py-12 sm:px-8 sm:py-16 lg:py-20"
          >
            <div className="w-full max-w-3xl">
              <ResultsPanel data={result} onReset={handleReset} />
            </div>
          </motion.main>
        ) : (
          <motion.main
            key="upload"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex items-center justify-center px-4 sm:px-6"
            style={{ minHeight: 'calc(100dvh - 60px)' }}
          >
            <div className="w-full max-w-xl py-12 sm:py-16">
              <UploadSection
                onSubmit={handleSubmit}
                isLoading={isLoading}
                uploadProgress={uploadProgress}
              />
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-6 rounded-2xl border border-danger-500/30 bg-danger-500/10 px-5 py-3.5 text-center text-sm font-medium text-danger-400"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
