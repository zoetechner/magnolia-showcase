import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Location } from "../../types/bakery";

interface LocationsEditorProps {
  locations: Location[];
  onAdd: (location: Omit<Location, "id">) => void;
  onDelete: (id: string) => void;
}

const EMPTY_FORM = { name: "", address: "", hours: "" };

export default function LocationsEditor({
  locations,
  onAdd,
  onDelete,
}: LocationsEditorProps) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [adding, setAdding] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.hours) {
      toast.error("Please fill all fields.");
      return;
    }
    setAdding(true);
    await new Promise((r) => setTimeout(r, 300));
    onAdd(form);
    setForm(EMPTY_FORM);
    setAdding(false);
    toast.success("Location added!");
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="font-sans text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Current Locations
        </h3>
        {locations.length === 0 ? (
          <p
            className="text-sm text-muted-foreground font-sans"
            data-ocid="locations.empty_state"
          >
            No locations yet.
          </p>
        ) : (
          <div className="space-y-3">
            {locations.map((loc, idx) => (
              <div
                key={loc.id}
                data-ocid={`locations.item.${idx + 1}`}
                className="flex items-start justify-between gap-4 p-4 bg-secondary/30 rounded-xl"
              >
                <div>
                  <p className="font-sans font-medium text-foreground">
                    {loc.name}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {loc.address}
                  </p>
                  <p className="font-sans text-xs text-muted-foreground mt-1">
                    {loc.hours}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    onDelete(loc.id);
                    toast.success("Location removed.");
                  }}
                  className="text-destructive hover:text-destructive shrink-0"
                  data-ocid={`locations.delete_button.${idx + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator />
      <div>
        <h3 className="font-sans text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Add Location
        </h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="locName" className="font-sans">
              Store Name
            </Label>
            <Input
              id="locName"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Magnolia Brooklyn"
              className="font-sans"
              data-ocid="locations.input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locAddress" className="font-sans">
              Address
            </Label>
            <Input
              id="locAddress"
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              placeholder="147 Court Street, Brooklyn, NY"
              className="font-sans"
              data-ocid="locations.address.input"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locHours" className="font-sans">
              Hours
            </Label>
            <Input
              id="locHours"
              value={form.hours}
              onChange={(e) =>
                setForm((p) => ({ ...p, hours: e.target.value }))
              }
              placeholder="Mon–Fri: 7am–6pm"
              className="font-sans"
              data-ocid="locations.hours.input"
            />
          </div>
          <Button
            type="submit"
            disabled={adding}
            data-ocid="locations.primary_button"
          >
            {adding ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2" />
            )}
            {adding ? "Adding..." : "Add Location"}
          </Button>
        </form>
      </div>
    </div>
  );
}
