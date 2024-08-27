// backend/Controllers/generateCertificate.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateCertificate = (req, res) => {
  try {
    const { fullName } = req.query;

    if (!fullName) {
      return res.status(400).send('Full name is required');
    }

    const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });

    res.setHeader('Content-disposition', 'attachment; filename=certificate.pdf');
    res.setHeader('Content-type', 'application/pdf');

    doc.pipe(res);

    // Path to the background image
    const backgroundPath = path.resolve(__dirname, '../utils/new.jpg');

    // Add the background image, scaled to the full page size
    doc.image(backgroundPath, 0, 0, {
      width: 842,  // width of A4 in landscape
      height: 595  // height of A4 in landscape
    });
 const capitalizedFullName = fullName.toUpperCase();
    // Add text content on top of the background image
    doc.moveDown(18)
       .fontSize(40)
       .text(capitalizedFullName, {
         align: 'center'
       });

    // Finalize the PDF and end the stream
    doc.end();

    console.log("Certificate generated and sent to client.");
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  generateCertificate,
};
