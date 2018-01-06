export function toggleClass(
  elem: HTMLElement,
  className: string,
  bool: boolean
) {
  if (bool === true) return elem.classList.add(className);
  elem.classList.remove(className);
}

export function createElement<T extends HTMLElement>(
  tag: keyof HTMLElementTagNameMap,
  className: string,
  content?: string
): T {
  const e = window.document.createElement(tag) as T;
  className = className || "";
  content = content || "";

  e.className = className;

  if (content !== undefined) e.textContent = content;

  return e;
}

export function clearNode(node: HTMLElement) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function findParent(
  node: Node,
  condition: (n: Node) => boolean
): Node | undefined {
  if (condition(node)) return node;
  else if (node.parentNode) return findParent(node.parentNode, condition);

  return undefined; // nothing found
}

export function createNumberInput(inputClassName: string) {
  const wrapper = createElement<HTMLDivElement>("div", "numInputWrapper"),
    numInput = createElement<HTMLInputElement>(
      "select",
      "numInput " + inputClassName
    );

  const curDate = new Date();
  for (let i = curDate.getFullYear() - 120; i <= curDate.getFullYear() - 14; ++i) {
    const opt = createElement<HTMLOptionElement>("option", "numInput");
    opt.value = i.toString();
    opt.innerHTML = i.toString();
    numInput.appendChild(opt);
  }

  numInput.addEventListener("change", (e) => {
    this.changeYear(parseInt(e.target.value));
  });

  wrapper.appendChild(numInput);

  return wrapper;
}
