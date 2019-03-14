// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    imgUrl:'/images/user_img.png'
  },
  login:function(){
    let that=this;
    wx.request({
      url: 'http://localhost:3000/base/login/login_test', // 仅为示例，并非真实的接口地址
      data: {
        name: 'donnaluo',
        pass: 'donnaluo'
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          isLogin:true
        })
        console.log(res.data)
      }
    })
  },
  logout:function(){
    //获取token，保存，设置登录状态
    this.setData({
      isLogin:false
    })
  },
  register: function () {
    wx.request({
      url: 'http://localhost:3000/base/login/register_test', // 仅为示例，并非真实的接口地址
      data: {
        name: 'donnaluo1',
        pass: 'donnaluo1'
      },
      method: 'post',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data)
      }
    })
  },
  //上传图片
  chooseImage: function () {
    var self = this
    var uploadFileUrl = 'http://localhost:3000/base/upload/upload_user_img'
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        var imageSrc = res.tempFilePaths[0]

        wx.uploadFile({
          url: uploadFileUrl,
          filePath: imageSrc,
          name: 'data',
          success: function (res) {
            let data = JSON.parse(res.data);
            console.log('uploadImage success, res is:', data)

            self.setData({
              imgUrl: data.path
            })

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })

            self.setData({
              imageSrc
            })
          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})