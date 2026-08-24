import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import javascript from 'shiki/langs/javascript.mjs';
import typescript from 'shiki/langs/typescript.mjs';
import html from 'shiki/langs/html.mjs';
import css from 'shiki/langs/css.mjs';
import json from 'shiki/langs/json.mjs';
import bash from 'shiki/langs/bash.mjs';
import svelte from 'shiki/langs/svelte.mjs';
import vitesseDark from 'shiki/themes/vitesse-dark.mjs';
import vitesseLight from 'shiki/themes/vitesse-light.mjs';
export type CodeToken={content:string;color?:string};
const supported=['javascript','js','typescript','ts','html','css','json','bash','shell','svelte'] as const;
let highlighter:ReturnType<typeof createHighlighterCore>|undefined;
async function getHighlighter(){highlighter??=createHighlighterCore({themes:[vitesseDark,vitesseLight],langs:[javascript,typescript,html,css,json,bash,svelte],engine:createJavaScriptRegexEngine()});return highlighter}
export async function highlightCode(code:string,language:string,light:boolean):Promise<CodeToken[][]|undefined>{const aliases:Record<string,string>={js:'javascript',ts:'typescript',shell:'bash'};if(!supported.includes(language as typeof supported[number]))return;try{return(await getHighlighter()).codeToTokens(code,{lang:aliases[language]??language,theme:light?'vitesse-light':'vitesse-dark'}).tokens}catch{return}}
