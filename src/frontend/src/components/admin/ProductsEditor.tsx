import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../../types/bakery";

const CATEGORIES = ["Breads", "Pastries", "Cakes", "Seasonal"];

const EMPTY_FORM: Omit<Product, "id"> = {
  name: "",
  description: "",
  price: 0,
  category: "Pastries",
  available: true,
  image: "",
};

interface ProductsEditorProps {
  products: Product[];
  onAdd: (product: Omit<Product, "id">) => void;
  onUpdate: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductsEditor({
  products,
  onAdd,
  onUpdate,
  onDelete,
}: ProductsEditorProps) {
  const [form, setForm] = useState<Omit<Product, "id">>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const startEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      available: product.available,
      image: product.image,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.description) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    if (editingId) {
      onUpdate({ ...form, id: editingId });
      toast.success("Product updated!");
      setEditingId(null);
    } else {
      onAdd(form);
      toast.success("Product added!");
    }
    setForm(EMPTY_FORM);
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-sans text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
          Products ({products.length})
        </h3>
        {products.length === 0 ? (
          <p
            className="text-sm text-muted-foreground font-sans"
            data-ocid="products.empty_state"
          >
            No products yet.
          </p>
        ) : (
          <div className="space-y-2">
            {products.map((product, idx) => (
              <div
                key={product.id}
                data-ocid={`products.item.${idx + 1}`}
                className="flex items-center justify-between gap-4 p-4 bg-secondary/30 rounded-xl"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={
                      product.image ||
                      "/assets/generated/product-sourdough.dim_600x600.jpg"
                    }
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-sans font-medium text-foreground truncate">
                        {product.name}
                      </p>
                      <Badge
                        variant="outline"
                        className="font-sans text-xs shrink-0"
                      >
                        {product.category}
                      </Badge>
                    </div>
                    <p className="font-sans text-sm text-muted-foreground">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch
                    checked={product.available}
                    onCheckedChange={(checked) =>
                      onUpdate({ ...product, available: checked })
                    }
                    data-ocid={`products.switch.${idx + 1}`}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(product)}
                    data-ocid={`products.edit_button.${idx + 1}`}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                      onDelete(product.id);
                      toast.success("Product deleted.");
                    }}
                    data-ocid={`products.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Separator />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {editingId ? "Edit Product" : "Add Product"}
          </h3>
          {editingId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={cancelEdit}
              data-ocid="products.cancel_button"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="grid sm:grid-cols-2 gap-4 max-w-2xl"
        >
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="prodName" className="font-sans">
              Name *
            </Label>
            <Input
              id="prodName"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Product name"
              className="font-sans"
              data-ocid="products.input"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="prodDesc" className="font-sans">
              Description *
            </Label>
            <Textarea
              id="prodDesc"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
              placeholder="Describe the product..."
              rows={3}
              className="font-sans resize-none"
              data-ocid="products.textarea"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prodPrice" className="font-sans">
              Price ($)
            </Label>
            <Input
              id="prodPrice"
              type="number"
              step="0.01"
              min="0"
              value={form.price}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  price: Number.parseFloat(e.target.value) || 0,
                }))
              }
              className="font-sans"
              data-ocid="products.price.input"
            />
          </div>
          <div className="space-y-2">
            <Label className="font-sans">Category</Label>
            <Select
              value={form.category}
              onValueChange={(val) => setForm((p) => ({ ...p, category: val }))}
            >
              <SelectTrigger className="font-sans" data-ocid="products.select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat} className="font-sans">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="prodImage" className="font-sans">
              Image URL
            </Label>
            <Input
              id="prodImage"
              value={form.image}
              onChange={(e) =>
                setForm((p) => ({ ...p, image: e.target.value }))
              }
              placeholder="/assets/generated/..."
              className="font-sans"
              data-ocid="products.image.input"
            />
          </div>
          <div className="flex items-center gap-3 sm:col-span-2">
            <Switch
              id="prodAvail"
              checked={form.available}
              onCheckedChange={(checked) =>
                setForm((p) => ({ ...p, available: checked }))
              }
              data-ocid="products.available.switch"
            />
            <Label htmlFor="prodAvail" className="font-sans cursor-pointer">
              Available for sale
            </Label>
          </div>
          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={saving}
              data-ocid="products.submit_button"
            >
              {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Product"
                  : "Add Product"}
              {!saving && !editingId && <Plus className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
