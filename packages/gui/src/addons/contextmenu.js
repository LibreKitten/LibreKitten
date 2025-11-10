// This file is imported from
// https://github.com/ScratchAddons/ScratchAddons/blob/master/addon-api/content-script/contextmenu.js
// lk: Some code was backported from a React 18 version of the original.

// lk: Modified to allow trapping arrow focus below a certain menu item.

/* eslint-disable */

let initialized = false;
let hasDynamicContextMenu = false;
let contextMenus = [];

const findParentWithProp = (reactInternalInstance, prop) => {
  if (!reactInternalInstance) return null;
  while (
    !reactInternalInstance.stateNode?.props ||
    !Object.prototype.hasOwnProperty.call(reactInternalInstance.stateNode.props, prop)
  ) {
    if (!reactInternalInstance.return) return null;
    reactInternalInstance = reactInternalInstance.return;
  }
  return reactInternalInstance.stateNode;
};
const findSpriteSelectorItem = (reactInternalInstance) => findParentWithProp(reactInternalInstance, "dragType");

const setFocus = (item) => {
  item.setAttribute("data-highlighted", "");
  item.tabIndex = 0;
  item.focus();
};

const removeFocus = (item) => {
  item.removeAttribute("data-highlighted");
  item.tabIndex = -1;
};

const menuArrowKeyListener = (menu, firstElem) => (e) => {
  if (e.target !== menu) {
    // Target is one of the items, not the menu
    return;
  }
  const moveFocusTo = (newFocusedItem) => {
    e.stopPropagation();
    setFocus(newFocusedItem);
  };
  if (["Home", "PageUp", "ArrowDown"].includes(e.key)) moveFocusTo(firstElem ?? menu.firstElementChild);
  else if (["End", "PageDown", "ArrowUp"].includes(e.key)) moveFocusTo(menu.lastElementChild);
};

const itemArrowKeyListener = (menu, item, itemObj) => (e) => {
  const moveFocusTo = (newFocusedItem) => {
    // lk: Trap the up arrow key on this menu item.
    if (itemObj && typeof itemObj.trap === 'boolean') if (e.key === "ArrowUp" && itemObj.trap) return;
    e.stopPropagation();
    removeFocus(item);
    setFocus(newFocusedItem);
  };
  if (e.key === "ArrowDown" && item.nextElementSibling) moveFocusTo(item.nextElementSibling);
  else if (e.key === "ArrowUp" && item.previousElementSibling) moveFocusTo(item.previousElementSibling);
  else if (["Home", "PageUp"].includes(e.key)) moveFocusTo(menu.firstElementChild);
  else if (["End", "PageDown"].includes(e.key)) moveFocusTo(menu.lastElementChild);
};

const onReactContextMenu = async function (e) {
  // This function expects "this" to be an addon.tab instance.

  if (!e.target) return;
  const ctxTarget = e.target.closest("[data-state]");
  if (!ctxTarget) return;
  let ctxMenu = await this.waitForElement("[data-radix-menu-content]");
  let type;
  const extra = {};
  if (false && !ctxMenu && ctxTarget.closest(".monitor-overlay")) {
    // Monitors are rendered on document.body.
    // This is internal id which is different from the actual monitor ID.
    // Optional chain just to prevent crashes when they change the internal stuff.
    const mInternalId = ctxTarget[this.traps.getInternalKey(ctxTarget)]?.return?.stateNode?.props?.id;
    if (!mInternalId) return;
    ctxMenu = Array.prototype.find.call(
      document.querySelectorAll("body > nav.react-contextmenu"),
      (candidate) => candidate[this.traps.getInternalKey(candidate)]?.return?.stateNode?.props?.id === mInternalId
    );
    if (!ctxMenu) return;
    const props = ctxTarget[this.traps.getInternalKey(ctxTarget)]?.return?.return?.return?.stateNode?.props;
    if (!props) return;
    extra.monitorParams = props.params;
    extra.opcode = props.opcode;
    extra.itemId = props.id;
    extra.targetId = props.targetId;
    type = `monitor_${props.mode}`;
  } else if (findSpriteSelectorItem(ctxTarget[this.traps.getInternalKey(ctxTarget)])) {
    // SpriteSelectorItem which despite its name is used for costumes, sounds, backpacked script etc
    const props = findSpriteSelectorItem(ctxTarget[this.traps.getInternalKey(ctxTarget)]).props;
    type = props.dragType.toLowerCase();
    extra.name = props.name;
    extra.itemId = props.id;
    extra.index = props.index;
  } else {
    return;
  }
  const ctx = {
    menuItem: ctxMenu,
    target: ctxTarget,
    type,
    ...extra,
  };
  Array.from(ctxMenu.children).forEach((existing) => {
    if (existing.classList.contains("sa-ctx-menu")) existing.remove();
  });

  // Allow arrow keys to move focus from existing menu items to those added by addons.
  // capture: true is needed so that stopPropagation() prevents the context menu library's
  // original listener from running.
  for (const existing of ctxMenu.children) {
    existing.addEventListener("keydown", itemArrowKeyListener(ctxMenu, existing), { capture: true });
  }

  let trapElem = null;
  for (const item of hasDynamicContextMenu
    ? contextMenus.flatMap((menu) => (typeof menu === "function" ? menu(type, ctx) : menu))
    : contextMenus) {
    if (!item) continue;
    if (item.types && !item.types.some((itemType) => type === itemType)) continue;
    if (item.condition && !item.condition(ctx)) continue;
    const itemElem = document.createElement("div");
    const classes = ["context-menu_menu-item"];
    if (item.border) classes.push("context-menu_menu-item-bordered");
    if (item.dangerous) classes.push("context-menu_menu-item-danger");
    if (item.trap) {
      trapElem = itemElem;
    }
    itemElem.className = this.scratchClass(...classes, {
      others: ["sa-ctx-menu", item.className || ""],
    });
    itemElem.role = "menuitem";
    itemElem.tabIndex = "-1";
    const label = document.createElement("span");
    label.textContent = item.label;
    itemElem.append(label);
    this.displayNoneWhileDisabled(itemElem);

    const onClick = (e) => {
      e.stopPropagation();
      document.dispatchEvent(new PointerEvent("pointerdown")); // close menu
      item.callback(ctx);
    };
    itemElem.addEventListener("click", onClick);

    itemElem.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick(e);
      }
    });

    itemElem.addEventListener("mouseenter", () => setFocus(itemElem));
    itemElem.addEventListener("mouseleave", () => removeFocus(itemElem));
    itemElem.addEventListener("keydown", itemArrowKeyListener(ctxMenu, itemElem, item));

    this.appendToSharedSpace({
      space: item.position,
      order: item.order,
      scope: ctxMenu,
      element: itemElem,
    });
  }

  ctxMenu.addEventListener("keydown", menuArrowKeyListener(ctxMenu, trapElem), { capture: true });

  return;
};

const initialize = (tab) => {
  if (initialized) return;
  initialized = true;
  tab
    .waitForElement("body")
    .then((body) => body.addEventListener("contextmenu", (e) => onReactContextMenu.call(tab, e), { capture: true }));
};

export const addContextMenu = (tab, callback, opts) => {
  if (typeof opts === "undefined") {
    contextMenus.push(callback);
    hasDynamicContextMenu = true;
  } else {
    contextMenus.push({
      ...opts,
      callback,
    });
  }
  initialize(tab);
};
