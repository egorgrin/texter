const fs = require('fs');
const cheerio = require('cheerio');
const fse = require('fs-extra');

// Если нужен авто перевод
const translateFrom = 'it';

const targetLanguage = 'en';

async function perform(element, child, action, htmlDocument, languageJSON) {

  let translateHTML;
  let clear;

  if (action === `translate`) {
    const translateEngine = await import('translate');
    translateEngine.engine = 'deepl';
    translateHTML = async function (text) {
      return await translateEngine.default(text, {
        from: translateFrom,
        to: targetLanguage,
      });
    };
    clear = function (translatedText) {
      return translatedText
          /*.replace(/&nbsp;/g, '')
          .replace(/(\s+)([.,!?;:])\s*()/g, '$2');*/
          .replace(/(\s+)([.,!?;:])\s*|&nbsp;/g);
    };
  }

  // Single element replacement/ejection

  if (child === undefined) {
    switch (action) {
      case `eject`:
        languageJSON[element] = htmlDocument(element).html() || ``;
        break;
      case `replace`:
        htmlDocument(element).html(languageJSON[element] || ``);
        break;
      case `translate`:
        htmlDocument(element).html(clear(await translateHTML(htmlDocument(element).html())));
        break;
    }
  } else {

    // Multiple elements replacement/ejection

    const children = htmlDocument(element).find(htmlDocument(child));

    for (let i = 0; i < children.length; i++) {
      if (action === `translate`) {
        htmlDocument(children[i]).html(clear(await translateHTML(htmlDocument(children[i]).html())));
      } else {

        // The condition is necessary because the questions and answers are within the same "#content1" element, requiring us to search for them using the child selector name:

        if (languageJSON[element]) {
          switch (action) {
            case `eject`:
              languageJSON[element][i] = htmlDocument(children[i]).html() || ``;
              break;
            case `replace`:
              htmlDocument(children[i]).html(languageJSON[element][i]);
              break;
          }
        } else {
          switch (action) {
            case `eject`:
              languageJSON[child][i] = htmlDocument(children[i]).html() || ``;
              break;
            case `replace`:
              htmlDocument(children[i]).html(languageJSON[child][i]);
              break;
          }
        }
      }
    }
  }

  // Add likes count to [.comment-status span]

  if (action === `replace`) {
    const likesArray = [29, 9, 22, 36, 31, 6, 15, 39, 23, 30];

    const elements = htmlDocument('body').find('.comment-status');

    for (let i = 0; i < elements.length; i++) {
      const replacedHtml = htmlDocument(elements[i]).html().replace('{LIKES}', likesArray[i]);
      htmlDocument(elements[i]).html(replacedHtml);
    }
  }

}

const selectors = [
  //   Contains elements and (if 2) their children

  // Hero content
  ['title'], ['#content1 h2'], ['#content1 h2 + p'], ['#content1 > p:nth-of-type(2)'], ['#content1 > p:nth-of-type(3)'],
  ['#content1 > p:nth-of-type(4)'],
  ['#content1 > p:nth-of-type(5)'],

  // Questions and answers
  ['#content1', '.question strong'], ['#content1', '.question span'], ['#content1', '.survey_button'],

  // Loading section
  ['#content2 h2'], ['#content2', '.result'],

  // Raffle intro
  ['#p_modal1 h2'], ['#p_modal1', 'p'],

  // Empty box
  ['#p_modal2 p'],

  // Congratulations and CTA
  ['#p_modal3 h2'], ['#p_modal3 button'], ['#p_modal3', 'p'],

  // Reviews
  ['.intro-offer span'],

  // Form
  ['.form-title'], ['.firstname'], ['#firstnameInvalid'], ['.lastname'], ['#lastnameInvalid'], ['.address'], ['.zipcode'], ['.city'], ['.phone'], ['#phoneInvalid'], ['.email'], ['#emailInvalid'], ['.info-button'],

  // Comments wrapper
  ['.comments p span'], ['.comments:first-of-type p:last-of-type'],

  // Comments
  ['.comment-content', 'p:not(.name)'],
  ['.comment-status span'],  // Likes
  ['.comment-status', 'u']];

async function run(action, htmlDocument, languageJSON) {
  for (const [element, child] of selectors) {
    await perform(element, child, action, htmlDocument, languageJSON);
  }
}

async function eject() {
  const ejectPath = `eject/src/index.html`;
  const srcPath = `src/index.html`;
  const distPath = `dist/index.html`;

  const path = distPath;

  const htmlDocument = cheerio.load(fs.readFileSync(`${path}`, 'utf8'));
  const languageJSON = JSON.parse(fs.readFileSync(`eject/template.json`, 'utf8'));
  const removeNewlinesAndSpaces = (obj) => {
    for (let key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].replace(/\n\s*/g, ' ');
      } else if (typeof obj[key] === 'object') {
        removeNewlinesAndSpaces(obj[key]);
      }
    }
  };

  await run(`eject`, htmlDocument, languageJSON).then(() => {
    removeNewlinesAndSpaces(languageJSON);

    const jsonData = JSON.stringify(languageJSON);
    fs.writeFileSync(`lang/ejected.json`, jsonData, 'utf8');
    console.log('Все ништяк (но это не точно)');
  }).catch((error) => {
    console.error('Упс... Чет не так:', error);
  });
}

async function replace() {

  const htmlDocument = cheerio.load(fs.readFileSync(`src/index.html`, 'utf8'));
  const languageJSON = JSON.parse(fs.readFileSync(`lang/${targetLanguage}.json`, 'utf8'));

  if (!fs.existsSync(`dist`)) {
    fs.mkdirSync(`dist`);
  } else {
    fse.emptyDirSync(`dist`);
  }
  await run(`replace`, htmlDocument, languageJSON).then(() => {
    fs.writeFileSync(`dist/index.html`, htmlDocument.html(), 'utf8');
    console.log('Все ништяк (но это не точно)');
    fse.copySync(`src/assets`, `dist/assets`);
  }).catch((error) => {
    console.error('Упс... Чет не так:', error);
  });
}

async function translate() {

  const htmlDocument = cheerio.load(fs.readFileSync(`src/index.html`, 'utf8'));

  if (!fs.existsSync(`dist`)) {
    fs.mkdirSync(`dist`);
  } else {
    fse.emptyDirSync(`dist`);
  }
  await run(`translate`, htmlDocument).then(() => {
    fs.writeFileSync(`dist/index.html`, htmlDocument.html(), 'utf8');
    console.log('Все ништяк (но это не точно)');
    fse.copySync(`src/assets`, `dist/assets`);
  }).catch((error) => {
    console.error('Упс... Чет не так:', error);
  });
}

module.exports = {
  eject,
  replace,
  translate,
};