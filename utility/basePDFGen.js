import RNHTMLtoPDF from 'react-native-html-to-pdf';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import MangalFont from './mangalFont';
import KrutiDevFont from './krutiDevFont';

/**
 * This is an abstract class which defines the interface for a form type.
 * @class FormTypeAbstract
 */
class FormPDFAbstract {
  stringRegex = /\$string\d+/g;
  pictureRegex = /\$picture\d+/g;

  fieldStrings = [];
  fieldPictures = [];

  //#region Interface Variables
  totalStrings;
  totalPictures;
  /**
   * The template string for the form written in html.
   **/
  template = '';

  //#endregion

  constructor(_fieldPictures, _fieldStrings, _totalStrings, _totalPictures) {
    this.fieldPictures = _fieldPictures;
    this.fieldStrings = _fieldStrings;
    this.totalStrings = _totalStrings;
    this.totalPictures = _totalPictures;
  }

  /**
   * @usage This method is used to generate the pdf file.
   * ```
   * // Example:
   * // Request write permission for external storage if required
   *   requestFilePermission()
   *   let obj =  new GenericFormPDF(["Bruh"],["path/to/picture"])
   *   obj.createPDF('', 'test')
   * ```
   * @param {*} _directory The directory where the pdf will be saved.
   * @param {*} _fileName  The name of the file.
   * @returns Absolute location of the file.
   */
  createPDF = async (_directory, _fileName) => {
    console.log('Creating PDF');
    let headEnd = this.template.search('</head>');
    var replacedTemplate =
      this.template.slice(0, headEnd) +
      KrutiDevFont +
      this.template.slice(headEnd);
    if (this.totalStrings > 0) {
      replacedTemplate = replacedTemplate.replace(this.stringRegex, match => {
        let startIndex = match.search(/\d+/g);
        return this.fieldStrings[match.substring(startIndex, match.length)];
      });
    }
    if (this.totalPictures > 0) {
      replacedTemplate = replacedTemplate.replace(this.pictureRegex, match => {
        let startIndex = match.search(/\d+/g);
        return this.fieldPictures[match.substring(startIndex, match.length)];
      });
    }

    try {
      let file = await RNHTMLtoPDF.convert({
        html: replacedTemplate,
        fileName: _fileName,
        directory: _directory,
        fonts: [MangalFont],
      });

      alert(file.filePath);
      return file;
    } catch (error) {
      console.log('Error creating PDF: ' + error);
    }
  };
}

class GenericFormPDF extends FormPDFAbstract {
  template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            h1 {
                text-align: center;
            }
        </style>
        ${MangalFont}
    </head>
    <body>
        <h1>Hello, $string0!</h1>
        <img src="$picture0" alt="">
    </body>
    </html>
    `;

  constructor(_fieldStrings, _fieldPictures) {
    let totalStrings = 1;
    let totalPictures = 1;
    super(_fieldPictures, _fieldStrings, totalStrings, totalPictures);
  }
}

export {GenericFormPDF, FormPDFAbstract};
