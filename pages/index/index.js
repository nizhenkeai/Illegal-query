//index.js
var util = require("../../utils/util.js");
Page({
  data: {
    inputValue: 'A870HW'
  },
  //事件处理函数
  chengeValue: function (e) {
    var that = this;
    that.setData({
      inputValue: e.detail.value.toUpperCase()
    })


  },
  checkFrom: function () {
    var that = this;
    var inputV = that.data.inputValue
    var regular1 = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
    if (inputV == "") {
      util.showToast("信息不能为空", "loading", 10000);
      return false
    } else if (new RegExp(/^[a-zA-Z]+$/).test(inputV.substring(0, 1))) {
      if (inputV.length != 6) {
        util.showToast("请输入正确的6位车牌号码", "loading", 10000);
        return false
      }
      return true
    } else {
      if (!regular1.test(inputV)) {
        util.showToast("请输入正确的证件号码", "loading", 10000);
        return false
      }
      return true
    }
  },
  bindViewTap: function () {

    if (!this.checkFrom()) {
      return false;
    } else {
      if (this.data.inputValue.length == 6) {
        wx.navigateTo({
          url: '../illegal/illegal?plateNumber=' + JSON.stringify(this.data.inputValue) + "&flag=" + 1
        })
      } else {
        wx.navigateTo({
          url: '../illegal/illegal?certificateNumber=' + JSON.stringify(this.data.inputValue) + "&flag=" + 2
        })
      }
    }
  },
  richScan: function(){
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.navigateTo({
          url: '../illegal/illegal?awardNumber=' + JSON.stringify(res.result) + "&flag=" + 3
        })
      },
      fail:(res)=>{
         console.log(res)
      }
    })
  }

})

