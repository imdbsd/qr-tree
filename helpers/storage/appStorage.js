import { localStorage } from "@zos/storage";
import { logger } from "../logger";

class AppStorage {
  static STORAGE_KEY = {
    LINKS_TREE: "links-tree",
    LAST_UPDATE: "last-update",
  };

  links = [];
  lastUpdate = null;

  constructor() {
    try {
      this.links = JSON.parse(
        localStorage.getItem(AppStorage.STORAGE_KEY.LINKS_TREE, "[]")
      );
    } catch {
      this.links = [];
    }
    this.links = [
      {
        type: "whatsapp",
        label: "Whatsapp",
        url: "https://wa.me/6285737499966",
        backgroundColor: "#00A884",
      },
      {
        type: "trakteer",
        label: "Link minta duit",
        // pinned: true,
        url: "https://trakteer.id/imdbsd/tip",
        backgroundColor: "#c53030",
      },
      {
        type: "steam",
        label: "Steam",
        url: "https://steamcommunity.com/profiles/76561198144189948/",
        backgroundColor: "#9BB8CD",
      },
      {
        type: "twitter",
        label: "Twitter",
        url: "https://twitter.com/Budisuryadarma",
        backgroundColor: "#1d9bf0",
      },
      {
        type: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/imdbsd",
        backgroundColor: "#78C1F3",
      },
      {
        type: "facebook",
        label: "FB",
        url: "https://www.facebook.com/imdbsd/",
        backgroundColor: "#0866ff",
      },
      {
        type: "github",
        label: "Github",
        url: "https://github.com/imdbsd",
        backgroundColor: "#B5C0D0",
      },
    ];
    this.lastUpdate = localStorage.getItem(
      AppStorage.STORAGE_KEY.LAST_UPDATE,
      null
    );
  }

  getPinned() {
    return this.links.find((link) => link.pinned);
  }

  getLinks() {
    return this.links;
  }

  getLinkAt(index) {
    return this.links[index];
  }

  getLastUpdate() {
    return this.lastUpdate;
  }

  /**
   * @param {Array<{type: string, link: string}>} newLinks
   */
  setLinks(newLinks) {
    localStorage.setItem(
      AppStorage.STORAGE_KEY.LINKS_TREE,
      JSON.stringify(newLinks)
    );
  }

  /***
   * @param {Date | string} newDate
   */
  setLastUpdate(newDate) {
    localStorage.setItem(
      AppStorage.STORAGE_KEY.LAST_UPDATE,
      typeof newDate === "string" ? newDate : newDate.toUTCString()
    );
  }
}

export default AppStorage;
