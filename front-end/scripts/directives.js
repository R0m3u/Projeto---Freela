export const formDirective = ({ el, get, effect }) => {
  const getElementsToValidate = () => [...el.querySelectorAll("[haserror]")];
  const setForm = () => {
    const { onSubmit, onReset } = get() || {};
    el.onsubmit = async (evt) => {
      evt.preventDefault();
      const toValidate = getElementsToValidate();
      for (let element of toValidate) {
        await element.validate();
      }
      const hasError = toValidate.some(
        (el) => el.getAttribute("haserror") === "true"
      );
      if (hasError) return;
      if (onSubmit) onSubmit();
    };
    el.onreset = (evt) => {
      evt.preventDefault();
      getElementsToValidate().map((el) => {
        el.setAttribute("haserror", "false");
        el.removeMessage();
      });
      if (onReset) onReset();
    };
  };
  effect(() => {
    setForm();
  });
};
export const rulesDirective = ({ el, get, effect }) => {
  const setErrorAttribute = (value) => {
    el.setAttribute("haserror", value);
  };
  const getAttribute = () => {
    const { tagName, type } = el;
    const isInput = tagName === "INPUT";
    if (isInput && type === "file") return "files";
    if (isInput && ["radio", "checkbox"].includes(type)) return "checked";
    return "value";
  };
  const getMessage = async (value) => {
    const rules = get();
    for (let rule of rules) {
      const msg = await rule(value);
      if (typeof msg === "string") return msg;
    }
  };
  const setMessageLabel = (msg) => {
    if (el.msgLabel?.innerText === msg) return;
    removeMessageLabel();
    const label = document.createElement("div");
    label.classList.add("message-label");
    label.innerText = msg;
    el.parentNode.insertBefore(label, el.nextSibling);
    el.msgLabel = label;
  };
  const removeMessageLabel = () => {
    if (!el.msgLabel) return;
    el.parentNode.removeChild(el.msgLabel);
    delete el.msgLabel;
  };
  const validate = async () => {
    const msg = await getMessage(el[getAttribute()]);
    if (!msg) {
      removeMessageLabel();
      setErrorAttribute(false);
      return;
    }
    setMessageLabel(msg);
    setErrorAttribute(true);
  };
  const validation = (el) => {
    el.onblur = validate;
    el.oninput = (evt) => {
      const hasError = el.getAttribute("haserror");
      if (hasError === "false") return;
      validate();
    };
    el.validate = validate;
    el.removeMessage = removeMessageLabel;
  };
  setErrorAttribute(false);
  effect(() => {
    validation(el);
  });
};

export const maskDirective = ({
  el,
  exp,
  arg,
  modifiers,
  get,
  effect
}) => {
  // console.log(el, exp, get())
  const tokens = {
    '#': {
      pattern: /\d/
    },
    X: {
      pattern: /[0-9a-zA-Z]/
    },
    S: {
      pattern: /[a-zA-Z]/
    },
    A: {
      pattern: /[a-zA-Z]/,
      transform: v => v.toLocaleUpperCase()
    },
    a: {
      pattern: /[a-zA-Z]/,
      transform: v => v.toLocaleLowerCase()
    },
    '!': {
      escape: true
    }
  }
  const getValue = () => get() ?? exp

  function event(name) {
    const evt = document.createEvent('Event')
    evt.initEvent(name, true, true)
    return evt
  }

  function maskit(value = '', mask = '', masked = true, tokens) {
    let iMask = 0
    let iValue = 0
    let output = ''
    while (iMask < mask.length && iValue < value.length) {
      let cMask = mask[iMask]
      let masker = tokens[cMask]
      let cValue = value[iValue]
      if (masker && !masker.escape) {
        if (masker.pattern.test(cValue)) {
          output += masker.transform ? masker.transform(cValue) : cValue
          iMask++
        }
        iValue++
      } else {
        if (masker && masker.escape) {
          iMask++ // take the next mask char and treat it as char
          cMask = mask[iMask]
        }
        if (masked) output += cMask
        if (cValue === cMask) iValue++ // user typed the same char
        iMask++
      }
    }
    // fix mask that ends with a char: (#)
    let restOutput = ''
    while (iMask < mask.length && masked) {
      let cMask = mask[iMask]
      if (tokens[cMask]) {
        restOutput = ''
        break
      }
      restOutput += cMask
      iMask++
    }
    return output + restOutput
  }

  function dynamicMask(maskit, masks, tokens) {
    masks = masks.sort((a, b) => a.length - b.length)
    return function(value, mask, masked = true) {
      let i = 0
      while (i < masks.length) {
        const currentMask = masks[i]
        i++
        const nextMask = masks[i]
        if (!(nextMask && maskit(value, nextMask, true, tokens).length > currentMask.length)) {
          return maskit(value, currentMask, masked, tokens)
        }
      }
      return '' // empty masks
    }
  }

  function masker(value, mask, masked = true, tokens) {
    return Array.isArray(mask) ?
      dynamicMask(maskit, mask, tokens)(value, mask, masked, tokens) :
      maskit(value, mask, masked, tokens)
  }

  function mask(el) {
    const expression = getValue()
    if (!Array.isArray(expression) && !typeof expression === 'string') return
    const config = {
      mask: expression,
      tokens: tokens
    }
    if (el.tagName.toLocaleUpperCase() !== 'INPUT') {
      let els = el.getElementsByTagName('input')
      if (els.length !== 1) throw new Error("v-mask directive requires 1 input, found " + els.length)
      else el = els[0]
    }
    el.oninput = function(evt) {
      if (!evt.isTrusted) return // avoid infinite loop
      // by default, keep cursor at same position as before the mask
      let position = el.selectionEnd
      // save the character just inserted
      const digit = el.value[position - 1]
      el.value = masker(el.value, config.mask, true, config.tokens)
      // if the digit was changed, increment position until find the digit again
      while (position < el.value.length && el.value.charAt(position - 1) !== digit) {
        position++
      }
      if (el === document.activeElement) {
        el.setSelectionRange(position, position)
        setTimeout(function() {
          el.setSelectionRange(position, position)
        }, 0)
      }
      el.dispatchEvent(event('input'))
    }
    const newDisplay = masker(el.value, config.mask, true, config.tokens)
    if (newDisplay !== el.value) {
      el.value = newDisplay
      el.dispatchEvent(event('input'))
    }
  }
  effect(() => {
    mask(el)
  })
}