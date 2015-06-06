// ==UserScript==
// @name         canSync?
// @namespace    http://your.homepage/
// @version      0.1
// @description  Script to verify an article may be synced
// @author       grasshopper
// @match        http://wol.jw.org/*
// @grant        none
// ==/UserScript==

//window.onload = function(){
    function cook(str,fl){
        var ret = {};
        var found = false;
        var parts = str.split('; ');
        for(var idx in parts ){
          var pt = parts[idx].split('=');
          if(pt.length == 2 && (fl === undefined || fl.indexOf(pt[0]) > -1)){
              ret[pt[0]] = pt[1];
              found = true;
          }
        }
        if(found)
          return ret;
    }

    function send(url,method,load){
        if(typeof XMLHttpRequest === 'function'){
            var req = new XMLHttpRequest();
            req.onload = function(){
                load(req);
            }
            req.open(method,url,true);
            req.send();
        }

    }

    var sync = document.getElementById('linkSynchronize');
    if(sync && sync.href){
        var disp = sync.getElementsByClassName('canSync');
        if(!disp || !disp.length){
            var stat = sync.appendChild(document.createElement('span'));
            stat.setAttribute('class','label canSync');
            stat.setAttribute('id','canSync');
            stat.innerHTML = '...';
        }
        send(sync.href,'get',function(req){
          if(req.status == 200){
              stat.innerHTML = ';D';
          }else{
              stat.innerHTML = ':(';
          }
        })
    }
    var ck = cook(document.cookie,['locale','synclocale','lib','synclib','rsconf','syncrsconf']);
    if(ck){
        var orgn = document.location.origin
        if(orgn){
            parts = document.getElementsByTagName('a');
            function proc(a){
                if(a.href && a.href.indexOf(orgn+'/'+ck.locale+'/wol/d/') === 0){
                    var qry = a.href.split('?');
                    var url = qry[0].replace('/d/','/sydp/'+ck.rsconf+'/'+ck.lib+'/'+ck.syncrsconf+'/'+ck.synclib+'/')+'/%7Bno%7D';
                    if(qry.length > 1)
                        url = url + '?' + qry[1];
                    if(url != a.href){
                        send(url,'get',function(req){
                            if(req.status === 200){
                                console.log(url)
                                a.innerHTML = a.innerHTML + ' ;D';                          
                            }else {
                                console.log(a);
                                console.log(a.href)
                                
                            }
                        })
                    }
                }

            }
            for(var idx = 0;idx < parts.length;idx++){
                proc(parts[idx]);
            }
        }
    }
//}
