// ==UserScript==
// @name         canSync?
// @namespace    http://your.homepage/
// @version      0.1
// @description  Script to verify an article may be synced
// @author       grasshopper
// @match        http://wol.jw.org/*
// @grant        none
// ==/UserScript==

var sync = document.getElementById('linkSynchronize');
if(sync && sync.href){
    var disp = sync.getElementsByClassName('canSync');
    if(!disp || !disp.length){
        var stat = sync.appendChild(document.createElement('span'));
        stat.setAttribute('class','label canSync');
        stat.setAttribute('id','canSync');
    }
    if(typeof XMLHttpRequest === 'function'){
        var req = new XMLHttpRequest();
        req.onload = function(st){
            if(req.status == 200){
                stat.innerHTML = ';D';
            }else{
                stat.innerHTML = ':(';
            }
        }
        console.log('Opening %s',sync.href);
        req.open('get',sync.href,true);
        req.send();
    }
}
