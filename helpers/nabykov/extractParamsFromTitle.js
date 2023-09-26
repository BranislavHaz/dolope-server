const getParamsFromTitle = async (title) => {
  const colorsKeywords = [
    "striebro",
    "biela lesklá",
    "čierna matná",
    "nerez",
    "šampaň",
  ];

  const colorsMap = {
    striebro: "silver",
    "biela lesklá": "white",
    "čierna matná": "black",
    nerez: "stainless steel",
    šampaň: "champagne",
  };

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

  const categoryMap = {
    brzda: "break",
    "dekoračný profil": "decorative profile",
    "h-profil": "h-profile",
    koľajnica: "rail",
    koliesko: "wheel",
    madlo: "handle",
    rám: "frame",
    tesnenie: "seal",
    tlmič: "silencer",
    úchyt: "grip",
  };

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
      color = colorsMap[c];
      break;
    }
  }

  for (const c of categoryKeywords) {
    if (lowercaseTitle.includes(c)) {
      category = categoryMap[c];
      break;
    }
  }

  for (const t of thicknessKeywords) {
    if (lowercaseTitle.includes(t)) {
      thickness = t === "hrubý" ? "wide" : "narrow";
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
    position = "top";
  } else if (
    lowercaseTitle.includes("spodný") ||
    lowercaseTitle.includes("spodná") ||
    lowercaseTitle.includes("spodné") ||
    lowercaseTitle.includes("spodnej")
  ) {
    position = "bottom";
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
