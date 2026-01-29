import { Toaster as Sonner, toast } from "sonner";

const toasterClassNames = {
  toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
  description: "group-[.toast]:text-muted-foreground",
  actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
  cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
};

export function Toaster(props: React.ComponentProps<typeof Sonner>) {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{ classNames: toasterClassNames }}
      {...props}
    />
  );
}

export { toast };
