import e,{validKeys as t}from"./services/LocalStorageService.js";const n=document.getElementById("settings-window"),o=document.getElementById("settings-open"),s=document.getElementById("settings-close"),c=document.getElementById("max-tries"),d=document.getElementById("word-size"),i=document.getElementById("dark-theme"),m=()=>{document.body.classList.contains("light-theme")&&document.body.classList.remove("light-theme"),document.body.classList.add("dark-theme")},a=()=>{document.body.classList.contains("dark-theme")&&document.body.classList.remove("dark-theme"),document.body.classList.add("light-theme")},r=()=>{c.value=e.get(t.maxTries),d.value=e.get(t.wordSize)};window.onload=()=>{const n=e.get(t.darkTheme);r(),i.checked=n,n?m():a()},o.onclick=function(){r(),n.style.display="block"},s.onclick=function(){n.style.display="none"},n.onclick=function(e){e.target==n&&(n.style.display="none")},c.oninput=n=>{const o=n.currentTarget.value;o<1?e.set(t.maxTries,1):o>20?e.set(t.maxTries,8):e.set(t.maxTries,Number(o))},d.oninput=n=>{const o=n.currentTarget.value;o<3?e.set(t.wordSize,3):o>20?e.set(t.wordSize,9):e.set(t.wordSize,Number(o))},i.onchange=n=>{const o=n.currentTarget.checked;o?m():a(),e.set(t.darkTheme,o)};