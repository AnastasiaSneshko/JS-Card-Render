"use strict";

const cardsContainer = document.querySelector("#root");

const userCards = data.map(function (userObj) {
  return generateUserCard(userObj);
});
cardsContainer.append(...userCards);

function generateUserCard(userObj) {
  const { id, firstName, title, description, profilePicture, contacts } =
    userObj;

  const img = createElement("img", {
    classNames: ["img"],
    attrs: { src: profilePicture, alt: firstName, "data-id": id },
  });
  img.addEventListener("error", deleteHandler);
  img.addEventListener("load", imageLoadHandler);

  const userName = createElement(
    "h2",
    { classNames: ["cardName"] },
    document.createTextNode(firstName)
  );

  const cardTitle = createElement(
    "p",
    { classNames: ["cardTitle"] },
    document.createTextNode(title)
  );

  const cardDescription = createElement(
    "p",
    { classNames: ["cardDescription"] },
    document.createTextNode(description)
  );

  const initails = createElement(
    "div",
    { classNames: ["initials"] },
    document.createTextNode(
      firstName
        .trim()
        .split(" ")
        .map((word) => word[0])
        .join(" ")
    )
  );
  initails.style.backgroundColor = stringToColour(firstName);

  const imgWrapper = createElement(
    "div",
    { classNames: ["imgWrapper"], attrs: { id: `wrapper${id}` } },
    initails
  );

  const linkWrapper = createElement(
    "div",
    { classNames: ["linkWrapper"] },
    ...generateLinks(contacts)
  );

  const article = createElement(
    "article",
    { classNames: ["userCard"] },
    imgWrapper,
    userName,
    cardTitle,
    cardDescription,
    linkWrapper
  );

  const userCard = createElement(
    "li",
    { classNames: ["cardWrapper"] },
    article
  );
  return userCard;
}

function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ("00" + value.toString(16)).substr(-2);
  }
  return colour;
}

function generateLinks(contacts) {
  const linksArray = contacts.map((contact) => {
    const url = new URL(contact);
    const hostname = url.hostname;
    const href = url.href;
    if (SUPPORTED_SOCIAL_NETWORKS.has(hostname)) {
      const link = createElement("a", {
        classNames: SUPPORTED_SOCIAL_NETWORKS.get(hostname),
        attrs: { href: href },
      });
      return link;
    }
  });
  return linksArray;
}