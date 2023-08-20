const productTitleParsing = (title) => {
  // Rozdelíme vstupný reťazec na slová/podreťazce
  const parts = title.split(" ");

  // Kód produktu je vždy druhé slovo v reťazci
  const id = parts[1];

  // Označenie je vždy tretie slovo v reťazci a začína na "ST"
  const label = parts.find((part) => part.startsWith("ST"));

  // Získame index označenia, aby sme vedeli, kde začať hľadať meno
  const labelIndex = parts.indexOf(label);

  // Meno je slovné spojenie alebo slovo, ktoré je medzi označením a rozmerom
  const name = parts.slice(labelIndex + 1, -1).join(" ");

  // Hrúbka je vždy posledné číslo za lomítkom, ktoré je vždy úplne posledné v reťazci
  const sizeParts = parts[parts.length - 1].split("/");
  const thickness = sizeParts[sizeParts.length - 1];

  // Vrátime extrahované údaje ako objekt
  return {
    idManufacturer: id,
  };
};

module.exports = productTitleParsing;
