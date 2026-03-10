import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { StoryContent } from "../../types/bakery";

interface StoryEditorProps {
  story: StoryContent;
  onSave: (story: StoryContent) => void;
}

export default function StoryEditor({ story, onSave }: StoryEditorProps) {
  const [form, setForm] = useState<StoryContent>(story);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    onSave(form);
    setSaving(false);
    toast.success("Story updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="storyTitle" className="font-sans">
          Section Title
        </Label>
        <Input
          id="storyTitle"
          value={form.title}
          onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          className="font-sans"
          data-ocid="story.input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="storyBody" className="font-sans">
          Story Body
        </Label>
        <p className="text-xs text-muted-foreground font-sans">
          Separate paragraphs with a blank line.
        </p>
        <Textarea
          id="storyBody"
          value={form.body}
          onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
          rows={12}
          className="font-sans"
          data-ocid="story.textarea"
        />
      </div>
      <Button type="submit" disabled={saving} data-ocid="story.save_button">
        {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        {saving ? "Saving..." : "Save Story"}
      </Button>
    </form>
  );
}
