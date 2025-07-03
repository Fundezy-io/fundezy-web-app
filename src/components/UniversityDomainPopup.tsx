import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface UniversityDomainPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: () => void;
}

export const UniversityDomainPopup = ({ isOpen, onClose, onRegister }: UniversityDomainPopupProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-95 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto bg-white bg-opacity-95 dark:bg-gray-900 dark:bg-opacity-95">
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Please Use a Personal Email Address
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              It looks like you are trying to log in with your university email. For a better experience and to ensure continued access in the future, we recommend registering with your personal email address instead.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={onRegister}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fundezy-red hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fundezy-red"
            >
              Register with New Email
            </button>
            <button
              onClick={onClose}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fundezy-red"
            >
              Close
            </button>
          </div>
        </div>
      </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}; 