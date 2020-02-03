console.log('forDaniel.js loaded')

soccer={}
soccer.ui=_=>{
    const div=document.getElementById('soccerDiv')
    if(div){
        let h='<p>type/paste job title below, such as "<span style="color:blue;cursor:pointer" onclick="inputSoccer.value=\'farmer\'">farmer</span>" or "<span style="color:blue;cursor:pointer" onclick="inputSoccer.value=\'data scientist\'">data scientist</span>", then press Enter or <button id="soccerBt" onclick="soccer.run(inputSoccer.value,respSoccer)" type="button" class="btn btn-primary">Submit</button></p>'
        h += 'Title: <input id="inputSoccer" style="color:blue;width:60%"> <span style="color:red" id="callMsg"></span>'
        h += '<div id="respSoccer"></div>'
        div.innerHTML=h
        inputSoccer.onkeyup=ev=>{
            if(ev.keyCode==13){ // if key pressed is Enter
                soccerBt.click()
            }
        }
    }
}
soccer.run=async (req,resp)=>{
    if(document.getElementById('callMsg')){
        document.getElementById('callMsg').textContent="calling AI ..."
    }
    const url='https://sitf-cwlcji5kxq-uc.a.run.app/soccer/code'
    let jsonResp =await (await fetch(`${url}?title=${req}`)).json()
    if(typeof(resp)=='object'){
        let div=document.createElement('div')
        respSoccer.insertBefore(div,respSoccer.firstChild)
        let h=`<h3>${req} <a href="${url}?title=${req}" target="_blank" style="font-size:small;color:blue"> API <i class="fa fa-external-link"></i></a></h3>`
        h += `<table>`
        h += `<tr><th>Code</th><th>Label</th></tr>`
        jsonResp.forEach(r=>{
            h += `<tr><td class="code"><nobr>${r.code}</nobr></td><td class="label">${r.label}</td></tr>`
        })
        h += `</table><hr>`
        div.innerHTML=h
        // clean input
        let ip=document.getElementById('inputSoccer')
        if(ip){ip.value=''}
        if(document.getElementById('callMsg')){
            document.getElementById('callMsg').textContent=""
        }       
    }else{
        jsonResp.forEach((r,i)=>{ // augmenting data structure
            r.title=req
            r.Date=Date()
            r.i=i+1
            r.n=jsonResp.length
            return r
        })
    }
    jsonResp.title=req
    return jsonResp
}

soccer.copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

if(typeof(define)!="undefined"){
    define(soccer) // can be loaded via require
}