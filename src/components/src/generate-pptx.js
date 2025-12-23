/**
 * Generate PowerPoint Presentation for Azure Tobacco Business Deck
 * 
 * Usage:
 *   npm install pptxgenjs
 *   node generate-pptx.js
 */

const PptxGenJS = require('pptxgenjs');

async function generatePowerPoint() {
    try {
        console.log('Creating PowerPoint presentation...');
        
        // Create new presentation
        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_WIDE';
        pptx.author = 'Azure Tobacco Industrial FZCO';
        pptx.company = 'Azure Tobacco Industrial FZCO';
        pptx.title = 'Business Deck - Distributors & White Label Partners';
        pptx.subject = 'Business Presentation';

        // Define colors
        const colors = {
            primary: '0a0d1a',
            secondary: '161b2e',
            cyan: '00d4ff',
            purple: '8b5cf6',
            white: 'ffffff'
        };

        // Slide 1: Title Slide
        console.log('Adding Slide 1: Title Slide...');
        let slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('Azure Tobacco Industrial FZCO', {
            x: 0.5,
            y: 2,
            w: 9,
            h: 1.5,
            fontSize: 48,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });
        slide.addText('Premium Tobacco Manufacturing & Distribution Excellence', {
            x: 0.5,
            y: 3.8,
            w: 9,
            h: 0.8,
            fontSize: 24,
            color: colors.white,
            align: 'center',
            fontFace: 'Arial'
        });
        slide.addText('Crafting Quality • Driving Innovation • Delivering Excellence', {
            x: 0.5,
            y: 4.8,
            w: 9,
            h: 0.6,
            fontSize: 18,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial',
            italic: true
        });
        slide.addText(`Dubai, UAE • ${new Date().getFullYear()}`, {
            x: 0.5,
            y: 6.5,
            w: 9,
            h: 0.5,
            fontSize: 14,
            color: 'CCCCCC',
            align: 'center',
            fontFace: 'Arial'
        });

        // Slide 2: Company Overview
        console.log('Adding Slide 2: Company Overview...');
        slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('Company Overview', {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });
        
        const stats = [
            { label: 'Established', value: '2018', x: 0.5 },
            { label: 'Employees', value: '150+', x: 3.5 },
            { label: 'Markets', value: 'Global', x: 6.5 }
        ];
        
        stats.forEach(stat => {
            slide.addText(stat.value, {
                x: stat.x,
                y: 1.8,
                w: 2.5,
                h: 0.8,
                fontSize: 32,
                bold: true,
                color: colors.cyan,
                align: 'center',
                fontFace: 'Arial'
            });
            slide.addText(stat.label, {
                x: stat.x,
                y: 2.6,
                w: 2.5,
                h: 0.4,
                fontSize: 14,
                color: colors.white,
                align: 'center',
                fontFace: 'Arial'
            });
        });

        slide.addText('Our Mission', {
            x: 0.5,
            y: 3.5,
            w: 4.5,
            h: 0.5,
            fontSize: 20,
            bold: true,
            color: colors.cyan,
            fontFace: 'Arial'
        });
        slide.addText('To deliver premium tobacco products that exceed customer expectations through innovative manufacturing processes, sustainable practices, and unwavering commitment to quality.', {
            x: 0.5,
            y: 4.1,
            w: 4.5,
            h: 1.2,
            fontSize: 12,
            color: colors.white,
            fontFace: 'Arial',
            align: 'left'
        });

        slide.addText('Our Vision', {
            x: 5,
            y: 3.5,
            w: 4.5,
            h: 0.5,
            fontSize: 20,
            bold: true,
            color: colors.cyan,
            fontFace: 'Arial'
        });
        slide.addText('To become the leading tobacco manufacturing company in the Middle East and Africa, recognized for excellence in product quality, operational efficiency, and customer satisfaction.', {
            x: 5,
            y: 4.1,
            w: 4.5,
            h: 1.2,
            fontSize: 12,
            color: colors.white,
            fontFace: 'Arial',
            align: 'left'
        });

        // Slide 3: Our Services
        console.log('Adding Slide 3: Our Services...');
        slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('Our Services', {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        const services = [
            {
                title: 'Manufacturing',
                items: ['Premium tobacco processing', 'Custom blending services', 'Automated production lines', 'Quality assurance systems'],
                y: 1.5
            },
            {
                title: 'White Label Manufacturing',
                items: ['Custom product development', 'Private label packaging', 'Brand customization', 'Full manufacturing support'],
                y: 1.5,
                x: 5
            },
            {
                title: 'Distribution',
                items: ['Global logistics network', 'Supply chain optimization', 'Inventory management', 'Partnership programs'],
                y: 4.2
            },
            {
                title: 'Quality & Compliance',
                items: ['ISO 9001 certified', 'HACCP compliance', 'Regulatory expertise', 'Quality certifications'],
                y: 4.2,
                x: 5
            }
        ];

        services.forEach(service => {
            slide.addText(service.title, {
                x: service.x || 0.5,
                y: service.y,
                w: 4,
                h: 0.5,
                fontSize: 18,
                bold: true,
                color: colors.cyan,
                fontFace: 'Arial'
            });
            service.items.forEach((item, idx) => {
                slide.addText('• ' + item, {
                    x: (service.x || 0.5) + 0.2,
                    y: service.y + 0.6 + (idx * 0.35),
                    w: 3.6,
                    h: 0.3,
                    fontSize: 11,
                    color: colors.white,
                    fontFace: 'Arial'
                });
            });
        });

        // Slide 4: White Label Manufacturing
        console.log('Adding Slide 4: White Label Manufacturing...');
        slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('White Label Manufacturing', {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        slide.addText('Complete Manufacturing Solutions for Your Brand', {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 0.6,
            fontSize: 20,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        slide.addText('Partner with us to bring your tobacco products to market. We handle everything from product development to final packaging, allowing you to focus on building your brand.', {
            x: 0.5,
            y: 2.2,
            w: 9,
            h: 0.8,
            fontSize: 14,
            color: colors.white,
            align: 'center',
            fontFace: 'Arial'
        });

        const whiteLabelServices = [
            {
                title: 'Product Development',
                items: ['Custom blend formulation', 'Flavor profile development', 'Product testing & refinement', 'Prototype development'],
                y: 3.3
            },
            {
                title: 'Manufacturing',
                items: ['Full production capabilities', 'Scalable manufacturing', 'Quality control at every stage', 'Flexible order quantities'],
                y: 3.3,
                x: 5
            },
            {
                title: 'Packaging & Branding',
                items: ['Custom packaging design', 'Private label printing', 'Brand compliance', 'Regulatory labeling'],
                y: 5.5
            },
            {
                title: 'Support Services',
                items: ['Regulatory compliance', 'Quality certifications', 'Logistics & shipping', 'Ongoing partnership support'],
                y: 5.5,
                x: 5
            }
        ];

        whiteLabelServices.forEach(service => {
            slide.addText(service.title, {
                x: service.x || 0.5,
                y: service.y,
                w: 4,
                h: 0.5,
                fontSize: 16,
                bold: true,
                color: colors.cyan,
                fontFace: 'Arial'
            });
            service.items.forEach((item, idx) => {
                slide.addText('• ' + item, {
                    x: (service.x || 0.5) + 0.2,
                    y: service.y + 0.5 + (idx * 0.3),
                    w: 3.6,
                    h: 0.25,
                    fontSize: 10,
                    color: colors.white,
                    fontFace: 'Arial'
                });
            });
        });

        // Slide 5: Product Portfolio
        console.log('Adding Slide 5: Product Portfolio...');
        slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('Product Portfolio', {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        const products = [
            {
                title: 'Cigarettes',
                items: ['Full flavor, light, ultra-light', 'King size, 100s, 120s', 'Menthol and non-menthol', 'Custom blends available'],
                y: 1.5
            },
            {
                title: 'Rolling Tobacco',
                items: ['Fine cut, medium cut', 'Natural and flavored', 'Premium blends', 'Custom packaging'],
                y: 1.5,
                x: 5
            },
            {
                title: 'Pipe Tobacco',
                items: ['Traditional blends', 'Aromatic varieties', 'Premium quality', 'Custom formulations'],
                y: 4
            },
            {
                title: 'Custom Products',
                items: ['Product development', 'Custom formulations', 'Market-specific products', 'Innovation partnerships'],
                y: 4,
                x: 5
            }
        ];

        products.forEach(product => {
            slide.addText(product.title, {
                x: product.x || 0.5,
                y: product.y,
                w: 4,
                h: 0.5,
                fontSize: 18,
                bold: true,
                color: colors.cyan,
                fontFace: 'Arial'
            });
            product.items.forEach((item, idx) => {
                slide.addText('• ' + item, {
                    x: (product.x || 0.5) + 0.2,
                    y: product.y + 0.6 + (idx * 0.3),
                    w: 3.6,
                    h: 0.25,
                    fontSize: 11,
                    color: colors.white,
                    fontFace: 'Arial'
                });
            });
        });

        // Slide 6: Quality & Compliance
        console.log('Adding Slide 6: Quality & Compliance...');
        slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('Quality & Compliance', {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        const qualityStats = [
            { label: 'Quality Pass Rate', value: '99.5%', x: 0.5 },
            { label: 'Certified', value: 'ISO 9001', x: 3.5 },
            { label: 'Compliant', value: 'HACCP', x: 6.5 }
        ];

        qualityStats.forEach(stat => {
            slide.addText(stat.value, {
                x: stat.x,
                y: 1.8,
                w: 2.5,
                h: 0.6,
                fontSize: 28,
                bold: true,
                color: colors.cyan,
                align: 'center',
                fontFace: 'Arial'
            });
            slide.addText(stat.label, {
                x: stat.x,
                y: 2.4,
                w: 2.5,
                h: 0.4,
                fontSize: 12,
                color: colors.white,
                align: 'center',
                fontFace: 'Arial'
            });
        });

        slide.addText('Quality Assurance', {
            x: 0.5,
            y: 3.3,
            w: 4.5,
            h: 0.5,
            fontSize: 20,
            bold: true,
            color: colors.cyan,
            fontFace: 'Arial'
        });
        const qaItems = [
            'Multi-stage quality control processes',
            'Real-time quality monitoring systems',
            'Premium raw material sourcing',
            'Comprehensive testing protocols'
        ];
        qaItems.forEach((item, idx) => {
            slide.addText('✓ ' + item, {
                x: 0.7,
                y: 3.9 + (idx * 0.4),
                w: 4.1,
                h: 0.35,
                fontSize: 12,
                color: colors.white,
                fontFace: 'Arial'
            });
        });

        slide.addText('Regulatory Compliance', {
            x: 5,
            y: 3.3,
            w: 4.5,
            h: 0.5,
            fontSize: 20,
            bold: true,
            color: colors.cyan,
            fontFace: 'Arial'
        });
        const complianceItems = [
            'International regulatory expertise',
            'Multi-market compliance support',
            'Documentation and certification',
            'Ongoing compliance monitoring'
        ];
        complianceItems.forEach((item, idx) => {
            slide.addText('✓ ' + item, {
                x: 5.2,
                y: 3.9 + (idx * 0.4),
                w: 4.1,
                h: 0.35,
                fontSize: 12,
                color: colors.white,
                fontFace: 'Arial'
            });
        });

        // Slide 7: Distribution Partnership
        console.log('Adding Slide 7: Distribution Partnership...');
        slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('Distribution Partnership', {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        slide.addText('Partner with Us for Market Success', {
            x: 0.5,
            y: 1.3,
            w: 9,
            h: 0.6,
            fontSize: 20,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        const partnershipServices = [
            {
                title: 'Partnership Benefits',
                items: ['Competitive wholesale pricing', 'Exclusive territory opportunities', 'Marketing support materials', 'Flexible payment terms', 'Priority order processing'],
                y: 2.2
            },
            {
                title: 'Support Services',
                items: ['Dedicated account management', 'Product training programs', 'Marketing collateral', 'Technical support', 'Regular business reviews'],
                y: 2.2,
                x: 5
            },
            {
                title: 'Logistics & Supply',
                items: ['Reliable delivery schedules', 'Global shipping capabilities', 'Inventory management support', 'Order tracking systems', 'Supply chain optimization'],
                y: 4.5
            },
            {
                title: 'Market Development',
                items: ['Market intelligence sharing', 'Joint marketing initiatives', 'Product launch support', 'Sales training programs', 'Growth partnership programs'],
                y: 4.5,
                x: 5
            }
        ];

        partnershipServices.forEach(service => {
            slide.addText(service.title, {
                x: service.x || 0.5,
                y: service.y,
                w: 4,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: colors.cyan,
                fontFace: 'Arial'
            });
            service.items.forEach((item, idx) => {
                slide.addText('• ' + item, {
                    x: (service.x || 0.5) + 0.2,
                    y: service.y + 0.45 + (idx * 0.28),
                    w: 3.6,
                    h: 0.25,
                    fontSize: 10,
                    color: colors.white,
                    fontFace: 'Arial'
                });
            });
        });

        // Slide 8: Why Choose Us
        console.log('Adding Slide 8: Why Choose Us...');
        slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('Why Choose Us', {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        const advantages = [
            { title: 'Premium Quality', desc: 'Rigorous quality control and premium raw materials ensure consistent, superior products.', y: 1.5 },
            { title: 'Innovation', desc: 'Cutting-edge technology and continuous innovation in manufacturing processes.', y: 1.5, x: 5 },
            { title: 'Strategic Location', desc: "Dubai's strategic position provides excellent access to global markets.", y: 3 },
            { title: 'Partnership Focus', desc: 'We build long-term partnerships based on trust, transparency, and mutual success.', y: 3, x: 5 },
            { title: 'Compliance & Safety', desc: 'Full regulatory compliance with international standards and certifications.', y: 4.5 },
            { title: 'Reliability', desc: 'Consistent on-time delivery, reliable supply chain, and responsive customer service.', y: 4.5, x: 5 }
        ];

        advantages.forEach(adv => {
            slide.addText(adv.title, {
                x: adv.x || 0.5,
                y: adv.y,
                w: 4,
                h: 0.4,
                fontSize: 16,
                bold: true,
                color: colors.cyan,
                fontFace: 'Arial'
            });
            slide.addText(adv.desc, {
                x: adv.x || 0.5,
                y: adv.y + 0.45,
                w: 4,
                h: 0.8,
                fontSize: 11,
                color: colors.white,
                fontFace: 'Arial',
                align: 'left'
            });
        });

        // Slide 9: Contact & Next Steps
        console.log('Adding Slide 9: Contact & Next Steps...');
        slide = pptx.addSlide();
        slide.background = { color: colors.primary };
        slide.addText('Contact & Next Steps', {
            x: 0.5,
            y: 0.3,
            w: 9,
            h: 0.8,
            fontSize: 36,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        slide.addText('Let\'s Build a Successful Partnership', {
            x: 0.5,
            y: 1.5,
            w: 9,
            h: 0.6,
            fontSize: 22,
            bold: true,
            color: colors.cyan,
            align: 'center',
            fontFace: 'Arial'
        });

        const contactInfo = [
            {
                title: 'Location',
                content: 'Azure Tobacco Industrial FZCO\nDubai, United Arab Emirates\nBusiness Bay, Dubai International Financial Centre',
                y: 2.5
            },
            {
                title: 'Contact',
                content: 'Email: info@azuretobacco.com\nPhone: +971 4 XXX XXXX\nWebsite: www.azuretobacco.com',
                y: 2.5,
                x: 5
            },
            {
                title: 'Next Steps',
                content: '• Schedule a consultation\n• Product portfolio review\n• Partnership discussion\n• Proposal & agreement',
                y: 4.5
            }
        ];

        contactInfo.forEach(info => {
            slide.addText(info.title, {
                x: info.x || 0.5,
                y: info.y,
                w: 4,
                h: 0.4,
                fontSize: 18,
                bold: true,
                color: colors.cyan,
                fontFace: 'Arial'
            });
            slide.addText(info.content, {
                x: info.x || 0.5,
                y: info.y + 0.5,
                w: 4,
                h: 1.5,
                fontSize: 12,
                color: colors.white,
                fontFace: 'Arial',
                align: 'left'
            });
        });

        // Save the presentation
        console.log('Saving PowerPoint file...');
        await pptx.writeFile({ fileName: 'Azure_Tobacco_Business_Deck.pptx' });
        
        console.log('\n✓ PowerPoint file generated successfully!');
        console.log('  File: Azure_Tobacco_Business_Deck.pptx');
        console.log('  Location: Current directory');
        console.log('\nYou can now open this file in Microsoft PowerPoint, Google Slides, or any compatible presentation software.');
        
    } catch (error) {
        console.error('Error generating PowerPoint:', error);
        process.exit(1);
    }
}

// Run the generator
if (require.main === module) {
    generatePowerPoint();
}

module.exports = { generatePowerPoint };


