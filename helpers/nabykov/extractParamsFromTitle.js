const getParamsFromTitle = async (title) => {
  const colorsKeywords = [
    "striebro",
    "biela lesklá",
    "čierna matná",
    "nerez",
    "šampaň",
  ];

  const categoryKeywords = [
    "brzda",
    "dekoračný profil",
    "h-profil",
    "koľajnica",
    "koliesko",
    "madlo",
    "rám",
    "tesnenie",
    "tlmič",
    "úchyt",
  ];

  const railsNumberKeywords = ["jednoradová", "dvojradová"];

  const thicknessKeywords = ["hrubý", "tenký"];

  const lengthsRegex = /(\d+,\d+)m/;
  const lowercaseTitle = title.toLowerCase();

  let color = null;
  let category = null;
  let length = null;
  let position = null;
  let thickness = null;
  let railsNumber = null;

  for (const c of colorsKeywords) {
    if (lowercaseTitle.includes(c)) {
      color = c;
      break;
    }
  }

  for (const c of categoryKeywords) {
    if (lowercaseTitle.includes(c)) {
      category = c;
      break;
    }
  }

  for (const t of thicknessKeywords) {
    if (lowercaseTitle.includes(t)) {
      thickness = t;
      break;
    }
  }

  for (const r of railsNumberKeywords) {
    if (lowercaseTitle.includes(r)) {
      railsNumber = r === "jednoradová" ? 1 : 2;
      break;
    }
  }

  const lengthMatch = title.match(lengthsRegex);

  if (lengthMatch) {
    const lengthString = lengthMatch[1].replace(",", ".");
    length = parseFloat(lengthString);
  }

  if (
    lowercaseTitle.includes("vrchný") ||
    lowercaseTitle.includes("vrchná") ||
    lowercaseTitle.includes("vrchné") ||
    lowercaseTitle.includes("vrchnej")
  ) {
    position = "vrch";
  } else if (
    lowercaseTitle.includes("spodný") ||
    lowercaseTitle.includes("spodná") ||
    lowercaseTitle.includes("spodné") ||
    lowercaseTitle.includes("spodnej")
  ) {
    position = "spodok";
  }

  return {
    color,
    category,
    length,
    position,
    thickness,
    railsNumber,
  };
};

const extractParamsFromTitle = async (products) =>
  await Promise.all(
    products.map(async (product) => {
      const title = product.title;
      const params = await getParamsFromTitle(title);

      return { ...product, ...params };
    })
  );

module.exports = extractParamsFromTitle;
