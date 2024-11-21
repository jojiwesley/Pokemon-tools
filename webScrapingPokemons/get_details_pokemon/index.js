import puppeteer from 'puppeteer';

export default async function scrapePokemonInfo(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const data = await page.evaluate(() => {
    const container = document.querySelector('.mw-parser-output');
    if (!container) {
      return { error: 'Classe mw-parser-output não encontrada' };
    }
    const result = {
      informacoes: {},
      evolucoes: {},
      descricao: '',
      movimentos: {
        pvp: [],
        pve: [],
        general: [],
      },
      efetividades: {},
    };

    const parseInformation = (container, result) => {
      const headers = container.querySelectorAll('h2');
      headers.forEach((header) => {
        if (header.textContent.trim() === 'Informações Gerais') {
          const nextElement = header.nextElementSibling;
          if (nextElement && nextElement.tagName.toLowerCase() === 'p') {
            const boldTexts = [];
            const nonBoldTexts = [];
            let currentText = '';

            nextElement.childNodes.forEach((node) => {
              if (node.nodeName === 'B') {
                if (currentText.trim()) {
                  nonBoldTexts.push(currentText.trim());
                  currentText = '';
                }
                boldTexts.push(node.textContent.trim());
              } else if (node.nodeType === Node.TEXT_NODE) {
                currentText += node.textContent.trim();
              }
            });

            if (currentText.trim()) nonBoldTexts.push(currentText.trim());

            boldTexts.forEach((key, index) => {
              const value = nonBoldTexts[index] || '';
              result.informacoes[key.replace(':', '')] = value;
            });
          }
        }
      });
    };

    const parseEvolutions = (container, result) => {
      const headers = container.querySelectorAll('h2');
      headers.forEach((header) => {
        if (header.textContent.trim() === 'Evoluções') {
          const nextElement = header.nextElementSibling;
          if (nextElement && nextElement.tagName.toLowerCase() === 'p') {
            const evolucaoMatches = nextElement.textContent.match(
              /(\w+)\s+precisa\s+de\s+Level\s+(\d+)/g
            );
            if (evolucaoMatches) {
              evolucaoMatches.forEach((match) => {
                const [name, level] = match.split(' precisa de Level ');
                result.evolucoes[name.trim()] = parseInt(level.trim(), 10);
              });
            }
          }
        }
      });
    };

    const parseDescription = (container, result) => {
      const headers = container.querySelectorAll('h2');
      headers.forEach((header) => {
        if (header.textContent.trim() === 'Descrição:') {
          const nextElement = header.nextElementSibling;
          if (nextElement && nextElement.tagName.toLowerCase() === 'p') {
            result.descricao = nextElement.textContent.trim();
          }
        }
      });
    };

    const parseEfetividades = (container, result) => {
      const headers = container.querySelectorAll('h2');
      headers.forEach((header) => {
        if (header.textContent.trim() === 'Efetividades') {
          const nextElement = header.nextElementSibling;
          if (nextElement && nextElement.tagName.toLowerCase() === 'p') {
            const boldTexts = Array.from(nextElement.querySelectorAll('b'));
            boldTexts.forEach((bold) => {
              const key = bold.textContent.trim().replace(':', '');
              const textNode = bold.nextSibling;
              if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                result.efetividades[key] = textNode.textContent.trim();
              }
            });
          }
        }
      });
    };

    //parseMovementsTables
    const parseMovementsTables = (container, result) => {
      const tables = Array.from(container.querySelectorAll('table'));
      let moveSetCounter = { pvp: 1, pve: 1, general: 1 };

      tables.forEach((table) => {
        const previousHeader = table.previousElementSibling;
        if (previousHeader && previousHeader.tagName.toLowerCase() === 'h3') {
          const headerText = previousHeader.textContent.trim().toLowerCase();
          if (headerText.includes('pvp')) {
            if (!result.movimentos.pvp) result.movimentos.pvp = [];
            parseMovementTable(
              table,
              result.movimentos.pvp,
              moveSetCounter,
              'pvp'
            );
          } else if (headerText.includes('pve')) {
            if (!result.movimentos.pve) result.movimentos.pve = [];
            parseMovementTable(
              table,
              result.movimentos.pve,
              moveSetCounter,
              'pve'
            );
          }
        } else {
          // Tratar tabelas gerais de movimentos que não são claramente PvP ou PvE
          if (!result.movimentos.general) result.movimentos.general = [];
          parseMovementTable(
            table,
            result.movimentos.general,
            moveSetCounter,
            'general'
          );
        }
      });
    };

    const parseMovementTable = (table, movementArray, moveSetCounter, type) => {
      const rows = Array.from(table.querySelectorAll('tr'));

      rows.forEach((row) => {
        const cells = Array.from(row.querySelectorAll('td'));
        if (cells.length >= 5) {
          parseMovement(cells, movementArray, moveSetCounter, type);
        } else if (cells.length === 2) {
          assignLevelToLastMove(cells, movementArray);
        }
      });
    };

    const parseMovement = (cells, movementArray, moveSetCounter, type) => {
      const moveText = cells[1].textContent.trim();
      const [moveName, moveTime] = moveText
        .split('(')
        .map((item) => item.trim());
      const time = parseInt(moveTime?.replace(/[^\d]/g, '')) || 0;

      const effects = parseEffects(cells[3]);
      const category = parseType(cells[4]);

      movementArray.push({
        moveSet: `M${moveSetCounter[type]++}`,
        moveName,
        time,
        effects: effects.length ? effects : null,
        type: category || null,
      });
    };

    const parseEffects = (cell) => {
      return Array.from(cell.querySelectorAll('a')).map((link) => ({
        effectImage: link.querySelector('img')?.src || '',
        effectTitle: link.getAttribute('title') || '',
      }));
    };

    const parseType = (cell) => {
      const typeLink = cell.querySelector('a');
      return typeLink
        ? {
            typeImage: typeLink.querySelector('img')?.src || '',
            typeTitle: typeLink.getAttribute('title') || '',
          }
        : null;
    };

    const assignLevelToLastMove = (cells, movementArray) => {
      const levelText = cells[1].textContent.trim();
      const level = parseInt(levelText.replace(/[^\d]/g, '')) || 0;

      const lastMove = movementArray[movementArray.length - 1];
      if (lastMove) {
        lastMove.level = level;
      }
    };

    parseInformation(container, result);
    parseEvolutions(container, result);
    parseEfetividades(container, result);
    parseDescription(container, result);
    parseMovementsTables(container, result);

    return result;
  });

  await browser.close();
  return data;
}
