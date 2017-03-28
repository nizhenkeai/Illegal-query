// pages/pay/pay.js
Page({
  data:{
    status:true,
    payBtnText:"￥200确认支付"
  },
  pIChange:function() {
   var status;
   if(this.data.status){
     status=false;
     
   }else{
     status=true;
   }
   this.setData({
     status:status
   })
  },
  pBtnEve:function() {
    wx.navigateTo({
      url: '../UnionPay/UnionPay'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})