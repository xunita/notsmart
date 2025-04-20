import { langCodes } from "~/constants/lang";
export const useLang = () => {
  const storage = useStorage();
  // unmutable state by external code
  const _code = storage.useLocalStorage("nst-lang-code", langCodes[0]);
  const _lang = useState("_lang", () => {
    return {};
  });
  // computed state
  const code = computed(() => {
    return _code.value;
  });
  const lang = computed(() => {
    return _lang.value;
  });
  // mutable functions

  const $t = (key) => {
    return _lang.value[key] || "...";
  };

  const setLangCode = (code) => {
    if (langCodes.includes(code.toLowerCase())) {
      _code.value = code;
      setLang(code);
    }
  };
  const setLang = (code) => {
    if (langCodes.includes(code.toLowerCase())) {
      loadLang(code).then((json) => {
        _lang.value = normalJson(json);
      });
    }
  };

  // return state and functions
  return {
    code,
    lang,
    $t,
    setLangCode,
    setLang,
  };
};
