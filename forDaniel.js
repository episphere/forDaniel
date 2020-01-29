console.log('forDaniel.js loaded')

soccer={}
soccer.ui=_=>{
    const div=document.getElementById('soccerDiv')
    if(div){
        let h='<p>type/paste job description below then press Enter or <button id="soccerBt" onclick="soccer.run(inputSoccer.value,respSoccer)" type="button" class="btn btn-primary">Submit</button></p>'
        h += '<input id="inputSoccer" style="width:100%">'
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
    const url='https://sitf-cwlcji5kxq-uc.a.run.app/soccer/code'
    let jsonResp =await (await fetch(`${url}?title=${req}`)).json()
    if(typeof(resp)=='object'){
        let div=document.createElement('div')
        respSoccer.insertBefore(div,respSoccer.firstChild)
        let h=`<h3>${req} :</h3>`
        h += `<table>`
        h += `<tr><th>Code</th><th>Label</th></tr>`
        jsonResp.forEach(r=>{
            h += `<tr><td><nobr>${r.code}</nobr></td><td>${r.label}</td></tr>`
        })
        h += `</table>`
        div.innerHTML=h
        // clean input
        let ip=document.getElementById('inputSoccer')
        if(ip){ip.value=''}        
    }else{
        jsonResp.forEach((r,i)=>{ // augmenting data structure
            r.title=req
            r.Date=Date()
            r.i=i
            r.n=jsonResp.length
            return r
        })
    }
    jsonResp.title=req
    return jsonResp
    
}



if(typeof(define)!="undefined"){
    define(soccer) // can be loaded via require
}