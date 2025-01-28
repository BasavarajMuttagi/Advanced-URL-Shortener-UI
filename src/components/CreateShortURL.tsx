import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { apiClient } from "../lib/utils";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
  longUrl: z.string().url({
    message: "Please enter a valid URL",
  }),
  topic: z.string().optional(),
  customAlias: z.string().optional(),
});

function CreateShortURL({ refetch }: { refetch: () => void }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: "",
      topic: "",
      customAlias: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await apiClient.post("/api/shorten", values);
      form.reset();
      refetch();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!isLoading) {
      setOpen(open);
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange} modal={true}>
      <DialogTrigger asChild>
        <Button>Shorten URL</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            Create Short URL
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="longUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-zinc-600">URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the URL you want to shorten"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-zinc-600">
                    Topic (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Categorize your URL with a topic"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customAlias"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="!text-zinc-600">
                    Custom Alias (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Create a custom alias for your shortened URL"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button disabled={isLoading} type="submit">
                {isLoading ? "Creating..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateShortURL;
