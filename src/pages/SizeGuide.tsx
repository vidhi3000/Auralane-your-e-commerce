const SizeGuide = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Size Guide</h1>
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Measure</h2>
          <p className="text-muted-foreground mb-4">
            To ensure the best fit, please take your measurements carefully. Use a flexible measuring tape and measure over your undergarments.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Chest/Bust</h3>
              <p className="text-sm text-muted-foreground">Measure around the fullest part of your chest/bust, keeping the tape level.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Waist</h3>
              <p className="text-sm text-muted-foreground">Measure around your natural waistline, typically the narrowest part of your torso.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Hips</h3>
              <p className="text-sm text-muted-foreground">Measure around the fullest part of your hips, about 8 inches below your waist.</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Inseam</h3>
              <p className="text-sm text-muted-foreground">Measure from the crotch seam to the bottom of the leg opening.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Women's Size Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2">Size</th>
                  <th className="border border-border p-2">Bust (inches)</th>
                  <th className="border border-border p-2">Waist (inches)</th>
                  <th className="border border-border p-2">Hips (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 text-center">XS</td>
                  <td className="border border-border p-2 text-center">32-33</td>
                  <td className="border border-border p-2 text-center">24-25</td>
                  <td className="border border-border p-2 text-center">34-35</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2 text-center">S</td>
                  <td className="border border-border p-2 text-center">34-35</td>
                  <td className="border border-border p-2 text-center">26-27</td>
                  <td className="border border-border p-2 text-center">36-37</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 text-center">M</td>
                  <td className="border border-border p-2 text-center">36-37</td>
                  <td className="border border-border p-2 text-center">28-29</td>
                  <td className="border border-border p-2 text-center">38-39</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2 text-center">L</td>
                  <td className="border border-border p-2 text-center">38-40</td>
                  <td className="border border-border p-2 text-center">30-32</td>
                  <td className="border border-border p-2 text-center">40-42</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 text-center">XL</td>
                  <td className="border border-border p-2 text-center">41-43</td>
                  <td className="border border-border p-2 text-center">33-35</td>
                  <td className="border border-border p-2 text-center">43-45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Men's Size Chart</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-2">Size</th>
                  <th className="border border-border p-2">Chest (inches)</th>
                  <th className="border border-border p-2">Waist (inches)</th>
                  <th className="border border-border p-2">Inseam (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-2 text-center">S</td>
                  <td className="border border-border p-2 text-center">36-38</td>
                  <td className="border border-border p-2 text-center">28-30</td>
                  <td className="border border-border p-2 text-center">30-31</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2 text-center">M</td>
                  <td className="border border-border p-2 text-center">39-41</td>
                  <td className="border border-border p-2 text-center">31-33</td>
                  <td className="border border-border p-2 text-center">31-32</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 text-center">L</td>
                  <td className="border border-border p-2 text-center">42-44</td>
                  <td className="border border-border p-2 text-center">34-36</td>
                  <td className="border border-border p-2 text-center">32-33</td>
                </tr>
                <tr className="bg-muted/50">
                  <td className="border border-border p-2 text-center">XL</td>
                  <td className="border border-border p-2 text-center">45-47</td>
                  <td className="border border-border p-2 text-center">37-39</td>
                  <td className="border border-border p-2 text-center">33-34</td>
                </tr>
                <tr>
                  <td className="border border-border p-2 text-center">XXL</td>
                  <td className="border border-border p-2 text-center">48-50</td>
                  <td className="border border-border p-2 text-center">40-42</td>
                  <td className="border border-border p-2 text-center">34-35</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="text-muted-foreground mb-4">
            If you're still unsure about your size, our customer service team is here to help.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Contact Information:</p>
            <p>Email: sizing@auralane.com</p>
            <p>Phone: 1-800-AURALANE</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SizeGuide;
