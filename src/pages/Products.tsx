import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import Layout from '@/components/Layout';
import ProductGrid from '@/components/ProductGrid';
import { products } from '@/data/products';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Extract all unique colors and sizes from products
const allColors = [...new Set(products.flatMap(p => p.colors))].sort();
const allSizes = [...new Set(products.flatMap(p => p.sizes))];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryFilter = searchParams.get('category') || 'all';
  const colorFilter = searchParams.get('color') || 'all';
  const sizeFilter = searchParams.get('size') || 'all';
  const searchQuery = searchParams.get('search') || '';

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
      const matchesColor = colorFilter === 'all' || product.colors.some(c => c.toLowerCase() === colorFilter.toLowerCase());
      const matchesSize = sizeFilter === 'all' || product.sizes.some(s => s.toLowerCase() === sizeFilter.toLowerCase());
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesColor && matchesSize && matchesSearch;
    });
  }, [categoryFilter, colorFilter, sizeFilter, searchQuery]);

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    setSearchParams(params);
  };

  const handleColorChange = (color: string) => {
    const params = new URLSearchParams(searchParams);
    if (color === 'all') {
      params.delete('color');
    } else {
      params.set('color', color.toLowerCase());
    }
    setSearchParams(params);
  };

  const handleSizeChange = (size: string) => {
    const params = new URLSearchParams(searchParams);
    if (size === 'all') {
      params.delete('size');
    } else {
      params.set('size', size.toLowerCase());
    }
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = categoryFilter !== 'all' || colorFilter !== 'all' || sizeFilter !== 'all' || searchQuery;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-2">
            {categoryFilter === 'women' ? "Women's Collection" :
             categoryFilter === 'men' ? "Men's Collection" : 'All Products'}
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
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-lg p-6 shadow-soft">
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

              {/* Category Filter */}
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color Filter */}
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-muted-foreground">Color</p>
                <Select value={colorFilter} onValueChange={handleColorChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colors</SelectItem>
                    {allColors.map((color) => (
                      <SelectItem key={color} value={color.toLowerCase()}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Size Filter */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Size</p>
                <Select value={sizeFilter} onValueChange={handleSizeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    {allSizes.map((size) => (
                      <SelectItem key={size} value={size.toLowerCase()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              className="absolute inset-0 bg-charcoal/50"
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
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <Select value={categoryFilter} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="women">Women</SelectItem>
                    <SelectItem value="men">Men</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Color Section */}
              <div className="space-y-3 mb-8">
                <p className="text-sm font-medium text-muted-foreground">Color</p>
                <Select value={colorFilter} onValueChange={handleColorChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Colors</SelectItem>
                    {allColors.map((color) => (
                      <SelectItem key={color} value={color.toLowerCase()}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Size Section */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">Size</p>
                <Select value={sizeFilter} onValueChange={handleSizeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sizes</SelectItem>
                    {allSizes.map((size) => (
                      <SelectItem key={size} value={size.toLowerCase()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => setIsFilterOpen(false)}
                className="w-full mt-8 py-3 bg-gold text-primary font-medium rounded-md"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </Layout>
  );
};

export default Products;
