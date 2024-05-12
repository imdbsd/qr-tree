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
    this.lastUpdate = localStorage.getItem(
      AppStorage.STORAGE_KEY.LAST_UPDATE,
      null
    );
  }

  getLinks() {
    return this.links;
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
