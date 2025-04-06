"use client"
import { Switch } from '@/components/ui/switch';
import { updateEventTypeStatusAction } from '@/lib/actions/general.actions';
import { useActionState, useEffect, useTransition } from 'react';
import { toast } from 'sonner';

const MenuActiveSwitcher = ({
    initialChecked,
    eventTypeId,
  }: {
    eventTypeId: string;
    initialChecked: boolean;
  }) => {
    const [isPending, startTransition] = useTransition();
  const [state, action] = useActionState(updateEventTypeStatusAction, undefined);
  useEffect(() => {
    if (state?.status === "success") {
      toast.success(state.message);
    } else if (state?.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <Switch
    defaultChecked={initialChecked}
    disabled={isPending}
    onCheckedChange={(isChecked) => {
      startTransition(() => {
        action({
          isChecked: isChecked,
          eventTypeId,
        });
      });
    }}
  />
  )
}

export default MenuActiveSwitcher
