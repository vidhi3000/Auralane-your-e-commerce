import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

// Extract all unique colors and sizes from products
const allColors = [...new Set(products.flatMap(p => p.colors))].sort();
const allSizes = [...new Set(products.flatMap(p => p.sizes))];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryFilters = new Set(searchParams.getAll('category[]').map(c => c.toLowerCase()));
  const colorFilters = new Set(searchParams.getAll('color[]').map(c => c.toLowerCase()));
  const sizeFilters = new Set(searchParams.getAll('size[]').map(s => s.toLowerCase()));
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilters.size === 0 || categoryFilters.has(product.category.toLowerCase());
      const matchesColor = colorFilters.size === 0 || product.colors.some(c => colorFilters.has(c.toLowerCase()));
      const matchesSize = sizeFilters.size === 0 || product.sizes.some(s => sizeFilters.has(s.toLowerCase()));
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesColor && matchesSize && matchesSearch;
    });
  }, [Array.from(categoryFilters), Array.from(colorFilters), Array.from(sizeFilters), searchQuery]);

  const toggleFilter = (type: 'category' | 'color' | 'size', value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    const key = `${type}[]`;
    params.delete(key);
    if (checked) {
      params.append(key, value.toLowerCase());
    }
    setSearchParams(params);
  };


  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('category[]');
    params.delete('color[]');
    params.delete('size[]');
    params.delete('search');
    setSearchParams(params);
  };


  const hasActiveFilters = categoryFilters.size > 0 || colorFilters.size > 0 || sizeFilters.size > 0 || searchQuery !== '';

  // Filter "all" logic - if "all" checked, clear others
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (categoryFilters.has('all') && (categoryFilters.has('women') || categoryFilters.has('men'))) {
      params.delete('category[]');
      params.append('category[]', 'all');
      setSearchParams(params);
    }
    // Similar for color/size if needed
  }, [categoryFilters]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
            {categoryFilters.size > 0 
              ? Array.from(categoryFilters)
                  .filter(c => c !== 'all' && (c === 'women' || c === 'men'))
                  .map(c => c === 'women' ? "Women's" : "Men's")
                  .join(' & ') + " Collection"
              : 'All Products'
            }
          </h1>
          {searchQuery && (
            <p className="text-muted-foreground">
              Search results for "{searchQuery}"
            </p>
          )}
          <p className="text-muted-foreground mt-1">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {/* Desktop Layout with Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-lg p-6 shadow-soft overflow-visible">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-semibold">Filters</h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-fast"
                  >
                    <X size={14} />
                    Clear
                  </button>
                )}
              </div>

              {/* Filter Sections Container - Flex Column for Proper Stacking */}
              <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-all" onCheckedChange={(checked) => toggleFilter('category', 'all', !!checked)} />
                    <Label htmlFor="cat-all" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-women" checked={categoryFilters.has('women')} onCheckedChange={(checked) => toggleFilter('category', 'women', !!checked)} />
                    <Label htmlFor="cat-women" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Women</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-men" checked={categoryFilters.has('men')} onCheckedChange={(checked) => toggleFilter('category', 'men', !!checked)} />
                    <Label htmlFor="cat-men" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Men</Label>
                  </div>
                </div>
              </div>

              {/* Color Filter */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Color</p>
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {allColors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`color-${color.toLowerCase()}`}
                        checked={colorFilters.has(color.toLowerCase())}
                        onCheckedChange={(checked) => toggleFilter('color', color, !!checked)}
                      />
                      <Label htmlFor={`color-${color.toLowerCase()}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Size</p>
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {allSizes.map((size) => (
                    <div key={size} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`size-${size.toLowerCase()}`}
                        checked={sizeFilters.has(size.toLowerCase())}
                        onCheckedChange={(checked) => toggleFilter('size', size, !!checked)}
                      />
                      <Label htmlFor={`size-${size.toLowerCase()}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium"
              >
                <Filter size={16} />
                Filters
                {hasActiveFilters && <span className="w-2 h-2 bg-gold rounded-full" />}
              </button>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-fast"
                >
                  <X size={14} />
                  Clear filters
                </button>
              )}
            </div>

            {/* Product Grid */}
            <ProductGrid products={filteredProducts} />
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm"
              onClick={() => setIsFilterOpen(false)}

            />
            <div className="absolute right-0 top-0 h-full w-80 bg-background p-6 shadow-elevated animate-slide-in overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-semibold">Filters</h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 text-muted-foreground hover:text-foreground"
                >
                  <X size={20} />
                </button>

              </div>

              {/* Category Section */}
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-m-all" onCheckedChange={(checked) => toggleFilter('category', 'all', !!checked)} />
                    <Label htmlFor="cat-m-all" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-m-women" checked={categoryFilters.has('women')} onCheckedChange={(checked) => toggleFilter('category', 'women', !!checked)} />
                    <Label htmlFor="cat-m-women" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Women</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cat-m-men" checked={categoryFilters.has('men')} onCheckedChange={(checked) => toggleFilter('category', 'men', !!checked)} />
                    <Label htmlFor="cat-m-men" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Men</Label>
                </div>
              </div>
              </div>

              {/* Color Section */}
              <div className="space-y-2 mb-6">
                <p className="text-sm font-medium text-muted-foreground">Color</p>
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {allColors.map((color) => (
                    <div key={`m-color-${color}`} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`m-color-${color.toLowerCase()}`}
                        checked={colorFilters.has(color.toLowerCase())}
                        onCheckedChange={(checked) => toggleFilter('color', color, !!checked)}
                      />
                      <Label htmlFor={`m-color-${color.toLowerCase()}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize">
                        {color}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Section */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Size</p>
                <div className="max-h-[200px] overflow-y-auto space-y-2">
                  {allSizes.map((size) => (
                    <div key={`m-size-${size}`} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`m-size-${size.toLowerCase()}`}
                        checked={sizeFilters.has(size.toLowerCase())}
                        onCheckedChange={(checked) => toggleFilter('size', size, !!checked)}
                      />
                      <Label htmlFor={`m-size-${size.toLowerCase()}`} className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {size}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Apply Button */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 px-4 bg-muted text-muted-foreground hover:bg-muted/80 rounded-md text-sm font-medium"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-1 py-3 px-4 bg-gold text-primary font-medium rounded-md text-sm"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Products;
