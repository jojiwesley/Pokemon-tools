import puppeteer from 'puppeteer';

export default async function getListPokemons() {
  const url = 'https://wiki.pokexgames.com/index.php/Pok%C3%A9mon';
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(url);
  const pokemonData = await page.evaluate(() => {
    // Coleta de nome, URL e geração
    const pokemonDataList = [];
    const tableRows = Array.from(
      document.querySelectorAll('table.wikitable tbody tr')
    );

    tableRows.forEach((row) => {
      const linkElement = row.querySelector('td a'); // Seleciona a tag <a> na primeira coluna
      if (linkElement) {
        const url = linkElement.getAttribute('href');
        const name = linkElement.getAttribute('title');

        if (url && name) {
          pokemonDataList.push({
            name,
            url: `https://wiki.pokexgames.com${url}`, // Adiciona a base da URL
          });
        }
      }
    });
    return pokemonDataList;
  });

  await browser.close();
  // Cria um objeto para o JSON
  //   const detailsList = { detalhes: data };
  //   const jsonData = JSON.stringify(detailsList, null, 2); // Converte o objeto em uma string JSON
  //   fs.writeFileSync('detalhes.json', jsonData); // Escreve os dados JSON em um arquivo
  return pokemonData;
}
