# PowerPoint Generation Guide

This guide explains how to generate an editable PowerPoint (.pptx) file from the Azure Tobacco Business Deck.

## Two Methods Available

### Method 1: Browser-Based (Easiest) ⭐ Recommended

**File:** `generate-pptx.html`

1. Open `generate-pptx.html` in any modern web browser (Chrome, Firefox, Safari, Edge)
2. Click the "Generate PowerPoint (.pptx)" button
3. The file will be automatically downloaded to your Downloads folder
4. Open the file in Microsoft PowerPoint, Google Slides, or any compatible software

**Advantages:**
- No installation required
- Works on any operating system
- Simple one-click generation

---

### Method 2: Node.js Script (Command Line)

**File:** `generate-pptx.js`

**Prerequisites:**
- Node.js installed on your system
- npm (comes with Node.js)

**Steps:**

1. Install the required package:
   ```bash
   npm install pptxgenjs
   ```

2. Run the script:
   ```bash
   node generate-pptx.js
   ```

3. The PowerPoint file will be generated in the same directory as `Azure_Tobacco_Business_Deck.pptx`

**Advantages:**
- Can be automated
- Works well in CI/CD pipelines
- More control over the generation process

---

## Generated PowerPoint Features

The generated PowerPoint file includes:

1. **Title Slide** - Company introduction and tagline
2. **Company Overview** - Mission, vision, and key statistics
3. **Our Services** - Manufacturing, white label, distribution, quality
4. **White Label Manufacturing** - Detailed services for white label clients
5. **Product Portfolio** - Cigarettes, rolling tobacco, pipe tobacco, custom products
6. **Quality & Compliance** - Quality assurance and regulatory compliance
7. **Distribution Partnership** - Partnership benefits and support services
8. **Why Choose Us** - Competitive advantages
9. **Contact & Next Steps** - Contact information and next steps

## Editing the PowerPoint

Once generated, you can:

- ✅ Edit all text content
- ✅ Change colors and fonts
- ✅ Add or remove slides
- ✅ Add images and logos
- ✅ Modify layouts
- ✅ Add animations and transitions
- ✅ Export to PDF or other formats

## Customization

To customize the content before generation:

- **Browser Method:** Edit the JavaScript in `generate-pptx.html`
- **Node.js Method:** Edit the content in `generate-pptx.js`

Both files contain the same slide content structure, so you can modify:
- Text content
- Colors (defined in the `colors` object)
- Font sizes
- Slide layouts
- Positioning of elements

## Troubleshooting

### Browser Method Issues:
- **File doesn't download:** Check browser download settings and pop-up blockers
- **Script errors:** Make sure you have a stable internet connection (library loads from CDN)

### Node.js Method Issues:
- **Module not found:** Run `npm install pptxgenjs` first
- **Permission errors:** Make sure you have write permissions in the directory

## File Output

- **Filename:** `Azure_Tobacco_Business_Deck.pptx`
- **Format:** PowerPoint 2007+ (.pptx)
- **Compatibility:** 
  - Microsoft PowerPoint 2007+
  - Google Slides
  - LibreOffice Impress
  - Apple Keynote
  - Online PowerPoint viewers

## Need Help?

If you encounter any issues:
1. Check that all required files are present
2. Ensure you have the latest version of your browser/Node.js
3. Try the alternative method if one doesn't work

---

**Note:** The PowerPoint file is fully editable. You can customize it to match your brand colors, add your logo, or modify any content as needed.


