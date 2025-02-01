"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  title?: string;
  description?: string; // ✅ Add description prop
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const Modal = ({
  title,
  description,
  children,
  isOpen,
  onClose,
  className,
}: ModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-accent text-foreground/70 p-6 shadow-xl z-50",
            className
          )}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-3">
            <Dialog.Title className="text-lg font-semibold">
              {title}
              {description && (
                <Dialog.Description className="text-sm text-foreground/50">
                  {description}
                </Dialog.Description>
              )}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-200 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
              {/* ✅ Add Dialog.Description for accessibility */}
            </Dialog.Close>
          </div>

          {/* Modal Content */}
          <div className="mt-4">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
