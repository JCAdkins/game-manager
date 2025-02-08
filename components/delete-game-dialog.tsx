"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DeleteGameDialogProps {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
}

export default function DeleteGameDialog({
  open,
  setOpen,
  onConfirm,
}: DeleteGameDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 bg-card p-6 rounded-lg shadow-lg shadow-gray-700 border border-gray-700">
          {/* Close Button */}
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>
          </Dialog.Close>

          <Dialog.Title className="text-lg font-bold text-center">
            Delete Game
          </Dialog.Title>
          <Dialog.Description className="text-sm text-muted-foreground text-center mt-2">
            Are you sure you want to delete this game? This action cannot be
            undone.
          </Dialog.Description>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="destructive" onClick={onConfirm}>
              Yes, Delete
            </Button>
            <Dialog.Close asChild>
              <Button variant="outline">Cancel</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
