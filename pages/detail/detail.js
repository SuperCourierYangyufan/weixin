let datas = require("./../../datas/list-data.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
      detailObj : {},
      index: null,
      isCollected:false,
      isMusicPlay:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({
      detailObj: datas.list_data[index],
      index: index,
    });

    //根据本地缓存判断是否收藏文章
    let Collected = wx.getStorageSync("isCollected");
    if(Collected[index]){
      this.setData(
        {
          isCollected: true
        }
      )
    }
  },

  headleMusic(){
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });

    //控制音乐播放
    if(isMusicPlay){
      //播放
      let {dataUrl,title} = this.data.detailObj.music;
      wx.playBackgroundAudio({
        dataUrl,
        title,
      })
    }else{
      //暂停
      wx.stopBackgroundAudio();
    }
  },

  handleCollection(){
    let isCollected = !this.data.isCollected;
    //更新
    this.setData({
      isCollected
    });

    let title = isCollected?"收藏成功":"取消收藏";
    wx.showToast({
      title,
      icon: 'success',
      duration: 2000
    })
    let index = this.data.index;
      wx.getStorage({
      key: 'isCollected',
      success: (result)=>{
        let obj = result.data;
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {

          },
        })
      },
      fail: ()=>{
        let obj = {};
        obj[index] = isCollected;
        wx.setStorage({
          key: 'isCollected',
          data: obj,
          success: () => {

          },
        })
      },
    })
   
  },

  //点击分享
  handleShare(){
    wx.showActionSheet({
      itemList: ['分享朋友圈','分享qq空间','分享到微博'],
    })
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