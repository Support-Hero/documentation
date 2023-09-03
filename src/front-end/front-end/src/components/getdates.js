export const getDateList=()=>{
    const datelist=[]
    //get this week's date & day
    const today=new Date()
    for(let i=7;i>=0;i--){
        const d = new Date()
        const today=new Date()
        d.setDate(d.getDate() + (i - d.getDay()));
        if(today.getDate() === d.getDate()){
            break
        }else{
            datelist.push(d.getFullYear()+'-'+((d.getMonth()+1).toString().length>1 ? (d.getMonth()+1): '0'+(d.getMonth()+1)) +'-'+(d.getDate().toString().length>1?d.getDate():('0'+d.getDate())))
        }
    }
    datelist.reverse()
    datelist.unshift(today.getFullYear()+'-'+((today.getMonth()+1).toString().length>1 ?(today.getMonth()+1):'0'+(today.getMonth()+1)) +'-'+(today.getDate().toString().length>1?today.getDate():('0'+today.getDate())))
    // console.log('dat1',datelist)

    for(let i=8;i<=14;i++){
        const d = new Date()
        d.setDate(d.getDate() + (i + d.getDay()));
        datelist.push(d.getFullYear()+'-'+((d.getMonth()+1).toString().length>1 ? (d.getMonth()+1): '0'+(d.getMonth()+1)) +'-'+(d.getDate().toString().length>1?d.getDate():('0'+d.getDate())))
    }
    // console.log('dat2',datelist)

    return datelist
}