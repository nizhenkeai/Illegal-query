// pages/illegal/illegal.js
var util = require("../../utils/util.js");
Page({
  data: {
    illegalFlapper: '',
    illegalDetails: [],
    untreated: 0,
    dockPoints: 0,
    penaltyAmount: 0,
    checkDisabled: false,
    check: false,
    btnText: '立即处理',
    btnDisabled: true,
    num: 0,
    id: '',
    judgeTure: false
  },
  comajax: function (url, fullData) {
    var that = this;
    wx.request({
      url: url,
      data: fullData,
      method: 'GET',
      header: {
        "content-type": "application/json",
        "token_id": "2b254bec-dd48-11e6-81f7-9457a5545c84"
      }, // 设置请求的 header
      success: function (res) {
        console.log(res)
        that.setData({
          judgeTure: true
        })
        var illegalDetails = res.data;

        for (var i = 0; i < illegalDetails.length; i++) {

          illegalDetails[i].createdAt = util.toDate(res.data[i].createdAt);
          illegalDetails[i].status = util.toStatus(res.data[i].status);

          if (illegalDetails[i].status == "已裁决未缴费") {
            that.data.untreated++;
            that.data.dockPoints = that.data.dockPoints + illegalDetails[i].dockPoints;
            that.data.penaltyAmount = that.data.penaltyAmount + illegalDetails[i].penaltyAmount;
            that.data.illegalDetails.push(illegalDetails[i]);
          }

          var pastAt = Math.floor(Math.abs(parseInt(illegalDetails[i].awardAt) - parseInt(new Date().getTime())) / 1000 / 60 / 60 / 24);
          var awardNumber = illegalDetails[i].awardNumber;

          if (awardNumber == "" || awardNumber == null) {
            awardNumber = "61";
          } else {
            awardNumber = awardNumber.substring(0, 2);
          }
        }

        if (pastAt > 14 || awardNumber != "61") {
          that.setData({
            checkDisabled: true,
            check: false
          })
        }
        that.setData({
          illegalDetails: that.data.illegalDetails,
          untreated: that.data.untreated,
          dockPoints: that.data.dockPoints,
          penaltyAmount: that.data.penaltyAmount
        })
      },
      fail: function (err) {
        // fail
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
        })
      },
      complete: function () {
        // complete
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    if (options.flag == 1) {
      this.setData({
        illegalFlapper: JSON.parse(options.plateNumber)
      })
      this.comajax("https://mobile.sxwinstar.net/wechat_access/api/v1/illegals/plateNumberSearch", {
        plateNumber: "陕" + this.data.illegalFlapper,
        engineNumber: "G11505"
      })
    } else if (options.flag == 2) {
      this.setData({
        illegalFlapper: JSON.parse(options.certificateNumber)
      })
      this.comajax("https://mobile.sxwinstar.net/wechat_access/api/v1/illegals/certificateSearch", {
        certificateNumber: this.data.illegalFlapper,
        certificateType: "A"
      })

    } else if (options.flag == 3) {
      this.setData({
        illegalFlapper: JSON.parse(options.awardNumber)
      })
      this.comajax("http://192.168.118.114:4090/api/v1/illegals/awardNumberSearch", {
        awardNumber: this.data.illegalFlapper
      })

    } else {
      //   wx.navigateBack({
      //     delta: 1, // 回退前 delta(默认为1) 页面
      //   })
    }
  },
  checkboxChange: function (e) {
    //console.log(e.detail.value)
    var id = '';
    var num = 0;
    var illegalDetails = this.data.illegalDetails

    for (var i of illegalDetails) {
      for (var j of e.detail.value) {
        if (i.id == j) {
          id += i.id + ',';
          num += parseInt(i.penaltyAmount)
        }
      }
    }
    this.setData({
      id: id,
      num: num
    })
    this.btnchange(e.detail.value)
  },
  btnchange: function (arr) {
    if (arr.length == 0) {
      this.setData({
        btnDisabled: true,
        btnText: "立即处理"
      })
    } else {
      this.setData({
        btnDisabled: false,
        btnText: "立即处理（￥" + this.data.num + ")"
      })
    }
  },
  btnTapJump: function () {
    console.log(this.data.id);
    wx.navigateTo({
      url: '../pay/pay'
    })
  }
})