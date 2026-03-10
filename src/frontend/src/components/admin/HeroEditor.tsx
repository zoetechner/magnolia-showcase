import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { HeroContent } from "../../types/bakery";

interface HeroEditorProps {
  hero: HeroContent;
  onSave: (hero: HeroContent) => void;
}

export default function HeroEditor({ hero, onSave }: HeroEditorProps) {
  const [form, setForm] = useState<HeroContent>(hero);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    onSave(form);
    setSaving(false);
    toast.success("Hero content updated!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="headline" className="font-sans">
          Headline
        </Label>
        <Textarea
          id="headline"
          value={form.headline}
          onChange={(e) => setForm((p) => ({ ...p, headline: e.target.value }))}
          rows={3}
          className="font-sans resize-none"
          data-ocid="hero.textarea"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subheading" className="font-sans">
          Subheading
        </Label>
        <Textarea
          id="subheading"
          value={form.subheading}
          onChange={(e) =>
            setForm((p) => ({ ...p, subheading: e.target.value }))
          }
          rows={3}
          className="font-sans resize-none"
          data-ocid="hero.subheading.textarea"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tagline" className="font-sans">
          Tagline
        </Label>
        <Input
          id="tagline"
          value={form.tagline}
          onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
          className="font-sans"
          data-ocid="hero.tagline.input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="ctaLabel" className="font-sans">
          CTA Button Label
        </Label>
        <Input
          id="ctaLabel"
          value={form.ctaLabel}
          onChange={(e) => setForm((p) => ({ ...p, ctaLabel: e.target.value }))}
          className="font-sans"
          data-ocid="hero.cta.input"
        />
      </div>
      <Button type="submit" disabled={saving} data-ocid="hero.save_button">
        {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
        {saving ? "Saving..." : "Save Hero Content"}
      </Button>
    </form>
  );
}
