import { useState, useEffect } from 'react';
import { EyeIcon, EyeSlashIcon, ClipboardIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import { createMTTDemoAccount } from '../services/matchTraderService';
import { FeedbackForm } from './FeedbackForm';
// import { getApiUrl } from '../config/env.config';

interface MT5CredentialsProps {
  server: string;
  login: string;
  password: string;
  accountId: string;
  loading: boolean;
  error: string | null;
  email: string;
  status?: string;
  firstName: string;
  lastName: string;
  onRefresh: () => void;
}

export const Credentials = ({ server, login, password, accountId, loading, error, email, status = 'active', firstName, lastName, onRefresh }: MT5CredentialsProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [creatingAccount, setCreatingAccount] = useState(false);
  const [createAccountError, setCreateAccountError] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [copiedLogin, setCopiedLogin] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);
  const [copiedAccountId, setCopiedAccountId] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showFullscreenIframe, setShowFullscreenIframe] = useState(false);
  const [formData, setFormData] = useState({
    firstName: firstName || '',
    lastName: lastName || ''
  });

  useEffect(() => {
    // Show overlay if credentials are empty or account is inactive
    setShowOverlay(!server || !login || !password || status !== 'active');
  }, [server, login, password, status]);

  const handleCreateDemoAccount = async () => {
    if (!formData.firstName || !formData.lastName) {
      setCreateAccountError('Please enter your first name and last name');
      return;
    }

    setCreatingAccount(true);
    setCreateAccountError(null);
    setSuccessMessage(null);

    try {
      const result = await createMTTDemoAccount({
        email,
        firstName: formData.firstName,
        lastName: formData.lastName
      });
      
      if (result.success) {
        setSuccessMessage('Demo account created successfully!');
        try {
          await onRefresh();
        } catch (error) {
          console.error('Failed to refresh credentials: ', error);
        }
        setShowOverlay(false);
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        setCreateAccountError(result.message);
        if (result.message.includes('No demo accounts available')) {
          setShowFeedbackForm(true);
        }
      }
    } catch (error: any) {
      setCreateAccountError(error.message);
      if (error.message.includes('No demo accounts available')) {
        setShowFeedbackForm(true);
      }
    } finally {
      setCreatingAccount(false);
    }
  };

  const copyToClipboard = async (text: string, type: 'login' | 'password' | 'accountId') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'login') {
        setCopiedLogin(true);
        setTimeout(() => setCopiedLogin(false), 2000);
      } else if (type === 'password') {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      } else if (type === 'accountId') {
        setCopiedAccountId(true);
        setTimeout(() => setCopiedAccountId(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getTerminalUrl = () => {
    const baseUrl = `https://platform.fundezy.io?redirect_url=${'https%3A%2F%2Fus-central1-fundezy-app-uat.cloudfunctions.net%2FmttProxy%2Fsignin'}`;
    
    return `${baseUrl}`;
  };

  const openWebTerminal = (useIframe: boolean = false) => {
    if (useIframe) {
      setShowFullscreenIframe(true);
    } else {
      window.open(getTerminalUrl(), '_blank');
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Credentials</h3>
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fundezy-red"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading credentials...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Credentials</h3>
        <div className="text-center text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Credentials</h3>
          {server === 'MTT' && login && password && status === 'active' && (
            <div className="flex gap-2">
              <button
                onClick={() => openWebTerminal(false)}
                className="bg-fundezy-red text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in New Tab
              </button>
              <button
                onClick={() => openWebTerminal(true)}
                className="bg-fundezy-red text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Open Fullscreen
              </button>
            </div>
          )}
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
            {successMessage}
          </div>
        )}
        
        {/* Credentials Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Server</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={status === 'active' ? server : ''}
                readOnly
                className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-2"
                placeholder={status !== 'active' ? 'Account inactive' : ''}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Login</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={status === 'active' ? login : ''}
                readOnly
                className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-2 pr-10"
                placeholder={status !== 'active' ? 'Account inactive' : ''}
              />
              {status === 'active' && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(login, 'login')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {copiedLogin ? (
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                  ) : (
                    <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account ID</label>
            <div className="relative mt-1">
              <input
                type="text"
                value={status === 'active' ? accountId : ''}
                readOnly
                className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-2 pr-10"
                placeholder={status !== 'active' ? 'Account inactive' : ''}
              />
              {status === 'active' && (
                <button
                  type="button"
                  onClick={() => copyToClipboard(accountId, 'accountId')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                >
                  {copiedAccountId ? (
                    <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                  ) : (
                    <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={status === 'active' ? password : ''}
                readOnly
                className="block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-300 p-2 pr-20"
                placeholder={status !== 'active' ? 'Account inactive' : ''}
              />
              {status === 'active' && (
                <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(password, 'password')}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {copiedPassword ? (
                      <ClipboardDocumentCheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
                    ) : (
                      <ClipboardIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <EyeIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Create Demo Account Overlay */}
        {showOverlay && (
          <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="relative w-full max-w-md mx-4">
              {showFeedbackForm ? (
                <FeedbackForm 
                  email={email}
                  onClose={() => {
                    setShowFeedbackForm(false);
                    setCreateAccountError(null);
                  }}
                />
              ) : (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {status !== 'active' ? 'Account Inactive' : 'Create Demo Account'}
                    </h4>
                    <button
                      onClick={() => setShowOverlay(false)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {status !== 'active' 
                      ? 'Your account is currently inactive. Please contact support for assistance.'
                      : 'Start your trading journey with a demo account. Practice your strategies risk-free.'}
                  </p>
                  
                  {createAccountError && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">
                      {createAccountError}
                    </div>
                  )}

                  {status === 'active' && (
                    <div className="space-y-4">
                      {!firstName && !lastName && (
                        <>
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:text-white"
                              placeholder="Enter your first name"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-fundezy-red focus:ring-fundezy-red dark:bg-gray-700 dark:text-white"
                              placeholder="Enter your last name"
                              required
                            />
                          </div>
                        </>
                      )}
                      <button
                        onClick={handleCreateDemoAccount}
                        disabled={creatingAccount}
                        className="w-full bg-fundezy-red text-white py-2 px-4 rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {creatingAccount ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Creating Account...
                          </>
                        ) : (
                          'Create Demo Account'
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Iframe */}
      {showFullscreenIframe && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50">
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setShowFullscreenIframe(false)}
              className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-2 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <iframe
            src={getTerminalUrl()}
            className="w-full h-full border-0"
            allow="fullscreen"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </>
  );
};