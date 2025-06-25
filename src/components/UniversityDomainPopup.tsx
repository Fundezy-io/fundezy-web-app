import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
          <div className="fixed inset-0 bg-gray-900 bg-opacity-95 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#181e29] px-4 pb-8 pt-8 text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-10">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-[#181e29] text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-fundezy-red focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <Dialog.Title as="h2" className="text-4xl font-bold text-white mb-6">
                    Please Use a Personal Email Address
                  </Dialog.Title>
                  <div className="mb-10">
                    <p className="text-lg text-gray-300">
                      It looks like you are trying to log in with your university email. For a better experience and to ensure continued access in the future, we recommend registering with your personal email address instead.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <button
                    type="button"
                    className="w-full rounded-md bg-red-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundezy-red transition"
                    onClick={onRegister}
                  >
                    Register with New Email
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-md bg-gray-700 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fundezy-red transition"
                    onClick={onClose}
                  >
                    Proceed Anyway
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}; 