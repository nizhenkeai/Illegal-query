function showToast(title,icon,duration){
    wx.showToast({
        title: title,
        icon: icon,
        duration: duration
      })

      setTimeout(function(){
        wx.hideToast()
      },2000)
}
function add0(m){return m<10?'0'+m:m }
function toDate(number)
      {
        var time = new Date(number);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
      }
function toStatus(number){  
     if(number==0){
        number="未裁决未缴费";
     }else if(number==1){
        number="已裁决未缴费";
     }else if(number==2){
       number="已裁决已缴费";
     }else{
       number="异常"
     }
      return (number)  
   } 

module.exports = {
  showToast:showToast,
  toDate:toDate,
  toStatus:toStatus
}
