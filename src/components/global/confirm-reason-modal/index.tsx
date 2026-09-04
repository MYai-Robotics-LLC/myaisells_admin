'use client';

import { FormField, Modal } from '@myai-robotics-llc/ui';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

/**
 * Shared "sensitive action" confirmation dialog (PRD §15.3): suspension,
 * cancellation, ownership transfer, role/permission change, billing
 * adjustment, data export, and support-mode access all require confirmation
 * plus a logged reason. Previously this pattern only existed as a local,
 * delete-specific copy inside BusinessSupportPanel.tsx — this generalizes it
 * so any destructive or sensitive action across the app can reuse it.
 */
type ConfirmReasonModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  confirmingLabel?: string;
  variant?: 'danger' | 'default';
  onClose: () => void;
  onConfirm: (reason: string) => void;
  isLoading?: boolean;
};

export function ConfirmReasonModal({
  open,
  title,
  description = 'This action is audit-logged and may not be reversible.',
  confirmLabel = 'Confirm',
  confirmingLabel = 'Confirming…',
  variant = 'danger',
  onClose,
  onConfirm,
  isLoading = false,
}: ConfirmReasonModalProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ reason: string }>();

  const submit = (values: { reason: string }) => {
    onConfirm(values.reason);
    reset();
  };

  const confirmClasses = variant === 'danger'
    ? 'bg-red-600 hover:bg-red-700'
    : 'bg-primary-600 hover:bg-primary-700';

  return (
    <Modal open={open} onOpenChange={o => !o && onClose()} title={title} className="max-w-sm">
      <form onSubmit={handleSubmit(submit)} className="mt-1 space-y-4">
        <p className="text-sm text-slate-600">{description}</p>
        <FormField
          label="Reason"
          id="confirm_reason"
          placeholder="Why is this being done?"
          error={errors.reason ? 'Required' : undefined}
          {...register('reason', { required: true })}
        />
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
          <button type="submit" disabled={isLoading} className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${confirmClasses}`}>
            {isLoading ? confirmingLabel : confirmLabel}
          </button>
        </div>
      </form>
    </Modal>
  );
}

/**
 * Wraps a mutation with the open/loading/toast bookkeeping needed to drive
 * ConfirmReasonModal. Callers pass a closure that already knows which
 * record it's acting on — this hook only owns the confirm-flow state.
 */
export function useConfirmReasonAction(
  action: (reason: string) => Promise<unknown>,
  messages?: { success?: string; error?: string },
) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = async (reason: string) => {
    setIsLoading(true);
    try {
      await action(reason);
      toast.success(messages?.success ?? 'Done');
      setIsOpen(false);
    } catch {
      toast.error(messages?.error ?? 'Action failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    isLoading,
    confirm,
  };
}
